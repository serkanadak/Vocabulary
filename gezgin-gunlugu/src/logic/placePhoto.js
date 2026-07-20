// Her mekâna eşlik eden "temel foto".
// Kural (kullanıcı talebi): SADECE gerçek ve serbest lisanslı (Wikimedia Commons)
// bir fotoğraf kullanılır. Uygun/lisansı serbest bir görsel bulunamazsa ya da
// çevrimdışı olunursa o mekâna foto EKLENMEZ (null döner). Üretilen amblem yoktur.
//
// Akış: (1) Wikipedia'da mekânı bul, sayfa lider görselini (pageimage) al →
// (2) Commons'tan görselin lisansını doğrula → serbest lisanslıysa foto + atıf
// döndür. İlk çözüm önbelleğe alınır.
import { storageGet, storageSet } from './storage';
import { placeById } from '../data/places';

// ------------------------------------------------------------------ önbellek
const CACHE_KEY = 'gg_place_photo_cache_v2';
const FAIL_TTL = 7 * 24 * 3600 * 1000; // başarısız aramayı 7 gün sonra tekrar dene
let mem = null;

async function loadCache() {
  if (mem) return mem;
  try {
    mem = (await storageGet(CACHE_KEY)) || {};
  } catch (e) {
    mem = {};
  }
  return mem;
}
async function saveCache() {
  try {
    await storageSet(CACHE_KEY, mem);
  } catch (e) {
    /* yoksay */
  }
}

// ------------------------------------------------------------------ yardımcılar
function cleanTitle(name) {
  return (name || '')
    .replace(/\([^)]*\)/g, ' ') // parantez içini at ("Hatay (Antakya)" -> "Hatay")
    .replace(/sınır kapısı/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Wikipedia'da denenecek başlık adayları (temiz ad, parantez içi, takma adlar).
function titleCandidates(place) {
  const out = [];
  const push = (t) => {
    const v = (t || '').trim();
    if (v && v.length >= 2 && !out.some((x) => x.toLocaleLowerCase('tr') === v.toLocaleLowerCase('tr'))) out.push(v);
  };
  push(cleanTitle(place?.name));
  const m = (place?.name || '').match(/\(([^)]+)\)/);
  if (m) push(m[1]);
  const full = placeById(place?.id);
  const aliases = place?.aliases || full?.aliases || [];
  for (const a of aliases.slice(0, 4)) push(a);
  return out;
}

function isMeaningful(place) {
  const n = (place?.name || '').trim();
  return !!n && !/bilinmeyen|unknown/i.test(n);
}

function stripHtml(s) {
  return (s || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// extmetadata'dan lisansın serbest olup olmadığını belirler.
function isFreeLicense(ext) {
  if (!ext) return false;
  const nonFree = (ext.NonFree && ext.NonFree.value) || '';
  if (/^(1|true|yes)$/i.test(String(nonFree))) return false;
  const lic = ((ext.License && ext.License.value) || '').toLowerCase();
  const short = ((ext.LicenseShortName && ext.LicenseShortName.value) || '').toLowerCase();
  const hay = lic + ' ' + short;
  // Serbest kabul edilenler: Creative Commons, CC0, kamu malı (public domain), kısıtsız.
  if (/\b(cc0|cc[\s-]?by|creative commons|public domain|pd[\s-]|no restrictions|fal\b)/.test(hay)) return true;
  // Açıkça telifli ve lisans belirsizse serbest sayma.
  return false;
}

async function fetchJson(url) {
  let res;
  try {
    res = await fetch(url, { headers: { accept: 'application/json' } });
  } catch (e) {
    throw new Error('network');
  }
  if (!res.ok) return null;
  try {
    return await res.json();
  } catch (e) {
    return null;
  }
}

// Bir Wikipedia dilinde başlık için lider görsel (thumbnail + dosya adı + sayfa) bulur.
async function findLeadImage(lang, title) {
  const url =
    `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&origin=*&redirects=1` +
    `&prop=pageimages|info&inprop=url&piprop=thumbnail|name&pithumbsize=560&titles=` +
    encodeURIComponent(title);
  const data = await fetchJson(url);
  const pages = data && data.query && data.query.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  if (!page || page.missing !== undefined) return null;
  const thumb = page.thumbnail && page.thumbnail.source;
  const file = page.pageimage; // "Ornek.jpg"
  if (!thumb || !file) return null;
  return { thumb, file, pageUrl: page.fullurl, pageTitle: page.title };
}

// Commons'ta dosyanın lisans + atıf bilgisini alır; serbestse döndürür, değilse null.
async function checkCommonsLicense(file) {
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*` +
    `&prop=imageinfo&iiprop=extmetadata|url&titles=` +
    encodeURIComponent('File:' + file);
  const data = await fetchJson(url);
  const pages = data && data.query && data.query.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  const info = page && page.imageinfo && page.imageinfo[0];
  const ext = info && info.extmetadata;
  if (!ext) return null;
  if (!isFreeLicense(ext)) return null;
  const license = stripHtml((ext.LicenseShortName && ext.LicenseShortName.value) || 'serbest lisans');
  const artist = stripHtml((ext.Artist && ext.Artist.value) || (ext.Credit && ext.Credit.value) || '');
  const licenseUrl = (ext.LicenseUrl && ext.LicenseUrl.value) || '';
  const descUrl = (info && info.descriptionurl) || `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
  return { license, artist, licenseUrl, descUrl };
}

async function fetchFreePhoto(place) {
  const titles = titleCandidates(place);
  if (!titles.length) return null;
  for (const lang of ['tr', 'en']) {
    for (const title of titles) {
      const lead = await findLeadImage(lang, title); // ağ hatası burada throw eder
      if (!lead) continue;
      const lic = await checkCommonsLicense(lead.file);
      if (!lic) continue; // görsel var ama lisansı serbest değil → bu mekâna foto yok
      return {
        uri: lead.thumb,
        source: 'wikimedia',
        page: lic.descUrl || lead.pageUrl,
        articlePage: lead.pageUrl,
        title: lead.pageTitle || title,
        license: lic.license,
        artist: lic.artist,
        licenseUrl: lic.licenseUrl,
      };
    }
  }
  return null;
}

function cacheKey(place) {
  return place?.id || cleanTitle(place?.name) + '|' + (place?.country || '');
}

// Mekân için serbest lisanslı gerçek fotoyu çözer.
// Bulursa { uri, source, page, title, license, artist, licenseUrl }; aksi hâlde null.
export async function resolvePlacePhoto(place) {
  if (!isMeaningful(place)) return null;
  const cache = await loadCache();
  const key = cacheKey(place);
  const hit = cache[key];
  const now = Date.now();
  if (hit && hit.uri) return hit;
  if (hit && hit.fail && now - hit.fail < FAIL_TTL) return null;

  try {
    const found = await fetchFreePhoto(place);
    if (found) {
      cache[key] = found;
      await saveCache();
      return found;
    }
    cache[key] = { fail: now }; // uygun/serbest foto yok → bir süre tekrar deneme
    await saveCache();
    return null;
  } catch (e) {
    // Ağ hatası (çevrimdışı) → önbelleğe yazma, sonraki açılışta yeniden dene, şimdilik foto yok.
    return null;
  }
}

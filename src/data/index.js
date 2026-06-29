// Veri katmanı: tüm kaynakları birleştirir, doğrular ve sorgu yardımcıları sunar.
// Kelimeler ve veriler uygulamaya gömülüdür (Özellik 1) — çalışma zamanında ağ gerekmez.

import business from './words.business';
import economics from './words.economics';
import communication from './words.communication';
import general from './words.general';
import idioms from './idioms';
import generated from './generated';
import storiesData from './stories';
import wordlistRaw from './wordlist.generated';
import { validateEntry } from './schema';

// Curated (elle hazırlanmış) + generated (içe aktarılan/üretilen) havuz.
const RAW = [
  ...business,
  ...economics,
  ...communication,
  ...general,
  ...idioms,
  ...generated,
];

// Aynı id'nin iki kez gelmesini önle (curated her zaman önceliklidir).
const byId = new Map();
for (const entry of RAW) {
  if (!entry || !entry.id) continue;
  if (!byId.has(entry.id)) byId.set(entry.id, entry);
}

export const WORDS = Array.from(byId.values());
export const WORD_MAP = byId;
export const STORIES = storiesData;

export function getWord(id) {
  return WORD_MAP.get(id) || null;
}

// Kullanıcının yerel düzenlemelerini temel kelimeyle birleştirir (manuel ekleme).
// edits: { pronunciation?, synonyms?, antonyms?, meanings? }
export function applyEdits(word, edits) {
  if (!word || !edits) return word;
  const merged = { ...word, edited: true };
  if (edits.pronunciation != null) merged.pronunciation = edits.pronunciation;
  if (Array.isArray(edits.synonyms)) merged.synonyms = edits.synonyms;
  if (Array.isArray(edits.antonyms)) merged.antonyms = edits.antonyms;
  if (Array.isArray(edits.meanings) && edits.meanings.length) merged.meanings = edits.meanings;
  return merged;
}

export function searchWords(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return WORDS;
  return WORDS.filter((w) => {
    if (w.headword.toLowerCase().includes(q)) return true;
    return w.meanings.some(
      (m) => m.tr.toLowerCase().includes(q) || (m.en || '').toLowerCase().includes(q)
    );
  });
}

export function filterWords({ levels, domains, types } = {}) {
  return WORDS.filter((w) => {
    if (levels && levels.length && !levels.includes(w.level)) return false;
    if (domains && domains.length && !w.domains.some((d) => domains.includes(d))) return false;
    if (types && types.length && !types.includes(w.type)) return false;
    return true;
  });
}

// Geliştirme zamanı tutarlılık kontrolü (yalnızca __DEV__ modunda uyarır).
export function auditDataset() {
  const problems = [];
  for (const w of WORDS) {
    const errs = validateEntry(w);
    if (errs.length) problems.push({ id: w.id, errs });
  }
  return problems;
}

if (typeof __DEV__ !== 'undefined' && __DEV__) {
  const problems = auditDataset();
  if (problems.length) {
    // eslint-disable-next-line no-console
    console.warn(`[veri] ${problems.length} kayıtta şema uyarısı var`, problems.slice(0, 5));
  }
}

export const STATS = {
  total: WORDS.length,
  curated: WORDS.length - generated.length,
  generated: generated.length,
};

// ---------------------------------------------------------------------------
// CEFR Kelime Listesi katmanı (referans/çalışma listesi).
// Kaynak: The CEFR-J Wordlist Version 1.6 (Yukio Tono, TUFS) — atıf şartıyla.
// Yalnızca kelime + tür + CEFR seviyesi içerir; tam flashcard verisi DEĞİLDİR.
// Tam (Türkçe anlamlı) kayıtla eşleşen kelimeler, o kaydın detayına bağlanır.
// ---------------------------------------------------------------------------

const headwordToWordId = new Map();
for (const w of WORDS) headwordToWordId.set(w.headword.toLowerCase(), w.id);

export const WORDLIST = wordlistRaw.map((e) => {
  const wordId = headwordToWordId.get(e.h.toLowerCase()) || null;
  return {
    id: wordId || `wl_${e.h.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
    headword: e.h,
    pos: e.p,
    level: e.l,
    wordId, // tam kayıt varsa onun id'si (detaya gidilebilir)
  };
});

export const WORDLIST_LICENSE =
  'The CEFR-J Wordlist Version 1.6. Yukio Tono tarafından derlenmiştir, ' +
  'Tokyo University of Foreign Studies (TUFS). Atıf şartıyla kullanılır.';

export function filterWordlist({ levels, query } = {}) {
  const q = (query || '').trim().toLowerCase();
  return WORDLIST.filter((w) => {
    if (levels && levels.length && !levels.includes(w.level)) return false;
    if (q && !w.headword.toLowerCase().includes(q)) return false;
    return true;
  });
}

const wlDist = {};
WORDLIST.forEach((w) => (wlDist[w.level] = (wlDist[w.level] || 0) + 1));
export const WORDLIST_STATS = { total: WORDLIST.length, byLevel: wlDist };

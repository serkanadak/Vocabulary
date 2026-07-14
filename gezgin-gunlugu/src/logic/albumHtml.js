// Uygulama içi PDF albüm üretimi (web).
// generateAlbumPlan çıktısını + gerçek keşif fotoğraflarını alıp, baskıya hazır
// tek parça (self-contained) bir HTML belge üretir. Fotoğraflar tarayıcıda
// küçültülüp data URI olarak gömülür; böylece belge internetsiz, cihazda kalır.
// Kullanıcı yazdır → "PDF olarak kaydet" ile gerçek PDF alır.
import { generateAlbumPlan } from './publish';
import { formatLongDate } from './date';

function photosOf(d) {
  if (Array.isArray(d?.photos) && d.photos.length) return d.photos;
  return d?.photoUri ? [d.photoUri] : [];
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// Bir görseli tarayıcıda küçültüp JPEG data URI'ye çevirir.
// Cross-origin/erişilemeyen görsellerde orijinal uri veya null döner (güvenli).
function downscale(uri, maxPx = 1400, quality = 0.72) {
  return new Promise((resolve) => {
    try {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const scale = Math.min(1, maxPx / Math.max(img.width || 1, img.height || 1));
          const w = Math.max(1, Math.round((img.width || 1) * scale));
          const h = Math.max(1, Math.round((img.height || 1) * scale));
          const canvas = window.document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } catch (e) {
          resolve(uri); // tainted canvas → orijinali kullan
        }
      };
      img.onerror = () => resolve(null);
      img.src = uri;
    } catch (e) {
      resolve(null);
    }
  });
}

// Keşifleri güne göre grupla (kronolojik).
function groupByDay(discoveries) {
  const map = new Map();
  for (const d of discoveries) {
    const key = d.date || 'tarihsiz';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(d);
  }
  return [...map.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1));
}

export async function buildAlbumHtml(trip) {
  const plan = generateAlbumPlan(trip);
  const discoveries = [...(trip.discoveries || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));
  const days = groupByDay(discoveries);

  // Tüm fotoğrafları paralel küçült; disc.id + index -> dataURI eşlemesi.
  const jobs = [];
  for (const d of discoveries) photosOf(d).forEach((uri, i) => jobs.push({ id: `${d.id}_${i}`, uri }));
  const results = await Promise.all(jobs.map((j) => downscale(j.uri)));
  const imgMap = new Map();
  jobs.forEach((j, i) => imgMap.set(j.id, results[i]));
  const imgsFor = (d) =>
    photosOf(d)
      .map((_, i) => imgMap.get(`${d.id}_${i}`))
      .filter(Boolean);

  const coverImg = (() => {
    for (const d of discoveries) {
      const arr = imgsFor(d);
      if (arr.length) return arr[0];
    }
    return null;
  })();

  const dayPages = days
    .map(([dateKey, items]) => {
      const dateLabel = dateKey === 'tarihsiz' ? 'Tarihsiz' : formatLongDate(dateKey);
      const photos = items.flatMap((d) => imgsFor(d));
      const grid = photos.length
        ? `<div class="grid">${photos.map((src) => `<img src="${src}" />`).join('')}</div>`
        : '';
      const entries = items
        .map((d) => {
          const loc = [d.city, d.country].filter(Boolean).join(', ');
          return `<div class="entry">
            <div class="entry-title">${esc(d.placeName)}${loc ? ` <span class="loc">· ${esc(loc)}</span>` : ''}</div>
            ${d.summary ? `<div class="entry-summary">${esc(d.summary)}</div>` : ''}
            ${d.userNotes ? `<div class="entry-note">✍️ ${esc(d.userNotes)}</div>` : ''}
          </div>`;
        })
        .join('');
      return `<section class="page">
        <div class="day-head"><span class="day-date">${esc(dateLabel)}</span></div>
        ${grid}
        <div class="entries">${entries}</div>
      </section>`;
    })
    .join('');

  const routeText = esc(plan.mapPage.routeText || '');
  const totalDist = plan.mapPage.totalDistance ? esc(plan.mapPage.totalDistance) : '';

  return `<!doctype html><html lang="tr"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(plan.cover.title)} — Albüm</title>
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #f2f2f2; color: #14202b;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  .page { background: #fff; width: 210mm; min-height: 297mm; margin: 10px auto; padding: 18mm 16mm;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15); }
  .cover { display: flex; flex-direction: column; }
  .cover-img { width: 100%; height: 150mm; object-fit: cover; border-radius: 6px; }
  .cover-title { font-size: 34px; font-weight: 800; color: #0b3a5b; margin-top: 22mm; }
  .cover-sub { font-size: 16px; color: #55636e; margin-top: 8px; }
  .cover-meta { font-size: 13px; color: #7a8791; margin-top: auto; }
  h2 { font-size: 13px; letter-spacing: 1px; color: #9aa4ad; text-transform: uppercase; margin: 0 0 10px; }
  .intro-text { font-size: 15px; line-height: 1.6; }
  .day-head { border-bottom: 2px solid #0b3a5b; padding-bottom: 6px; margin-bottom: 12px; }
  .day-date { font-size: 20px; font-weight: 800; color: #0b3a5b; }
  .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-bottom: 12px; }
  .grid img { width: 100%; height: 62mm; object-fit: cover; border-radius: 4px; }
  .grid img:only-child { grid-column: 1 / -1; height: 120mm; }
  .entry { padding: 8px 0; border-top: 1px solid #e6e9ec; }
  .entry:first-child { border-top: none; }
  .entry-title { font-size: 15px; font-weight: 700; }
  .entry-title .loc { font-weight: 400; color: #7a8791; font-size: 13px; }
  .entry-summary { font-size: 13px; line-height: 1.5; color: #33404b; margin-top: 3px; }
  .entry-note { font-size: 13px; color: #55636e; font-style: italic; margin-top: 4px; }
  .route { font-size: 15px; font-weight: 600; line-height: 1.6; }
  .dist { font-size: 13px; color: #7a8791; margin-top: 6px; }
  @media print {
    html, body { background: #fff; }
    .page { box-shadow: none; margin: 0; width: auto; min-height: auto; page-break-after: always; }
    .page:last-child { page-break-after: auto; }
    @page { size: A4; margin: 12mm; }
  }
</style></head><body>
  <section class="page cover">
    ${coverImg ? `<img class="cover-img" src="${coverImg}" />` : ''}
    <div class="cover-title">${esc(plan.cover.title)}</div>
    ${plan.cover.subtitle ? `<div class="cover-sub">${esc(plan.cover.subtitle)}</div>` : ''}
    <div class="cover-meta">${esc(plan.vehicle.icon)} ${esc(plan.vehicle.label)} · ${plan.discoveryCount} keşif</div>
  </section>
  <section class="page">
    <h2>Giriş</h2>
    <div class="intro-text">${esc(plan.intro.text)}</div>
  </section>
  ${dayPages}
  <section class="page">
    <h2>Seyahat Haritası</h2>
    <div class="route">${routeText}</div>
    ${totalDist ? `<div class="dist">Toplam mesafe: ${totalDist}</div>` : ''}
  </section>
</body></html>`;
}

// Web'de albümü yeni sekmede açıp yazdır/PDF olarak kaydet diyaloğunu tetikler.
export async function exportAlbumPdf(trip) {
  const html = await buildAlbumHtml(trip);
  const win = window.open('', '_blank');
  if (!win) return { ok: false, reason: 'popup' };
  win.document.open();
  win.document.write(html);
  win.document.close();
  const trigger = () => {
    try {
      win.focus();
      win.print();
    } catch (e) {
      // kullanıcı sekmeden elle yazdırabilir
    }
  };
  // Görseller data URI olduğundan yükleme hızlı; yine de yerleşime kısa süre tanı.
  if (win.document.readyState === 'complete') setTimeout(trigger, 400);
  else win.onload = () => setTimeout(trigger, 400);
  return { ok: true };
}

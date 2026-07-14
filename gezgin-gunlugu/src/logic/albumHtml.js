// Uygulama içi PDF albüm üretimi (web).
// Baskıya hazır tek parça (self-contained) bir HTML belge üretir. Fotoğraflar
// AYNEN (elleçlenmeden) gömülür — seçim anında zaten küçültülüp kalıcı data
// URI'ye çevrildikleri için burada tekrar işlenmez; bu, PDF'te görünmeme
// sorununu ortadan kaldırır. Belge internetsiz çalışır, cihazda kalır.
// Düzen: güzergah sırasıyla her ziyaret edilen mekanın bilgisi + ardından
// o mekanın fotoğrafları; sonra sıradaki mekan.
import { generateAlbumPlan } from './publish';
import { buildRouteSvg } from './routeMap';
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

// Keşifleri güzergah sırasına diz: durak sırasına göre, rota dışı olanlar en
// sona. Aynı durak içinde ekleme sırası korunur (kararlı).
function orderByRoute(trip) {
  const stops = trip.stops || [];
  const stopOrder = new Map(stops.map((s, i) => [s.id, i]));
  const discoveries = trip.discoveries || [];
  return discoveries
    .map((d, idx) => ({
      d,
      idx,
      rank: d.stopId && stopOrder.has(d.stopId) ? stopOrder.get(d.stopId) : Number.MAX_SAFE_INTEGER,
    }))
    .sort((a, b) => a.rank - b.rank || a.idx - b.idx);
}

export function buildAlbumHtml(trip) {
  const plan = generateAlbumPlan(trip);
  const stops = trip.stops || [];
  const stopOrder = new Map(stops.map((s, i) => [s.id, i]));
  const stopName = new Map(stops.map((s) => [s.id, s.name]));
  const ranked = orderByRoute(trip);

  // Kapak görseli: sırayla ilk fotoğraflı keşif.
  let coverImg = null;
  for (const { d } of ranked) {
    const ph = photosOf(d);
    if (ph.length) {
      coverImg = ph[0];
      break;
    }
  }

  // Keşifleri güzergah sırasına göre gruplandır (her durak ayrı bir grup).
  const groups = [];
  let cur = null;
  for (const { d } of ranked) {
    const inStop = d.stopId && stopOrder.has(d.stopId);
    const key = inStop ? d.stopId : '__free__';
    if (!cur || cur.key !== key) {
      cur = {
        key,
        title: inStop ? `${stopOrder.get(key) + 1}. ${stopName.get(key)}` : 'Rota dışı · Diğer',
        items: [],
      };
      groups.push(cur);
    }
    cur.items.push(d);
  }

  const placeBlock = (d) => {
    const loc = [d.city, d.country].filter(Boolean).join(', ');
    const photos = photosOf(d);
    const solo = photos.length === 1 ? ' solo' : '';
    const photoHtml = photos.length
      ? `<div class="photos">${photos
          .map((src) => `<figure class="ph${solo}"><img src="${src}" /></figure>`)
          .join('')}</div>`
      : '';
    return (
      `<div class="place">` +
      `<div class="place-title">${esc(d.placeName)}${d.date ? ` <span class="place-date">${esc(formatLongDate(d.date))}</span>` : ''}</div>` +
      (loc ? `<div class="place-loc">${esc(loc)}</div>` : '') +
      (d.summary ? `<div class="place-summary">${esc(d.summary)}</div>` : '') +
      (d.userNotes ? `<div class="place-note">✍️ ${esc(d.userNotes)}</div>` : '') +
      photoHtml +
      `</div>`
    );
  };

  // Her durak (güzergah) YENİ SAYFADAN başlar → ayrı .page section.
  const journalSections = groups
    .map(
      (g) =>
        `<section class="page stop-section">` +
        `<div class="stop-head">🗺️ ${esc(g.title)}</div>` +
        g.items.map(placeBlock).join('') +
        `</section>`
    )
    .join('');

  const routeText = esc(plan.mapPage.routeText || '');
  const totalDist = plan.mapPage.totalDistance ? esc(plan.mapPage.totalDistance) : '';
  const routeSvg = buildRouteSvg(trip.stops || [], {
    W: 620,
    H: 380,
    sea: '#dceaf5',
    land: '#eef3ea',
    line: '#c0392b',
    dot: '#f5a623',
    dotStroke: '#0b3a5b',
    dotText: '#0b3a5b',
    text: '#14202b',
  });

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
  .stop-head { font-size: 20px; font-weight: 800; color: #0b3a5b; border-bottom: 2px solid #0b3a5b;
    padding-bottom: 5px; margin: 0 0 14px; page-break-after: avoid; break-after: avoid; }
  .place { margin-bottom: 16px; }
  .place-title { font-size: 17px; font-weight: 700; break-after: avoid; page-break-after: avoid; }
  .place-title .place-date { font-weight: 400; color: #7a8791; font-size: 13px; }
  .place-loc { font-size: 13px; color: #7a8791; margin-top: 1px; }
  .place-summary { font-size: 13.5px; line-height: 1.55; color: #33404b; margin-top: 6px; }
  .place-note { font-size: 13px; color: #55636e; font-style: italic; margin-top: 5px; }
  /* İki sütunlu paketleme; her fotoğraf tek parça — bölünmeden sığmıyorsa
     komple sonraki sayfaya geçer. */
  .photos { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; align-items: flex-start; }
  .ph { flex: 0 1 calc(50% - 3px); margin: 0; break-inside: avoid; page-break-inside: avoid; }
  .ph.solo { flex-basis: 100%; }
  .ph img { width: 100%; height: auto; max-height: 235mm; object-fit: contain; border-radius: 4px; display: block; }
  .ph.solo img { max-height: 210mm; }
  .mapbox { width: 100%; margin-bottom: 14px; }
  .mapbox svg { width: 100%; height: auto; border: 1px solid #e6ebf0; border-radius: 8px; }
  .route { font-size: 15px; font-weight: 600; line-height: 1.6; }
  .dist { font-size: 13px; color: #7a8791; margin-top: 6px; }
  @media print {
    html, body { background: #fff; }
    .page { box-shadow: none; margin: 0; width: auto; min-height: auto; padding: 0; page-break-after: always; }
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
  ${journalSections || '<section class="page"><div class="intro-text">Henüz keşif eklenmemiş.</div></section>'}
  <section class="page">
    <h2>Seyahat Haritası</h2>
    ${routeSvg ? `<div class="mapbox">${routeSvg}</div>` : ''}
    <div class="route">${routeText}</div>
    ${totalDist ? `<div class="dist">Toplam mesafe: ${totalDist}</div>` : ''}
  </section>
</body></html>`;
}

// Bir belge (yeni sekme ya da iframe) içindeki görseller yüklenince yazdırır.
function printWhenReady(targetWin, targetDoc, onDone) {
  const doPrint = () => {
    try {
      targetWin.focus();
      targetWin.print();
    } catch (e) {
      // kullanıcı elle yazdırabilir
    }
    if (onDone) setTimeout(onDone, 1000);
  };
  const start = Date.now();
  const tick = () => {
    const imgs = Array.from(targetDoc.images || []);
    if (imgs.every((im) => im.complete) || Date.now() - start > 8000) setTimeout(doPrint, 300);
    else setTimeout(tick, 150);
  };
  if (targetDoc.readyState === 'complete') tick();
  else targetWin.onload = tick;
}

// Popup engellenirse gizli iframe ile yazdır (açılır pencere gerektirmez).
function printViaIframe(html) {
  try {
    const iframe = window.document.createElement('iframe');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
    window.document.body.appendChild(iframe);
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
    printWhenReady(iframe.contentWindow, doc, () => {
      try {
        window.document.body.removeChild(iframe);
      } catch (e) {
        // yok say
      }
    });
    return true;
  } catch (e) {
    return false;
  }
}

// Web'de albümü yazdır/PDF olarak kaydet diyaloğunu açar.
// ÖNEMLİ: açılır pencere, kullanıcı tıklamasıyla aynı anda (await'ten ÖNCE)
// açılmalı; yoksa tarayıcı engeller. Bu yüzden pencereyi hemen açar, albümü
// hazırladıktan sonra içine yazarız. Engellenirse iframe'e düşeriz.
export async function exportAlbumPdf(trip) {
  let win = null;
  try {
    win = window.open('', '_blank');
  } catch (e) {
    win = null;
  }
  if (win) {
    try {
      win.document.write(
        '<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Albüm hazırlanıyor…</title></head>' +
          '<body style="font-family:sans-serif;padding:24px;color:#333">📖 Albüm hazırlanıyor…</body></html>'
      );
    } catch (e) {
      // yok say
    }
  }

  const html = buildAlbumHtml(trip);

  if (win && !win.closed) {
    try {
      win.document.open();
      win.document.write(html);
      win.document.close();
      printWhenReady(win, win.document);
      return { ok: true };
    } catch (e) {
      // popup yazımı başarısız → iframe dene
    }
  }

  return printViaIframe(html) ? { ok: true, fallback: 'iframe' } : { ok: false, reason: 'popup' };
}

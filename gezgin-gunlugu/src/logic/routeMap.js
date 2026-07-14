// Bağımsız (kütüphanesiz) güzergah haritası: durakların enlem/boylamını basit
// bir eş dörtgen (equirectangular) izdüşümle x/y'ye yerleştirir, sırayla çizgiyle
// bağlar, numaralı noktalar ve etiketlerle bir SVG üretir. Basemap (ülke sınırı)
// yoktur — internet gerektirmez, PDF'e ve web'e olduğu gibi gömülebilir.

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function hasXY(s) {
  return s && typeof s.lat === 'number' && typeof s.lng === 'number' && !Number.isNaN(s.lat) && !Number.isNaN(s.lng);
}

function project(stops, W, H, pad) {
  const pts = (stops || []).filter(hasXY);
  if (!pts.length) return [];
  const meanLat = pts.reduce((a, s) => a + s.lat, 0) / pts.length;
  const k = Math.cos((meanLat * Math.PI) / 180) || 1; // boylamı enleme göre daralt
  const xs = pts.map((s) => s.lng * k);
  const ys = pts.map((s) => s.lat);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  let rx = maxX - minX;
  let ry = maxY - minY;
  if (rx < 1e-6) rx = 1e-6;
  if (ry < 1e-6) ry = 1e-6;
  const scale = Math.min((W - 2 * pad) / rx, (H - 2 * pad) / ry);
  const offX = (W - rx * scale) / 2;
  const offY = (H - ry * scale) / 2;
  return pts.map((s) => ({
    s,
    x: offX + (s.lng * k - minX) * scale,
    y: offY + (maxY - s.lat) * scale, // kuzey yukarıda
  }));
}

// Güzergahı SVG dizesi olarak döndürür. En az bir koordinatlı durak gerekir.
export function buildRouteSvg(stops, opts = {}) {
  const {
    W = 620,
    H = 380,
    pad = 40,
    bg = '#ffffff',
    grid = '#eef2f5',
    line = '#0b3a5b',
    dot = '#f5a623',
    dotStroke = '#0b3a5b',
    dotText = '#0b3a5b',
    text = '#14202b',
  } = opts;
  const pts = project(stops, W, H, pad);
  if (!pts.length) return '';

  const gridLines = [];
  for (let gx = pad; gx <= W - pad + 0.1; gx += (W - 2 * pad) / 4) {
    gridLines.push(`<line x1="${gx.toFixed(1)}" y1="${pad}" x2="${gx.toFixed(1)}" y2="${H - pad}" stroke="${grid}" stroke-width="1"/>`);
  }
  for (let gy = pad; gy <= H - pad + 0.1; gy += (H - 2 * pad) / 3) {
    gridLines.push(`<line x1="${pad}" y1="${gy.toFixed(1)}" x2="${W - pad}" y2="${gy.toFixed(1)}" stroke="${grid}" stroke-width="1"/>`);
  }

  const poly =
    pts.length > 1
      ? `<polyline points="${pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}" fill="none" stroke="${line}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>`
      : '';

  const marks = pts
    .map((p, i) => {
      const n = i + 1;
      const name = esc(p.s.name || '');
      const anchorEnd = p.x > W * 0.6;
      const tx = anchorEnd ? p.x - 12 : p.x + 12;
      const anchor = anchorEnd ? 'end' : 'start';
      return (
        `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="8" fill="${dot}" stroke="${dotStroke}" stroke-width="2"/>` +
        `<text x="${p.x.toFixed(1)}" y="${(p.y + 3.5).toFixed(1)}" font-size="10" font-weight="700" text-anchor="middle" fill="${dotText}">${n}</text>` +
        `<text x="${tx.toFixed(1)}" y="${(p.y - 11).toFixed(1)}" font-size="13" font-weight="600" text-anchor="${anchor}" fill="${text}">${n}. ${name}</text>`
      );
    })
    .join('');

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">` +
    `<rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="${bg}"/>` +
    gridLines.join('') +
    poly +
    marks +
    `</svg>`
  );
}

// SVG'yi <img> / RN Image kaynağı olarak kullanılabilir data URI'ye çevirir.
export function routeSvgDataUri(stops, opts = {}) {
  const svg = buildRouteSvg(stops, opts);
  if (!svg) return null;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Koordinatı olan durak sayısı (harita gösterip göstermeme kararı için).
export function mappableStopCount(stops) {
  return (stops || []).filter(hasXY).length;
}

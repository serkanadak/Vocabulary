// Yayın (kitapçık / fotoğraf albümü / e-kitap) mizanpaj planı üreticisi.
// Toplanan keşifleri kronolojik olarak dizip sayfa sayfa yerleşim taslağı çıkarır.
import { formatLongDate, formatShortDate, daysBetween } from './date';
import { computeRoute, formatKm } from './geo';
import { getVehicle } from '../data/vehicles';

// Keşifleri tarihe göre grupla (gün gün).
function groupByDay(discoveries) {
  const map = new Map();
  for (const d of discoveries) {
    const key = d.date || 'tarihsiz';
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(d);
  }
  return [...map.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1));
}

// Fotoğraf sayısına göre uygun yerleşim şablonu öner.
function layoutFor(count) {
  if (count <= 1) return 'Tam sayfa tek fotoğraf + yan sütunda özet';
  if (count === 2) return 'İki fotoğraf yan yana (çift panel) + alt şerit metin';
  if (count <= 4) return '2×2 ızgara + köşede tarih rozeti';
  return 'Kolaj ızgara (mozaik) + açılır kapak fotoğrafı';
}

export function generateAlbumPlan(trip) {
  const discoveries = [...(trip.discoveries || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));
  const days = groupByDay(discoveries);
  const vehicle = getVehicle(trip.vehicle);
  const route = computeRoute(trip.stops || [], trip.vehicle);
  const span = daysBetween(trip.startDate, trip.endDate);

  const cover = {
    title: trip.title || 'Seyahat Günlüğü',
    subtitle: [
      trip.startDate ? formatShortDate(trip.startDate) : null,
      trip.endDate ? formatShortDate(trip.endDate) : null,
    ]
      .filter(Boolean)
      .join(' – '),
    colorIdea: 'Gün batımı altını (#f5a623) yazı + gece mavisi (#0b1a2b) zemin; en etkileyici manzara fotoğrafı tam kapak.',
    imageIdea:
      discoveries[0]?.photoUri
        ? 'Kapak için ilk/en güçlü keşif fotoğrafını tam sayfa kullan, üstüne yarı saydam koyu degrade + başlık.'
        : 'Kapak için rota haritasını arka plan dokusu olarak kullan, ortada başlık.',
  };

  const intro = {
    heading: 'Giriş Sayfası',
    text:
      `${trip.title || 'Bu seyahat'}, ${vehicle.icon} ${vehicle.label} ile ` +
      `${(trip.stops || []).map((s) => s.name).filter(Boolean).join(' → ') || 'çeşitli duraklar'} güzergâhında ` +
      `${span ? span + ' günlük' : ''} bir yolculuğun kaydıdır. ` +
      `Toplam ${discoveries.length} keşif, ${(trip.stops || []).length} durak.`,
    layout: 'Sol sayfa: kısa giriş metni + künye (tarih, araç, kişi). Sağ sayfa: küçük rota haritası önizlemesi.',
  };

  const pages = days.map(([dateKey, items], idx) => ({
    pageNo: idx + 1,
    date: dateKey === 'tarihsiz' ? 'Tarihsiz' : formatLongDate(dateKey),
    photoCount: items.filter((i) => i.photoUri).length,
    layout: layoutFor(items.filter((i) => i.photoUri).length || items.length),
    entries: items.map((i) => ({
      placeName: i.placeName,
      location: [i.city, i.country].filter(Boolean).join(', '),
      hasPhoto: !!i.photoUri,
      photoUri: i.photoUri || null,
      summary: i.summary || '',
      userNotes: i.userNotes || '',
      sources: i.sources || [],
    })),
  }));

  const mapPage = {
    heading: 'Seyahat Haritası / Gezi Rotası',
    routeText:
      (trip.stops || []).map((s) => s.name).filter(Boolean).join('  →  ') || 'Durak eklenmedi',
    totalDistance: route.hasAny ? formatKm(route.totalKm) : null,
    layout:
      'Çift sayfa yayılımı: sol+sağ tam harita; duraklar numaralı pinlerle, aralarına kesikli rota çizgisi; ' +
      'kenarda mesafe/gün lejantı.',
  };

  return { cover, intro, pages, mapPage, vehicle, route, discoveryCount: discoveries.length };
}

// Planı panoya kopyalanabilir düz metne (Markdown) çevirir.
export function albumPlanToText(trip) {
  const plan = generateAlbumPlan(trip);
  const L = [];
  L.push(`# ${plan.cover.title} — Albüm / Yayın Planı`);
  if (plan.cover.subtitle) L.push(`_${plan.cover.subtitle}_`);
  L.push('');
  L.push('## Kapak');
  L.push(`- Renk/tema: ${plan.cover.colorIdea}`);
  L.push(`- Görsel: ${plan.cover.imageIdea}`);
  L.push('');
  L.push(`## ${plan.intro.heading}`);
  L.push(plan.intro.text);
  L.push(`- Yerleşim: ${plan.intro.layout}`);
  L.push('');
  L.push('## Sayfalar (Kronolojik)');
  plan.pages.forEach((p) => {
    L.push('');
    L.push(`### Sayfa ${p.pageNo} — ${p.date}`);
    L.push(`- Fotoğraf: ${p.photoCount} · Yerleşim: ${p.layout}`);
    p.entries.forEach((e) => {
      L.push(`  - **${e.placeName}**${e.location ? ' (' + e.location + ')' : ''}${e.hasPhoto ? ' 📷' : ''}`);
      if (e.userNotes) L.push(`    - Not: ${e.userNotes}`);
    });
  });
  L.push('');
  L.push(`## ${plan.mapPage.heading}`);
  L.push(`- Rota: ${plan.mapPage.routeText}`);
  if (plan.mapPage.totalDistance) L.push(`- Toplam mesafe: ${plan.mapPage.totalDistance}`);
  L.push(`- Yerleşim: ${plan.mapPage.layout}`);
  return L.join('\n');
}

// Günlük saatlik program (itinerary) üretimi.
//
// Güzergah duraklarını ve keşif noktalarını (eklenmiş keşifler + arşivdeki
// önerilen yerler) dikkate alarak gün gün, saat saat bir taslak program çıkarır.
// Üretilen program KULLANICININ DÜZENLEYEBİLECEĞİ bir başlangıç noktasıdır:
// ekleme/çıkarma/saat değiştirme uygulamada yapılır ve kaydedilir.
//
// Her program maddesi ilişkilidir:
//   stopId       -> güzergah durağı (güzergah sayfasına bağlanır)
//   discoveryId  -> kayıtlı keşif (keşif detayına bağlanır)
//   attraction   -> henüz keşfe eklenmemiş öneri (dokununca keşfe dönüşür)
import { attractionsFor } from '../data/attractions';
import { matchPlace } from '../data/places';
import { todayKey } from './date';

export const ITEM_KIND = {
  TRAVEL: 'travel', // duraklar arası yolculuk
  VISIT: 'visit', // mekân ziyareti
  MEAL: 'meal', // yemek molası
  FREE: 'free', // serbest / kullanıcı maddesi
};

// "HH:MM" -> dakika; geçersizse null.
export function parseTime(s) {
  const m = /^(\d{1,2}):(\d{2})$/.exec((s || '').trim());
  if (!m) return null;
  const h = Number(m[1]);
  const mi = Number(m[2]);
  if (h < 0 || h > 23 || mi < 0 || mi > 59) return null;
  return h * 60 + mi;
}

// dakika -> "HH:MM" (gün taşarsa 23:59'da sabitlenir)
export function fmtTime(min) {
  const v = Math.max(0, Math.min(23 * 60 + 59, Math.round(min)));
  const h = Math.floor(v / 60);
  const mi = v % 60;
  return `${String(h).padStart(2, '0')}:${String(mi).padStart(2, '0')}`;
}

export function isValidTime(s) {
  return parseTime(s) !== null;
}

// 'YYYY-MM-DD' + gün sayısı -> 'YYYY-MM-DD'
export function addDays(dateKey, n) {
  const [y, m, d] = (dateKey || '').split('-').map(Number);
  if (!y || !m || !d) return dateKey;
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + n);
  const yy = dt.getFullYear();
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

let seq = 0;
function uid() {
  seq += 1;
  return `pl_${Date.now().toString(36)}_${seq}`;
}

// Durakları günlere dağıtır: [{ date, stop, dayIndexInStop, isArrival }]
// Durakta tarih varsa o tarihten başlar; yoksa seyahat başlangıcından itibaren
// `nights` (en az 1 gün) kadar sırayla ilerler.
export function assignDays(trip) {
  const stops = trip.stops || [];
  const out = [];
  let cursor = trip.startDate || todayKey();
  for (const stop of stops) {
    const start = stop.date || cursor;
    const days = Math.max(1, Number(stop.nights) || 1);
    for (let i = 0; i < days; i += 1) {
      out.push({ date: addDays(start, i), stop, dayIndexInStop: i, isArrival: i === 0 });
    }
    cursor = addDays(start, days);
  }
  return out;
}

const DEFAULTS = {
  dayStart: '09:00',
  visitMin: 90, // bir mekânda geçen süre
  gapMin: 30, // mekânlar arası boşluk/yürüyüş
  lunchAt: '13:00',
  lunchMin: 60,
  maxVisitsPerDay: 4,
  travelStart: '09:00',
};

// Bir seyahat için gün gün saatlik program üretir.
// Zaten keşfe eklenmiş yerler önce gelir; kalan slotlar arşiv önerileriyle dolar.
export function generateItinerary(trip, opts = {}) {
  const o = { ...DEFAULTS, ...opts };
  const days = assignDays(trip);
  if (!days.length) return [];

  const discoveries = trip.discoveries || [];
  const items = [];
  let prevStop = null;

  for (const day of days) {
    const { date, stop } = day;
    let clock = parseTime(o.dayStart);

    // Yeni durağa varış günü → önce yolculuk maddesi.
    if (day.isArrival && prevStop && prevStop.id !== stop.id) {
      items.push({
        id: uid(),
        date,
        time: fmtTime(parseTime(o.travelStart)),
        durationMin: 0,
        kind: ITEM_KIND.TRAVEL,
        title: `${prevStop.name} → ${stop.name}`,
        stopId: stop.id,
        fromStopId: prevStop.id,
        note: '',
        done: false,
      });
      clock = parseTime(o.travelStart) + 120; // yolculuk sonrası varsayılan tampon
    }

    // Bu durağa ait keşifler (kullanıcı eklemiş) + arşiv önerileri.
    const stopDisc = discoveries.filter((d) => d.stopId === stop.id);
    const place = matchPlace(stop.name);
    const suggestions = place ? attractionsFor(place.id) : [];
    const usedNames = new Set(stopDisc.map((d) => (d.placeName || '').toLocaleLowerCase('tr')));
    const fresh = suggestions.filter((a) => !usedNames.has((a.name || '').toLocaleLowerCase('tr')));

    // Durakta birden fazla gün varsa ziyaretleri günlere bölüştür.
    const pool = [
      ...stopDisc.map((d) => ({ title: d.placeName, discoveryId: d.id, placeId: d.placeId })),
      ...fresh.map((a) => ({ title: a.name, attractionId: a.id, placeId: place ? place.id : null })),
    ];
    const perDay = o.maxVisitsPerDay;
    const slice = pool.slice(day.dayIndexInStop * perDay, day.dayIndexInStop * perDay + perDay);

    let lunchDone = false;
    const lunch = parseTime(o.lunchAt);
    for (const p of slice) {
      // Öğle saatini geçtiysek bir kez yemek molası koy.
      if (!lunchDone && clock >= lunch) {
        items.push({
          id: uid(),
          date,
          time: fmtTime(clock),
          durationMin: o.lunchMin,
          kind: ITEM_KIND.MEAL,
          title: '',
          stopId: stop.id,
          note: '',
          done: false,
        });
        clock += o.lunchMin + o.gapMin;
        lunchDone = true;
      }
      items.push({
        id: uid(),
        date,
        time: fmtTime(clock),
        durationMin: o.visitMin,
        kind: ITEM_KIND.VISIT,
        title: p.title,
        stopId: stop.id,
        discoveryId: p.discoveryId || null,
        attractionId: p.attractionId || null,
        placeId: p.placeId || null,
        note: '',
        done: false,
      });
      clock += o.visitMin + o.gapMin;
    }

    prevStop = stop;
  }

  return items;
}

// Programı gün gün gruplar: [{ date, items }] — tarih ve saat sırasına göre.
export function groupByDay(plan) {
  const map = new Map();
  for (const it of plan || []) {
    const d = it.date || '';
    if (!map.has(d)) map.set(d, []);
    map.get(d).push(it);
  }
  const days = [...map.entries()].map(([date, items]) => ({
    date,
    items: [...items].sort((a, b) => (parseTime(a.time) ?? 0) - (parseTime(b.time) ?? 0)),
  }));
  days.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  return days;
}

// Yeni (elle eklenen) madde iskeleti.
export function newItem(date, time = '09:00', extra = {}) {
  return {
    id: uid(),
    date,
    time,
    durationMin: 60,
    kind: ITEM_KIND.FREE,
    title: '',
    stopId: null,
    discoveryId: null,
    attractionId: null,
    placeId: null,
    note: '',
    done: false,
    ...extra,
  };
}

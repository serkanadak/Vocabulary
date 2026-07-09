// Geçmiş namaz (kaza) takibi: yalnızca farz ve vacip namazlar için, geçmiş
// günlerin kılınıp kılınmadığını izler. Sünnetler kaza kapsamında değildir.

import { IBADETLER, CATEGORY, FREQUENCY, HUKUM } from '../data/ibadetler';
import { todayKey } from './date';

export function getKazaItems() {
  return IBADETLER.filter(
    (i) => i.category === CATEGORY.NAMAZ && i.frequency === FREQUENCY.DAILY && (i.hukum === HUKUM.FARZ_AYN || i.hukum === HUKUM.VACIP)
  );
}

// endKey dahil, startKey'e kadar (dahil) günleri en yeniden en eskiye sıralar.
export function enumerateDates(startKey, endKey) {
  if (!startKey || !endKey || startKey > endKey) return [];
  const dates = [];
  const cur = new Date(endKey);
  const start = new Date(startKey);
  while (cur >= start) {
    dates.push(todayKey(cur));
    cur.setDate(cur.getDate() - 1);
  }
  return dates;
}

export function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayKey(d);
}

// Her gün için tamamlanma durumu + genel/ibadet bazlı borç özetini hesaplar.
export function computeKazaSummary(byDate, items, dates) {
  const perItemDebt = Object.fromEntries(items.map((i) => [i.id, 0]));
  let totalDebt = 0;
  const days = dates.map((dateKey) => {
    const dayMap = byDate[dateKey] || {};
    let done = 0;
    for (const item of items) {
      if (dayMap[item.id]) {
        done++;
      } else {
        perItemDebt[item.id]++;
        totalDebt++;
      }
    }
    return { dateKey, done, total: items.length, complete: done === items.length };
  });
  return { totalDebt, perItemDebt, days };
}

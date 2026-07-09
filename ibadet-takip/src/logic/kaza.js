// Geçmiş namaz (kaza) takibi: yalnızca farz ve vacip namazlar için, geçmiş
// günlerin kılınıp kılınmadığını izler. Sünnetler kaza kapsamında değildir.
// Cuma günleri öğle namazının yerine Cuma namazı geçtiği için o slot günün
// haftanın gününe göre değişir.

import { getById } from '../data/ibadetler';
import { todayKey, weekday } from './date';

const SLOT_ITEM_IDS = {
  sabah: 'namaz-sabah-farz',
  ikindi: 'namaz-ikindi-farz',
  aksam: 'namaz-aksam-farz',
  yatsi: 'namaz-yatsi-farz',
  vitir: 'namaz-vitir',
};
export const KAZA_SLOT_META = {
  sabah: { label: 'S', name: 'Sabah' },
  ogle_cuma: { label: 'Ö', name: 'Öğle/Cuma' },
  ikindi: { label: 'İ', name: 'İkindi' },
  aksam: { label: 'A', name: 'Akşam' },
  yatsi: { label: 'Y', name: 'Yatsı' },
  vitir: { label: 'V', name: 'Vitir' },
};
export const KAZA_SLOTS = Object.keys(KAZA_SLOT_META);

// Verilen güne ait kaza kayıtlarını sırayla döner. Cuma günleri "ogle_cuma"
// slotu Cuma Namazı'na, diğer günler Öğle Namazı Farzı'na karşılık gelir.
export function getKazaItemsForDate(dateKey) {
  const isFriday = weekday(new Date(dateKey)) === 5;
  return KAZA_SLOTS.map((slot) => {
    const id = slot === 'ogle_cuma' ? (isFriday ? 'namaz-cuma-farz' : 'namaz-ogle-farz') : SLOT_ITEM_IDS[slot];
    const item = getById(id);
    return { ...item, slot, shortLabel: KAZA_SLOT_META[slot].label };
  });
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

// Her gün için tamamlanma durumu + slot bazlı (Sabah/Öğle-Cuma/İkindi/Akşam/Yatsı/Vitir)
// borç özetini hesaplar. Öğle ve Cuma aynı "ogle_cuma" slotunda birleşir.
export function computeKazaSummary(byDate, dates) {
  const perSlotDebt = Object.fromEntries(KAZA_SLOTS.map((s) => [s, 0]));
  let totalDebt = 0;
  const days = dates.map((dateKey) => {
    const dayItems = getKazaItemsForDate(dateKey);
    const dayMap = byDate[dateKey] || {};
    let done = 0;
    for (const item of dayItems) {
      if (dayMap[item.id]) {
        done++;
      } else {
        perSlotDebt[item.slot]++;
        totalDebt++;
      }
    }
    return { dateKey, items: dayItems, done, total: dayItems.length, complete: done === dayItems.length };
  });
  return { totalDebt, perSlotDebt, days };
}

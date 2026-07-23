// Harcama raporu için saf toplama yardımcıları.
// Her harcamanın eq = { EUR, USD, TRY } karşılığı üzerinden, seçilen hedef para
// biriminde tutarlı toplamlar üretir. Karşılığı olmayan (çevrimdışı eklenmiş)
// kayıtlar `missing` olarak sayılır ama toplama katılmaz.
import { categoryLabel, categoryIcon } from '../data/expenseCategories';

export function sumIn(expenses, cur) {
  let total = 0;
  let converted = 0;
  let missing = 0;
  for (const e of expenses || []) {
    if (e && e.eq && typeof e.eq[cur] === 'number') {
      total += e.eq[cur];
      converted += 1;
    } else {
      missing += 1;
    }
  }
  return { total, converted, missing, count: (expenses || []).length };
}

// Ödeme şekli kırılımı: seçilen para biriminde nakit / kart / diğer toplamları.
export function paymentSplit(expenses, cur) {
  const out = { nakit: 0, kart: 0, other: 0 };
  for (const e of expenses || []) {
    if (!(e && e.eq && typeof e.eq[cur] === 'number')) continue;
    if (e.payment === 'nakit') out.nakit += e.eq[cur];
    else if (e.payment === 'kart') out.kart += e.eq[cur];
    else out.other += e.eq[cur];
  }
  return out;
}

// Tür (kategori) bazında kırılım: [{ value, label, icon, total, count }] tutara göre azalan.
export function categoryBreakdown(expenses, cur) {
  const map = new Map();
  for (const e of expenses || []) {
    const key = (e && e.kind) || 'diger';
    const row = map.get(key) || { value: key, total: 0, count: 0 };
    row.count += 1;
    if (e && e.eq && typeof e.eq[cur] === 'number') row.total += e.eq[cur];
    map.set(key, row);
  }
  const rows = [...map.values()].map((r) => ({ ...r, label: categoryLabel(r.value), icon: categoryIcon(r.value) }));
  rows.sort((a, b) => b.total - a.total || b.count - a.count);
  return rows;
}

// Seyahatler arası karşılaştırma: her seyahat için seçilen para biriminde toplam.
// `category` verilirse yalnızca o tür (kategori); `payment` verilirse yalnızca o
// ödeme şekli (nakit/kart) süzülür. İkisi de boşsa tüm harcamalar toplanır.
export function tripComparison(trips, cur, category, payment) {
  return (trips || [])
    .map((t) => {
      let list = t.expenses || [];
      if (category) list = list.filter((e) => ((e && e.kind) || 'diger') === category);
      if (payment) list = list.filter((e) => e && e.payment === payment);
      const s = sumIn(list, cur);
      return {
        id: t.id,
        title: t.title || 'Seyahat',
        startDate: t.startDate || '',
        finished: !!t.finished,
        total: s.total,
        count: s.count,
        missing: s.missing,
      };
    })
    .sort((a, b) => b.total - a.total);
}

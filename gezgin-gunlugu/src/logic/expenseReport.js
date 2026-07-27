// Harcama raporu için saf toplama yardımcıları.
// Her harcamanın eq = { EUR, USD, TRY } karşılığı üzerinden, seçilen hedef para
// biriminde tutarlı toplamlar üretir. Karşılığı olmayan (çevrimdışı eklenmiş)
// kayıtlar `missing` olarak sayılır ama toplama katılmaz.
import { BUILTIN_EXPENSE_CATEGORIES, catLabel, catIcon } from '../data/expenseCategories';
import { paymentLabel, paymentIcon } from '../data/paymentMethods';

// Katalog verilmezse yerleşik türlere düşer (etiket/sıra için).
function catalogOf(catalog) {
  return catalog && catalog.length ? catalog : BUILTIN_EXPENSE_CATEGORIES;
}

// Tür başına harcama sayısı (tüm seyahatlerde): { [kind]: adet }.
// Ayarlar'da bir türün silinebilir mi (hiç kullanılmamış) olduğunu belirlemek için.
export function categoryUsage(trips) {
  const out = {};
  for (const t of trips || []) {
    for (const e of t.expenses || []) {
      const key = (e && e.kind) || 'diger';
      out[key] = (out[key] || 0) + 1;
    }
  }
  return out;
}

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
// `catalog` verilirse etiket/ikon oradan (kullanıcı türleri dahil) okunur.
export function categoryBreakdown(expenses, cur, catalog) {
  const cat = catalogOf(catalog);
  const map = new Map();
  for (const e of expenses || []) {
    const key = (e && e.kind) || 'diger';
    const row = map.get(key) || { value: key, total: 0, count: 0 };
    row.count += 1;
    if (e && e.eq && typeof e.eq[cur] === 'number') row.total += e.eq[cur];
    map.set(key, row);
  }
  const rows = [...map.values()].map((r) => ({ ...r, label: catLabel(cat, r.value), icon: catIcon(cat, r.value) }));
  rows.sort((a, b) => b.total - a.total || b.count - a.count);
  return rows;
}

// Tür × Seyahat çapraz tablosu (pivot): satır = tür, kolon = seyahat,
// hücre = seçilen para biriminde harcama. Yalnızca harcaması olan seyahatler
// (kolon) ve kullanılmış türler (satır) yer alır. Satır/kolon toplamları ve
// genel toplam da döner.
export function categoryTripMatrix(trips, cur, catalog) {
  const cat = catalogOf(catalog);
  const cols = (trips || [])
    .filter((t) => (t.expenses || []).length)
    .map((t) => ({ id: t.id, title: t.title || 'Seyahat', startDate: t.startDate || '', total: 0 }));

  const used = new Set();
  const data = {}; // data[catValue][tripId] = toplam
  for (const t of trips || []) {
    if (!(t.expenses || []).length) continue;
    for (const e of t.expenses || []) {
      const key = (e && e.kind) || 'diger';
      used.add(key);
      if (!(e && e.eq && typeof e.eq[cur] === 'number')) continue;
      data[key] = data[key] || {};
      data[key][t.id] = (data[key][t.id] || 0) + e.eq[cur];
    }
  }

  const rowOf = (value) => {
    const row = data[value] || {};
    const total = Object.values(row).reduce((a, b) => a + b, 0);
    return { value, label: catLabel(cat, value), icon: catIcon(cat, value), total };
  };
  // Katalog sırasında kullanılmış türler + katalogda olmayan (ör. sonradan
  // kaldırılmış) türler sonda → hiçbir harcama tablodan düşmez.
  const known = new Set(cat.map((c) => c.value));
  const cats = [
    ...cat.filter((c) => used.has(c.value)).map((c) => rowOf(c.value)),
    ...[...used].filter((v) => !known.has(v)).map(rowOf),
  ];

  let grand = 0;
  for (const col of cols) {
    let s = 0;
    for (const c of cats) s += (data[c.value] && data[c.value][col.id]) || 0;
    col.total = s;
    grand += s;
  }

  return { cats, cols, data, grand };
}

// Ödeme şekli × Seyahat çapraz tablosu (pivot): satır = ödeme şekli
// (nakit / kart / belirsiz), kolon = seyahat, hücre = seçilen para biriminde
// harcama. Kullanılmayan satırlar gizlenir.
export function paymentTripMatrix(trips, cur) {
  const cols = (trips || [])
    .filter((t) => (t.expenses || []).length)
    .map((t) => ({ id: t.id, title: t.title || 'Seyahat', startDate: t.startDate || '', total: 0 }));

  const used = new Set();
  const data = {};
  for (const t of trips || []) {
    if (!(t.expenses || []).length) continue;
    for (const e of t.expenses || []) {
      const key = e && (e.payment === 'nakit' || e.payment === 'kart') ? e.payment : 'other';
      used.add(key);
      if (!(e && e.eq && typeof e.eq[cur] === 'number')) continue;
      data[key] = data[key] || {};
      data[key][t.id] = (data[key][t.id] || 0) + e.eq[cur];
    }
  }

  const defs = [
    { value: 'nakit', label: paymentLabel('nakit'), icon: paymentIcon('nakit') },
    { value: 'kart', label: paymentLabel('kart'), icon: paymentIcon('kart') },
    { value: 'other', label: 'Belirsiz', icon: '💰' },
  ];
  const rows = defs
    .filter((d) => used.has(d.value))
    .map((d) => {
      const row = data[d.value] || {};
      const total = Object.values(row).reduce((a, b) => a + b, 0);
      return { ...d, total };
    });

  let grand = 0;
  for (const col of cols) {
    let s = 0;
    for (const r of rows) s += (data[r.value] && data[r.value][col.id]) || 0;
    col.total = s;
    grand += s;
  }

  return { rows, cols, data, grand };
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

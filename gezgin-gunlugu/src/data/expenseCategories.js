// Harcama türleri (kategoriler).
//
// İki kaynak birleşir:
//   1) Buradaki yerleşik (builtin) liste — sıralama korunur.
//   2) Kullanıcının Ayarlar'dan eklediği türler (settings.expenseCatsCustom).
//
// Pasif türler (settings.expenseCatsInactive) seyahatlerde SEÇİLEMEZ; ancak
// daha önce girilmiş harcamaların türü olarak okunmaya devam eder (raporlarda
// ve listede etiketi görünür). Böylece geçmiş veri bozulmaz.
export const BUILTIN_EXPENSE_CATEGORIES = [
  { value: 'yemek', label: 'Yemek', icon: '🍽️' },
  { value: 'yiyecek_icecek', label: 'Yiyecek/İçecek', icon: '🥤' },
  { value: 'hediye', label: 'Hediye', icon: '🎁' },
  { value: 'giyim', label: 'Giyim', icon: '👕' },
  { value: 'akaryakit', label: 'Akaryakıt', icon: '⛽' },
  { value: 'konaklama', label: 'Konaklama', icon: '🏨' },
  { value: 'vergi_harc', label: 'Vergi ve Harç', icon: '🧾' },
  { value: 'ulasim', label: 'Diğer Ulaşım', icon: '🚌' },
  { value: 'demirbas', label: 'Demirbaş', icon: '📦' },
  { value: 'iletisim', label: 'İletişim', icon: '📱' },
  { value: 'tamir_bakim', label: 'Tamir Bakım', icon: '🔧' },
  { value: 'sigorta', label: 'Sigorta', icon: '🛡️' },
  { value: 'bilet', label: 'Bilet', icon: '🎫' },
  { value: 'diger', label: 'Diğer', icon: '🔖' },
];

// Geriye uyumluluk: eskiden tek sabit liste ihraç ediliyordu.
export const EXPENSE_CATEGORIES = BUILTIN_EXPENSE_CATEGORIES;

export const DEFAULT_EXPENSE_CATEGORY = 'yemek';
// "Diğer" her zaman durur: fiş okuma ve bilinmeyen türler buraya düşer.
export const FALLBACK_EXPENSE_CATEGORY = 'diger';

const BUILTIN_BY_VALUE = BUILTIN_EXPENSE_CATEGORIES.reduce((m, c) => ((m[c.value] = c), m), {});
export const EXPENSE_CATEGORY_VALUES = BUILTIN_EXPENSE_CATEGORIES.map((c) => c.value);

// Ayarlardaki kullanıcı türlerini güvenle okur.
function customOf(settings) {
  const arr = settings && Array.isArray(settings.expenseCatsCustom) ? settings.expenseCatsCustom : [];
  return arr.filter((c) => c && typeof c.value === 'string' && c.value);
}

function inactiveOf(settings) {
  const arr = settings && Array.isArray(settings.expenseCatsInactive) ? settings.expenseCatsInactive : [];
  return arr.filter((v) => typeof v === 'string' && v);
}

// Yeniden adlandırmalar: { [value]: { label, icon } }.
// Ad/ikon değişse de ANAHTAR (value) sabit kalır; böylece o türdeki mevcut
// harcamalar kategorisini kaybetmez. Yerleşik türler de bu yolla adlandırılır.
function overridesOf(settings) {
  const o = settings && settings.expenseCatsOverrides;
  return o && typeof o === 'object' ? o : {};
}

// Bir türün yerleşik (özgün) adı — yeniden adlandırma sonrası geri dönmek için.
export function builtinDefaultOf(value) {
  return BUILTIN_BY_VALUE[value] || null;
}

// Yerleşik + kullanıcı türlerinin tamamı (pasifler de dahil), `active` bayrağıyla.
// [{ value, label, icon, builtin, active }]
export function resolveCategories(settings) {
  const inactive = new Set(inactiveOf(settings));
  const ov = overridesOf(settings);
  const seen = new Set();
  const out = [];
  const apply = (c, builtin) => {
    const o = ov[c.value] || {};
    return {
      value: c.value,
      label: (o.label || c.label || c.value).trim() || c.value,
      icon: o.icon || c.icon || '🔖',
      builtin,
      active: !inactive.has(c.value),
      renamed: !!(o.label || o.icon),
    };
  };
  for (const c of BUILTIN_EXPENSE_CATEGORIES) {
    seen.add(c.value);
    out.push(apply(c, true));
  }
  for (const c of customOf(settings)) {
    if (seen.has(c.value)) continue; // yerleşikle çakışmayı yoksay
    seen.add(c.value);
    out.push(apply(c, false));
  }
  return out;
}

// Yalnızca seyahatlerde seçilebilen (aktif) türler.
export function activeCategories(settings) {
  return resolveCategories(settings).filter((c) => c.active);
}

// Çözümlenmiş katalogdan etiket/ikon okur; katalog verilmezse yerleşiğe düşer.
export function catLabel(catalog, value) {
  const hit = (catalog || []).find((c) => c.value === value);
  if (hit) return hit.label;
  return (BUILTIN_BY_VALUE[value] && BUILTIN_BY_VALUE[value].label) || 'Diğer';
}

export function catIcon(catalog, value) {
  const hit = (catalog || []).find((c) => c.value === value);
  if (hit) return hit.icon;
  return (BUILTIN_BY_VALUE[value] && BUILTIN_BY_VALUE[value].icon) || '🔖';
}

// Yerleşik liste üzerinden etiket/ikon (katalog elde yokken kullanılır).
export function categoryLabel(value) {
  return (BUILTIN_BY_VALUE[value] && BUILTIN_BY_VALUE[value].label) || 'Diğer';
}

export function categoryIcon(value) {
  return (BUILTIN_BY_VALUE[value] && BUILTIN_BY_VALUE[value].icon) || '🔖';
}

// Kullanıcının yazdığı addan kalıcı bir anahtar üretir ("Otopark Ücreti" → "u_otopark_ucreti").
export function slugifyCategory(label) {
  const base = String(label || '')
    .toLocaleLowerCase('tr')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 32);
  return `u_${base || 'tur'}`;
}

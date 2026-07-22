// Harcama türleri (kategoriler). Kullanıcı tanımlı sabit liste; sıralama korunur.
// `value` kalıcı anahtar (kayıtta saklanır), `label` ekranda görünen ad.
export const EXPENSE_CATEGORIES = [
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

export const DEFAULT_EXPENSE_CATEGORY = 'yemek';

const BY_VALUE = EXPENSE_CATEGORIES.reduce((m, c) => ((m[c.value] = c), m), {});
export const EXPENSE_CATEGORY_VALUES = EXPENSE_CATEGORIES.map((c) => c.value);

export function categoryLabel(value) {
  return (BY_VALUE[value] && BY_VALUE[value].label) || 'Diğer';
}

export function categoryIcon(value) {
  return (BY_VALUE[value] && BY_VALUE[value].icon) || '🔖';
}

// Ödeme şekli: harcamanın nakit mi yoksa kredi kartıyla mı yapıldığı.
export const PAYMENT_METHODS = [
  { value: 'nakit', label: 'Nakit', icon: '💵' },
  { value: 'kart', label: 'Kredi Kartı', icon: '💳' },
];

export const DEFAULT_PAYMENT = 'kart';

const BY_VALUE = PAYMENT_METHODS.reduce((m, p) => ((m[p.value] = p), m), {});
export const PAYMENT_VALUES = PAYMENT_METHODS.map((p) => p.value);

export function paymentLabel(value) {
  return (BY_VALUE[value] && BY_VALUE[value].label) || '—';
}

export function paymentIcon(value) {
  return (BY_VALUE[value] && BY_VALUE[value].icon) || '💰';
}

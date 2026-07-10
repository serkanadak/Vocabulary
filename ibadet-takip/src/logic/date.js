// Yerel tarih yardımcıları (saat dilimi kaymasını önlemek için Date.toISOString yerine elle biçimlendirme).

export function todayKey(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function yearKey(d = new Date()) {
  return String(d.getFullYear());
}

export function weekday(d = new Date()) {
  return d.getDay(); // 0=Pazar ... 5=Cuma, 6=Cumartesi
}

// dateStr: 'YYYY-MM-DD', inclusive aralık kontrolü.
export function isWithinRange(dateStr, startStr, endStr) {
  if (!startStr || !endStr) return false;
  return dateStr >= startStr && dateStr <= endStr;
}

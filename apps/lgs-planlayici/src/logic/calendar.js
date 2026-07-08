// Haftalık/aylık takvim görünümleri için tarih yardımcıları.

const MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];
const WEEKDAY_SHORT = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function toDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`);
}

function fmt(date) {
  return date.toISOString().slice(0, 10);
}

export function addDays(dateStr, n) {
  const d = toDate(dateStr);
  d.setDate(d.getDate() + n);
  return fmt(d);
}

// Verilen tarihin (Pazartesi başlangıçlı) haftasının ilk günü.
export function mondayOf(dateStr) {
  const d = toDate(dateStr);
  const day = d.getDay(); // 0=Paz..6=Cmt
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return fmt(d);
}

export function weekDates(startDate) {
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
}

export function formatDayLabel(dateStr) {
  const d = toDate(dateStr);
  return `${WEEKDAY_SHORT[d.getDay()]} ${d.getDate()}`;
}

export function formatMonthLabel(year, month) {
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

export function nextMonths(count, fromDate = new Date()) {
  const options = [];
  let y = fromDate.getFullYear();
  let m = fromDate.getMonth() + 1;
  for (let i = 0; i < count; i += 1) {
    options.push({ year: y, month: m });
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return options;
}

// Ayın takvim ızgarası: her biri 7 günlük satırlar (Pzt başlangıçlı),
// ay dışına taşan hücreler null.
export function buildMonthGrid(year, month) {
  const firstOfMonth = `${year}-${String(month).padStart(2, '0')}-01`;
  const firstWeekStart = mondayOf(firstOfMonth);
  const daysInMonth = new Date(year, month, 0).getDate();
  const lastOfMonth = `${year}-${String(month).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

  const weeks = [];
  let cursor = firstWeekStart;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const week = weekDates(cursor);
    weeks.push(week.map((d) => (d >= firstOfMonth && d <= lastOfMonth ? d : null)));
    cursor = addDays(cursor, 7);
    if (cursor > lastOfMonth) break;
  }
  return weeks;
}

export function isSameMonth(dateStr, year, month) {
  return dateStr.slice(0, 7) === `${year}-${String(month).padStart(2, '0')}`;
}

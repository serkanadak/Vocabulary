// Haftalık/aylık takvim görünümleri için tarih yardımcıları.
//
// Tüm tarih aritmetiği UTC üzerinden yapılır (Date.UTC + getUTC*), yerel
// saat dilimiyle hiç etkileşmez. Böylece "YYYY-MM-DD" dizgesi bir kez yerel
// saatle (local parse) bir kez UTC ile (toISOString) okunup saat dilimi
// pozitif olan yerlerde (ör. UTC+3) günün bir gün geriye kaymasının önüne
// geçilir. Yalnızca todayStr() kullanıcının o anki yerel takvim gününü verir.

const MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];
const WEEKDAY_SHORT = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

export function todayStr() {
  const d = new Date();
  return ymd(d.getFullYear(), d.getMonth() + 1, d.getDate());
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function ymd(y, m, d) {
  return `${y}-${pad2(m)}-${pad2(d)}`;
}

function parseYMD(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return { y, m, d };
}

function toUTCTime(dateStr) {
  const { y, m, d } = parseYMD(dateStr);
  return Date.UTC(y, m - 1, d);
}

function fromUTCTime(t) {
  const d = new Date(t);
  return ymd(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

export function addDays(dateStr, n) {
  return fromUTCTime(toUTCTime(dateStr) + n * 86400000);
}

// 0=Pazar .. 6=Cumartesi — Date.getDay() ile aynı sırada, saat dilimi bağımsız.
function weekdayOf(dateStr) {
  return new Date(toUTCTime(dateStr)).getUTCDay();
}

// Verilen tarihin (Pazartesi başlangıçlı) haftasının ilk günü.
export function mondayOf(dateStr) {
  const day = weekdayOf(dateStr);
  const diff = day === 0 ? -6 : 1 - day;
  return addDays(dateStr, diff);
}

export function weekDates(startDate) {
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
}

export function formatDayLabel(dateStr) {
  const { d } = parseYMD(dateStr);
  return `${WEEKDAY_SHORT[weekdayOf(dateStr)]} ${d}`;
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
  const firstOfMonth = ymd(year, month, 1);
  const firstWeekStart = mondayOf(firstOfMonth);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lastOfMonth = ymd(year, month, daysInMonth);

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
  return dateStr.slice(0, 7) === `${year}-${pad2(month)}`;
}

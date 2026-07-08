// Görevleri gün/hafta/ay periyotlarına göre gruplayıp tamamlanan/eksik kalan
// dökümünü çıkaran yardımcılar. Veli özeti ekranında kullanılır.

import { addDays, mondayOf, weekDates, todayStr, formatDayLabel, formatMonthLabel } from './calendar';

function groupTasksByDueDate(tasks) {
  const map = {};
  tasks.forEach((t) => {
    if (!t.dueDate) return;
    if (!map[t.dueDate]) map[t.dueDate] = [];
    map[t.dueDate].push(t);
  });
  return map;
}

function splitDoneMissing(tasks) {
  return { completed: tasks.filter((t) => t.done), missing: tasks.filter((t) => !t.done) };
}

export function buildDailyBreakdown(tasks, count = 14) {
  const byDate = groupTasksByDueDate(tasks);
  const today = todayStr();
  const rows = [];
  for (let i = 0; i < count; i += 1) {
    const date = addDays(today, -i);
    const dayTasks = byDate[date] || [];
    if (dayTasks.length === 0 && date !== today) continue;
    rows.push({ key: date, label: formatDayLabel(date), ...splitDoneMissing(dayTasks) });
  }
  return rows;
}

export function buildWeeklyBreakdown(tasks, count = 8) {
  const byDate = groupTasksByDueDate(tasks);
  const thisWeekStart = mondayOf(todayStr());
  const rows = [];
  for (let i = 0; i < count; i += 1) {
    const start = addDays(thisWeekStart, -7 * i);
    const dates = weekDates(start);
    const weekTasks = dates.flatMap((d) => byDate[d] || []);
    if (weekTasks.length === 0 && i !== 0) continue;
    const end = addDays(start, 6);
    rows.push({
      key: start,
      label: `${formatDayLabel(start)} — ${formatDayLabel(end)}`,
      ...splitDoneMissing(weekTasks),
    });
  }
  return rows;
}

export function buildMonthlyBreakdown(tasks, count = 6) {
  const byDate = groupTasksByDueDate(tasks);
  const [y0, m0] = todayStr().split('-').map(Number);
  const rows = [];
  let y = y0;
  let m = m0;
  for (let i = 0; i < count; i += 1) {
    const prefix = `${y}-${String(m).padStart(2, '0')}`;
    const monthTasks = Object.keys(byDate)
      .filter((date) => date.startsWith(prefix))
      .flatMap((date) => byDate[date]);
    if (monthTasks.length === 0 && i !== 0) {
      m -= 1;
      if (m < 1) {
        m = 12;
        y -= 1;
      }
      continue;
    }
    rows.push({ key: prefix, label: formatMonthLabel(y, m), ...splitDoneMissing(monthTasks) });
    m -= 1;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
  }
  return rows;
}

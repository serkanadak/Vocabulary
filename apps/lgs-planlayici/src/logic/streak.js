// Tamamlanan görev tarihlerinden (YYYY-MM-DD) güncel ve en uzun seriyi hesaplar.
import { todayStr as today, addDays } from './calendar';

function toDayMs(dateStr) {
  return new Date(`${dateStr}T00:00:00Z`).getTime();
}

export function computeStreaks(dateStrings) {
  const uniqueDays = Array.from(new Set(dateStrings)).sort();
  if (uniqueDays.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < uniqueDays.length; i += 1) {
    const diffDays = Math.round((toDayMs(uniqueDays[i]) - toDayMs(uniqueDays[i - 1])) / 86400000);
    run = diffDays === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }

  const todayStr = today();
  const yesterdayStr = addDays(todayStr, -1);
  const last = uniqueDays[uniqueDays.length - 1];

  let current = 0;
  if (last === todayStr || last === yesterdayStr) {
    current = 1;
    for (let i = uniqueDays.length - 1; i > 0; i -= 1) {
      const diffDays = Math.round((toDayMs(uniqueDays[i]) - toDayMs(uniqueDays[i - 1])) / 86400000);
      if (diffDays === 1) current += 1;
      else break;
    }
  }

  return { current, longest };
}

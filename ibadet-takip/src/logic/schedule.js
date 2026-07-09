import { IBADETLER, FREQUENCY } from '../data/ibadetler';
import { weekday, isWithinRange } from './date';

// Bugün için gösterilecek ibadetleri, "zorunlu" (farz/vacip/sünnet-i müekkede,
// bugüne bağlı) ve "opsiyonel" (nafile, kullanıcı ayarından açılan) olarak ayırır.
export function getTodaySchedule({ dateKey, settings }) {
  const wd = weekday(new Date(dateKey));
  const required = [];
  const optional = [];
  const yearlyReminders = [];

  for (const item of IBADETLER) {
    switch (item.frequency) {
      case FREQUENCY.DAILY:
        required.push(item);
        break;
      case FREQUENCY.OPTIONAL_DAILY:
        if (item.group) {
          // İlgili vaktin sünnetiyle aynı satırda gösterilecek nafile (ör. ikindi/yatsı ilk sünneti).
          if (settings.showNafile) required.push(item);
        } else if (settings.showNafile) {
          optional.push(item);
        }
        break;
      case FREQUENCY.WEEKLY_FRIDAY:
        if (wd === 5) required.push(item);
        break;
      case FREQUENCY.OPTIONAL_WEEKLY_MON_THU:
        if (settings.showNafile && (wd === 1 || wd === 4)) optional.push(item);
        break;
      case FREQUENCY.OPTIONAL_MONTHLY:
        if (settings.showNafile) optional.push(item);
        break;
      case FREQUENCY.YEARLY_RAMADAN:
        if (isWithinRange(dateKey, settings.ramadanStart, settings.ramadanEnd)) required.push(item);
        break;
      case FREQUENCY.YEARLY_EID_RAMADAN:
        if (isWithinRange(dateKey, settings.eidRamadanStart, settings.eidRamadanEnd)) required.push(item);
        break;
      case FREQUENCY.YEARLY_EID_KURBAN:
        if (isWithinRange(dateKey, settings.eidKurbanStart, settings.eidKurbanEnd)) {
          if (item.id === 'kurban-bayram' && !settings.kurbanEligible) break;
          required.push(item);
        }
        break;
      case FREQUENCY.YEARLY_ONCE:
        yearlyReminders.push(item);
        break;
      default:
        break; // LIFETIME, OCCASIONAL: Bugün listesinde gösterilmez.
    }
  }

  return { required: groupForDisplay(required), optional, yearlyReminders };
}

// Aynı vakte ait (aynı `group` alanına sahip) birden fazla kayıt varsa
// (ör. sünnet + farz), bunları "Bugün" listesinde tek satırlık bir grup
// nesnesine indirger. Yalnızca bir kayıt varsa (ör. nafile kapalıyken tek
// başına ikindi farzı) olduğu gibi bırakılır.
export function groupForDisplay(items) {
  const result = [];
  const groupIndex = new Map();
  for (const item of items) {
    if (!item.group) {
      result.push(item);
      continue;
    }
    if (groupIndex.has(item.group)) {
      const idx = groupIndex.get(item.group);
      const existing = result[idx];
      if (existing.isGroup) {
        existing.items.push(item);
      } else {
        result[idx] = { isGroup: true, groupKey: item.group, items: [existing, item] };
      }
    } else {
      groupIndex.set(item.group, result.length);
      result.push(item);
    }
  }
  return result;
}

export function getLifetimeItems() {
  return IBADETLER.filter((i) => i.frequency === FREQUENCY.LIFETIME);
}

export function getYearlyOnceItems() {
  return IBADETLER.filter((i) => i.frequency === FREQUENCY.YEARLY_ONCE);
}

export function getOccasionalItems() {
  return IBADETLER.filter((i) => i.frequency === FREQUENCY.OCCASIONAL);
}

import { todayKey, yearKey, weekday, isWithinRange } from '../date';

describe('todayKey', () => {
  test('YYYY-AA-GG olarak, sıfır dolgulu biçimlendirir', () => {
    expect(todayKey(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(todayKey(new Date(2026, 11, 31))).toBe('2026-12-31');
  });
});

describe('yearKey', () => {
  test('yılı metin olarak döner', () => {
    expect(yearKey(new Date(2026, 5, 1))).toBe('2026');
  });
});

describe('weekday', () => {
  test('Cuma için 5 döner', () => {
    // 2026-07-10 bir Cuma.
    expect(weekday(new Date(2026, 6, 10))).toBe(5);
  });
  test('Pazar için 0 döner', () => {
    expect(weekday(new Date(2026, 6, 12))).toBe(0);
  });
});

describe('isWithinRange', () => {
  test('aralık içindeyse true döner (uçlar dahil)', () => {
    expect(isWithinRange('2026-03-15', '2026-03-10', '2026-03-20')).toBe(true);
    expect(isWithinRange('2026-03-10', '2026-03-10', '2026-03-20')).toBe(true);
    expect(isWithinRange('2026-03-20', '2026-03-10', '2026-03-20')).toBe(true);
  });
  test('aralık dışındaysa false döner', () => {
    expect(isWithinRange('2026-03-09', '2026-03-10', '2026-03-20')).toBe(false);
    expect(isWithinRange('2026-03-21', '2026-03-10', '2026-03-20')).toBe(false);
  });
  test('başlangıç veya bitiş boşsa false döner', () => {
    expect(isWithinRange('2026-03-15', '', '2026-03-20')).toBe(false);
    expect(isWithinRange('2026-03-15', '2026-03-10', '')).toBe(false);
  });
});

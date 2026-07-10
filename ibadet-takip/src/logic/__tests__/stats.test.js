import { getDailyRequiredIds, currentStreak, averageCompletion, dailyHistory, itemCountInLastDays } from '../stats';
import { todayKey } from '../date';

function keyFor(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return todayKey(d);
}

describe('getDailyRequiredIds', () => {
  test('en az 5 vakit farz + vitir içerir', () => {
    const ids = getDailyRequiredIds();
    expect(ids).toContain('namaz-sabah-farz');
    expect(ids).toContain('namaz-vitir');
    expect(ids.length).toBeGreaterThanOrEqual(11); // sünnet-i müekkedeler dahil
  });
});

describe('currentStreak', () => {
  const ids = ['a', 'b'];

  test('hiç işaretleme yoksa seri 0 olur', () => {
    expect(currentStreak({}, ids)).toBe(0);
  });

  test('bugün ve dün tam, önceki gün eksikse seri 2 olur', () => {
    const byDate = {
      [keyFor(0)]: { a: true, b: true },
      [keyFor(1)]: { a: true, b: true },
      [keyFor(2)]: { a: true, b: false },
    };
    expect(currentStreak(byDate, ids)).toBe(2);
  });

  test('bugün eksikse seri 0 olur (dün tam olsa bile)', () => {
    const byDate = {
      [keyFor(0)]: { a: true, b: false },
      [keyFor(1)]: { a: true, b: true },
    };
    expect(currentStreak(byDate, ids)).toBe(0);
  });

  test('itemIds bir fonksiyon olduğunda güne özgü gerekli id listesini kullanır', () => {
    // dün 'a' gerekiyordu ve işaretlenmedi, ama bugünün listesinde 'a' yok — seri kırılmamalı.
    const getIdsForDate = (dateKey) => (dateKey === keyFor(1) ? ['b'] : ['a', 'b']);
    const byDate = {
      [keyFor(0)]: { a: true, b: true },
      [keyFor(1)]: { b: true },
    };
    expect(currentStreak(byDate, getIdsForDate)).toBe(2);
  });
});

describe('averageCompletion', () => {
  test('son N günün ortalama yüzdesini hesaplar', () => {
    const ids = ['a', 'b'];
    const byDate = {
      [keyFor(0)]: { a: true, b: true }, // %100
      [keyFor(1)]: { a: true, b: false }, // %50
    };
    expect(averageCompletion(byDate, ids, 2)).toBe(75);
  });

  test('boş veriyle 0 döner', () => {
    expect(averageCompletion({}, ['a', 'b'], 3)).toBe(0);
  });
});

describe('dailyHistory', () => {
  test('eskiden yeniye sıralı, istenen uzunlukta dizi döner', () => {
    const history = dailyHistory({}, ['a'], 5);
    expect(history).toHaveLength(5);
    expect(history[4].dateKey).toBe(keyFor(0));
    expect(history[0].dateKey).toBe(keyFor(4));
  });
});

describe('itemCountInLastDays', () => {
  test('son N gün içinde işaretli olduğu gün sayısını döner', () => {
    const byDate = {
      [keyFor(0)]: { a: true },
      [keyFor(1)]: { a: false },
      [keyFor(2)]: { a: true },
    };
    expect(itemCountInLastDays(byDate, 'a', 3)).toBe(2);
  });
});

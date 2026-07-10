import { getKazaItemsForDate, enumerateDates, computeKazaSummary, KAZA_SLOTS } from '../kaza';

describe('getKazaItemsForDate', () => {
  test('hafta içi bir günde ogle_cuma slotu Öğle Namazı Farzı olur', () => {
    // 2026-07-08 Çarşamba.
    const items = getKazaItemsForDate('2026-07-08');
    const slot = items.find((i) => i.slot === 'ogle_cuma');
    expect(slot.id).toBe('namaz-ogle-farz');
  });

  test('Cuma günü ogle_cuma slotu Cuma Namazı olur', () => {
    // 2026-07-10 Cuma.
    const items = getKazaItemsForDate('2026-07-10');
    const slot = items.find((i) => i.slot === 'ogle_cuma');
    expect(slot.id).toBe('namaz-cuma-farz');
  });

  test('6 slot da sırayla döner: sabah, ogle_cuma, ikindi, aksam, yatsi, vitir', () => {
    const items = getKazaItemsForDate('2026-07-08');
    expect(items.map((i) => i.slot)).toEqual(KAZA_SLOTS);
    expect(items).toHaveLength(6);
  });
});

describe('enumerateDates', () => {
  test('start ve end dahil, en yeniden en eskiye sıralı döner', () => {
    const dates = enumerateDates('2026-07-01', '2026-07-03');
    expect(dates).toEqual(['2026-07-03', '2026-07-02', '2026-07-01']);
  });

  test('start > end ise boş dizi döner', () => {
    expect(enumerateDates('2026-07-05', '2026-07-01')).toEqual([]);
  });

  test('start veya end boşsa boş dizi döner', () => {
    expect(enumerateDates('', '2026-07-01')).toEqual([]);
    expect(enumerateDates('2026-07-01', '')).toEqual([]);
  });

  test('tek günlük aralıkta tek eleman döner', () => {
    expect(enumerateDates('2026-07-01', '2026-07-01')).toEqual(['2026-07-01']);
  });

  test('GG.AA.YYYY gibi geçersiz biçimli başlangıç tarihinde boş dizi döner (sessiz yanlış tarihe düşmez)', () => {
    // Bu biçim JS'in Date ayrıştırıcısı tarafından AA.GG.YYYY sanılıp
    // gelecekteki bir tarihe (10.07.2026 -> 7 Ekim 2026) çevrilebiliyordu;
    // bu da borcun sessizce 0 görünmesine yol açıyordu.
    expect(enumerateDates('10.07.2026', '2026-07-09')).toEqual([]);
  });
});

describe('computeKazaSummary', () => {
  test('hiç işaretleme yokken her gün için tam borç hesaplar', () => {
    const dates = enumerateDates('2026-07-08', '2026-07-08');
    const summary = computeKazaSummary({}, dates);
    expect(summary.totalDebt).toBe(6);
    expect(summary.days[0].complete).toBe(false);
    expect(summary.days[0].done).toBe(0);
  });

  test('bir günün tüm vakitleri işaretliyse o gün complete olur ve borca eklenmez', () => {
    const dates = enumerateDates('2026-07-08', '2026-07-08');
    const byDate = {
      '2026-07-08': {
        'namaz-sabah-farz': true,
        'namaz-ogle-farz': true,
        'namaz-ikindi-farz': true,
        'namaz-aksam-farz': true,
        'namaz-yatsi-farz': true,
        'namaz-vitir': true,
      },
    };
    const summary = computeKazaSummary(byDate, dates);
    expect(summary.totalDebt).toBe(0);
    expect(summary.days[0].complete).toBe(true);
  });

  test('Cuma günü sadece namaz-cuma-farz işaretlemesi o günün ogle_cuma borcunu kapatır', () => {
    const dates = enumerateDates('2026-07-10', '2026-07-10');
    const byDate = { '2026-07-10': { 'namaz-cuma-farz': true } };
    const summary = computeKazaSummary(byDate, dates);
    expect(summary.perSlotDebt.ogle_cuma).toBe(0);
    expect(summary.totalDebt).toBe(5); // diğer 5 vakit hâlâ borçlu
  });

  test('perSlotDebt tüm slotları kapsar', () => {
    const dates = enumerateDates('2026-07-08', '2026-07-08');
    const summary = computeKazaSummary({}, dates);
    expect(Object.keys(summary.perSlotDebt).sort()).toEqual([...KAZA_SLOTS].sort());
  });
});

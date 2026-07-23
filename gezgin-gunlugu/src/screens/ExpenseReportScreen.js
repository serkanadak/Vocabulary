import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { sumIn, categoryBreakdown, tripComparison } from '../logic/expenseReport';
import { formatMoney, currencySymbol, TARGETS } from '../logic/fx';
import { EXPENSE_CATEGORIES, categoryLabel, categoryIcon } from '../data/expenseCategories';
import { formatShortDate } from '../logic/date';
import { colors } from '../theme';
import { ChipPicker, EmptyState } from '../components/common';

function pct(part, whole) {
  if (!whole) return 0;
  return Math.max(0, Math.min(1, part / whole));
}

export default function ExpenseReportScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip, trips } = useJournal();
  const trip = getTrip(tripId);
  const [cur, setCur] = useState('EUR');
  const [compCat, setCompCat] = useState('all'); // karşılaştırma türü: 'all' | kategori değeri

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Harcama Raporu' });
  }, [navigation]);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="📊" title="Seyahat bulunamadı" />
      </SafeAreaView>
    );
  }

  const expenses = trip.expenses || [];
  const s = sumIn(expenses, cur);
  const cats = categoryBreakdown(expenses, cur).filter((c) => c.count > 0);
  const maxCat = cats.reduce((m, c) => Math.max(m, c.total), 0);

  // Karşılaştırma: seyahat bazında; istenirse tek bir tür (kategori) süzülür.
  const compCategory = compCat === 'all' ? null : compCat;
  const comp = tripComparison(trips || [], cur, compCategory).filter((t) => t.count > 0);
  const maxTrip = comp.reduce((m, t) => Math.max(m, t.total), 0);
  const grand = comp.reduce((a, t) => a + t.total, 0);
  const avg = comp.length ? grand / comp.length : 0;

  // Karşılaştırma süzgecinde yalnızca herhangi bir seyahatte kullanılmış türleri göster.
  const usedCats = new Set();
  for (const t of trips || []) for (const e of t.expenses || []) usedCats.add((e && e.kind) || 'diger');
  const compCatOptions = [
    { value: 'all' },
    ...EXPENSE_CATEGORIES.filter((c) => usedCats.has(c.value)).map((c) => ({ value: c.value })),
  ];

  if (!expenses.length) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          icon="📊"
          title="Rapor için harcama yok"
          subtitle="Bu seyahate harcama ekledikçe tür bazında özet ve diğer seyahatlerle karşılaştırma burada görünür."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Para birimi seçimi */}
        <Text style={styles.curLabel}>Rapor para birimi</Text>
        <View style={{ paddingHorizontal: 16 }}>
          <ChipPicker
            options={TARGETS.map((t) => ({ value: t }))}
            value={cur}
            onChange={setCur}
            renderLabel={(o) => `${currencySymbol(o.value)} ${o.value}`}
          />
        </View>

        {/* Bu seyahat toplamı */}
        <View style={styles.totalCard}>
          <Text style={styles.totalCaption}>{trip.title} · toplam</Text>
          <Text style={styles.totalBig}>{formatMoney(s.total, cur)}</Text>
          <Text style={styles.totalMeta}>
            {s.count} harcama{s.missing ? ` · ${s.missing} kaydın karşılığı yok (çevrimdışı)` : ''}
          </Text>
        </View>

        {/* Tür bazında özet */}
        <Text style={styles.sectionLabel}>TÜR BAZINDA ÖZET</Text>
        {cats.map((c) => {
          const share = s.total ? c.total / s.total : 0;
          return (
            <View key={c.value} style={styles.catRow}>
              <View style={styles.catHead}>
                <Text style={styles.catName}>
                  {c.icon} {c.label}
                </Text>
                <Text style={styles.catAmt}>{formatMoney(c.total, cur)}</Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${pct(c.total, maxCat) * 100}%` }]} />
              </View>
              <Text style={styles.catMeta}>
                %{Math.round(share * 100)} · {c.count} kayıt
              </Text>
            </View>
          );
        })}

        {/* Seyahat karşılaştırması */}
        <Text style={styles.sectionLabel}>SEYAHAT KARŞILAŞTIRMASI</Text>
        <Text style={styles.compSub}>Tür seç: seyahatleri toplamda ya da tek bir türde karşılaştır</Text>
        <View style={{ paddingHorizontal: 16, marginBottom: 10 }}>
          <ChipPicker
            options={compCatOptions}
            value={compCat}
            onChange={setCompCat}
            renderLabel={(o) => (o.value === 'all' ? '📊 Tümü' : `${categoryIcon(o.value)} ${categoryLabel(o.value)}`)}
          />
        </View>
        {comp.length ? (
          <Text style={styles.compHint}>
            {compCategory ? `${categoryIcon(compCategory)} ${categoryLabel(compCategory)} · ` : ''}
            {comp.length} seyahat · ortalama {formatMoney(avg, cur)} · toplam {formatMoney(grand, cur)}
          </Text>
        ) : (
          <Text style={styles.compHint}>
            {compCategory ? 'Bu türde harcaması olan seyahat yok.' : 'Karşılaştırmak için seyahatlere harcama ekle.'}
          </Text>
        )}
        {comp.map((t) => {
          const isCurrent = t.id === tripId;
          return (
            <View key={t.id} style={[styles.tripRow, isCurrent && styles.tripRowCurrent]}>
              <View style={styles.catHead}>
                <Text style={[styles.tripName, isCurrent && styles.tripNameCurrent]} numberOfLines={1}>
                  {isCurrent ? '➤ ' : ''}
                  {t.title}
                  {t.startDate ? `  ·  ${formatShortDate(t.startDate)}` : ''}
                </Text>
                <Text style={[styles.tripAmt, isCurrent && styles.tripNameCurrent]}>
                  {formatMoney(t.total, cur)}
                </Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    isCurrent && styles.barFillCurrent,
                    { width: `${pct(t.total, maxTrip) * 100}%` },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  curLabel: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginTop: 16, marginBottom: 8 },
  totalCard: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 18,
  },
  totalCaption: { color: colors.onPrimary, fontSize: 13, fontWeight: '700', opacity: 0.9 },
  totalBig: { color: colors.onPrimary, fontSize: 26, fontWeight: '800', marginTop: 6 },
  totalMeta: { color: colors.onPrimary, fontSize: 12, opacity: 0.85, marginTop: 8 },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 10,
  },
  catRow: { marginHorizontal: 16, marginBottom: 14 },
  catHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  catName: { color: colors.text, fontSize: 14, fontWeight: '700', flex: 1, marginRight: 10 },
  catAmt: { color: colors.text, fontSize: 14, fontWeight: '800' },
  barTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
    marginTop: 6,
  },
  barFill: { height: '100%', borderRadius: 999, backgroundColor: colors.accent },
  barFillCurrent: { backgroundColor: colors.primary },
  catMeta: { color: colors.textMuted, fontSize: 11, marginTop: 5 },
  compSub: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginBottom: 10 },
  compHint: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginBottom: 12 },
  tripRow: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  tripRowCurrent: { borderColor: colors.primary },
  tripName: { color: colors.text, fontSize: 13, fontWeight: '600', flex: 1, marginRight: 10 },
  tripNameCurrent: { color: colors.primary, fontWeight: '800' },
  tripAmt: { color: colors.text, fontSize: 13, fontWeight: '800' },
});

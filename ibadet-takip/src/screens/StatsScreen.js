import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTracker } from '../state/TrackerContext';
import { getDailyRequiredIds, currentStreak, averageCompletion, dailyHistory } from '../logic/stats';
import { getLifetimeItems, getYearlyOnceItems } from '../logic/schedule';
import { colors } from '../theme';
import { Card, SectionHeader } from '../components/common';

export default function StatsScreen({ navigation }) {
  const {
    byDate,
    isCheckedLifetime,
    isNotApplicableLifetime,
    isCheckedYearly,
    isNotApplicableYearly,
    yearKeyStr,
    customItems,
  } = useTracker();

  const dailyIds = useMemo(() => getDailyRequiredIds(), []);
  const streak = useMemo(() => currentStreak(byDate, dailyIds), [byDate, dailyIds]);
  const avg7 = useMemo(() => averageCompletion(byDate, dailyIds, 7), [byDate, dailyIds]);
  const avg30 = useMemo(() => averageCompletion(byDate, dailyIds, 30), [byDate, dailyIds]);
  const history = useMemo(() => dailyHistory(byDate, dailyIds, 14), [byDate, dailyIds]);

  const lifetimeItems = useMemo(() => getLifetimeItems(customItems), [customItems]);
  const yearlyItems = useMemo(() => getYearlyOnceItems(customItems), [customItems]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.title}>İstatistik</Text>

        <Card>
          <View style={styles.statsRow}>
            <Stat label="Seri" value={`${streak} gün`} />
            <Stat label="Son 7 gün" value={`%${avg7}`} />
            <Stat label="Son 30 gün" value={`%${avg30}`} />
          </View>
        </Card>

        <SectionHeader title="Son 14 Gün" subtitle="Günlük farz/vacip/sünnet-i müekkede tamamlanma oranı" />
        <Card>
          <View style={styles.barsRow}>
            {history.map((h) => (
              <View key={h.dateKey} style={styles.barWrap}>
                <View style={[styles.bar, { height: Math.max(4, h.ratio * 60) }]} />
              </View>
            ))}
          </View>
          <Text style={styles.barCaption}>eskiden bugüne →</Text>
        </Card>

        <SectionHeader title="Ömürde Bir" subtitle="Hac, umre gibi bir kez yapılan ibadetler" />
        {lifetimeItems.map((item) => (
          <Pressable key={item.id} style={styles.simpleRow} onPress={() => navigation.navigate('ItemDetail', { id: item.id })}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text
              style={[
                styles.status,
                isCheckedLifetime(item.id) && styles.statusDone,
                isNotApplicableLifetime(item.id) && styles.statusNA,
              ]}
            >
              {isCheckedLifetime(item.id) ? '✓ Yapıldı' : isNotApplicableLifetime(item.id) ? 'Uygulanmıyor' : 'Bekliyor'}
            </Text>
          </Pressable>
        ))}

        <SectionHeader title={`Bu Yıl (${yearKeyStr})`} subtitle="Takvime bağlı olmayan yıllık ibadetler" />
        {yearlyItems.map((item) => (
          <Pressable key={item.id} style={styles.simpleRow} onPress={() => navigation.navigate('ItemDetail', { id: item.id })}>
            <Text style={styles.rowTitle}>{item.title}</Text>
            <Text
              style={[
                styles.status,
                isCheckedYearly(item.id) && styles.statusDone,
                isNotApplicableYearly(item.id) && styles.statusNA,
              ]}
            >
              {isCheckedYearly(item.id) ? '✓ Yapıldı' : isNotApplicableYearly(item.id) ? 'Uygulanmıyor' : 'Bekliyor'}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { color: colors.text, fontSize: 26, fontWeight: '800', paddingHorizontal: 16, paddingTop: 8, marginBottom: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statBlock: { alignItems: 'center' },
  statValue: { color: colors.primary, fontSize: 20, fontWeight: '800' },
  statLabel: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', height: 64, justifyContent: 'space-between' },
  barWrap: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: 64 },
  bar: { width: 8, backgroundColor: colors.success, borderRadius: 4 },
  barCaption: { color: colors.textMuted, fontSize: 11, textAlign: 'right', marginTop: 6 },
  simpleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowTitle: { color: colors.text, fontSize: 14, fontWeight: '600', flex: 1 },
  status: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  statusDone: { color: colors.success },
  statusNA: { color: colors.textMuted, fontStyle: 'italic' },
});

import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTracker } from '../state/TrackerContext';
import { getKazaItems, enumerateDates, computeKazaSummary, yesterdayKey } from '../logic/kaza';
import { todayKey } from '../logic/date';
import { colors } from '../theme';
import { Card, DateField, PrimaryButton } from '../components/common';

function daysAgoKey(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return todayKey(d);
}

function DayRow({ dateKey, items, byDate, onToggle }) {
  const dayMap = byDate[dateKey] || {};
  const doneCount = items.filter((i) => dayMap[i.id]).length;
  const complete = doneCount === items.length;
  return (
    <View style={[styles.dayRow, complete && styles.dayRowComplete]}>
      <View style={styles.dayHeader}>
        <Text style={styles.dayDate}>{dateKey}</Text>
        <Text style={[styles.dayProgress, complete && styles.dayProgressComplete]}>
          {doneCount}/{items.length}
        </Text>
      </View>
      <View style={styles.chipRow}>
        {items.map((item) => {
          const checked = !!dayMap[item.id];
          return (
            <Pressable
              key={item.id}
              onPress={() => onToggle(dateKey, item.id)}
              style={[styles.chip, checked && styles.chipChecked]}
            >
              <Text style={[styles.chipText, checked && styles.chipTextChecked]}>{item.shortLabel}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function KazaScreen() {
  const { settings, updateSettings, byDate, toggleOnDate } = useTracker();
  const [onlyIncomplete, setOnlyIncomplete] = useState(true);
  const [editingStart, setEditingStart] = useState(false);
  const [draftStart, setDraftStart] = useState(settings.kazaStartDate);

  const items = useMemo(() => {
    const raw = getKazaItems();
    const labels = ['S', 'Ö', 'İ', 'A', 'Y', 'V'];
    return raw.map((item, idx) => ({ ...item, shortLabel: labels[idx] || item.title[0] }));
  }, []);

  const endKey = yesterdayKey();
  const dates = useMemo(
    () => enumerateDates(settings.kazaStartDate, endKey),
    [settings.kazaStartDate, endKey]
  );

  const summary = useMemo(() => computeKazaSummary(byDate, items, dates), [byDate, items, dates]);

  const visibleDays = onlyIncomplete ? summary.days.filter((d) => !d.complete) : summary.days;

  const applyPreset = (n) => {
    const start = daysAgoKey(n);
    updateSettings({ kazaStartDate: start });
    setDraftStart(start);
    setEditingStart(false);
  };

  const saveDraft = () => {
    if (draftStart) {
      updateSettings({ kazaStartDate: draftStart });
      setEditingStart(false);
    }
  };

  if (!settings.kazaStartDate || editingStart) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={{ paddingBottom: 32 }}>
          <Text style={styles.title}>Geçmiş Namazlar</Text>
          <Text style={styles.subtitle}>
            Kılınmamış farz ve vacip namazları (kaza borcunu) gün gün takip etmek için hangi tarihten itibaren
            başlayacağını belirt.
          </Text>
          <Card>
            <View style={styles.presetRow}>
              {[7, 30, 90, 365].map((n) => (
                <Pressable key={n} style={styles.presetBtn} onPress={() => applyPreset(n)}>
                  <Text style={styles.presetText}>{n < 365 ? `Son ${n} gün` : 'Son 1 yıl'}</Text>
                </Pressable>
              ))}
            </View>
            <DateField label="Başlangıç tarihi (elle gir)" value={draftStart} onChange={setDraftStart} />
            <PrimaryButton title="Kaydet" onPress={saveDraft} disabled={!draftStart} />
            {settings.kazaStartDate ? (
              <Pressable style={{ marginTop: 10 }} onPress={() => setEditingStart(false)}>
                <Text style={styles.cancelText}>Vazgeç</Text>
              </Pressable>
            ) : null}
          </Card>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={visibleDays}
        keyExtractor={(d) => d.dateKey}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Geçmiş Namazlar</Text>
            <Text style={styles.subtitle}>
              {settings.kazaStartDate} → {endKey} arası, farz ve vacip namazlar (S: Sabah, Ö: Öğle, İ: İkindi, A:
              Akşam, Y: Yatsı, V: Vitir)
            </Text>

            <Card>
              <Text style={styles.debtNumber}>{summary.totalDebt} vakit kaza borcu</Text>
              <View style={styles.perItemRow}>
                {items.map((item) => (
                  <Text key={item.id} style={styles.perItemText}>
                    {item.shortLabel}: {summary.perItemDebt[item.id]}
                  </Text>
                ))}
              </View>
              <View style={styles.toolRow}>
                <Pressable
                  style={[styles.filterBtn, onlyIncomplete && styles.filterBtnActive]}
                  onPress={() => setOnlyIncomplete(!onlyIncomplete)}
                >
                  <Text style={[styles.filterText, onlyIncomplete && styles.filterTextActive]}>
                    {onlyIncomplete ? 'Sadece eksik günler' : 'Tüm günler'}
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.filterBtn}
                  onPress={() => {
                    setDraftStart(settings.kazaStartDate);
                    setEditingStart(true);
                  }}
                >
                  <Text style={styles.filterText}>Başlangıcı değiştir</Text>
                </Pressable>
              </View>
            </Card>

            {visibleDays.length === 0 && (
              <Text style={styles.emptyText}>
                {onlyIncomplete ? 'Eksik gün yok — borç kalmadı 🎉' : 'Görüntülenecek gün yok.'}
              </Text>
            )}
          </View>
        }
        renderItem={({ item: day }) => (
          <DayRow dateKey={day.dateKey} items={items} byDate={byDate} onToggle={toggleOnDate} />
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
        initialNumToRender={20}
        windowSize={7}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { color: colors.text, fontSize: 26, fontWeight: '800', paddingHorizontal: 16, paddingTop: 8 },
  subtitle: { color: colors.textMuted, fontSize: 12, paddingHorizontal: 16, marginTop: 4, marginBottom: 4, lineHeight: 17 },
  presetRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  presetBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  presetText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  cancelText: { color: colors.textMuted, textAlign: 'center', fontSize: 13 },
  debtNumber: { color: colors.primary, fontSize: 20, fontWeight: '800', textAlign: 'center' },
  perItemRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 8 },
  perItemText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  toolRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  filterBtnActive: { backgroundColor: colors.success + '33', borderColor: colors.success },
  filterText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  filterTextActive: { color: colors.success },
  emptyText: { color: colors.textMuted, textAlign: 'center', marginTop: 16, fontSize: 13 },
  dayRow: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayRowComplete: { borderColor: colors.success },
  dayHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  dayDate: { color: colors.text, fontSize: 13, fontWeight: '700' },
  dayProgress: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  dayProgressComplete: { color: colors.success },
  chipRow: { flexDirection: 'row', gap: 6 },
  chip: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
  chipChecked: { backgroundColor: colors.success, borderColor: colors.success },
  chipText: { color: colors.textMuted, fontWeight: '800', fontSize: 12 },
  chipTextChecked: { color: '#06281a' },
});

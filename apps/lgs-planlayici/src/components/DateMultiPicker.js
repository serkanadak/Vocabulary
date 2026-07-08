import React, { useEffect, useState } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { GhostButton, PrimaryButton } from './common';
import { addDays, todayStr, formatDayMonthLabel } from '../logic/calendar';

const DAYS_AHEAD = 30;

// Periyodik olmayan bir görevi tek bir güne (genelde "bugün") sabitlemek
// yerine, kullanıcının rastgele birden fazla günü birden seçip aynı görevi
// her biri için ayrı ayrı oluşturabilmesini sağlayan takvim listesi.
export default function DateMultiPicker({ visible, initialDates, onConfirm, onCancel }) {
  const [selected, setSelected] = useState(initialDates || [todayStr()]);

  useEffect(() => {
    if (visible) setSelected(initialDates && initialDates.length ? initialDates : [todayStr()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(todayStr(), i));

  const toggle = (d) => {
    setSelected((s) => (s.includes(d) ? s.filter((x) => x !== d) : [...s, d].sort()));
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Hangi gün(ler)?</Text>
          <Text style={styles.hint}>Birden fazla gün seçebilirsin — görev seçilen her gün için ayrı oluşturulur.</Text>
          <ScrollView style={{ maxHeight: 340 }}>
            {dates.map((d) => {
              const isSelected = selected.includes(d);
              const isToday = d === todayStr();
              return (
                <TouchableOpacity key={d} style={styles.row} onPress={() => toggle(d)}>
                  <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                    {isSelected && <Text style={styles.checkboxMark}>✓</Text>}
                  </View>
                  <Text style={styles.rowText}>
                    {formatDayMonthLabel(d)}
                    {isToday ? ' · bugün' : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.actionsRow}>
            <View style={{ flex: 1 }}>
              <GhostButton label="Vazgeç" onPress={onCancel} />
            </View>
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <PrimaryButton
                label={selected.length > 1 ? `Ekle (${selected.length})` : 'Ekle'}
                disabled={selected.length === 0}
                onPress={() => onConfirm(selected)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    padding: 20,
  },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 6 },
  hint: { color: colors.textMuted, fontSize: 12, marginBottom: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkboxMark: { color: '#0f172a', fontSize: 12, fontWeight: '800' },
  rowText: { color: colors.text, fontSize: 14, fontWeight: '600' },
  actionsRow: { flexDirection: 'row', marginTop: 12 },
});

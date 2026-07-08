import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

export const WEEKDAY_LABELS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

export function describeDays(days) {
  const set = new Set(days);
  if (set.size === 7) return 'Her gün';
  if (set.size === 5 && [1, 2, 3, 4, 5].every((d) => set.has(d))) return 'Hafta içi (Pzt-Cum)';
  if (set.size === 2 && set.has(0) && set.has(6)) return 'Hafta sonu';
  return [...days].sort().map((d) => WEEKDAY_LABELS[d]).join(', ');
}

// days: 0=Pazar .. 6=Cumartesi (Date.getDay() ile aynı sırada).
export default function WeekdayPicker({ days, onChange }) {
  const toggle = (day) => {
    const set = new Set(days);
    if (set.has(day)) set.delete(day);
    else set.add(day);
    onChange(Array.from(set).sort());
  };

  return (
    <View style={styles.row}>
      {WEEKDAY_LABELS.map((label, day) => {
        const selected = days.includes(day);
        return (
          <TouchableOpacity
            key={day}
            style={[styles.chip, selected && styles.chipSelected]}
            onPress={() => toggle(day)}
          >
            <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  chip: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  chipTextSelected: { color: '#0f172a' },
});

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import WeekdayPicker from './WeekdayPicker';

// Görev ekleme modallarında ortak kullanılan "tekrarlansın mı?" alanı.
export default function RecurringFields({ enabled, onToggleEnabled, days, onChangeDays }) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.toggleRow} onPress={() => onToggleEnabled(!enabled)}>
        <View style={[styles.checkbox, enabled && styles.checkboxChecked]}>
          {enabled && <Text style={styles.checkboxMark}>✓</Text>}
        </View>
        <Text style={styles.toggleLabel}>Bu görev tekrarlansın (periyodik)</Text>
      </TouchableOpacity>
      {enabled && (
        <>
          <Text style={styles.hint}>Hangi günler?</Text>
          <WeekdayPicker days={days} onChange={onChangeDays} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 8 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkboxMark: { color: '#0f172a', fontSize: 12, fontWeight: '800' },
  toggleLabel: { color: colors.text, fontSize: 13, fontWeight: '600' },
  hint: { color: colors.textMuted, fontSize: 11, marginBottom: 6 },
});

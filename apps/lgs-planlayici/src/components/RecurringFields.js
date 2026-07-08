import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { GhostButton, Field } from './common';
import ChoiceModal from './ChoiceModal';
import WeekdayPicker from './WeekdayPicker';

const NONE_VALUE = '__none__';

// Görev ekleme modallarında ortak kullanılan "tekrarlansın mı?" alanı.
// monthGoals verilirse, periyodik görev isteğe bağlı olarak bir aylık hedefe
// bağlanabilir — bağlanırsa o hedefin TÜM haftalarına (son tekrar tarihine
// kadar) otomatik dağıtılır.
export default function RecurringFields({
  enabled,
  onToggleEnabled,
  days,
  onChangeDays,
  monthGoals,
  monthId,
  onChangeMonthId,
  endDate,
  onChangeEndDate,
}) {
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const showMonthLink = enabled && Array.isArray(monthGoals) && monthGoals.length > 0 && onChangeMonthId;
  const linkedMonth = monthGoals ? monthGoals.find((m) => m.id === monthId) : null;

  const monthOptions = [
    { label: 'Bağımsız (belirli bir aya bağlı değil)', value: NONE_VALUE },
    ...(monthGoals || []).map((m) => ({ label: m.title, value: m.id })),
  ];

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

          {showMonthLink && (
            <>
              <Text style={styles.hint}>Hangi aylık hedefe bağlı? (opsiyonel)</Text>
              <GhostButton
                label={linkedMonth ? linkedMonth.title : 'Bağımsız (belirli bir aya bağlı değil)'}
                onPress={() => setMonthPickerVisible(true)}
              />
              {!!linkedMonth && (
                <Field
                  label="Son tekrar tarihi (opsiyonel, YYYY-AA-GG)"
                  placeholder={`örn. ${linkedMonth.title} bitimine kadar boş bırak`}
                  value={endDate || ''}
                  onChangeText={onChangeEndDate}
                />
              )}
              <ChoiceModal
                visible={monthPickerVisible}
                title="Hangi aylık hedefe bağlı olsun?"
                options={monthOptions}
                onCancel={() => setMonthPickerVisible(false)}
                onSelect={(value) => {
                  onChangeMonthId(value === NONE_VALUE ? null : value);
                  if (value === NONE_VALUE) onChangeEndDate('');
                  setMonthPickerVisible(false);
                }}
              />
            </>
          )}
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
  hint: { color: colors.textMuted, fontSize: 11, marginBottom: 6, marginTop: 6 },
});

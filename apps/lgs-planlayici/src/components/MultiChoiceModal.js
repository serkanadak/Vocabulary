import React, { useEffect, useState } from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { GhostButton, PrimaryButton } from './common';

// Çoklu seçimlik liste modalı — örn. bir aylık hedefi birden fazla aya
// birden açmak için kullanılır.
export default function MultiChoiceModal({ visible, title, options, onConfirm, onCancel }) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (visible) setSelected([]);
  }, [visible]);

  const toggle = (value) => {
    setSelected((s) => (s.includes(value) ? s.filter((v) => v !== value) : [...s, value]));
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView style={{ maxHeight: 320 }}>
            {options.length === 0 ? (
              <Text style={styles.empty}>Seçenek yok</Text>
            ) : (
              options.map((opt) => {
                const isSelected = selected.includes(opt.value);
                return (
                  <TouchableOpacity key={opt.value} style={styles.option} onPress={() => toggle(opt.value)}>
                    <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                      {isSelected && <Text style={styles.checkboxMark}>✓</Text>}
                    </View>
                    <Text style={styles.optionText}>{opt.label}</Text>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>
          <View style={styles.row}>
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
  title: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 12 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
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
  optionText: { color: colors.text, fontSize: 14 },
  empty: { color: colors.textMuted, textAlign: 'center', paddingVertical: 16 },
  row: { flexDirection: 'row', marginTop: 12 },
});

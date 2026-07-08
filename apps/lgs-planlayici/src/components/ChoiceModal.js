import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { GhostButton } from './common';

// Tek seçimlik liste modalı (ders, konu, sınıf gibi seçimler için).
export default function ChoiceModal({ visible, title, options, onSelect, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>
          <ScrollView style={{ maxHeight: 320 }}>
            {options.length === 0 ? (
              <Text style={styles.empty}>Seçenek yok</Text>
            ) : (
              options.map((opt) => (
                <TouchableOpacity key={opt.value} style={styles.option} onPress={() => onSelect(opt.value)}>
                  <Text style={styles.optionText}>{opt.label}</Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
          <View style={{ marginTop: 10 }}>
            <GhostButton label="Vazgeç" onPress={onCancel} />
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: { color: colors.text, fontSize: 14 },
  empty: { color: colors.textMuted, textAlign: 'center', paddingVertical: 16 },
});

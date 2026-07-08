import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../theme';
import { Field, PrimaryButton, GhostButton } from './common';

// Genel amaçlı metin/sayı girişi modalı — RN'de native Alert.prompt yalnızca
// iOS'ta olduğu için tüm platformlarda çalışan tek bir bileşen kullanılıyor.
export default function PromptModal({
  visible,
  title,
  fields,
  initialValues,
  onCancel,
  onSubmit,
  renderExtra,
}) {
  const [values, setValues] = useState(initialValues || {});

  useEffect(() => {
    if (visible) setValues(initialValues || {});
  }, [visible, initialValues]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>
          {(fields || []).map((f) => (
            <Field
              key={f.key}
              label={f.label}
              placeholder={f.placeholder}
              value={values[f.key] != null ? String(values[f.key]) : ''}
              keyboardType={f.numeric ? 'numeric' : 'default'}
              onChangeText={(text) => setValues((v) => ({ ...v, [f.key]: text }))}
            />
          ))}
          {renderExtra ? renderExtra(values, setValues) : null}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <GhostButton label="Vazgeç" onPress={onCancel} />
            </View>
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <PrimaryButton label="Kaydet" onPress={() => onSubmit(values)} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  row: { flexDirection: 'row', marginTop: 4 },
});

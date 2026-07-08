import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { PrimaryButton, GhostButton } from './common';

// react-native-web'de Alert.alert bir no-op'tur (hiçbir şey göstermez), bu yüzden
// silme onayları gibi platformlar arası çalışması gereken diyaloglar için
// kendi modalımızı kullanıyoruz.
export default function ConfirmModal({ visible, title, message, confirmLabel = 'Sil', onConfirm, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>{title}</Text>
          {!!message && <Text style={styles.message}>{message}</Text>}
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <GhostButton label="Vazgeç" onPress={onCancel} />
            </View>
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <PrimaryButton label={confirmLabel} color={colors.danger} onPress={onConfirm} />
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
  title: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 8 },
  message: { color: colors.textMuted, fontSize: 13, marginBottom: 14 },
  row: { flexDirection: 'row', marginTop: 4 },
});

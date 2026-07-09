import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useTracker } from '../state/TrackerContext';
import { colors } from '../theme';
import { Card, SectionHeader, PrimaryButton, ConfirmModal } from '../components/common';

export default function BackupScreen({ navigation }) {
  const { exportSnapshot, importSnapshot } = useTracker();
  const [copyStatus, setCopyStatus] = useState('');
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);

  const copyBackup = async () => {
    try {
      await Clipboard.setStringAsync(exportSnapshot());
      setCopyStatus('Panoya kopyalandı ✓');
      setTimeout(() => setCopyStatus(''), 3000);
    } catch (e) {
      setCopyStatus('Kopyalama başarısız oldu.');
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      setImportText(text);
      setImportError('');
    } catch (e) {
      setImportError('Panodan okunamadı.');
    }
  };

  const doImport = () => {
    const err = importSnapshot(importText);
    setConfirmVisible(false);
    if (err) {
      setImportError(err);
    } else {
      setImportError('');
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <SectionHeader
          title="Yedekle"
          subtitle="Tüm işaretlemeleri, ilave ibadetleri ve ayarları bir metin olarak dışa aktar"
        />
        <Card>
          <PrimaryButton title="Yedeği Panoya Kopyala" onPress={copyBackup} />
          {copyStatus ? <Text style={styles.status}>{copyStatus}</Text> : null}
          <Text style={styles.hint}>
            Kopyaladıktan sonra bir notlar/mesaj uygulamasına yapıştırıp saklayabilir veya yeni cihazda geri
            yükleyebilirsin.
          </Text>
        </Card>

        <SectionHeader title="Geri Yükle" subtitle="Daha önce kopyaladığın yedek metnini buraya yapıştır" />
        <Card>
          <TextInput
            style={styles.textArea}
            value={importText}
            onChangeText={(t) => {
              setImportText(t);
              setImportError('');
            }}
            placeholder="Yedek JSON metnini buraya yapıştır..."
            placeholderTextColor={colors.textMuted}
            multiline
          />
          <Pressable style={styles.pasteBtn} onPress={pasteFromClipboard}>
            <Text style={styles.pasteText}>Panodan Yapıştır</Text>
          </Pressable>
          {importError ? <Text style={styles.error}>{importError}</Text> : null}
          <PrimaryButton title="Geri Yükle" onPress={() => setConfirmVisible(true)} disabled={!importText.trim()} />
          <Text style={styles.hint}>
            Geri yükleme, cihazdaki mevcut tüm verilerin (işaretlemeler, ilave ibadetler, ayarlar) üzerine yazar.
          </Text>
        </Card>
      </ScrollView>

      <ConfirmModal
        visible={confirmVisible}
        title="Mevcut veriler değiştirilsin mi?"
        message="Yapıştırılan yedek yüklenecek ve cihazdaki mevcut veriler bununla değiştirilecek. Bu işlem geri alınamaz."
        confirmLabel="Geri Yükle"
        destructive
        onCancel={() => setConfirmVisible(false)}
        onConfirm={doImport}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  status: { color: colors.success, fontWeight: '700', textAlign: 'center', marginTop: 10 },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 10, lineHeight: 17 },
  textArea: {
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  pasteBtn: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pasteText: { color: colors.textMuted, fontWeight: '700', fontSize: 12 },
  error: { color: '#ef4444', fontSize: 12, marginTop: 8 },
});

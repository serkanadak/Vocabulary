import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTracker } from '../state/TrackerContext';
import { colors } from '../theme';
import { Card, SectionHeader, DateField, ConfirmModal } from '../components/common';

export default function SettingsScreen() {
  const { settings, updateSettings, reset } = useTracker();
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Text style={styles.title}>Ayarlar</Text>

        <SectionHeader title="Cinsiyet" subtitle="Cuma namazı ve bayram namazı hükmünü etkiler (Hanefi mezhebi)" />
        <Card>
          <View style={styles.genderRow}>
            {['male', 'female'].map((g) => (
              <Pressable
                key={g}
                onPress={() => updateSettings({ gender: g })}
                style={[styles.genderBtn, settings.gender === g && styles.genderBtnActive]}
              >
                <Text style={[styles.genderText, settings.gender === g && styles.genderTextActive]}>
                  {g === 'male' ? 'Erkek' : 'Kadın'}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>

        <SectionHeader title="Nafile İbadetler" />
        <Card>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Nafile/ek sünnetleri "Bugün" listesinde göster</Text>
            <Switch
              value={settings.showNafile}
              onValueChange={(v) => updateSettings({ showNafile: v })}
              trackColor={{ true: colors.success, false: colors.border }}
            />
          </View>
        </Card>

        <SectionHeader title="Kurban" subtitle="Kurban Bayramı'nda vacip kurban hatırlatması için" />
        <Card>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Kurban kesmekle yükümlüyüm (nisap sahibiyim)</Text>
            <Switch
              value={settings.kurbanEligible}
              onValueChange={(v) => updateSettings({ kurbanEligible: v })}
              trackColor={{ true: colors.success, false: colors.border }}
            />
          </View>
        </Card>

        <SectionHeader
          title="Kamerî Takvim Tarihleri"
          subtitle="Ramazan ve bayram tarihleri her yıl kaydığı için elle girilir (YYYY-AA-GG)"
        />
        <Card>
          <DateField label="Ramazan başlangıcı" value={settings.ramadanStart} onChange={(v) => updateSettings({ ramadanStart: v })} />
          <DateField label="Ramazan bitişi" value={settings.ramadanEnd} onChange={(v) => updateSettings({ ramadanEnd: v })} />
          <DateField
            label="Ramazan Bayramı başlangıcı"
            value={settings.eidRamadanStart}
            onChange={(v) => updateSettings({ eidRamadanStart: v })}
          />
          <DateField
            label="Ramazan Bayramı bitişi"
            value={settings.eidRamadanEnd}
            onChange={(v) => updateSettings({ eidRamadanEnd: v })}
          />
          <DateField
            label="Kurban Bayramı başlangıcı"
            value={settings.eidKurbanStart}
            onChange={(v) => updateSettings({ eidKurbanStart: v })}
          />
          <DateField
            label="Kurban Bayramı bitişi"
            value={settings.eidKurbanEnd}
            onChange={(v) => updateSettings({ eidKurbanEnd: v })}
          />
        </Card>

        <SectionHeader title="Veri" />
        <Pressable style={styles.resetBtn} onPress={() => setConfirmVisible(true)}>
          <Text style={styles.resetText}>Tüm verileri sıfırla</Text>
        </Pressable>

        <Text style={styles.footnote}>
          Bu uygulama Hanefi fıkhı esas alınarak hazırlanmıştır ve genel bir ilmihal niteliğindedir; bağlayıcı fetva
          yerine geçmez.
        </Text>
      </ScrollView>

      <ConfirmModal
        visible={confirmVisible}
        title="Tüm veriler silinsin mi?"
        message="İşaretlemeler, ilave ibadetler ve ayarlar sıfırlanacak. Bu işlem geri alınamaz."
        confirmLabel="Sıfırla"
        destructive
        onCancel={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false);
          reset();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { color: colors.text, fontSize: 26, fontWeight: '800', paddingHorizontal: 16, paddingTop: 8 },
  genderRow: { flexDirection: 'row', gap: 10 },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  genderBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  genderText: { color: colors.textMuted, fontWeight: '700' },
  genderTextActive: { color: '#1c1305' },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  switchLabel: { color: colors.text, fontSize: 14, flex: 1, marginRight: 12, lineHeight: 19 },
  resetBtn: {
    marginHorizontal: 16,
    marginTop: 4,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  resetText: { color: '#ef4444', fontWeight: '700' },
  footnote: { color: colors.textMuted, fontSize: 11, marginHorizontal: 16, marginTop: 16, lineHeight: 16 },
});

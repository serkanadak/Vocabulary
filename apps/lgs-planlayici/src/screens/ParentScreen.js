import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors } from '../theme';
import { Card, SectionTitle, Field, PrimaryButton, GhostButton, ProgressBar } from '../components/common';
import { hashPin, verifyPin } from '../logic/pin';
import { BADGES } from '../data/rewards';

export default function ParentScreen() {
  const planner = usePlanner();
  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  if (!planner.parentPinHash) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
        <SectionTitle>Veli modu kurulumu</SectionTitle>
        <Card>
          <Text style={styles.mutedText}>
            Veli modu, öğrencinin ilerlemesini salt okunur olarak gösterir. Bir PIN belirleyerek koru.
          </Text>
          <Field label="PIN (4 haneli)" value={newPin} onChangeText={setNewPin} keyboardType="numeric" secureTextEntry />
          <Field label="PIN (tekrar)" value={confirmPin} onChangeText={setConfirmPin} keyboardType="numeric" secureTextEntry />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <PrimaryButton
            label="PIN belirle"
            onPress={() => {
              if (newPin.length < 4) return setError('PIN en az 4 haneli olmalı.');
              if (newPin !== confirmPin) return setError('PIN\'ler eşleşmiyor.');
              planner.setParentPinHash(hashPin(newPin));
              setError('');
            }}
          />
        </Card>
      </ScrollView>
    );
  }

  if (!unlocked) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
        <SectionTitle>Veli modu</SectionTitle>
        <Card>
          <Text style={styles.mutedText}>Devam etmek için PIN gir.</Text>
          <Field label="PIN" value={pinInput} onChangeText={setPinInput} keyboardType="numeric" secureTextEntry />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <PrimaryButton
            label="Gör"
            onPress={() => {
              if (verifyPin(pinInput, planner.parentPinHash)) {
                setUnlocked(true);
                setPinInput('');
                setError('');
              } else {
                setError('PIN yanlış.');
              }
            }}
          />
        </Card>
      </ScrollView>
    );
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const completedToday = planner.tasks.filter((t) => t.done && t.completedAt === todayStr).length;
  const pendingToday = planner.tasks.filter((t) => !t.done).length;
  const totalToday = completedToday + pendingToday;
  const ratio = totalToday === 0 ? 0 : completedToday / totalToday;
  const lastExam = [...planner.examResults].sort((a, b) => (a.date < b.date ? 1 : -1))[0];
  const unlockedBadgeCount = planner.badges.length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.headerRow}>
        <SectionTitle>Veli özeti</SectionTitle>
        <GhostButton label="Kilitle" onPress={() => setUnlocked(false)} />
      </View>

      <Card>
        <Text style={styles.label}>Sınıf</Text>
        <Text style={styles.value}>{planner.gradeLevel}. sınıf</Text>
      </Card>

      {planner.yearGoal && (
        <Card>
          <Text style={styles.label}>Yıllık hedef</Text>
          <Text style={styles.value}>{planner.yearGoal.title}</Text>
        </Card>
      )}

      <Card>
        <Text style={styles.label}>Bugünkü ilerleme</Text>
        <ProgressBar ratio={ratio} color={colors.primary} />
        <Text style={styles.mutedText}>
          {completedToday}/{totalToday} görev tamamlandı
        </Text>
      </Card>

      <Card>
        <Text style={styles.label}>Seri ve seviye</Text>
        <Text style={styles.value}>
          🔥 {planner.stats.streakCurrent} günlük seri · {planner.level.title} · {planner.stats.totalPoints} puan
        </Text>
      </Card>

      {lastExam && (
        <Card>
          <Text style={styles.label}>Son deneme sonucu</Text>
          <Text style={styles.value}>
            {lastExam.date} · {lastExam.totalNet.toFixed(1)} net
          </Text>
        </Card>
      )}

      <Card>
        <Text style={styles.label}>Rozetler</Text>
        <Text style={styles.value}>
          {unlockedBadgeCount}/{BADGES.length} rozet kazanıldı
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mutedText: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  error: { color: colors.danger, fontSize: 12, marginTop: -4, marginBottom: 8 },
  label: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  value: { color: colors.text, fontSize: 15, fontWeight: '700', marginTop: 4 },
});

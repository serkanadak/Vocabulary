import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors } from '../theme';
import { Card, SectionTitle, ProgressBar } from '../components/common';
import { BADGES } from '../data/rewards';

export default function RewardsScreen() {
  const planner = usePlanner();
  const unlockedIds = new Set(planner.badges.map((b) => b.id));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={styles.levelTitle}>{planner.level.title}</Text>
        <Text style={styles.points}>{planner.stats.totalPoints} puan</Text>
        <View style={{ marginTop: 10 }}>
          <ProgressBar ratio={planner.level.progressRatio} color={colors.gold} />
          {planner.level.nextTitle ? (
            <Text style={styles.nextLevel}>
              "{planner.level.nextTitle}" seviyesine {planner.level.pointsToNext} puan kaldı
            </Text>
          ) : (
            <Text style={styles.nextLevel}>En üst seviyedesin 🎉</Text>
          )}
        </View>
      </Card>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <Text style={[styles.statNum, styles.streakNum]}>🔥 {planner.stats.streakCurrent}</Text>
          <Text style={styles.statLabel}>güncel seri</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNum}>{planner.stats.longestStreak}</Text>
          <Text style={styles.statLabel}>en uzun seri</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNum}>{planner.stats.totalTasksCompleted}</Text>
          <Text style={styles.statLabel}>tamamlanan görev</Text>
        </Card>
      </View>

      <SectionTitle>Rozetler</SectionTitle>
      <View style={styles.badgeGrid}>
        {BADGES.map((badge) => {
          const unlocked = unlockedIds.has(badge.id);
          return (
            <Card key={badge.id} style={[styles.badgeCard, unlocked && styles.badgeUnlocked, !unlocked && styles.badgeLocked]}>
              <Text style={styles.badgeIcon}>{unlocked ? '🏅' : '🔒'}</Text>
              <Text style={[styles.badgeTitle, !unlocked && styles.mutedText]}>{badge.title}</Text>
              <Text style={styles.badgeDesc}>{badge.description}</Text>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  levelTitle: { color: colors.gold, fontSize: 22, fontWeight: '800' },
  points: { color: colors.textMuted, fontSize: 14, marginTop: 2 },
  nextLevel: { color: colors.textMuted, fontSize: 12, marginTop: 6 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  statCard: { flex: 1, alignItems: 'center' },
  statNum: { color: colors.text, fontSize: 18, fontWeight: '800' },
  streakNum: { color: colors.pink },
  statLabel: { color: colors.textMuted, fontSize: 11, marginTop: 2, textAlign: 'center' },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badgeCard: { width: '47%', alignItems: 'center' },
  badgeUnlocked: { borderColor: colors.pink },
  badgeLocked: { opacity: 0.5 },
  badgeIcon: { fontSize: 26, marginBottom: 6 },
  badgeTitle: { color: colors.text, fontSize: 13, fontWeight: '700', textAlign: 'center' },
  badgeDesc: { color: colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: 2 },
  mutedText: { color: colors.textMuted },
});

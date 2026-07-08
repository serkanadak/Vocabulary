import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors } from '../theme';
import { Card, SectionTitle, PrimaryButton, GhostButton, EmptyState } from '../components/common';
import PromptModal from '../components/PromptModal';
import { mondayOf, addDays, todayStr, formatDayLabel } from '../logic/calendar';

function suggestNextWeekStart(month, existingWeeks) {
  if (existingWeeks.length > 0) {
    const maxStart = existingWeeks.reduce((max, w) => (w.startDate > max ? w.startDate : max), existingWeeks[0].startDate);
    return addDays(maxStart, 7);
  }
  if (month.year && month.month) {
    const firstOfMonth = `${month.year}-${String(month.month).padStart(2, '0')}-01`;
    return mondayOf(firstOfMonth);
  }
  return mondayOf(todayStr());
}

export default function MonthDetailScreen({ route, navigation }) {
  const { monthId } = route.params;
  const planner = usePlanner();
  const [weekModal, setWeekModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const month = planner.monthGoals.find((m) => m.id === monthId);
  const weeks = planner.weekGoals.filter((w) => w.monthId === monthId);
  const taskCountFor = (weekId) => planner.tasks.filter((t) => t.weekId === weekId).length;

  if (!month) return null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={styles.title}>{month.title}</Text>
        <View style={styles.row}>
          <GhostButton label="Düzenle" onPress={() => setEditModal(true)} />
        </View>
      </Card>

      <SectionTitle>Haftalık planlar</SectionTitle>
      {weeks.length === 0 ? (
        <EmptyState text="Henüz haftalık plan yok." />
      ) : (
        weeks.map((week) => (
          <TouchableOpacity key={week.id} onPress={() => navigation.navigate('WeekDetail', { weekId: week.id })}>
            <Card>
              <Text style={styles.weekTitle}>{week.title}</Text>
              {!!week.startDate && (
                <Text style={styles.mutedText}>
                  {formatDayLabel(week.startDate)} — {formatDayLabel(addDays(week.startDate, 6))}
                </Text>
              )}
              <Text style={styles.mutedText}>{taskCountFor(week.id)} görev</Text>
            </Card>
          </TouchableOpacity>
        ))
      )}
      <PrimaryButton label="+ Haftalık Plan Ekle" onPress={() => setWeekModal(true)} />

      <PromptModal
        visible={editModal}
        title="Aylık hedefi düzenle"
        fields={[{ key: 'title', label: 'Başlık' }]}
        initialValues={{ title: month.title }}
        onCancel={() => setEditModal(false)}
        onSubmit={(values) => {
          if (!values.title) return;
          planner.updateMonthGoal(month.id, { title: values.title });
          setEditModal(false);
        }}
      />

      <PromptModal
        visible={weekModal}
        title="Yeni haftalık plan"
        fields={[
          { key: 'title', label: 'Başlık', placeholder: 'örn. 1. Hafta: Denklemler' },
          { key: 'startDate', label: 'Başlangıç tarihi (Pazartesi)' },
        ]}
        initialValues={{ title: '', startDate: weekModal ? suggestNextWeekStart(month, weeks) : '' }}
        onCancel={() => setWeekModal(false)}
        onSubmit={(values) => {
          if (!values.title) return;
          planner.addWeekGoal(month.id, {
            title: values.title,
            startDate: values.startDate || suggestNextWeekStart(month, weeks),
          });
          setWeekModal(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { color: colors.text, fontSize: 18, fontWeight: '800' },
  row: { flexDirection: 'row', marginTop: 10 },
  weekTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  mutedText: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
});

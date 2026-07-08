import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors, subjectColor } from '../theme';
import { pointsForTask } from '../data/rewards';
import { Card, SectionTitle, Chip, PrimaryButton, GhostButton, EmptyState } from '../components/common';
import PromptModal from '../components/PromptModal';
import CurriculumPicker from '../components/CurriculumPicker';
import RecurringFields from '../components/RecurringFields';
import { SUBJECTS_BY_GRADE } from '../data/curriculum';
import { todayStr } from '../logic/calendar';

export default function WeekDetailScreen({ route }) {
  const { weekId } = route.params;
  const planner = usePlanner();
  const [editModal, setEditModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [draft, setDraft] = useState(null);
  const [recurring, setRecurring] = useState(false);
  const [recurringDays, setRecurringDays] = useState([1, 2, 3, 4, 5]);

  const week = planner.weekGoals.find((w) => w.id === weekId);
  const tasks = planner.tasks.filter((t) => t.weekId === weekId);
  const subjects = SUBJECTS_BY_GRADE[planner.gradeLevel] || [];
  const topics = planner.curriculum.filter((t) => t.gradeLevel === planner.gradeLevel);
  const topicTitleFor = (task) => {
    if (!task.topicId) return null;
    const topic = planner.curriculum.find((t) => t.id === task.topicId);
    return topic ? topic.title : null;
  };

  if (!week) return null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={styles.title}>{week.title}</Text>
        <View style={styles.row}>
          <GhostButton label="Düzenle" onPress={() => setEditModal(true)} />
        </View>
      </Card>

      <SectionTitle>Görevler</SectionTitle>
      {tasks.length === 0 ? (
        <EmptyState text="Henüz görev yok." />
      ) : (
        tasks.map((task) => (
          <Card key={task.id}>
            <View style={styles.taskRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.taskTitle, task.done && styles.doneText]}>{task.title}</Text>
                <View style={styles.chipRow}>
                  <Chip label={task.subject} color={subjectColor(task.subject)} />
                  <Text style={styles.taskMeta}>
                    {task.estMinutes} dk · +{pointsForTask(task.estMinutes)} puan
                  </Text>
                </View>
                {!!topicTitleFor(task) && <Text style={styles.topicHint}>📖 {topicTitleFor(task)}</Text>}
              </View>
              <TouchableOpacity onPress={() => planner.toggleTaskDone(task.id)}>
                <Text style={styles.toggleText}>{task.done ? 'geri al' : 'tamamla'}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))
      )}
      <PrimaryButton
        label="+ Görev Ekle"
        onPress={() => {
          setDraft(null);
          setTaskModal(true);
        }}
      />

      <PromptModal
        visible={editModal}
        title="Haftalık planı düzenle"
        fields={[{ key: 'title', label: 'Başlık' }]}
        initialValues={{ title: week.title }}
        onCancel={() => setEditModal(false)}
        onSubmit={(values) => {
          if (!values.title) return;
          planner.updateWeekGoal(week.id, { title: values.title });
          setEditModal(false);
        }}
      />

      <PromptModal
        visible={taskModal}
        title="Yeni görev"
        fields={[
          { key: 'title', label: 'Görev', placeholder: 'örn. Basınç konusu soru çöz' },
          { key: 'estMinutes', label: 'Tahmini süre (dk)', placeholder: '20', numeric: true },
        ]}
        initialValues={{ title: '', estMinutes: '20' }}
        onCancel={() => setTaskModal(false)}
        renderExtra={() => (
          <RecurringFields
            enabled={recurring}
            onToggleEnabled={setRecurring}
            days={recurringDays}
            onChangeDays={setRecurringDays}
          />
        )}
        onSubmit={(values) => {
          if (!values.title) return;
          setDraft(values);
          setTaskModal(false);
          setPickerVisible(true);
        }}
      />

      <CurriculumPicker
        visible={pickerVisible}
        subjects={subjects}
        topics={topics}
        onCancel={() => setPickerVisible(false)}
        onSelect={(subject, topicId) => {
          const estMinutes = Number(draft.estMinutes) || 15;
          if (recurring) {
            planner.addRecurringTask({
              subject,
              topicId,
              title: draft.title,
              estMinutes,
              daysOfWeek: recurringDays,
            });
          } else {
            planner.addTask(week.id, {
              title: draft.title,
              subject,
              topicId,
              estMinutes,
              dueDate: week.startDate || todayStr(),
            });
          }
          setPickerVisible(false);
          setRecurring(false);
          setRecurringDays([1, 2, 3, 4, 5]);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  title: { color: colors.text, fontSize: 18, fontWeight: '800' },
  row: { flexDirection: 'row', marginTop: 10 },
  taskRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTitle: { color: colors.text, fontSize: 14, fontWeight: '600', marginBottom: 6 },
  doneText: { textDecorationLine: 'line-through', color: colors.textMuted },
  chipRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  taskMeta: { color: colors.textMuted, fontSize: 12 },
  topicHint: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
  toggleText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});

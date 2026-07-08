import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors, subjectColor } from '../theme';
import { pointsForTask } from '../data/rewards';
import { Card, SectionTitle, Chip, PrimaryButton, GhostButton, EmptyState } from '../components/common';
import PromptModal from '../components/PromptModal';
import ChoiceModal from '../components/ChoiceModal';
import { SUBJECTS_BY_GRADE } from '../data/curriculum';

const STEP = { NONE: 'none', SUBJECT: 'subject', TOPIC: 'topic' };

export default function WeekDetailScreen({ route, navigation }) {
  const { weekId } = route.params;
  const planner = usePlanner();
  const [editModal, setEditModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [step, setStep] = useState(STEP.NONE);
  const [draft, setDraft] = useState(null);

  const week = planner.weekGoals.find((w) => w.id === weekId);
  const tasks = planner.tasks.filter((t) => t.weekId === weekId);
  const subjects = SUBJECTS_BY_GRADE[planner.gradeLevel] || [];

  if (!week) return null;

  const topicsForSubject = (subject) =>
    planner.curriculum.filter((t) => t.gradeLevel === planner.gradeLevel && t.subject === subject);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <Text style={styles.title}>{week.title}</Text>
        <View style={styles.row}>
          <GhostButton label="Düzenle" onPress={() => setEditModal(true)} />
          <View style={{ width: 10 }} />
          <GhostButton
            label="Sil"
            danger
            onPress={() =>
              Alert.alert('Haftalık planı sil', 'Bu plana bağlı görevler de silinecek.', [
                { text: 'Vazgeç', style: 'cancel' },
                {
                  text: 'Sil',
                  style: 'destructive',
                  onPress: () => {
                    planner.deleteWeekGoal(week.id);
                    navigation.goBack();
                  },
                },
              ])
            }
          />
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
        onSubmit={(values) => {
          if (!values.title) return;
          setDraft(values);
          setTaskModal(false);
          setStep(STEP.SUBJECT);
        }}
      />

      <ChoiceModal
        visible={step === STEP.SUBJECT}
        title="Ders seç"
        options={subjects.map((s) => ({ label: s, value: s }))}
        onCancel={() => setStep(STEP.NONE)}
        onSelect={(subject) => {
          setDraft((d) => ({ ...d, subject }));
          setStep(STEP.TOPIC);
        }}
      />

      <ChoiceModal
        visible={step === STEP.TOPIC}
        title="Konu seç (opsiyonel)"
        options={[
          { label: 'Konu belirtmeden ekle', value: '__none__' },
          ...topicsForSubject(draft && draft.subject).map((t) => ({ label: t.title, value: t.id })),
        ]}
        onCancel={() => setStep(STEP.NONE)}
        onSelect={(topicId) => {
          planner.addTask(week.id, {
            title: draft.title,
            subject: draft.subject,
            topicId: topicId === '__none__' ? null : topicId,
            estMinutes: Number(draft.estMinutes) || 15,
          });
          setStep(STEP.NONE);
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
  toggleText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});

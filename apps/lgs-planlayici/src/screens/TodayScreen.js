import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { usePomodoro } from '../logic/usePomodoro';
import { colors, subjectColor } from '../theme';
import { pointsForTask } from '../data/rewards';
import { Card, SectionTitle, Chip, ProgressBar, PrimaryButton, GhostButton, EmptyState } from '../components/common';
import PromptModal from '../components/PromptModal';
import ChoiceModal from '../components/ChoiceModal';
import ConfirmModal from '../components/ConfirmModal';
import { SUBJECTS_BY_GRADE } from '../data/curriculum';

export default function TodayScreen() {
  const planner = usePlanner();
  const pomodoro = usePomodoro(25);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [addVisible, setAddVisible] = useState(false);
  const [subjectPickerFor, setSubjectPickerFor] = useState(null);
  const [pendingSubject, setPendingSubject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const pendingTasks = planner.tasks.filter((t) => !t.done);
  const completedToday = planner.tasks.filter(
    (t) => t.done && t.completedAt === new Date().toISOString().slice(0, 10)
  );
  const totalToday = pendingTasks.length + completedToday.length;
  const ratio = totalToday === 0 ? 0 : completedToday.length / totalToday;

  const activeTask = planner.tasks.find((t) => t.id === activeTaskId);

  const subjects = SUBJECTS_BY_GRADE[planner.gradeLevel] || [];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.levelTitle}>{planner.level.title}</Text>
            <Text style={styles.points}>{planner.stats.totalPoints} puan</Text>
          </View>
          <View style={styles.streakBox}>
            <Text style={styles.streakNum}>🔥 {planner.stats.streakCurrent}</Text>
            <Text style={styles.streakLabel}>günlük seri</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <ProgressBar ratio={ratio} color={colors.primary} />
          <Text style={styles.progressLabel}>
            Bugün {completedToday.length}/{totalToday} görev tamamlandı
          </Text>
        </View>
      </Card>

      <Card>
        <SectionTitle>Odak Zamanlayıcı</SectionTitle>
        {activeTask ? (
          <Text style={styles.activeTaskLabel}>Seçili görev: {activeTask.title}</Text>
        ) : (
          <Text style={styles.mutedText}>Aşağıdan bir görev seçip başlat</Text>
        )}
        <Text style={styles.timer}>{pomodoro.label}</Text>
        <View style={styles.row}>
          {!pomodoro.running ? (
            <PrimaryButton label="Başlat" onPress={pomodoro.start} />
          ) : (
            <GhostButton label="Duraklat" onPress={pomodoro.pause} />
          )}
          <View style={{ width: 10 }} />
          <GhostButton label="Sıfırla" onPress={pomodoro.reset} />
        </View>
      </Card>

      <SectionTitle>Bugünkü görevler</SectionTitle>
      {pendingTasks.length === 0 ? (
        <EmptyState text="Bekleyen görev yok. Aşağıdan yeni bir görev ekleyebilirsin." />
      ) : (
        pendingTasks.map((task) => (
          <Card key={task.id} style={activeTaskId === task.id && styles.activeCard}>
            <TouchableOpacity onPress={() => setActiveTaskId(task.id)}>
              <View style={styles.taskRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <View style={styles.chipRow}>
                    <Chip label={task.subject} color={subjectColor(task.subject)} />
                    <Text style={styles.taskMeta}>
                      {task.estMinutes} dk · +{pointsForTask(task.estMinutes)} puan
                    </Text>
                  </View>
                </View>
                <View style={styles.taskActions}>
                  <TouchableOpacity style={styles.doneBtn} onPress={() => planner.toggleTaskDone(task.id)}>
                    <Text style={styles.doneBtnText}>Tamamla</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setDeleteTarget(task)}>
                    <Text style={styles.deleteText}>sil</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Card>
        ))
      )}

      {completedToday.length > 0 && (
        <>
          <SectionTitle>Bugün tamamlananlar</SectionTitle>
          {completedToday.map((task) => (
            <Card key={task.id}>
              <View style={styles.taskRow}>
                <Text style={[styles.taskTitle, styles.doneText]}>{task.title}</Text>
                <View style={styles.taskActions}>
                  <TouchableOpacity onPress={() => planner.toggleTaskDone(task.id)}>
                    <Text style={styles.undoText}>geri al</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setDeleteTarget(task)}>
                    <Text style={styles.deleteText}>sil</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          ))}
        </>
      )}

      <PrimaryButton label="+ Görev Ekle" onPress={() => setAddVisible(true)} />

      <PromptModal
        visible={addVisible}
        title="Yeni görev"
        fields={[
          { key: 'title', label: 'Görev', placeholder: 'örn. Kesirlerle işlemler soru çöz' },
          { key: 'estMinutes', label: 'Tahmini süre (dk)', placeholder: '20', numeric: true },
        ]}
        initialValues={{ title: '', estMinutes: '20' }}
        onCancel={() => setAddVisible(false)}
        onSubmit={(values) => {
          if (!values.title) return;
          setPendingSubject(values);
          setAddVisible(false);
          setSubjectPickerFor('new');
        }}
      />

      <ChoiceModal
        visible={subjectPickerFor === 'new'}
        title="Ders seç"
        options={subjects.map((s) => ({ label: s, value: s }))}
        onCancel={() => setSubjectPickerFor(null)}
        onSelect={(subject) => {
          planner.addTask(null, {
            title: pendingSubject.title,
            subject,
            topicId: null,
            estMinutes: Number(pendingSubject.estMinutes) || 15,
          });
          setSubjectPickerFor(null);
        }}
      />

      <ConfirmModal
        visible={!!deleteTarget}
        title="Görevi sil"
        message={deleteTarget ? `"${deleteTarget.title}" silinsin mi?` : ''}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          planner.deleteTask(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  levelTitle: { color: colors.gold, fontSize: 18, fontWeight: '800' },
  points: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  streakBox: { alignItems: 'flex-end' },
  streakNum: { color: colors.pink, fontSize: 18, fontWeight: '700' },
  streakLabel: { color: colors.textMuted, fontSize: 11 },
  progressLabel: { color: colors.textMuted, fontSize: 12, marginTop: 6 },
  mutedText: { color: colors.textMuted, fontSize: 13, marginBottom: 8 },
  activeTaskLabel: { color: colors.text, fontSize: 13, marginBottom: 8 },
  timer: { color: colors.text, fontSize: 40, fontWeight: '700', textAlign: 'center', marginVertical: 8 },
  row: { flexDirection: 'row' },
  taskRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTitle: { color: colors.text, fontSize: 14, fontWeight: '600', marginBottom: 6 },
  doneText: { textDecorationLine: 'line-through', color: colors.textMuted },
  chipRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  taskMeta: { color: colors.textMuted, fontSize: 12 },
  doneBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  doneBtnText: { color: '#0f172a', fontWeight: '700', fontSize: 12 },
  taskActions: { alignItems: 'flex-end', gap: 6 },
  undoText: { color: colors.textMuted, fontSize: 12, textDecorationLine: 'underline' },
  deleteText: { color: colors.danger, fontSize: 11 },
  activeCard: { borderColor: colors.pink },
});

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { usePomodoro } from '../logic/usePomodoro';
import { colors, subjectColor } from '../theme';
import { pointsForTask } from '../data/rewards';
import { Card, SectionTitle, Chip, ProgressBar, PrimaryButton, GhostButton, EmptyState } from '../components/common';
import PromptModal from '../components/PromptModal';
import CurriculumPicker from '../components/CurriculumPicker';
import RecurringFields from '../components/RecurringFields';
import { SUBJECTS_BY_GRADE } from '../data/curriculum';
import { todayStr } from '../logic/calendar';

export default function TodayScreen() {
  const planner = usePlanner();
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [addVisible, setAddVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pendingTask, setPendingTask] = useState(null);
  const [recurring, setRecurring] = useState(false);
  const [recurringDays, setRecurringDays] = useState([1, 2, 3, 4, 5]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editSubjectPickerVisible, setEditSubjectPickerVisible] = useState(false);
  const [editDraft, setEditDraft] = useState(null);

  const pendingTasks = planner.tasks.filter((t) => !t.done);
  const completedToday = planner.tasks.filter((t) => t.done && t.completedAt === todayStr());
  const totalToday = pendingTasks.length + completedToday.length;
  const ratio = totalToday === 0 ? 0 : completedToday.length / totalToday;

  const activeTask = planner.tasks.find((t) => t.id === activeTaskId);
  const pomodoro = usePomodoro(activeTask ? activeTask.estMinutes : 25);

  const subjects = SUBJECTS_BY_GRADE[planner.gradeLevel] || [];
  const topics = planner.curriculum.filter((t) => t.gradeLevel === planner.gradeLevel);
  const topicTitleFor = (task) => {
    if (!task.topicId) return null;
    const topic = planner.curriculum.find((t) => t.id === task.topicId);
    return topic ? topic.title : null;
  };
  const editingTask = planner.tasks.find((t) => t.id === editingTaskId) || null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <View style={styles.headerRow}>
          <View style={styles.identityRow}>
            <View style={styles.avatarBubble}>
              <Text style={styles.avatarEmoji}>{planner.avatar.emoji}</Text>
            </View>
            <View>
              <Text style={styles.levelTitle}>{planner.level.title}</Text>
              <Text style={styles.points}>{planner.stats.totalPoints} puan</Text>
            </View>
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
          <Text style={styles.activeTaskLabel}>
            Seçili görev: {activeTask.title} ({activeTask.estMinutes} dk)
          </Text>
        ) : (
          <Text style={styles.mutedText}>Aşağıdan bir görev seçip başlat — süre o görevin süresi kadar olur</Text>
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
                  {!!task.recurringId && <Text style={styles.topicHint}>🔁 tekrarlayan</Text>}
                  {!!topicTitleFor(task) && <Text style={styles.topicHint}>📖 {topicTitleFor(task)}</Text>}
                </View>
                <View style={styles.taskActions}>
                  <TouchableOpacity onPress={() => setEditingTaskId(task.id)}>
                    <Text style={styles.editText}>düzenle</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.doneBtn} onPress={() => planner.toggleTaskDone(task.id)}>
                    <Text style={styles.doneBtnText}>Tamamla</Text>
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
                <TouchableOpacity onPress={() => planner.toggleTaskDone(task.id)}>
                  <Text style={styles.undoText}>geri al</Text>
                </TouchableOpacity>
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
          setPendingTask(values);
          setAddVisible(false);
          setPickerVisible(true);
        }}
      />

      <CurriculumPicker
        visible={pickerVisible}
        subjects={subjects}
        topics={topics}
        onCancel={() => setPickerVisible(false)}
        onSelect={(subject, topicId) => {
          const estMinutes = Number(pendingTask.estMinutes) || 15;
          if (recurring) {
            planner.addRecurringTask({
              subject,
              topicId,
              title: pendingTask.title,
              estMinutes,
              daysOfWeek: recurringDays,
            });
          } else {
            planner.addTask(null, {
              title: pendingTask.title,
              subject,
              topicId,
              estMinutes,
              dueDate: todayStr(),
            });
          }
          setPickerVisible(false);
          setRecurring(false);
          setRecurringDays([1, 2, 3, 4, 5]);
        }}
      />

      <PromptModal
        visible={!!editingTaskId}
        title="Görevi düzenle"
        fields={[
          { key: 'title', label: 'Görev' },
          { key: 'estMinutes', label: 'Tahmini süre (dk)', numeric: true },
        ]}
        initialValues={{
          title: editingTask ? editingTask.title : '',
          estMinutes: editingTask ? String(editingTask.estMinutes) : '',
        }}
        onCancel={() => setEditingTaskId(null)}
        renderExtra={(values) => (
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.taskMeta}>
              Ders: {editingTask ? editingTask.subject : ''}
              {editingTask && topicTitleFor(editingTask) ? ` · ${topicTitleFor(editingTask)}` : ''}
            </Text>
            <View style={{ marginTop: 8 }}>
              <GhostButton
                label="Ders / Konu değiştir"
                onPress={() => {
                  setEditDraft({ taskId: editingTaskId, title: values.title, estMinutes: values.estMinutes });
                  setEditingTaskId(null);
                  setEditSubjectPickerVisible(true);
                }}
              />
            </View>
          </View>
        )}
        onSubmit={(values) => {
          if (!values.title || !editingTaskId) return;
          planner.updateTask(editingTaskId, {
            title: values.title,
            estMinutes: Number(values.estMinutes) || editingTask.estMinutes,
          });
          setEditingTaskId(null);
        }}
      />

      <CurriculumPicker
        visible={editSubjectPickerVisible}
        subjects={subjects}
        topics={topics}
        onCancel={() => {
          setEditSubjectPickerVisible(false);
          setEditDraft(null);
        }}
        onSelect={(subject, topicId) => {
          if (editDraft) {
            planner.updateTask(editDraft.taskId, {
              title: editDraft.title,
              estMinutes: Number(editDraft.estMinutes) || 15,
              subject,
              topicId,
            });
          }
          setEditSubjectPickerVisible(false);
          setEditDraft(null);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  identityRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 22 },
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
  topicHint: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
  taskActions: { alignItems: 'flex-end', gap: 6 },
  editText: { color: colors.textMuted, fontSize: 12, fontWeight: '600', textDecorationLine: 'underline' },
  doneBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  doneBtnText: { color: '#0f172a', fontWeight: '700', fontSize: 12 },
  undoText: { color: colors.textMuted, fontSize: 12, textDecorationLine: 'underline' },
  activeCard: { borderColor: colors.pink },
});

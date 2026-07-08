import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors, subjectColor } from '../theme';
import { Card, SectionTitle, PrimaryButton, GhostButton } from '../components/common';
import PromptModal from '../components/PromptModal';
import MultiChoiceModal from '../components/MultiChoiceModal';
import RecurringFields from '../components/RecurringFields';
import { describeDays } from '../components/WeekdayPicker';
import { GRADES, SUBJECTS_BY_GRADE } from '../data/curriculum';
import { pointsForTask } from '../data/rewards';
import { todayStr, formatMonthLabel, nextMonths } from '../logic/calendar';

const PLAN_CHOICE = { NONE: null, TASK: 'task', MONTH: 'month' };

const MONTH_OPTIONS = nextMonths(12).map((m) => ({
  label: formatMonthLabel(m.year, m.month),
  value: `${m.year}-${m.month}`,
  year: m.year,
  month: m.month,
}));

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function TopicPlanModal({ visible, topic, tasks, recurringTasks, onToggleTaskDone, onToggleRecurringActive, onCreateTask, onCreateMonth, onCancel }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={modalStyles.backdrop}>
        <View style={modalStyles.sheet}>
          <Text style={modalStyles.sheetTitle}>{topic ? `"${topic.title}"` : ''}</Text>

          <ScrollView style={{ maxHeight: 280 }}>
            {recurringTasks.length > 0 && (
              <>
                <Text style={modalStyles.sheetSubheading}>Periyodik görevler</Text>
                {recurringTasks.map((r) => (
                  <View key={r.id} style={modalStyles.sheetRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={[modalStyles.sheetItemTitle, !r.active && modalStyles.mutedText]}>{r.title}</Text>
                      <Text style={modalStyles.mutedText}>
                        {describeDays(r.daysOfWeek)} · {r.estMinutes} dk
                      </Text>
                    </View>
                    <GhostButton label={r.active ? 'Aktif' : 'Pasif'} onPress={() => onToggleRecurringActive(r.id, !r.active)} />
                  </View>
                ))}
              </>
            )}

            {tasks.length > 0 && (
              <>
                <Text style={modalStyles.sheetSubheading}>Görevler</Text>
                {tasks.map((t) => (
                  <View key={t.id} style={modalStyles.sheetRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={[modalStyles.sheetItemTitle, t.done && modalStyles.doneText]}>{t.title}</Text>
                      <Text style={modalStyles.mutedText}>
                        {t.estMinutes} dk · +{pointsForTask(t.estMinutes)} puan
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => onToggleTaskDone(t.id)}>
                      <Text style={modalStyles.toggleText}>{t.done ? 'geri al' : 'tamamla'}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}

            {recurringTasks.length === 0 && tasks.length === 0 && (
              <Text style={modalStyles.mutedText}>Bu konu için henüz planlanmış bir görev yok.</Text>
            )}
          </ScrollView>

          <View style={{ marginTop: 14 }}>
            <PrimaryButton label="+ Görev oluştur" onPress={onCreateTask} />
          </View>
          <View style={{ marginTop: 8 }}>
            <GhostButton label="+ Aylık hedef oluştur" onPress={onCreateMonth} />
          </View>
          <View style={{ marginTop: 8 }}>
            <GhostButton label="Vazgeç" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', padding: 20 },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sheetTitle: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 10 },
  sheetSubheading: { color: colors.textMuted, fontSize: 11, fontWeight: '700', marginTop: 8, marginBottom: 4 },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sheetItemTitle: { color: colors.text, fontSize: 13, fontWeight: '600' },
  doneText: { textDecorationLine: 'line-through' },
  mutedText: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  toggleText: { color: colors.primary, fontSize: 12, fontWeight: '700' },
});

export default function CurriculumScreen({ navigation }) {
  const planner = usePlanner();
  const grade = planner.gradeLevel;
  const [expanded, setExpanded] = useState({});
  const [addFor, setAddFor] = useState(null);
  const [editTopic, setEditTopic] = useState(null);
  const [planFor, setPlanFor] = useState(null);
  const [planChoice, setPlanChoice] = useState(PLAN_CHOICE.NONE);
  const [recurring, setRecurring] = useState(false);
  const [recurringDays, setRecurringDays] = useState([1, 2, 3, 4, 5]);
  const [recurringMonthId, setRecurringMonthId] = useState(null);
  const [recurringEndDate, setRecurringEndDate] = useState('');
  const [pendingMonthTitle, setPendingMonthTitle] = useState('');
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);

  const toggle = (subject) => setExpanded((e) => ({ ...e, [subject]: !e[subject] }));

  const closePlan = () => {
    setPlanFor(null);
    setPlanChoice(PLAN_CHOICE.NONE);
    setRecurring(false);
    setRecurringDays([1, 2, 3, 4, 5]);
    setRecurringMonthId(null);
    setRecurringEndDate('');
    setMonthPickerVisible(false);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.gradeHint}>Sınıfını seç — bu seçim tüm uygulamada kullanılır.</Text>
      <View style={styles.gradeRow}>
        {GRADES.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.gradeBtn, grade === g && styles.gradeBtnActive]}
            onPress={() => planner.setGrade(g)}
          >
            <Text style={[styles.gradeBtnText, grade === g && styles.gradeBtnTextActive]}>{g}. Sınıf</Text>
          </TouchableOpacity>
        ))}
      </View>

      {SUBJECTS_BY_GRADE[grade].map((subject) => {
        const topics = planner.curriculum.filter((t) => t.gradeLevel === grade && t.subject === subject);
        const isOpen = !!expanded[subject];
        return (
          <Card key={subject}>
            <TouchableOpacity onPress={() => toggle(subject)} style={styles.subjectHeader}>
              <View style={[styles.dot, { backgroundColor: subjectColor(subject) }]} />
              <Text style={styles.subjectTitle}>{subject}</Text>
              <Text style={styles.subjectCount}>{topics.length} konu</Text>
            </TouchableOpacity>

            {isOpen && (
              <View style={{ marginTop: 8 }}>
                {topics.length === 0 && <Text style={styles.mutedText}>Henüz konu eklenmedi.</Text>}
                {topics.map((topic) => (
                  <View key={topic.id} style={styles.topicRow}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => setEditTopic(topic)}>
                      <Text style={styles.topicText}>
                        {topic.title}
                        {topic.custom ? ' ✎' : ''}
                      </Text>
                    </TouchableOpacity>
                    <GhostButton label="Planla" onPress={() => setPlanFor(topic)} />
                  </View>
                ))}
                <View style={{ marginTop: 8 }}>
                  <GhostButton label="+ Konu Ekle" onPress={() => setAddFor(subject)} />
                </View>
              </View>
            )}
          </Card>
        );
      })}

      <PromptModal
        visible={!!addFor}
        title={`${addFor} — yeni konu`}
        fields={[{ key: 'title', label: 'Konu adı' }]}
        initialValues={{ title: '' }}
        onCancel={() => setAddFor(null)}
        onSubmit={(values) => {
          if (!values.title) return;
          planner.addTopic({ gradeLevel: grade, subject: addFor, title: values.title });
          setAddFor(null);
        }}
      />

      <PromptModal
        visible={!!editTopic}
        title="Konuyu düzenle"
        fields={[{ key: 'title', label: 'Konu adı' }]}
        initialValues={{ title: editTopic ? editTopic.title : '' }}
        onCancel={() => setEditTopic(null)}
        onSubmit={(values) => {
          if (!values.title) return;
          planner.updateTopic(editTopic.id, { title: values.title });
          setEditTopic(null);
        }}
      />

      <TopicPlanModal
        visible={!!planFor && planChoice === PLAN_CHOICE.NONE}
        topic={planFor}
        tasks={planFor ? planner.tasks.filter((t) => t.topicId === planFor.id) : []}
        recurringTasks={planFor ? planner.recurringTasks.filter((r) => r.topicId === planFor.id) : []}
        onToggleTaskDone={planner.toggleTaskDone}
        onToggleRecurringActive={planner.setRecurringActive}
        onCreateTask={() => setPlanChoice(PLAN_CHOICE.TASK)}
        onCreateMonth={() => setPlanChoice(PLAN_CHOICE.MONTH)}
        onCancel={closePlan}
      />

      <PromptModal
        visible={planChoice === PLAN_CHOICE.TASK}
        title="Yeni görev"
        fields={[
          { key: 'title', label: 'Görev', placeholder: planFor ? planFor.title : '' },
          { key: 'estMinutes', label: 'Tahmini süre (dk)', placeholder: '20', numeric: true },
        ]}
        initialValues={{ title: planFor ? planFor.title : '', estMinutes: '20' }}
        onCancel={closePlan}
        renderExtra={() => (
          <RecurringFields
            enabled={recurring}
            onToggleEnabled={setRecurring}
            days={recurringDays}
            onChangeDays={setRecurringDays}
            monthGoals={planner.monthGoals}
            monthId={recurringMonthId}
            onChangeMonthId={setRecurringMonthId}
            endDate={recurringEndDate}
            onChangeEndDate={setRecurringEndDate}
          />
        )}
        onSubmit={(values) => {
          if (!values.title || !planFor) return;
          const estMinutes = Number(values.estMinutes) || 15;
          if (recurring) {
            planner.addRecurringTask({
              subject: planFor.subject,
              topicId: planFor.id,
              title: values.title,
              estMinutes,
              daysOfWeek: recurringDays,
              monthId: recurringMonthId || null,
              endDate: recurringEndDate || null,
            });
          } else {
            planner.addTask(null, {
              subject: planFor.subject,
              topicId: planFor.id,
              title: values.title,
              estMinutes,
              dueDate: todayStr(),
            });
          }
          closePlan();
        }}
      />

      <PromptModal
        visible={planChoice === PLAN_CHOICE.MONTH}
        title="Yeni aylık hedef"
        fields={[{ key: 'title', label: 'Başlık' }]}
        initialValues={{ title: planFor ? `${planFor.subject}: ${planFor.title}` : '' }}
        onCancel={closePlan}
        onSubmit={(values) => {
          if (!values.title) return;
          setPendingMonthTitle(values.title);
          setPlanChoice(PLAN_CHOICE.NONE);
          setMonthPickerVisible(true);
        }}
      />

      <MultiChoiceModal
        visible={monthPickerVisible}
        title="Hangi aylara ait olsun? (birden fazla seçebilirsin)"
        options={MONTH_OPTIONS}
        onCancel={closePlan}
        onConfirm={(values) => {
          if (!planFor) return;
          let firstMonthId = null;
          values.forEach((value) => {
            const opt = MONTH_OPTIONS.find((o) => o.value === value);
            const monthId = uid('month');
            if (!firstMonthId) firstMonthId = monthId;
            planner.addMonthGoal({
              id: monthId,
              title: pendingMonthTitle,
              subject: planFor.subject,
              topicId: planFor.id,
              year: opt.year,
              month: opt.month,
            });
          });
          closePlan();
          if (firstMonthId) navigation.navigate('Hedefler', { screen: 'MonthDetail', params: { monthId: firstMonthId } });
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  gradeHint: { color: colors.textMuted, fontSize: 11, marginBottom: 6 },
  gradeRow: { flexDirection: 'row', marginBottom: 14, gap: 8 },
  gradeBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  gradeBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  gradeBtnText: { color: colors.text, fontWeight: '700', fontSize: 13 },
  gradeBtnTextActive: { color: '#0f172a' },
  subjectHeader: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  subjectTitle: { color: colors.text, fontSize: 15, fontWeight: '700', flex: 1 },
  subjectCount: { color: colors.textMuted, fontSize: 12 },
  mutedText: { color: colors.textMuted, fontSize: 13, marginBottom: 8 },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topicText: { color: colors.text, fontSize: 13, flex: 1, marginRight: 8 },
});

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors, subjectColor } from '../theme';
import { Card, SectionTitle, Chip, PrimaryButton, GhostButton, EmptyState, Field } from '../components/common';
import PromptModal from '../components/PromptModal';
import MultiChoiceModal from '../components/MultiChoiceModal';
import ChoiceModal from '../components/ChoiceModal';
import CurriculumPicker from '../components/CurriculumPicker';
import WeekdayPicker, { describeDays } from '../components/WeekdayPicker';
import { SUBJECTS_BY_GRADE } from '../data/curriculum';
import { formatMonthLabel, nextMonths } from '../logic/calendar';

const MONTH_OPTIONS = nextMonths(12).map((m) => ({
  label: formatMonthLabel(m.year, m.month),
  value: `${m.year}-${m.month}`,
  year: m.year,
  month: m.month,
}));

const NONE_MONTH_VALUE = '__none__';

export default function GoalsScreen({ navigation }) {
  const planner = usePlanner();
  const [yearModal, setYearModal] = useState(false);
  const [monthModal, setMonthModal] = useState(false);
  const [pendingMonthTitle, setPendingMonthTitle] = useState('');
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const [editingRecurringId, setEditingRecurringId] = useState(null);
  const [editRecurringDays, setEditRecurringDays] = useState([1, 2, 3, 4, 5]);
  const [editRecurringPickerVisible, setEditRecurringPickerVisible] = useState(false);
  const [editRecurringDraft, setEditRecurringDraft] = useState(null);
  const [editRecurringMonthId, setEditRecurringMonthId] = useState(null);
  const [editRecurringEndDate, setEditRecurringEndDate] = useState('');
  const [editRecurringMonthPickerVisible, setEditRecurringMonthPickerVisible] = useState(false);

  const weeksFor = (monthId) => planner.weekGoals.filter((w) => w.monthId === monthId);
  const taskCountFor = (weekId) => planner.tasks.filter((t) => t.weekId === weekId).length;

  const subjects = SUBJECTS_BY_GRADE[planner.gradeLevel] || [];
  const topics = planner.curriculum.filter((t) => t.gradeLevel === planner.gradeLevel);
  const editingRecurring = planner.recurringTasks.find((r) => r.id === editingRecurringId) || null;
  const topicTitleForRecurring = (r) => {
    if (!r || !r.topicId) return null;
    const topic = planner.curriculum.find((t) => t.id === r.topicId);
    return topic ? topic.title : null;
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.gradeInfo}>Sınıf: {planner.gradeLevel} (Müfredat sekmesinden değiştirilir)</Text>

      <SectionTitle>Yıllık hedef</SectionTitle>
      <Card>
        {planner.yearGoal ? (
          <>
            <Text style={styles.yearTitle}>{planner.yearGoal.title}</Text>
            {!!planner.yearGoal.targetSchool && (
              <Text style={styles.yearSub}>Hedef lise: {planner.yearGoal.targetSchool}</Text>
            )}
            {!!planner.yearGoal.targetScore && (
              <Text style={styles.yearSub}>Hedef puan: {planner.yearGoal.targetScore}</Text>
            )}
          </>
        ) : (
          <Text style={styles.mutedText}>Henüz bir yıllık hedef belirlemedin.</Text>
        )}
        <View style={{ marginTop: 10 }}>
          <GhostButton label={planner.yearGoal ? 'Hedefi düzenle' : 'Hedef belirle'} onPress={() => setYearModal(true)} />
        </View>
      </Card>

      <SectionTitle>Aylık hedefler</SectionTitle>
      {planner.monthGoals.length === 0 ? (
        <EmptyState text="Henüz aylık hedef yok." />
      ) : (
        planner.monthGoals.map((month) => {
          const weeks = weeksFor(month.id);
          return (
            <Card key={month.id}>
              <TouchableOpacity onPress={() => navigation.navigate('MonthDetail', { monthId: month.id })}>
                <Text style={styles.monthTitle}>{month.title}</Text>
                <View style={styles.chipRow}>
                  {!!(month.year && month.month) && (
                    <Chip label={formatMonthLabel(month.year, month.month)} color={colors.gold} />
                  )}
                  {!!month.subject && <Chip label={month.subject} color={subjectColor(month.subject)} />}
                </View>
              </TouchableOpacity>

              {weeks.length === 0 ? (
                <Text style={styles.mutedText}>Henüz haftalık plan yok.</Text>
              ) : (
                <View style={styles.weeksInline}>
                  {weeks.map((week) => (
                    <TouchableOpacity
                      key={week.id}
                      style={styles.weekInlineRow}
                      onPress={() => navigation.navigate('WeekDetail', { weekId: week.id })}
                    >
                      <Text style={styles.weekInlineText}>{week.title}</Text>
                      <Text style={styles.mutedText}>{taskCountFor(week.id)} görev</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </Card>
          );
        })
      )}
      <PrimaryButton label="+ Aylık Hedef Ekle" onPress={() => setMonthModal(true)} />

      <SectionTitle>Tekrarlayan görevler</SectionTitle>
      {planner.recurringTasks.length === 0 ? (
        <EmptyState text="Henüz periyodik bir görev yok. Müfredat'tan bir konuya 'Planla' diyerek ekleyebilirsin." />
      ) : (
        planner.recurringTasks.map((r) => (
          <Card key={r.id}>
            <View style={styles.recurRow}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.monthTitle, !r.active && styles.mutedText]}>{r.title}</Text>
                <View style={styles.recurMeta}>
                  <Chip label={r.subject} color={subjectColor(r.subject)} />
                  <Text style={styles.mutedText}>{describeDays(r.daysOfWeek)} · {r.estMinutes} dk</Text>
                </View>
                {!!topicTitleForRecurring(r) && <Text style={styles.mutedText}>📖 {topicTitleForRecurring(r)}</Text>}
                {!!r.monthId && (
                  <Text style={styles.mutedText}>
                    🗓 {planner.monthGoals.find((m) => m.id === r.monthId)?.title || 'aylık hedef'}
                    {r.endDate ? ` · ${r.endDate} tarihine kadar` : ''}
                  </Text>
                )}
              </View>
              <View style={styles.recurActions}>
                <TouchableOpacity
                  onPress={() => {
                    setEditingRecurringId(r.id);
                    setEditRecurringDays(r.daysOfWeek);
                    setEditRecurringMonthId(r.monthId || null);
                    setEditRecurringEndDate(r.endDate || '');
                  }}
                >
                  <Text style={styles.editText}>düzenle</Text>
                </TouchableOpacity>
                <GhostButton
                  label={r.active ? 'Aktif' : 'Pasif'}
                  onPress={() => planner.setRecurringActive(r.id, !r.active)}
                />
              </View>
            </View>
          </Card>
        ))
      )}

      <PromptModal
        visible={yearModal}
        title="Yıllık hedef"
        fields={[
          { key: 'title', label: 'Başlık', placeholder: 'örn. LGS 2027 hazırlığı' },
          { key: 'targetSchool', label: 'Hedef lise (opsiyonel)', placeholder: '' },
          { key: 'targetScore', label: 'Hedef puan (opsiyonel)', placeholder: '470', numeric: true },
        ]}
        initialValues={planner.yearGoal || { title: '', targetSchool: '', targetScore: '' }}
        onCancel={() => setYearModal(false)}
        onSubmit={(values) => {
          if (!values.title) return;
          planner.setYearGoal(values);
          setYearModal(false);
        }}
      />

      <PromptModal
        visible={monthModal}
        title="Yeni aylık hedef"
        fields={[{ key: 'title', label: 'Başlık', placeholder: 'örn. Kesirler ve Basınç' }]}
        initialValues={{ title: '' }}
        onCancel={() => setMonthModal(false)}
        onSubmit={(values) => {
          if (!values.title) return;
          setPendingMonthTitle(values.title);
          setMonthModal(false);
          setMonthPickerVisible(true);
        }}
      />

      <MultiChoiceModal
        visible={monthPickerVisible}
        title="Hangi aylara ait olsun? (birden fazla seçebilirsin)"
        options={MONTH_OPTIONS}
        onCancel={() => setMonthPickerVisible(false)}
        onConfirm={(values) => {
          values.forEach((value) => {
            const opt = MONTH_OPTIONS.find((o) => o.value === value);
            planner.addMonthGoal({ title: pendingMonthTitle, year: opt.year, month: opt.month });
          });
          setMonthPickerVisible(false);
        }}
      />

      <PromptModal
        visible={!!editingRecurringId}
        title="Periyodik görevi düzenle"
        fields={[
          { key: 'title', label: 'Görev' },
          { key: 'estMinutes', label: 'Tahmini süre (dk)', numeric: true },
        ]}
        initialValues={{
          title: editingRecurring ? editingRecurring.title : '',
          estMinutes: editingRecurring ? String(editingRecurring.estMinutes) : '',
        }}
        onCancel={() => setEditingRecurringId(null)}
        renderExtra={(values) => {
          const linkedMonth = editRecurringMonthId
            ? planner.monthGoals.find((m) => m.id === editRecurringMonthId)
            : null;
          return (
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.mutedText}>Hangi günler?</Text>
              <WeekdayPicker days={editRecurringDays} onChange={setEditRecurringDays} />
              <Text style={styles.mutedText}>
                Ders: {editingRecurring ? editingRecurring.subject : ''}
                {editingRecurring && topicTitleForRecurring(editingRecurring)
                  ? ` · ${topicTitleForRecurring(editingRecurring)}`
                  : ''}
              </Text>
              <View style={{ marginTop: 8 }}>
                <GhostButton
                  label="Ders / Konu değiştir"
                  onPress={() => {
                    setEditRecurringDraft({ id: editingRecurringId, title: values.title, estMinutes: values.estMinutes });
                    setEditingRecurringId(null);
                    setEditRecurringPickerVisible(true);
                  }}
                />
              </View>
              <Text style={styles.mutedText}>Hangi aylık hedefe bağlı? (opsiyonel)</Text>
              <GhostButton
                label={linkedMonth ? linkedMonth.title : 'Bağımsız (belirli bir aya bağlı değil)'}
                onPress={() => setEditRecurringMonthPickerVisible(true)}
              />
              {!!linkedMonth && (
                <Field
                  label="Son tekrar tarihi (opsiyonel, YYYY-AA-GG)"
                  placeholder={`örn. ${linkedMonth.title} bitimine kadar boş bırak`}
                  value={editRecurringEndDate}
                  onChangeText={setEditRecurringEndDate}
                />
              )}
            </View>
          );
        }}
        onSubmit={(values) => {
          if (!values.title || !editingRecurringId) return;
          planner.updateRecurringTask(editingRecurringId, {
            title: values.title,
            estMinutes: Number(values.estMinutes) || editingRecurring.estMinutes,
            daysOfWeek: editRecurringDays,
            monthId: editRecurringMonthId || null,
            endDate: editRecurringEndDate || null,
          });
          setEditingRecurringId(null);
        }}
      />

      <ChoiceModal
        visible={editRecurringMonthPickerVisible}
        title="Hangi aylık hedefe bağlı olsun?"
        options={[
          { label: 'Bağımsız (belirli bir aya bağlı değil)', value: NONE_MONTH_VALUE },
          ...planner.monthGoals.map((m) => ({ label: m.title, value: m.id })),
        ]}
        onCancel={() => setEditRecurringMonthPickerVisible(false)}
        onSelect={(value) => {
          setEditRecurringMonthId(value === NONE_MONTH_VALUE ? null : value);
          if (value === NONE_MONTH_VALUE) setEditRecurringEndDate('');
          setEditRecurringMonthPickerVisible(false);
        }}
      />

      <CurriculumPicker
        visible={editRecurringPickerVisible}
        subjects={subjects}
        topics={topics}
        onCancel={() => {
          setEditRecurringPickerVisible(false);
          setEditRecurringDraft(null);
        }}
        onSelect={(subject, topicId) => {
          if (editRecurringDraft) {
            planner.updateRecurringTask(editRecurringDraft.id, {
              title: editRecurringDraft.title,
              estMinutes: Number(editRecurringDraft.estMinutes) || 15,
              daysOfWeek: editRecurringDays,
              monthId: editRecurringMonthId || null,
              endDate: editRecurringEndDate || null,
              subject,
              topicId,
            });
          }
          setEditRecurringPickerVisible(false);
          setEditRecurringDraft(null);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  gradeInfo: { color: colors.textMuted, fontSize: 12, marginBottom: 10 },
  yearTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  yearSub: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  monthTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  mutedText: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  weeksInline: { marginTop: 10, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 8 },
  weekInlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  weekInlineText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  recurRow: { flexDirection: 'row', alignItems: 'center' },
  recurMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
  recurActions: { alignItems: 'flex-end', gap: 6 },
  editText: { color: colors.textMuted, fontSize: 12, fontWeight: '600', textDecorationLine: 'underline' },
});

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors, subjectColor } from '../theme';
import { Card, SectionTitle, Chip, PrimaryButton, GhostButton, EmptyState } from '../components/common';
import PromptModal from '../components/PromptModal';
import ChoiceModal from '../components/ChoiceModal';
import { describeDays } from '../components/WeekdayPicker';
import { formatMonthLabel, nextMonths } from '../logic/calendar';

const MONTH_OPTIONS = nextMonths(12).map((m) => ({
  label: formatMonthLabel(m.year, m.month),
  value: `${m.year}-${m.month}`,
  year: m.year,
  month: m.month,
}));

export default function GoalsScreen({ navigation }) {
  const planner = usePlanner();
  const [yearModal, setYearModal] = useState(false);
  const [monthModal, setMonthModal] = useState(false);
  const [pendingMonthTitle, setPendingMonthTitle] = useState('');
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);

  const weekCountFor = (monthId) => planner.weekGoals.filter((w) => w.monthId === monthId).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.gradeInfo}>Sınıf: {planner.gradeLevel} (Müfredat sekmesinden değiştirilir)</Text>

      <GhostButton label="📅 Takvimi Gör" onPress={() => navigation.navigate('Calendar')} />

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
        planner.monthGoals.map((month) => (
          <TouchableOpacity key={month.id} onPress={() => navigation.navigate('MonthDetail', { monthId: month.id })}>
            <Card>
              <Text style={styles.monthTitle}>{month.title}</Text>
              <View style={styles.chipRow}>
                {!!(month.year && month.month) && (
                  <Chip label={formatMonthLabel(month.year, month.month)} color={colors.gold} />
                )}
                {!!month.subject && <Chip label={month.subject} color={subjectColor(month.subject)} />}
              </View>
              <Text style={styles.mutedText}>{weekCountFor(month.id)} haftalık plan</Text>
            </Card>
          </TouchableOpacity>
        ))
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
              </View>
              <GhostButton
                label={r.active ? 'Aktif' : 'Pasif'}
                onPress={() => planner.setRecurringActive(r.id, !r.active)}
              />
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

      <ChoiceModal
        visible={monthPickerVisible}
        title="Hangi aya ait olsun?"
        options={MONTH_OPTIONS}
        onCancel={() => setMonthPickerVisible(false)}
        onSelect={(value) => {
          const opt = MONTH_OPTIONS.find((o) => o.value === value);
          planner.addMonthGoal({ title: pendingMonthTitle, year: opt.year, month: opt.month });
          setMonthPickerVisible(false);
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
  recurRow: { flexDirection: 'row', alignItems: 'center' },
  recurMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 },
});

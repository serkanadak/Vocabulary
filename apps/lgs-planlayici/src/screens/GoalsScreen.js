import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors } from '../theme';
import { Card, SectionTitle, PrimaryButton, GhostButton, EmptyState } from '../components/common';
import PromptModal from '../components/PromptModal';
import ChoiceModal from '../components/ChoiceModal';
import { GRADES } from '../data/curriculum';

export default function GoalsScreen({ navigation }) {
  const planner = usePlanner();
  const [yearModal, setYearModal] = useState(false);
  const [monthModal, setMonthModal] = useState(false);
  const [gradeModal, setGradeModal] = useState(false);

  const weekCountFor = (monthId) => planner.weekGoals.filter((w) => w.monthId === monthId).length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <Card>
        <View style={styles.gradeRow}>
          <Text style={styles.gradeLabel}>Sınıf: {planner.gradeLevel}</Text>
          <GhostButton label="Değiştir" onPress={() => setGradeModal(true)} />
        </View>
      </Card>

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
              <Text style={styles.mutedText}>{weekCountFor(month.id)} haftalık plan</Text>
            </Card>
          </TouchableOpacity>
        ))
      )}
      <PrimaryButton label="+ Aylık Hedef Ekle" onPress={() => setMonthModal(true)} />

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
        fields={[{ key: 'title', label: 'Başlık', placeholder: 'örn. Ekim: Kesirler ve Basınç' }]}
        initialValues={{ title: '' }}
        onCancel={() => setMonthModal(false)}
        onSubmit={(values) => {
          if (!values.title) return;
          planner.addMonthGoal({ title: values.title });
          setMonthModal(false);
        }}
      />

      <ChoiceModal
        visible={gradeModal}
        title="Sınıf seç"
        options={GRADES.map((g) => ({ label: `${g}. sınıf`, value: g }))}
        onCancel={() => setGradeModal(false)}
        onSelect={(g) => {
          planner.setGrade(g);
          setGradeModal(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  gradeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  gradeLabel: { color: colors.text, fontSize: 15, fontWeight: '700' },
  yearTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  yearSub: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  monthTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  mutedText: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
});

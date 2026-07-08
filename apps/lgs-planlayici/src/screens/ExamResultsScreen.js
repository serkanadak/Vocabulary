import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors, subjectColor } from '../theme';
import { Card, SectionTitle, ProgressBar, PrimaryButton, EmptyState } from '../components/common';
import PromptModal from '../components/PromptModal';
import { SUBJECTS_BY_GRADE } from '../data/curriculum';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function ExamResultsScreen() {
  const planner = usePlanner();
  const [modalVisible, setModalVisible] = useState(false);
  const subjects = SUBJECTS_BY_GRADE[planner.gradeLevel] || [];

  const results = [...planner.examResults].sort((a, b) => (a.date < b.date ? 1 : -1));
  const maxNet = Math.max(1, ...results.map((r) => r.totalNet));

  const fields = [
    { key: 'date', label: 'Tarih (YYYY-AA-GG)', placeholder: todayStr() },
    ...subjects.map((s) => ({ key: s, label: `${s} neti`, placeholder: '0', numeric: true })),
  ];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <SectionTitle>Deneme sonuçları</SectionTitle>
      {results.length === 0 ? (
        <EmptyState text="Henüz deneme sonucu eklenmedi." />
      ) : (
        results.map((r) => (
          <Card key={r.id}>
            <View style={styles.rowBetween}>
              <Text style={styles.date}>{r.date}</Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert('Sonucu sil', 'Bu deneme sonucu silinsin mi?', [
                    { text: 'Vazgeç', style: 'cancel' },
                    { text: 'Sil', style: 'destructive', onPress: () => planner.deleteExamResult(r.id) },
                  ])
                }
              >
                <Text style={styles.deleteText}>sil</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.totalNet}>{r.totalNet.toFixed(1)} net</Text>
            <ProgressBar ratio={r.totalNet / maxNet} color={colors.gold} />
            <View style={styles.subjectNets}>
              {Object.entries(r.nets || {}).map(([subject, net]) => (
                <View key={subject} style={styles.netChip}>
                  <View style={[styles.dot, { backgroundColor: subjectColor(subject) }]} />
                  <Text style={styles.netChipText}>
                    {subject}: {net}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        ))
      )}

      <PrimaryButton label="+ Deneme Sonucu Ekle" onPress={() => setModalVisible(true)} />

      <PromptModal
        visible={modalVisible}
        title="Yeni deneme sonucu"
        fields={fields}
        initialValues={{ date: todayStr() }}
        onCancel={() => setModalVisible(false)}
        onSubmit={(values) => {
          const nets = {};
          let total = 0;
          subjects.forEach((s) => {
            const n = parseFloat(String(values[s]).replace(',', '.')) || 0;
            nets[s] = n;
            total += n;
          });
          planner.addExamResult({
            date: values.date || todayStr(),
            gradeLevel: planner.gradeLevel,
            nets,
            totalNet: total,
          });
          setModalVisible(false);
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { color: colors.textMuted, fontSize: 12 },
  deleteText: { color: colors.danger, fontSize: 12 },
  totalNet: { color: colors.text, fontSize: 22, fontWeight: '800', marginVertical: 4 },
  subjectNets: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10, gap: 8 },
  netChip: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
  netChipText: { color: colors.textMuted, fontSize: 11 },
});

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors, subjectColor } from '../theme';
import { Card, SectionTitle, GhostButton } from '../components/common';
import PromptModal from '../components/PromptModal';
import { GRADES, SUBJECTS_BY_GRADE } from '../data/curriculum';

export default function CurriculumScreen() {
  const planner = usePlanner();
  const [grade, setGrade] = useState(planner.gradeLevel);
  const [expanded, setExpanded] = useState({});
  const [addFor, setAddFor] = useState(null);
  const [editTopic, setEditTopic] = useState(null);

  const toggle = (subject) => setExpanded((e) => ({ ...e, [subject]: !e[subject] }));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 16 }}>
      <View style={styles.gradeRow}>
        {GRADES.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.gradeBtn, grade === g && styles.gradeBtnActive]}
            onPress={() => setGrade(g)}
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
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert('Konuyu sil', `"${topic.title}" silinsin mi?`, [
                          { text: 'Vazgeç', style: 'cancel' },
                          { text: 'Sil', style: 'destructive', onPress: () => planner.deleteTopic(topic.id) },
                        ])
                      }
                    >
                      <Text style={styles.deleteText}>sil</Text>
                    </TouchableOpacity>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
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
  topicText: { color: colors.text, fontSize: 13 },
  deleteText: { color: colors.danger, fontSize: 12, marginLeft: 10 },
});

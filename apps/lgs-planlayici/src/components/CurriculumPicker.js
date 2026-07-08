import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { colors, subjectColor } from '../theme';
import { GhostButton } from './common';

// Görev eklerken tek adımda ders + konu seçtiren müfredat gezgini.
// Konu seçilince ders otomatik dolar; her dersin altında konu belirtmeden
// eklemek isteyenler için bir kaçış yolu da var.
export default function CurriculumPicker({ visible, subjects, topics, onSelect, onCancel }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (subject) => setExpanded((e) => ({ ...e, [subject]: !e[subject] }));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Ders / konu seç</Text>
          <ScrollView style={{ maxHeight: 380 }}>
            {subjects.map((subject) => {
              const subjectTopics = topics.filter((t) => t.subject === subject);
              const isOpen = !!expanded[subject];
              return (
                <View key={subject}>
                  <TouchableOpacity onPress={() => toggle(subject)} style={styles.subjectRow}>
                    <View style={[styles.dot, { backgroundColor: subjectColor(subject) }]} />
                    <Text style={styles.subjectText}>{subject}</Text>
                    <Text style={styles.subjectCount}>{subjectTopics.length} konu</Text>
                  </TouchableOpacity>
                  {isOpen && (
                    <View style={styles.topicList}>
                      <TouchableOpacity style={styles.topicRow} onPress={() => onSelect(subject, null)}>
                        <Text style={styles.freeTaskText}>Konu belirtmeden ekle</Text>
                      </TouchableOpacity>
                      {subjectTopics.map((topic) => (
                        <TouchableOpacity
                          key={topic.id}
                          style={styles.topicRow}
                          onPress={() => onSelect(subject, topic.id)}
                        >
                          <Text style={styles.topicText}>{topic.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </ScrollView>
          <View style={{ marginTop: 10 }}>
            <GhostButton label="Vazgeç" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', padding: 20 },
  sheet: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { color: colors.text, fontSize: 17, fontWeight: '700', marginBottom: 10 },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  subjectText: { color: colors.text, fontSize: 14, fontWeight: '700', flex: 1 },
  subjectCount: { color: colors.textMuted, fontSize: 11 },
  topicList: { paddingLeft: 18 },
  topicRow: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  topicText: { color: colors.text, fontSize: 13 },
  freeTaskText: { color: colors.textMuted, fontSize: 13, fontStyle: 'italic' },
});

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Card, SectionTitle } from './common';

function formatShortDate(dateStr) {
  return `${dateStr.slice(8, 10)}.${dateStr.slice(5, 7)}`;
}

function buildTSV(subjects, dates, examsByDate) {
  const header = ['Ders', ...dates.map(formatShortDate)].join('\t');
  const rows = subjects.map((subject) => {
    const cells = dates.map((d) => {
      const exam = examsByDate[d];
      const net = exam && exam.nets ? exam.nets[subject] : null;
      return net != null ? String(net) : '';
    });
    return [subject, ...cells].join('\t');
  });
  const totalRow = [
    'Toplam',
    ...dates.map((d) => {
      const exam = examsByDate[d];
      return exam ? exam.totalNet.toFixed(1) : '';
    }),
  ].join('\t');
  return [header, ...rows, totalRow].join('\n');
}

// Dersler satır, deneme tarihleri sütun olacak şekilde net tablosu —
// dışarı (Excel/Sheets/WhatsApp) kopyalanabilir ve yazdırılabilir.
export default function ExamTable({ examResults, subjects }) {
  const [copyStatus, setCopyStatus] = useState('');

  if (!examResults || examResults.length === 0 || !subjects || subjects.length === 0) return null;

  const sorted = [...examResults].sort((a, b) => (a.date < b.date ? -1 : 1));
  const dates = sorted.map((e) => e.date);
  const examsByDate = {};
  sorted.forEach((e) => {
    examsByDate[e.date] = e;
  });

  const handleCopy = async () => {
    const tsv = buildTSV(subjects, dates, examsByDate);
    if (Platform.OS === 'web' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(tsv);
        setCopyStatus('Kopyalandı!');
      } catch (e) {
        setCopyStatus('Kopyalanamadı');
      }
      setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  const handlePrint = () => {
    if (Platform.OS === 'web') window.print();
  };

  return (
    <View>
      <SectionTitle>Tarih bazında net tablosu</SectionTitle>
      <Card>
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View>
            <View style={styles.row}>
              <View style={[styles.cell, styles.subjectCell, styles.headerCell]}>
                <Text style={styles.headerText}>Ders</Text>
              </View>
              {dates.map((d) => (
                <View key={d} style={[styles.cell, styles.dateCell, styles.headerCell]}>
                  <Text style={styles.headerText}>{formatShortDate(d)}</Text>
                </View>
              ))}
            </View>
            {subjects.map((subject, idx) => (
              <View key={subject} style={[styles.row, idx % 2 === 1 && styles.rowAlt]}>
                <View style={[styles.cell, styles.subjectCell]}>
                  <Text style={styles.subjectText} numberOfLines={2}>
                    {subject}
                  </Text>
                </View>
                {dates.map((d) => {
                  const exam = examsByDate[d];
                  const net = exam && exam.nets ? exam.nets[subject] : null;
                  return (
                    <View key={d} style={[styles.cell, styles.dateCell]}>
                      <Text style={styles.cellText}>{net != null ? net : '-'}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
            <View style={[styles.row, styles.totalRow]}>
              <View style={[styles.cell, styles.subjectCell]}>
                <Text style={styles.totalText}>Toplam</Text>
              </View>
              {dates.map((d) => {
                const exam = examsByDate[d];
                return (
                  <View key={d} style={[styles.cell, styles.dateCell]}>
                    <Text style={styles.totalText}>{exam ? exam.totalNet.toFixed(1) : '-'}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleCopy}>
            <Text style={styles.actionBtnText}>{copyStatus || '📋 Kopyala'}</Text>
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity style={styles.actionBtn} onPress={handlePrint}>
            <Text style={styles.actionBtnText}>🖨️ Yazdır</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
  rowAlt: { backgroundColor: colors.surfaceAlt },
  totalRow: { borderTopWidth: 1.5, borderTopColor: colors.border },
  cell: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  subjectCell: { width: 130, alignItems: 'flex-start' },
  dateCell: { width: 60 },
  headerCell: { backgroundColor: colors.surfaceAlt },
  headerText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  subjectText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  cellText: { color: colors.text, fontSize: 12 },
  totalText: { color: colors.text, fontSize: 12, fontWeight: '800' },
  actionsRow: { flexDirection: 'row', marginTop: 12 },
  actionBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  actionBtnText: { color: colors.text, fontWeight: '700', fontSize: 13 },
});

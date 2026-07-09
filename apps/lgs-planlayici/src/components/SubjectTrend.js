import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, subjectColor } from '../theme';
import { Card, Chip } from './common';

// "YYYY-MM-DD" -> "GG.AA", grafik altında kısa tarih etiketi için.
function formatShortDate(dateStr) {
  return `${dateStr.slice(8, 10)}.${dateStr.slice(5, 7)}`;
}

// Bir dersin deneme net'lerini mini bar grafik olarak gösterir.
export default function SubjectTrend({ subject, points }) {
  const maxNet = Math.max(1, ...points.map((p) => p.net));
  const last = points[points.length - 1];
  const prev = points.length > 1 ? points[points.length - 2] : null;
  const delta = prev ? last.net - prev.net : null;

  return (
    <Card>
      <View style={styles.headerRow}>
        <Chip label={subject} color={subjectColor(subject)} />
        <Text style={styles.last}>{last.net.toFixed(1)} net</Text>
      </View>
      <View style={styles.barsRow}>
        {points.map((p, i) => (
          <View key={i} style={styles.barColumn}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { height: `${Math.max(8, (p.net / maxNet) * 100)}%`, backgroundColor: subjectColor(subject) },
                ]}
              />
            </View>
            <Text style={styles.barLabel} numberOfLines={1}>
              {formatShortDate(p.date)}
            </Text>
          </View>
        ))}
      </View>
      {delta !== null && (
        <Text style={[styles.delta, delta >= 0 ? styles.up : styles.down]}>
          {delta >= 0 ? '▲' : '▼'} {Math.abs(delta).toFixed(1)} önceki denemeye göre
        </Text>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  last: { color: colors.text, fontSize: 15, fontWeight: '800' },
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  barColumn: { flex: 1, alignItems: 'center' },
  barTrack: { width: '100%', height: 60, justifyContent: 'flex-end', backgroundColor: colors.surfaceAlt, borderRadius: 4, overflow: 'hidden' },
  barFill: { width: '100%', borderRadius: 4 },
  barLabel: { color: colors.textMuted, fontSize: 9, marginTop: 4, textAlign: 'center' },
  delta: { fontSize: 12, fontWeight: '700', marginTop: 8 },
  up: { color: colors.success },
  down: { color: colors.danger },
});

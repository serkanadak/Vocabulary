import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line, Circle, Text as SvgText } from 'react-native-svg';
import { WORDS } from '../data';
import { buildNeighborhood, radialLayout, RELATION_COLORS, RELATION_LABELS } from '../logic/graph';
import { colors } from '../theme';

const { width } = Dimensions.get('window');
const SIZE = Math.min(width - 24, 360);

// Kelime ilişki ağı görselleştirmesi (Özellik 6).
export default function GraphScreen({ route, navigation }) {
  const initialId = route.params?.id || WORDS[0]?.id;
  const [centerId, setCenterId] = useState(initialId);

  // Başka ekrandan id ile gelindiğinde merkezi güncelle.
  useEffect(() => {
    if (route.params?.id) setCenterId(route.params.id);
  }, [route.params?.id]);

  const graph = useMemo(() => buildNeighborhood(centerId), [centerId]);
  const positions = useMemo(() => radialLayout(graph, SIZE, SIZE), [graph]);
  const center = graph.nodes.find((n) => n.relation === 'center');

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 12 }}>
      <Text style={styles.title}>İlişki Ağı</Text>
      <Text style={styles.subtitle}>
        “{center?.headword}” kelimesinin eş/zıt anlam, kök ve ilişkili bağlantıları
      </Text>

      <View style={styles.canvas}>
        <Svg width={SIZE} height={SIZE}>
          {graph.edges.map((e, i) => {
            const a = positions[e.from];
            const b = positions[e.to];
            if (!a || !b) return null;
            return (
              <Line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={RELATION_COLORS[e.kind] || colors.border}
                strokeWidth={2}
                strokeOpacity={0.7}
              />
            );
          })}
          {graph.nodes.map((n) => {
            const p = positions[n.id];
            if (!p) return null;
            const isCenter = n.relation === 'center';
            const onTap = () => { if (!n.isLabel) setCenterId(n.id); };
            return (
              <React.Fragment key={n.id}>
                <Circle
                  cx={p.x}
                  cy={p.y}
                  r={isCenter ? 26 : 20}
                  fill={isCenter ? colors.primary : n.isLabel ? colors.surface : colors.surfaceAlt}
                  stroke={RELATION_COLORS[n.relation] || colors.border}
                  strokeWidth={2.5}
                  strokeDasharray={n.isLabel ? '3,3' : undefined}
                  onPress={onTap}
                />
                <SvgText
                  x={p.x}
                  y={p.y + 38}
                  fill={colors.text}
                  fontSize="11"
                  fontWeight="600"
                  textAnchor="middle"
                  onPress={onTap}
                >
                  {clip(n.headword)}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>

      <View style={styles.legend}>
        {Object.entries(RELATION_LABELS)
          .filter(([k]) => k !== 'center')
          .map(([k, label]) => (
            <View key={k} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: RELATION_COLORS[k] }]} />
              <Text style={styles.legendText}>{label}</Text>
            </View>
          ))}
      </View>

      <Text style={styles.hint}>Bir düğüme dokunarak ağda gezinebilirsin.</Text>

      <TouchableOpacity
        style={styles.detailBtn}
        onPress={() => navigation.navigate('WordDetail', { id: centerId })}
      >
        <Text style={styles.detailBtnText}>“{center?.headword}” detayını aç</Text>
      </TouchableOpacity>

      <View style={styles.related}>
        <Text style={styles.relatedTitle}>Bağlantılı kelimeler</Text>
        {graph.nodes
          .filter((n) => n.relation !== 'center')
          .map((n) => (
            <TouchableOpacity
              key={n.id}
              style={styles.relRow}
              onPress={() => { if (!n.isLabel) setCenterId(n.id); }}
              activeOpacity={n.isLabel ? 1 : 0.5}
            >
              <View style={[styles.dot, { backgroundColor: RELATION_COLORS[n.relation] }]} />
              <Text style={styles.relWord}>{n.headword}</Text>
              <Text style={styles.relKind}>
                {RELATION_LABELS[n.relation]}{n.isLabel ? ' (kart yok)' : ''}
              </Text>
            </TouchableOpacity>
          ))}
        {graph.nodes.length <= 1 && (
          <Text style={styles.hint}>Bu kelime için tanımlı bağlantı bulunamadı.</Text>
        )}
      </View>
    </ScrollView>
  );
}

function clip(s) {
  return s.length > 14 ? s.slice(0, 13) + '…' : s;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: colors.textMuted, marginTop: 4, marginBottom: 12 },
  canvas: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  legend: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 12, gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 6 },
  legendText: { color: colors.textMuted, fontSize: 12 },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 10, fontStyle: 'italic' },
  detailBtn: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  detailBtnText: { color: '#0f172a', fontWeight: '800' },
  related: { marginTop: 16 },
  relatedTitle: { color: colors.textMuted, fontWeight: '700', marginBottom: 8 },
  relRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  relWord: { color: colors.text, fontWeight: '700', flex: 1 },
  relKind: { color: colors.textMuted, fontSize: 12 },
});

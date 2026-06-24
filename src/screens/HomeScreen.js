import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { searchWords, STATS } from '../data';
import { useProgress } from '../state/ProgressContext';
import { LevelBadge, Badge } from '../components/common';
import { colors, STATUS_META } from '../theme';

export default function HomeScreen({ navigation }) {
  const { counts, byId } = useProgress();
  const [query, setQuery] = useState('');
  // Üstteki istatistik hücreleriyle alttaki listeyi süzme.
  const [statusFilter, setStatusFilter] = useState(null); // null | 'unknown' | 'passive' | 'active'

  const results = useMemo(() => {
    let base = searchWords(query);
    if (statusFilter) base = base.filter((w) => byId[w.id]?.status === statusFilter);
    return base.slice(0, 80);
  }, [query, statusFilter, byId]);

  const toggle = (key) => setStatusFilter((f) => (f === key ? null : key));

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View>
            <Text style={styles.brand}>Kelime Haritası</Text>
            <Text style={styles.tagline}>
              İşletme · Ekonomi · İletişim — CEFR A1-C2 İngilizce kelime kartları
            </Text>

            <View style={styles.statsRow}>
              <Stat
                label="Toplam kelime"
                value={STATS.total}
                color={colors.primary}
                selected={!statusFilter}
                onPress={() => setStatusFilter(null)}
              />
              <Stat
                label="Bilmiyorum"
                value={counts.unknown}
                color={STATUS_META.unknown.color}
                selected={statusFilter === 'unknown'}
                onPress={() => toggle('unknown')}
              />
              <Stat
                label="Pasif"
                value={counts.passive}
                color={STATUS_META.passive.color}
                selected={statusFilter === 'passive'}
                onPress={() => toggle('passive')}
              />
              <Stat
                label="Aktif"
                value={counts.active}
                color={STATUS_META.active.color}
                selected={statusFilter === 'active'}
                onPress={() => toggle('active')}
              />
            </View>

            <View style={styles.quickRow}>
              <QuickAction label="📇 Kartlar" onPress={() => navigation.navigate('Kartlar')} />
              <QuickAction label="📝 Test" onPress={() => navigation.navigate('Test')} />
              <QuickAction label="🕸️ Ağ" onPress={() => navigation.navigate('Ağ')} />
              <QuickAction label="📖 Oku" onPress={() => navigation.navigate('Oku')} />
            </View>

            <TextInput
              style={styles.search}
              placeholder="Kelime ya da anlam ara…"
              placeholderTextColor={colors.textMuted}
              value={query}
              onChangeText={setQuery}
              autoCorrect={false}
            />
            <Text style={styles.resultsLabel}>
              {statusFilter
                ? `${STATUS_META[statusFilter].label}: ${results.length} kelime` +
                  (results.length >= 80 ? ' (ilk 80)' : '')
                : query
                ? `${results.length} sonuç`
                : 'Tüm kelimeler — bir kategoriye dokunup süzebilirsin'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.wordRow}
            onPress={() => navigation.navigate('WordDetail', { id: item.id })}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.word}>{item.headword}</Text>
              <Text style={styles.meaning} numberOfLines={1}>
                {item.meanings[0].tr}
              </Text>
            </View>
            <View style={styles.rowBadges}>
              <LevelBadge level={item.level} />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {statusFilter
              ? `Bu kategoride henüz kelime yok. Kartlar'da kelimeleri "${STATUS_META[statusFilter].label}" olarak işaretledikçe burada görünür.`
              : 'Sonuç yok.'}
          </Text>
        }
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      />
    </View>
  );
}

function Stat({ label, value, color, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.stat, selected && { borderColor: color, backgroundColor: color + '22' }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function QuickAction({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.quick} onPress={onPress}>
      <Text style={styles.quickText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  brand: { color: colors.text, fontSize: 28, fontWeight: '800' },
  tagline: { color: colors.textMuted, marginTop: 4, marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { color: colors.textMuted, fontSize: 10, marginTop: 2, textAlign: 'center' },
  quickRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  quick: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  quickText: { color: colors.text, fontWeight: '700', fontSize: 12 },
  search: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resultsLabel: { color: colors.textMuted, marginTop: 12, marginBottom: 6, fontSize: 12 },
  empty: { color: colors.textMuted, fontSize: 13, lineHeight: 20, paddingVertical: 12 },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  word: { color: colors.text, fontSize: 16, fontWeight: '700' },
  meaning: { color: colors.textMuted, marginTop: 2 },
  rowBadges: { flexDirection: 'row' },
});

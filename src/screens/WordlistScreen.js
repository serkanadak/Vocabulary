import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { filterWordlist, WORDLIST_STATS, WORDLIST_LICENSE } from '../data';
import { useProgress } from '../state/ProgressContext';
import { STATUS } from '../logic/srs';
import { colors, STATUS_META, LEVEL_COLORS } from '../theme';
import { LevelBadge } from '../components/common';

const LEVELS = ['A1', 'A2', 'B1', 'B2'];
// Durum döngüsü: işaretsiz → bilmiyorum → pasif → aktif → işaretsiz
const CYCLE = [null, STATUS.UNKNOWN, STATUS.PASSIVE, STATUS.ACTIVE];

// CEFR Kelime Listesi (Özellik: geniş referans havuzu, seviyeye göre çalışma).
// Kaynak: CEFR-J Wordlist (atıf aşağıda gösterilir).
export default function WordlistScreen({ navigation }) {
  const { getProgress, setStatus, mergeProgress } = useProgress();
  const [query, setQuery] = useState('');
  const [levels, setLevels] = useState([]); // boş = tümü

  const data = useMemo(
    () => filterWordlist({ levels: levels.length ? levels : null, query }),
    [levels, query]
  );

  const toggleLevel = (lvl) =>
    setLevels((prev) => (prev.includes(lvl) ? prev.filter((l) => l !== lvl) : [...prev, lvl]));

  const cycleStatus = (item) => {
    const cur = getProgress(item.id)?.status || null;
    const next = CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length];
    if (next) setStatus(item.id, next);
    else mergeProgress(item.id, { status: undefined });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>CEFR Kelime Listesi</Text>
        <Text style={styles.subtitle}>
          {WORDLIST_STATS.total.toLocaleString('tr-TR')} kelime · seviyeye göre çalış ve işaretle
        </Text>

        <TextInput
          style={styles.search}
          placeholder="Listede ara…"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />

        <View style={styles.chips}>
          {LEVELS.map((lvl) => {
            const on = levels.includes(lvl);
            return (
              <TouchableOpacity
                key={lvl}
                style={[styles.chip, on && { backgroundColor: LEVEL_COLORS[lvl], borderColor: LEVEL_COLORS[lvl] }]}
                onPress={() => toggleLevel(lvl)}
              >
                <Text style={[styles.chipText, on && { color: '#0f172a' }]}>
                  {lvl} ({WORDLIST_STATS.byLevel[lvl] || 0})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.resultCount}>{data.length.toLocaleString('tr-TR')} sonuç</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        initialNumToRender={20}
        windowSize={10}
        removeClippedSubviews
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const status = getProgress(item.id)?.status || null;
          const meta = status ? STATUS_META[status] : null;
          return (
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.rowMain}
                onPress={() =>
                  navigation.navigate('WordDetail', {
                    id: item.wordId || item.id,
                    // Tam kartı olmayan liste kelimesi için yedek bilgi
                    fallback: item.wordId
                      ? undefined
                      : { headword: item.headword, level: item.level, pos: item.pos },
                  })
                }
              >
                <Text style={styles.word}>{item.headword}</Text>
                <Text style={styles.pos}>{item.pos}</Text>
              </TouchableOpacity>
              <Text style={styles.hasDetail}>{item.wordId ? 'anlamlı ›' : '›'}</Text>
              <LevelBadge level={item.level} />
              <TouchableOpacity
                style={[styles.statusDot, { borderColor: meta?.color || colors.border, backgroundColor: meta?.color || 'transparent' }]}
                onPress={() => cycleStatus(item)}
              >
                <Text style={[styles.statusDotText, { color: meta ? '#0f172a' : colors.textMuted }]}>
                  {status ? meta.label[0] : '+'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={
          <Text style={styles.license}>Kaynak: {WORDLIST_LICENSE}</Text>
        }
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { padding: 16, paddingBottom: 8 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: colors.textMuted, marginTop: 4, marginBottom: 12 },
  search: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: { color: colors.textMuted, fontWeight: '700', fontSize: 12 },
  resultCount: { color: colors.textMuted, fontSize: 12, marginTop: 10 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 8,
  },
  rowMain: { flex: 1 },
  word: { color: colors.text, fontSize: 15, fontWeight: '700' },
  pos: { color: colors.textMuted, fontSize: 11, fontStyle: 'italic' },
  hasDetail: { color: colors.primary, fontSize: 11, fontWeight: '700' },
  statusDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDotText: { fontWeight: '800', fontSize: 13 },
  license: { color: colors.textMuted, fontSize: 11, marginTop: 14, lineHeight: 16, fontStyle: 'italic' },
});

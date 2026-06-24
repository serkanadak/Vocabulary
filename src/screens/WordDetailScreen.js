import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { getWord } from '../data';
import { useProgress } from '../state/ProgressContext';
import { STATUS } from '../logic/srs';
import { StatusPicker, LevelBadge, Badge } from '../components/common';
import { colors } from '../theme';
import { TYPES } from '../data/schema';

export default function WordDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const word = getWord(id);
  const { getProgress, setStatus } = useProgress();

  if (!word) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Kelime bulunamadı.</Text>
      </View>
    );
  }

  // İşaretsiz kelimeler varsayılan olarak "Bilmiyorum" kabul edilir.
  const status = getProgress(word.id)?.status || STATUS.UNKNOWN;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.headword}>{word.headword}</Text>
      {!!word.pronunciation && <Text style={styles.pron}>{word.pronunciation}</Text>}
      <Text style={styles.pos}>{word.pos}</Text>
      <View style={styles.row}>
        <LevelBadge level={word.level} />
        <Badge label={TYPES[word.type] || word.type} color={colors.primary} />
        {word.domains.map((d) => (
          <Badge key={d} label={d} />
        ))}
      </View>

      <Section title="Anlamlar ve örnek cümleler">
        {word.meanings.map((m, i) => (
          <View key={i} style={styles.meaningBlock}>
            <Text style={styles.meaningTr}>{i + 1}. {m.tr}</Text>
            {!!m.en && <Text style={styles.meaningEn}>{m.en}</Text>}
            <Text style={styles.exampleEn}>“{m.exampleEn}”</Text>
            {!!m.exampleTr && <Text style={styles.exampleTr}>{m.exampleTr}</Text>}
          </View>
        ))}
      </Section>

      {!!word.synonyms?.length && (
        <Section title="Eş anlamlılar">
          <Text style={[styles.list, { color: colors.active }]}>{word.synonyms.join(', ')}</Text>
        </Section>
      )}
      {!!word.antonyms?.length && (
        <Section title="Zıt anlamlılar">
          <Text style={[styles.list, { color: colors.unknown }]}>{word.antonyms.join(', ')}</Text>
        </Section>
      )}
      {!!word.collocations?.length && (
        <Section title="Sık kullanımlar">
          <Text style={styles.list}>{word.collocations.join(' · ')}</Text>
        </Section>
      )}

      <Section title="Durumun">
        <StatusPicker value={status} onChange={(s) => setStatus(word.id, s)} />
      </Section>

      <TouchableOpacity
        style={styles.graphBtn}
        onPress={() => navigation.navigate('Ağ', { id: word.id })}
      >
        <Text style={styles.graphBtnText}>İlişki ağında göster →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  muted: { color: colors.textMuted },
  headword: { color: colors.text, fontSize: 30, fontWeight: '800' },
  pron: { color: colors.primary, fontSize: 16, marginTop: 4 },
  pos: { color: colors.textMuted, fontStyle: 'italic', marginTop: 2, marginBottom: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: { color: colors.textMuted, fontWeight: '700', marginBottom: 8, fontSize: 13 },
  meaningBlock: { marginBottom: 12 },
  meaningTr: { color: colors.text, fontSize: 16, fontWeight: '700' },
  meaningEn: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  exampleEn: { color: colors.text, marginTop: 6, fontStyle: 'italic' },
  exampleTr: { color: colors.textMuted, marginTop: 2 },
  list: { color: colors.text, lineHeight: 22 },
  graphBtn: {
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  graphBtnText: { color: '#0f172a', fontWeight: '800' },
});

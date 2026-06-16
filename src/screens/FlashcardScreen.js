import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { WORDS } from '../data';
import { useProgress } from '../state/ProgressContext';
import { selectForQuiz } from '../logic/srs';
import { StatusPicker, LevelBadge, Badge } from '../components/common';
import { colors } from '../theme';

// Bilinmeyen/pasif kelimelere öncelik vererek bir deste oluşturur (Özellik 4).
export default function FlashcardScreen({ navigation }) {
  const { getProgress, setStatus } = useProgress();

  const deck = useMemo(
    () => selectForQuiz(WORDS, getProgress, Math.min(WORDS.length, 40)),
    // Deste yalnızca ekran ilk açıldığında kurulur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const word = deck[index];

  if (!word) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Gösterilecek kart yok.</Text>
      </View>
    );
  }

  const status = getProgress(word.id)?.status;

  const next = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  };
  const prev = () => {
    setFlipped(false);
    setIndex((i) => (i - 1 + deck.length) % deck.length);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        {index + 1} / {deck.length}
      </Text>

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.card}
        onPress={() => setFlipped((f) => !f)}
      >
        {!flipped ? (
          <View style={styles.cardFace}>
            <Text style={styles.headword}>{word.headword}</Text>
            {!!word.pronunciation && <Text style={styles.pron}>{word.pronunciation}</Text>}
            <Text style={styles.pos}>{word.pos}</Text>
            <View style={styles.row}>
              <LevelBadge level={word.level} />
              {word.domains.map((d) => (
                <Badge key={d} label={d} />
              ))}
            </View>
            <Text style={styles.tapHint}>Anlamı görmek için dokun</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.cardBack}>
            {word.meanings.map((m, i) => (
              <View key={i} style={styles.meaningBlock}>
                <Text style={styles.meaningTr}>• {m.tr}</Text>
                {!!m.en && <Text style={styles.meaningEn}>{m.en}</Text>}
                <Text style={styles.exampleEn}>“{m.exampleEn}”</Text>
                {!!m.exampleTr && <Text style={styles.exampleTr}>{m.exampleTr}</Text>}
              </View>
            ))}
            {!!word.synonyms?.length && (
              <Text style={styles.relLine}>
                <Text style={styles.relLabelSyn}>Eş: </Text>
                {word.synonyms.join(', ')}
              </Text>
            )}
            {!!word.antonyms?.length && (
              <Text style={styles.relLine}>
                <Text style={styles.relLabelAnt}>Zıt: </Text>
                {word.antonyms.join(', ')}
              </Text>
            )}
          </ScrollView>
        )}
      </TouchableOpacity>

      <View style={styles.statusWrap}>
        <Text style={styles.statusTitle}>Bu kelimeyi:</Text>
        <StatusPicker value={status} onChange={(s) => setStatus(word.id, s)} />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.navBtn} onPress={prev}>
          <Text style={styles.navText}>‹ Önceki</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => navigation.navigate('WordDetail', { id: word.id })}
        >
          <Text style={styles.linkText}>Detay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkBtn}
          onPress={() => navigation.navigate('Ağ', { id: word.id })}
        >
          <Text style={styles.linkText}>Ağda gör</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={next}>
          <Text style={styles.navText}>Sonraki ›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  center: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  muted: { color: colors.textMuted },
  counter: { color: colors.textMuted, textAlign: 'center', marginBottom: 8 },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    justifyContent: 'center',
  },
  cardFace: { alignItems: 'center', justifyContent: 'center' },
  headword: { color: colors.text, fontSize: 34, fontWeight: '800', textAlign: 'center' },
  pron: { color: colors.primary, fontSize: 16, marginTop: 6 },
  pos: { color: colors.textMuted, fontStyle: 'italic', marginTop: 4, marginBottom: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  tapHint: { color: colors.textMuted, marginTop: 20, fontSize: 12 },
  cardBack: { paddingVertical: 4 },
  meaningBlock: { marginBottom: 14 },
  meaningTr: { color: colors.text, fontSize: 17, fontWeight: '700' },
  meaningEn: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  exampleEn: { color: colors.text, marginTop: 6, fontStyle: 'italic' },
  exampleTr: { color: colors.textMuted, marginTop: 2 },
  relLine: { color: colors.text, marginTop: 6 },
  relLabelSyn: { color: colors.active, fontWeight: '700' },
  relLabelAnt: { color: colors.unknown, fontWeight: '700' },
  statusWrap: { marginTop: 14 },
  statusTitle: { color: colors.textMuted, marginBottom: 6 },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, gap: 6 },
  navBtn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: colors.surfaceAlt },
  navText: { color: colors.text, fontWeight: '700' },
  linkBtn: { paddingVertical: 10, paddingHorizontal: 10, borderRadius: 12, borderWidth: 1, borderColor: colors.primary },
  linkText: { color: colors.primary, fontWeight: '700', fontSize: 12 },
});

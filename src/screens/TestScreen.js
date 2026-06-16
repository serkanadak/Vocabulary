import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WORDS } from '../data';
import { useProgress } from '../state/ProgressContext';
import { selectForQuiz, buildQuestion, updateProgressAfterAnswer } from '../logic/srs';
import { colors } from '../theme';

const QUIZ_SIZE = 10;

// Bilinmeyen ve pasif kelimelere öncelik veren çoktan seçmeli test (Özellik 4).
export default function TestScreen() {
  const { getProgress, mergeProgress } = useProgress();
  const [sessionKey, setSessionKey] = useState(0);

  const questions = useMemo(() => {
    const picked = selectForQuiz(WORDS, getProgress, QUIZ_SIZE);
    return picked.map((w) => buildQuestion(w, WORDS));
    // sessionKey değişince yeni test üretilir.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const q = questions[qIndex];
  const done = qIndex >= questions.length;

  if (done) {
    return (
      <View style={styles.center}>
        <Text style={styles.resultTitle}>Test bitti</Text>
        <Text style={styles.resultScore}>
          {score} / {questions.length} doğru
        </Text>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => {
            setScore(0);
            setQIndex(0);
            setSelected(null);
            setSessionKey((k) => k + 1);
          }}
        >
          <Text style={styles.primaryBtnText}>Yeni test başlat</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const answer = (opt) => {
    if (selected) return;
    const isCorrect = opt === q.correct;
    setSelected(opt);
    if (isCorrect) setScore((s) => s + 1);
    mergeProgress(q.word.id, updateProgressAfterAnswer(getProgress(q.word.id), isCorrect));
  };

  const goNext = () => {
    setSelected(null);
    setQIndex((i) => i + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        Soru {qIndex + 1} / {questions.length}
      </Text>
      <View style={styles.promptCard}>
        <Text style={styles.promptLabel}>Bu kelimenin anlamı nedir?</Text>
        <Text style={styles.prompt}>{q.prompt}</Text>
      </View>

      <View style={styles.options}>
        {q.options.map((opt) => {
          let state = null;
          if (selected) {
            if (opt === q.correct) state = 'correct';
            else if (opt === selected) state = 'wrong';
          }
          return (
            <TouchableOpacity
              key={opt}
              style={[
                styles.option,
                state === 'correct' && styles.optCorrect,
                state === 'wrong' && styles.optWrong,
              ]}
              onPress={() => answer(opt)}
              disabled={!!selected}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {!!selected && (
        <TouchableOpacity style={styles.primaryBtn} onPress={goNext}>
          <Text style={styles.primaryBtnText}>
            {qIndex + 1 >= questions.length ? 'Sonucu gör' : 'Sonraki soru →'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 16 },
  center: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: 24 },
  counter: { color: colors.textMuted, textAlign: 'center', marginBottom: 12 },
  promptCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  promptLabel: { color: colors.textMuted, marginBottom: 8 },
  prompt: { color: colors.text, fontSize: 28, fontWeight: '800', textAlign: 'center' },
  options: { marginTop: 18, gap: 10 },
  option: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optCorrect: { borderColor: colors.active, backgroundColor: '#14331f' },
  optWrong: { borderColor: colors.unknown, backgroundColor: '#3a1717' },
  optionText: { color: colors.text, fontSize: 15 },
  primaryBtn: {
    marginTop: 18,
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#0f172a', fontWeight: '800', fontSize: 16 },
  resultTitle: { color: colors.textMuted, fontSize: 18 },
  resultScore: { color: colors.text, fontSize: 40, fontWeight: '800', marginVertical: 16 },
});

import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { WORDS, applyEdits } from '../data';
import { useProgress } from '../state/ProgressContext';
import { selectForQuiz, STATUS } from '../logic/srs';
import { StatusPicker, LevelBadge, Badge } from '../components/common';
import { colors } from '../theme';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.28;

// Kaydırmalı + çevirmeli flashcard destesi. Bilinmeyen/pasif kelimelere
// öncelik verir (Özellik 4). Sağa kaydır = biliyorum, sola = bilmiyorum.
export default function FlashcardScreen({ navigation }) {
  const { getProgress, setStatus } = useProgress();

  const deck = useMemo(
    () => selectForQuiz(WORDS, getProgress, Math.min(WORDS.length, 40)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const position = useRef(new Animated.ValueXY()).current;
  const flip = useRef(new Animated.Value(0)).current;
  const flipValue = useRef(0);

  const baseWord = deck[index];
  const word = baseWord ? applyEdits(baseWord, getProgress(baseWord.id)?.edits) : null;

  const doFlip = () => {
    const to = flipValue.current === 0 ? 180 : 0;
    flipValue.current = to;
    setFlipped(to === 180);
    Animated.spring(flip, { toValue: to, useNativeDriver: true, friction: 8, tension: 10 }).start();
  };

  const resetFlip = () => {
    flipValue.current = 0;
    setFlipped(false);
    flip.setValue(0);
  };

  const advance = () => {
    resetFlip();
    position.setValue({ x: 0, y: 0 });
    setIndex((i) => (i + 1) % deck.length);
  };

  const onSwipeComplete = (dir) => {
    if (word) setStatus(word.id, dir === 'right' ? STATUS.ACTIVE : STATUS.UNKNOWN);
    advance();
  };

  const forceSwipe = (dir) => {
    Animated.timing(position, {
      toValue: { x: dir === 'right' ? width * 1.4 : -width * 1.4, y: 0 },
      duration: 220,
      useNativeDriver: true,
    }).start(() => onSwipeComplete(dir));
  };

  const resetPosition = () => {
    Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (e, g) => Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderMove: (e, g) => position.setValue({ x: g.dx, y: g.dy * 0.2 }),
      onPanResponderRelease: (e, g) => {
        if (g.dx > SWIPE_THRESHOLD) forceSwipe('right');
        else if (g.dx < -SWIPE_THRESHOLD) forceSwipe('left');
        else resetPosition();
      },
    })
  ).current;

  if (!word) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Gösterilecek kart yok.</Text>
      </View>
    );
  }

  // İşaretsiz kelimeler varsayılan olarak "Bilmiyorum" kabul edilir.
  const status = getProgress(word.id)?.status || STATUS.UNKNOWN;

  const rotate = position.x.interpolate({
    inputRange: [-width, 0, width],
    outputRange: ['-12deg', '0deg', '12deg'],
  });
  const knowOpacity = position.x.interpolate({ inputRange: [0, SWIPE_THRESHOLD], outputRange: [0, 1] });
  const dontOpacity = position.x.interpolate({ inputRange: [-SWIPE_THRESHOLD, 0], outputRange: [1, 0] });

  const frontRotate = flip.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] });
  const backRotate = flip.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '360deg'] });
  const frontOpacity = flip.interpolate({ inputRange: [89, 90], outputRange: [1, 0], extrapolate: 'clamp' });
  const backOpacity = flip.interpolate({ inputRange: [90, 91], outputRange: [0, 1], extrapolate: 'clamp' });

  return (
    <View style={styles.container}>
      <Text style={styles.counter}>
        {index + 1} / {deck.length}
      </Text>

      <View style={styles.cardArea}>
        <Animated.View
          style={[
            styles.animatedCard,
            { transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }] },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Kaydırma etiketleri */}
          <Animated.View style={[styles.tag, styles.tagKnow, { opacity: knowOpacity }]}>
            <Text style={styles.tagKnowText}>BİLİYORUM</Text>
          </Animated.View>
          <Animated.View style={[styles.tag, styles.tagDont, { opacity: dontOpacity }]}>
            <Text style={styles.tagDontText}>BİLMİYORUM</Text>
          </Animated.View>

          <Pressable style={styles.pressArea} onPress={doFlip}>
            {/* Ön yüz */}
            <Animated.View
              style={[
                styles.face,
                { opacity: frontOpacity, transform: [{ perspective: 1000 }, { rotateY: frontRotate }] },
              ]}
            >
              <Text style={styles.headword}>{word.headword}</Text>
              {!!word.pronunciation && <Text style={styles.pron}>{word.pronunciation}</Text>}
              <Text style={styles.pos}>{word.pos}</Text>
              <View style={styles.row}>
                <LevelBadge level={word.level} />
                {word.domains.map((d) => (
                  <Badge key={d} label={d} />
                ))}
              </View>
              <Text style={styles.tapHint}>Çevirmek için dokun · kaydır ↔</Text>
            </Animated.View>

            {/* Arka yüz */}
            <Animated.View
              style={[
                styles.face,
                styles.faceBack,
                { opacity: backOpacity, transform: [{ perspective: 1000 }, { rotateY: backRotate }] },
              ]}
            >
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
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>

      <View style={styles.statusWrap}>
        <Text style={styles.statusTitle}>Bu kelimeyi:</Text>
        <StatusPicker value={status} onChange={(s) => setStatus(word.id, s)} />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.navBtn} onPress={() => forceSwipe('left')}>
          <Text style={styles.navText}>✗ Bilmiyorum</Text>
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
          <Text style={styles.linkText}>Ağ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, styles.navKnow]} onPress={() => forceSwipe('right')}>
          <Text style={[styles.navText, { color: '#0f172a' }]}>✓ Biliyorum</Text>
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
  cardArea: { flex: 1 },
  animatedCard: { flex: 1 },
  pressArea: { flex: 1 },
  face: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  faceBack: { alignItems: 'stretch', justifyContent: 'flex-start' },
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
  tag: {
    position: 'absolute',
    top: 24,
    zIndex: 10,
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagKnow: { right: 20, borderColor: colors.active, transform: [{ rotate: '14deg' }] },
  tagDont: { left: 20, borderColor: colors.unknown, transform: [{ rotate: '-14deg' }] },
  tagKnowText: { color: colors.active, fontWeight: '900', fontSize: 18 },
  tagDontText: { color: colors.unknown, fontWeight: '900', fontSize: 18 },
  statusWrap: { marginTop: 14 },
  statusTitle: { color: colors.textMuted, marginBottom: 6 },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 14, gap: 6 },
  navBtn: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: colors.surfaceAlt },
  navKnow: { backgroundColor: colors.active },
  navText: { color: colors.text, fontWeight: '700', fontSize: 12 },
  linkBtn: { paddingVertical: 10, paddingHorizontal: 10, borderRadius: 12, borderWidth: 1, borderColor: colors.primary },
  linkText: { color: colors.primary, fontWeight: '700', fontSize: 12 },
});

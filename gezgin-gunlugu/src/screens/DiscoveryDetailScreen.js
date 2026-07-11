import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { ENRICH_SOURCE } from '../logic/enrich';
import { formatLongDate } from '../logic/date';
import { colors } from '../theme';
import { Field, PrimaryButton, ConfirmModal, EmptyState, Pill } from '../components/common';

const SOURCE_LABEL = {
  [ENRICH_SOURCE.LOCAL]: { label: 'Yerel arşiv', color: colors.success },
  [ENRICH_SOURCE.AI]: { label: 'Canlı AI', color: colors.accent },
  [ENRICH_SOURCE.TEMPLATE]: { label: 'Elle', color: colors.textMuted },
};

export default function DiscoveryDetailScreen({ route, navigation }) {
  const { tripId, discoveryId } = route.params;
  const { getTrip, updateDiscovery, removeDiscovery } = useJournal();
  const trip = getTrip(tripId);
  const disc = trip?.discoveries?.find((d) => d.id === discoveryId);

  const [notes, setNotes] = useState(disc?.userNotes || '');
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        disc ? (
          <Pressable onPress={() => setConfirmDelete(true)} hitSlop={10}>
            <Text style={{ color: colors.danger, fontWeight: '700' }}>Sil</Text>
          </Pressable>
        ) : null,
    });
  }, [navigation, disc]);

  if (!disc) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="📍" title="Keşif bulunamadı" />
      </SafeAreaView>
    );
  }

  const meta = SOURCE_LABEL[disc.enrichSource] || SOURCE_LABEL[ENRICH_SOURCE.TEMPLATE];
  const saveNotes = () => {
    updateDiscovery(tripId, discoveryId, { userNotes: notes.trim() });
    setEditing(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        {disc.photoUri ? <Image source={{ uri: disc.photoUri }} style={styles.photo} resizeMode="cover" /> : null}

        <View style={styles.body}>
          <View style={styles.headerRow}>
            <Text style={styles.pin}>📍</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{disc.placeName}</Text>
              {[disc.city, disc.country].filter(Boolean).length ? (
                <Text style={styles.loc}>{[disc.city, disc.country].filter(Boolean).join(' / ')}</Text>
              ) : null}
            </View>
            <Pill label={meta.label} color={meta.color} />
          </View>

          <Text style={styles.date}>📅 Keşif Tarihi: {formatLongDate(disc.date)}</Text>
          {disc.lat != null && disc.lng != null ? (
            <Text style={styles.coord}>
              🧭 {disc.lat.toFixed(4)}, {disc.lng.toFixed(4)}
            </Text>
          ) : null}

          <Text style={styles.h}>🏛️ Tarihi ve Kültürel Özet</Text>
          {disc.summary ? (
            <Text style={styles.summary}>{disc.summary}</Text>
          ) : (
            <Text style={styles.summaryEmpty}>Bu keşif için özet girilmedi.</Text>
          )}

          {disc.sources?.length ? (
            <>
              <Text style={styles.h}>📚 Kaynakça & Referanslar</Text>
              {disc.sources.map((s, i) => (
                <Text key={i} style={styles.source}>
                  • {s}
                </Text>
              ))}
            </>
          ) : null}

          <View style={styles.notesHeader}>
            <Text style={styles.h}>✍️ Gezginin Notları</Text>
            {!editing ? (
              <Pressable onPress={() => setEditing(true)} hitSlop={8}>
                <Text style={styles.editLink}>Düzenle</Text>
              </Pressable>
            ) : null}
          </View>

          {editing ? (
            <>
              <Field value={notes} onChangeText={setNotes} placeholder="Anını, duygunu, notunu yaz…" multiline />
              <PrimaryButton title="Notu Kaydet" onPress={saveNotes} style={{ marginHorizontal: 0, marginTop: 12 }} />
            </>
          ) : disc.userNotes ? (
            <Text style={styles.notes}>{disc.userNotes}</Text>
          ) : (
            <Text style={styles.summaryEmpty}>Henüz not eklenmedi. “Düzenle” ile ekleyebilirsin.</Text>
          )}
        </View>
      </ScrollView>

      <ConfirmModal
        visible={confirmDelete}
        title="Keşfi sil?"
        message={disc.placeName}
        confirmLabel="Sil"
        destructive
        onConfirm={() => {
          setConfirmDelete(false);
          removeDiscovery(tripId, discoveryId);
          navigation.goBack();
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  photo: { width: '100%', height: 240, backgroundColor: colors.surfaceAlt },
  body: { padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  pin: { fontSize: 20 },
  title: { color: colors.text, fontSize: 20, fontWeight: '800' },
  loc: { color: colors.textMuted, fontSize: 14, marginTop: 2 },
  date: { color: colors.text, fontSize: 13, marginTop: 14, fontWeight: '600' },
  coord: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  h: { color: colors.primary, fontSize: 15, fontWeight: '800', marginTop: 20, marginBottom: 8 },
  summary: { color: colors.text, fontSize: 15, lineHeight: 22 },
  summaryEmpty: { color: colors.textMuted, fontSize: 13, lineHeight: 19, fontStyle: 'italic' },
  source: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  notesHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  editLink: { color: colors.primary, fontWeight: '700', fontSize: 13, marginTop: 20 },
  notes: { color: colors.text, fontSize: 15, lineHeight: 22 },
});

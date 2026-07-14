import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useJournal } from '../state/JournalContext';
import { ENRICH_SOURCE } from '../logic/enrich';
import { formatLongDate, isValidDateKey } from '../logic/date';
import { colors } from '../theme';
import { Field, PrimaryButton, SecondaryButton, ConfirmModal, EmptyState, Pill } from '../components/common';

const SOURCE_LABEL = {
  [ENRICH_SOURCE.LOCAL]: { label: 'Yerel arşiv', color: colors.success },
  [ENRICH_SOURCE.AI]: { label: 'Canlı AI', color: colors.accent },
  [ENRICH_SOURCE.TEMPLATE]: { label: 'Elle', color: colors.textMuted },
};

// Geriye uyumlu foto listesi: yeni kayıtlarda `photos`, eskilerde tek `photoUri`.
function photosOf(disc) {
  if (Array.isArray(disc?.photos) && disc.photos.length) return disc.photos;
  return disc?.photoUri ? [disc.photoUri] : [];
}

export default function DiscoveryDetailScreen({ route, navigation }) {
  const { tripId, discoveryId } = route.params;
  const { getTrip, updateDiscovery, removeDiscovery } = useJournal();
  const trip = getTrip(tripId);
  const disc = trip?.discoveries?.find((d) => d.id === discoveryId);

  const [notes, setNotes] = useState(disc?.userNotes || '');
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Bilgi düzenleme (ad/tarih/şehir/ülke/özet)
  const [editInfo, setEditInfo] = useState(false);
  const [placeName, setPlaceName] = useState(disc?.placeName || '');
  const [date, setDate] = useState(disc?.date || '');
  const [city, setCity] = useState(disc?.city || '');
  const [country, setCountry] = useState(disc?.country || '');
  const [summary, setSummary] = useState(disc?.summary || '');

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
  const photos = photosOf(disc);

  const saveNotes = () => {
    updateDiscovery(tripId, discoveryId, { userNotes: notes.trim() });
    setEditing(false);
  };

  const dateOk = !date || isValidDateKey(date);
  const canSaveInfo = placeName.trim().length > 0 && dateOk;
  const saveInfo = () => {
    if (!canSaveInfo) return;
    updateDiscovery(tripId, discoveryId, {
      placeName: placeName.trim(),
      date: date.trim(),
      city: city.trim(),
      country: country.trim(),
      summary: summary.trim(),
    });
    setEditInfo(false);
  };

  // Aynı mekana birden fazla foto: seçilenleri mevcut listeye ekler.
  const addPhotos = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsMultipleSelection: true,
        selectionLimit: 0,
      });
      if (res.canceled || !res.assets?.length) return;
      const next = [...photos, ...res.assets.map((a) => a.uri)];
      updateDiscovery(tripId, discoveryId, { photos: next, photoUri: next[0] || null });
    } catch (e) {
      // sessizce geç
    }
  };
  const removePhotoAt = (uri) => {
    const next = photos.filter((u) => u !== uri);
    updateDiscovery(tripId, discoveryId, { photos: next, photoUri: next[0] || null });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        {photos.length ? (
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {photos.map((uri) => (
              <View key={uri}>
                <Image source={{ uri }} style={styles.photo} resizeMode="cover" />
                <Pressable style={styles.removePhotoBtn} onPress={() => removePhotoAt(uri)} hitSlop={8}>
                  <Text style={styles.removePhotoText}>✕</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        ) : null}

        <View style={styles.body}>
          <SecondaryButton
            title={photos.length ? `📷 Fotoğraf ekle (${photos.length})` : '📷 Fotoğraf ekle'}
            onPress={addPhotos}
            style={{ marginHorizontal: 0, marginBottom: 12 }}
          />
          {photos.length > 1 ? (
            <Text style={styles.photoHint}>← Fotoğraflar arasında kaydır · {photos.length} fotoğraf</Text>
          ) : null}

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

          {/* Bilgileri düzenle */}
          {!editInfo ? (
            <Pressable onPress={() => setEditInfo(true)} hitSlop={8} style={styles.editInfoLink}>
              <Text style={styles.editLink}>✏️ Bilgileri düzenle</Text>
            </Pressable>
          ) : (
            <View style={styles.editBox}>
              <Field label="Mekan / aktivite adı" value={placeName} onChangeText={setPlaceName} />
              <Field label="📅 Tarih (YYYY-AA-GG)" value={date} onChangeText={setDate} autoCapitalize="none" placeholder="2026-08-03" />
              {!dateOk ? <Text style={styles.err}>Geçersiz tarih biçimi.</Text> : null}
              <Field label="Şehir" value={city} onChangeText={setCity} />
              <Field label="Ülke" value={country} onChangeText={setCountry} />
              <Field label="🏛️ Özet" value={summary} onChangeText={setSummary} multiline />
              <View style={styles.editActions}>
                <PrimaryButton title="Kaydet" onPress={saveInfo} disabled={!canSaveInfo} style={{ marginHorizontal: 0, flex: 1 }} />
                <Pressable onPress={() => setEditInfo(false)} style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>Vazgeç</Text>
                </Pressable>
              </View>
            </View>
          )}

          <Text style={styles.h}>🏛️ Tarihi ve Kültürel Özet</Text>
          {disc.summary ? (
            <Text style={styles.summary}>{disc.summary}</Text>
          ) : (
            <Text style={styles.summaryEmpty}>Bu keşif için özet girilmedi. “Bilgileri düzenle” ile ekleyebilirsin.</Text>
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
  photo: { width: 360, maxWidth: '100%', height: 240, backgroundColor: colors.surfaceAlt },
  removePhotoBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoText: { color: '#fff', fontWeight: '800' },
  photoHint: { color: colors.textMuted, fontSize: 12, marginBottom: 8 },
  body: { padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  pin: { fontSize: 20 },
  title: { color: colors.text, fontSize: 20, fontWeight: '800' },
  loc: { color: colors.textMuted, fontSize: 14, marginTop: 2 },
  date: { color: colors.text, fontSize: 13, marginTop: 14, fontWeight: '600' },
  coord: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  editInfoLink: { marginTop: 12 },
  editBox: {
    marginTop: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  editActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
  cancelBtn: { paddingHorizontal: 12, paddingVertical: 10 },
  cancelText: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  err: { color: colors.danger, fontSize: 11, marginTop: 4 },
  h: { color: colors.primary, fontSize: 15, fontWeight: '800', marginTop: 20, marginBottom: 8 },
  summary: { color: colors.text, fontSize: 15, lineHeight: 22 },
  summaryEmpty: { color: colors.textMuted, fontSize: 13, lineHeight: 19, fontStyle: 'italic' },
  source: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  notesHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  editLink: { color: colors.primary, fontWeight: '700', fontSize: 13 },
  notes: { color: colors.text, fontSize: 15, lineHeight: 22 },
});

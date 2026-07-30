import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useJournal } from '../state/JournalContext';
import { preparePhotos } from '../logic/imageStore';
import { ENRICH_SOURCE } from '../logic/enrich';
import { formatLongDate, isValidDateKey } from '../logic/date';
import { colors } from '../theme';
import { t } from '../i18n';
import { Field, PrimaryButton, SecondaryButton, ConfirmModal, EmptyState, Pill } from '../components/common';
import PlacePhoto from '../components/PlacePhoto';

const SOURCE_LABEL = {
  [ENRICH_SOURCE.LOCAL]: { label: t('disc.source.local'), color: colors.success },
  [ENRICH_SOURCE.AI]: { label: t('disc.source.ai'), color: colors.accent },
  [ENRICH_SOURCE.TEMPLATE]: { label: t('disc.source.manual'), color: colors.textMuted },
};

// Geriye uyumlu foto listesi: yeni kayıtlarda `photos`, eskilerde tek `photoUri`.
function photosOf(disc) {
  if (Array.isArray(disc?.photos) && disc.photos.length) return disc.photos;
  return disc?.photoUri ? [disc.photoUri] : [];
}

// "Büyük göster" seçilen fotoğraflar: yeni çoklu `featuredPhotos` ya da eski tek `featuredPhoto`.
function featuredOf(disc) {
  if (Array.isArray(disc?.featuredPhotos)) return disc.featuredPhotos;
  return disc?.featuredPhoto ? [disc.featuredPhoto] : [];
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
            <Text style={{ color: colors.danger, fontWeight: '700' }}>{t('common.delete')}</Text>
          </Pressable>
        ) : null,
    });
  }, [navigation, disc]);

  if (!disc) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="📍" title={t('disc.notFound')} />
      </SafeAreaView>
    );
  }

  const meta = SOURCE_LABEL[disc.enrichSource] || SOURCE_LABEL[ENRICH_SOURCE.TEMPLATE];
  const photos = photosOf(disc);
  const featured = featuredOf(disc).filter((u) => photos.includes(u));
  const allBig = photos.length > 0 && featured.length === photos.length;

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
      const prepared = await preparePhotos(res.assets.map((a) => a.uri));
      const next = [...photos, ...prepared];
      // Kapak `photos[0]`tan okunur; photoUri'ye KOPYALAMA (aynı veriyi iki kez saklardı).
      updateDiscovery(tripId, discoveryId, { photos: next, photoUri: null });
    } catch (e) {
      // sessizce geç
    }
  };
  const removePhotoAt = (uri) => {
    const next = photos.filter((u) => u !== uri);
    // Silinen foto büyük listesindeyse oradan da çıkar; eski tek alanı da temizle.
    const nextFeatured = featured.filter((u) => u !== uri && next.includes(u));
    updateDiscovery(tripId, discoveryId, {
      photos: next,
      photoUri: null,
      featuredPhotos: nextFeatured,
      featuredPhoto: null,
    });
  };
  // Albümde BÜYÜK gösterilecek fotoğrafları seç/kaldır (çoklu seçim mümkün).
  const toggleFeatured = (uri) => {
    const next = featured.includes(uri) ? featured.filter((u) => u !== uri) : [...featured, uri];
    updateDiscovery(tripId, discoveryId, { featuredPhotos: next, featuredPhoto: null });
  };
  // Tek fotoğraflı mekan: PDF'de büyük mü küçük mü gösterilsin (varsayılan büyük).
  const toggleSoloSmall = () => {
    updateDiscovery(tripId, discoveryId, { soloSmall: !disc.soloSmall, featuredPhotos: [], featuredPhoto: null });
  };
  // Hepsini büyük yap / hiçbirini (toggle).
  const toggleAllFeatured = () => {
    const allBig = photos.length > 0 && featured.length === photos.length;
    updateDiscovery(tripId, discoveryId, {
      featuredPhotos: allBig ? [] : [...photos],
      featuredPhoto: null,
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        {photos.length ? (
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            {photos.map((uri) => {
              const single = photos.length === 1;
              const isBig = single ? !disc.soloSmall : featured.includes(uri);
              return (
                <View key={uri}>
                  <Image source={{ uri }} style={styles.photo} resizeMode="cover" />
                  <Pressable style={styles.removePhotoBtn} onPress={() => removePhotoAt(uri)} hitSlop={8}>
                    <Text style={styles.removePhotoText}>✕</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.featureBtn, isBig && styles.featureBtnOn]}
                    onPress={single ? toggleSoloSmall : () => toggleFeatured(uri)}
                    hitSlop={8}
                  >
                    <Text style={styles.featureText}>
                      {isBig ? t('disc.big') : single ? t('disc.small') : t('disc.makeBig')}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        ) : null}

        <View style={styles.body}>
          <SecondaryButton
            title={photos.length ? t('addDisc.addPhotoN', { n: photos.length }) : t('disc.addPhoto')}
            onPress={addPhotos}
            style={{ marginHorizontal: 0, marginBottom: 12 }}
          />
          {photos.length > 1 ? (
            <>
              <View style={styles.featAllRow}>
                <Text style={[styles.photoHint, styles.hintFlex]}>
                  {t('disc.photoHint', { n: photos.length })}
                  {featured.length ? t('disc.bigCount', { n: featured.length }) : ''}
                </Text>
                <Pressable onPress={toggleAllFeatured} hitSlop={8}>
                  <Text style={styles.featAllBtn}>{allBig ? t('disc.noneBig') : t('disc.allBig')}</Text>
                </Pressable>
              </View>
            </>
          ) : photos.length === 1 ? (
            <Text style={styles.photoHint}>
              {t('disc.soloHint')}
            </Text>
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

          <Text style={styles.date}>{t('disc.dateLabel', { date: formatLongDate(disc.date) })}</Text>
          {disc.lat != null && disc.lng != null ? (
            <Text style={styles.coord}>
              🧭 {disc.lat.toFixed(4)}, {disc.lng.toFixed(4)}
            </Text>
          ) : null}

          {/* Bilgileri düzenle */}
          {!editInfo ? (
            <Pressable onPress={() => setEditInfo(true)} hitSlop={8} style={styles.editInfoLink}>
              <Text style={styles.editLink}>{t('trip.editInfo')}</Text>
            </Pressable>
          ) : (
            <View style={styles.editBox}>
              <Field label={t('disc.placeName')} value={placeName} onChangeText={setPlaceName} />
              <Field label={t('disc.dateField')} value={date} onChangeText={setDate} autoCapitalize="none" placeholder="2026-08-03" />
              {!dateOk ? <Text style={styles.err}>{t('common.invalidDate')}</Text> : null}
              <Field label={t('common.city')} value={city} onChangeText={setCity} />
              <Field label={t('common.country')} value={country} onChangeText={setCountry} />
              <Field label={t('disc.summaryShort')} value={summary} onChangeText={setSummary} multiline />
              <View style={styles.editActions}>
                <PrimaryButton title={t('common.save')} onPress={saveInfo} disabled={!canSaveInfo} style={{ marginHorizontal: 0, flex: 1 }} />
                <Pressable onPress={() => setEditInfo(false)} style={styles.cancelBtn}>
                  <Text style={styles.cancelText}>{t('common.cancel')}</Text>
                </Pressable>
              </View>
            </View>
          )}

          <PlacePhoto
            place={{ id: disc.placeId, name: disc.placeName, city: disc.city, country: disc.country }}
          />

          <Text style={styles.h}>{t('disc.summaryHead')}</Text>
          {disc.summary ? (
            <Text style={styles.summary}>{disc.summary}</Text>
          ) : (
            <Text style={styles.summaryEmpty}>{t('disc.noSummary')}</Text>
          )}

          {disc.sources?.length ? (
            <>
              <Text style={styles.h}>{t('disc.sourcesHead')}</Text>
              {disc.sources.map((s, i) => (
                <Text key={i} style={styles.source}>
                  • {s}
                </Text>
              ))}
            </>
          ) : null}

          <View style={styles.notesHeader}>
            <Text style={styles.h}>{t('disc.notesHead')}</Text>
            {!editing ? (
              <Pressable onPress={() => setEditing(true)} hitSlop={8}>
                <Text style={styles.editLink}>{t('common.edit')}</Text>
              </Pressable>
            ) : null}
          </View>

          {editing ? (
            <>
              <Field value={notes} onChangeText={setNotes} placeholder={t('disc.notePlaceholder')} multiline />
              <PrimaryButton title={t('disc.saveNote')} onPress={saveNotes} style={{ marginHorizontal: 0, marginTop: 12 }} />
            </>
          ) : disc.userNotes ? (
            <Text style={styles.notes}>{disc.userNotes}</Text>
          ) : (
            <Text style={styles.summaryEmpty}>{t('disc.noNotes')}</Text>
          )}
        </View>
      </ScrollView>

      <ConfirmModal
        visible={confirmDelete}
        title={t('disc.deleteConfirm')}
        message={disc.placeName}
        confirmLabel={t('common.delete')}
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
  featureBtn: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  featureBtnOn: { backgroundColor: colors.primary },
  featureText: { color: '#fff', fontWeight: '800', fontSize: 12 },
  photoHint: { color: colors.textMuted, fontSize: 12, marginBottom: 8 },
  hintFlex: { flex: 1, marginRight: 10 },
  featAllRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  featAllBtn: { color: colors.primary, fontSize: 13, fontWeight: '800', marginBottom: 8 },
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

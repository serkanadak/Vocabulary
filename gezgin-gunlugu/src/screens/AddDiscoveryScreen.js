import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useJournal } from '../state/JournalContext';
import { enrichPlace, ENRICH_SOURCE } from '../logic/enrich';
import { exifDateKey, exifCoords } from '../logic/exif';
import { todayKey, formatLongDate } from '../logic/date';
import { matchPlace } from '../data/places';
import { attractionsFor, attractionToDiscovery } from '../data/attractions';
import { colors } from '../theme';
import { Card, Field, PrimaryButton, SecondaryButton, SectionHeader, Pill } from '../components/common';

const SOURCE_LABEL = {
  [ENRICH_SOURCE.LOCAL]: { label: 'Yerel arşiv', color: colors.success },
  [ENRICH_SOURCE.AI]: { label: 'Canlı AI', color: colors.accent },
  [ENRICH_SOURCE.TEMPLATE]: { label: 'Boş şablon', color: colors.textMuted },
};

// Rotadaki bir şehrin mekanlarını hızlı ekleme grubu (açılır).
function PlannedCity({ place, discoveries, onAdd }) {
  const [open, setOpen] = useState(false);
  const list = attractionsFor(place.id);
  if (!list.length) return null;
  const added = new Set((discoveries || []).map((d) => (d.placeName || '').toLocaleLowerCase('tr')));
  const addedCount = list.filter((a) => added.has(a.name.toLocaleLowerCase('tr'))).length;
  return (
    <View style={styles.planCity}>
      <Pressable onPress={() => setOpen((o) => !o)} style={styles.planCityHead}>
        <Text style={styles.planCityName}>
          📍 {place.name}
          <Text style={styles.planCityCount}> · {addedCount}/{list.length} eklendi</Text>
        </Text>
        <Text style={styles.planChevron}>{open ? '▲' : '▼'}</Text>
      </Pressable>
      {open ? (
        <View style={{ marginTop: 6, gap: 6 }}>
          {list.map((a) => {
            const isAdded = added.has(a.name.toLocaleLowerCase('tr'));
            return (
              <View key={a.name} style={styles.planItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.planItemName}>{a.name}</Text>
                  <Text style={styles.planItemDesc}>{a.desc}</Text>
                </View>
                {isAdded ? (
                  <Text style={styles.planAdded}>✓</Text>
                ) : (
                  <Pressable onPress={() => onAdd(a, place)} style={styles.planAddBtn} hitSlop={6}>
                    <Text style={styles.planAddText}>＋</Text>
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

export default function AddDiscoveryScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { addDiscovery, settings, getTrip } = useJournal();
  const trip = getTrip(tripId);

  // Rotadaki bilinen şehirler (mekan listesi olanlar) — plana göre hızlı ekleme.
  const plannedPlaces = [];
  const seen = new Set();
  for (const stop of trip?.stops || []) {
    const p = matchPlace(stop.name);
    if (p && attractionsFor(p.id).length && !seen.has(p.id)) {
      seen.add(p.id);
      plannedPlaces.push(p);
    }
  }
  const addPlanned = (attraction, place) => {
    addDiscovery(tripId, attractionToDiscovery(attraction, place, todayKey()));
  };

  const [query, setQuery] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [photoCoords, setPhotoCoords] = useState(null);
  const [photoDate, setPhotoDate] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [userNotes, setUserNotes] = useState('');

  const pickPhoto = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        exif: true,
      });
      if (res.canceled || !res.assets?.length) return;
      const asset = res.assets[0];
      setPhotoUri(asset.uri);
      const coords = exifCoords(asset.exif);
      const date = exifDateKey(asset.exif);
      setPhotoCoords(coords);
      setPhotoDate(date);
      setResult(null);
    } catch (e) {
      // sessizce geç — kullanıcı elle konum girebilir
    }
  };

  const analyze = async () => {
    const q = query.trim();
    if (!q && !photoUri) return;
    setAnalyzing(true);
    try {
      const enriched = await enrichPlace(q || 'Bilinmeyen konum', {
        settings,
        date: photoDate || todayKey(),
        coords: photoCoords,
      });
      setResult(enriched);
    } finally {
      setAnalyzing(false);
    }
  };

  const save = () => {
    if (!result) return;
    addDiscovery(tripId, {
      placeName: result.placeName,
      city: result.city,
      country: result.country,
      date: result.date,
      lat: result.lat,
      lng: result.lng,
      summary: result.summary,
      sources: result.sources,
      userNotes: userNotes.trim(),
      photoUri: photoUri || null,
      enrichSource: result.source,
    });
    navigation.goBack();
  };

  const meta = result ? SOURCE_LABEL[result.source] : null;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        {plannedPlaces.length ? (
          <>
            <SectionHeader
              title="Planındaki yerler"
              subtitle="Rotandaki şehirlerin öne çıkan mekanları. Gideceğin yeri ＋ ile keşif günlüğüne ekle."
            />
            <Card>
              {plannedPlaces.map((p) => (
                <PlannedCity key={p.id} place={p} discoveries={trip?.discoveries} onAdd={addPlanned} />
              ))}
            </Card>
          </>
        ) : null}

        <SectionHeader
          title="Yeni Keşif"
          subtitle="Plan dışı bir yer mi? Fotoğraf yükle ve/veya mekan adı gir; tarihi/kültürel özeti ben hazırlayayım."
        />

        <Card>
          {photoUri ? (
            <View style={styles.photoWrap}>
              <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
              <Pressable style={styles.removePhoto} onPress={() => setPhotoUri(null)}>
                <Text style={styles.removePhotoText}>✕</Text>
              </Pressable>
            </View>
          ) : null}

          <SecondaryButton
            title={photoUri ? '📷 Fotoğrafı değiştir' : '📷 Fotoğraf yükle'}
            onPress={pickPhoto}
            style={{ marginHorizontal: 0 }}
          />

          {photoUri && (photoCoords || photoDate) ? (
            <Text style={styles.exifNote}>
              Meta veriden okundu:
              {photoDate ? ` 📅 ${photoDate}` : ''}
              {photoCoords ? ` · 📍 ${photoCoords.lat.toFixed(3)}, ${photoCoords.lng.toFixed(3)}` : ''}
            </Text>
          ) : null}

          <Field
            label="Mekan / konum adı"
            value={query}
            onChangeText={setQuery}
            placeholder="ör. Ayasofya  veya  Efes, İzmir"
          />

          <PrimaryButton
            title={analyzing ? 'Analiz ediliyor…' : '🔎 Analiz Et & Özet Oluştur'}
            onPress={analyze}
            disabled={analyzing || (!query.trim() && !photoUri)}
            style={{ marginHorizontal: 0, marginTop: 16 }}
          />
          {analyzing ? <ActivityIndicator color={colors.primary} style={{ marginTop: 12 }} /> : null}
        </Card>

        {/* Zenginleştirilmiş sonuç — çıktı şablonu */}
        {result ? (
          <View style={styles.resultCard}>
            <View style={styles.resultHeaderRow}>
              <Text style={styles.pin}>📍</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.resultTitle}>{result.placeName}</Text>
                {[result.city, result.country].filter(Boolean).length ? (
                  <Text style={styles.resultLoc}>{[result.city, result.country].filter(Boolean).join(' / ')}</Text>
                ) : null}
              </View>
              {meta ? <Pill label={meta.label} color={meta.color} /> : null}
            </View>

            <Text style={styles.resultDate}>📅 Keşif Tarihi: {formatLongDate(result.date)}</Text>

            <Text style={styles.h}>🏛️ Tarihi ve Kültürel Özet</Text>
            {result.summary ? (
              <Text style={styles.summary}>{result.summary}</Text>
            ) : (
              <Text style={styles.summaryEmpty}>
                Bu yer yerel arşivde bulunamadı. Ayarlar'dan "Canlı AI"yı açıp API anahtarı girerek otomatik özet
                aldırabilir ya da özeti aşağıdaki nota kendin yazabilirsin.
              </Text>
            )}
            {result.aiError ? <Text style={styles.err}>AI hatası: {result.aiError}</Text> : null}

            {result.sources?.length ? (
              <>
                <Text style={styles.h}>📚 Kaynakça & Referanslar</Text>
                {result.sources.map((s, i) => (
                  <Text key={i} style={styles.source}>
                    • {s}
                  </Text>
                ))}
              </>
            ) : null}

            <Text style={styles.h}>✍️ Gezginin Notları</Text>
            <Field
              value={userNotes}
              onChangeText={setUserNotes}
              placeholder="Kendi anını, duygunu, bütçe notunu buraya yaz…"
              multiline
            />

            <PrimaryButton title="Keşfi Günlüğe Kaydet 💾" onPress={save} style={{ marginHorizontal: 0, marginTop: 16 }} />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  photoWrap: { position: 'relative', marginBottom: 12 },
  photo: { width: '100%', height: 200, borderRadius: 12, backgroundColor: colors.surfaceAlt },
  removePhoto: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removePhotoText: { color: '#fff', fontWeight: '800' },
  exifNote: { color: colors.accent, fontSize: 12, marginTop: 10 },
  planCity: { marginBottom: 6 },
  planCityHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  planCityName: { color: colors.text, fontSize: 15, fontWeight: '700' },
  planCityCount: { color: colors.textMuted, fontSize: 12, fontWeight: '400' },
  planChevron: { color: colors.textMuted, fontSize: 11 },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 12,
  },
  planItemName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  planItemDesc: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 16 },
  planAddBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planAddText: { color: colors.primary, fontSize: 18, fontWeight: '800' },
  planAdded: { color: colors.success, fontSize: 16, fontWeight: '800', width: 32, textAlign: 'center' },
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.primary + '55',
  },
  resultHeaderRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  pin: { fontSize: 18 },
  resultTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  resultLoc: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  resultDate: { color: colors.text, fontSize: 13, marginTop: 12, fontWeight: '600' },
  h: { color: colors.primary, fontSize: 14, fontWeight: '800', marginTop: 18, marginBottom: 8 },
  summary: { color: colors.text, fontSize: 14, lineHeight: 21 },
  summaryEmpty: { color: colors.textMuted, fontSize: 13, lineHeight: 19, fontStyle: 'italic' },
  source: { color: colors.textMuted, fontSize: 13, lineHeight: 20 },
  err: { color: colors.danger, fontSize: 12, marginTop: 8 },
});

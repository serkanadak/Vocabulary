import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { matchPlace } from '../data/places';
import { attractionsFor, attractionToDiscovery } from '../data/attractions';
import { todayKey, formatShortDate } from '../logic/date';
import { colors } from '../theme';
import { Card, SectionHeader, EmptyState, Pill } from '../components/common';

const norm = (s) => (s || '').toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();

// Bir keşif satırı (kaydedilmiş) — detaya götürür.
function DiscoveryRow({ disc, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.discRow, pressed && { opacity: 0.85 }]}>
      {disc.photoUri ? (
        <Image source={{ uri: disc.photoUri }} style={styles.thumb} resizeMode="cover" />
      ) : (
        <Text style={styles.discIcon}>📍</Text>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.discName} numberOfLines={1}>
          {disc.placeName}
        </Text>
        <Text style={styles.discMeta} numberOfLines={1}>
          {disc.userNotes ? '📝 ' : ''}
          {disc.date ? formatShortDate(disc.date) : '—'}
          {disc.photoUri ? ' · 📷' : ''}
        </Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

// Rotadaki bir durağın açılır kartı: gezilecek mekanlar + eklenen keşifler.
function StopSection({ trip, stop, navigation }) {
  const { addDiscovery } = useJournal();
  const [open, setOpen] = useState(false);

  const place = matchPlace(stop.name);
  const attractions = place ? attractionsFor(place.id) : [];
  const dateForAdd = stop.date || todayKey();

  const stopDiscoveries = (trip.discoveries || []).filter((d) => d.stopId === stop.id);
  const discByName = new Map(stopDiscoveries.map((d) => [norm(d.placeName), d]));

  // Mekan listesindeki isimlerle eşleşmeyen (kullanıcının eklediği) keşifler.
  const attractionNames = new Set(attractions.map((a) => norm(a.name)));
  const extraDiscoveries = stopDiscoveries.filter((d) => !attractionNames.has(norm(d.placeName)));

  const markVisited = (attraction) => {
    addDiscovery(trip.id, { ...attractionToDiscovery(attraction, place, dateForAdd), stopId: stop.id });
  };

  const openDisc = (d) => navigation.navigate('DiscoveryDetail', { tripId: trip.id, discoveryId: d.id });

  const visitedCount = stopDiscoveries.length;

  return (
    <View style={styles.stopCard}>
      <Pressable onPress={() => setOpen((o) => !o)} style={styles.stopHead}>
        <View style={{ flex: 1 }}>
          <Text style={styles.stopName}>🗺️ {stop.name}</Text>
          <Text style={styles.stopSub}>
            {stop.date ? `${formatShortDate(stop.date)} · ` : ''}
            {visitedCount > 0 ? `${visitedCount} keşif` : 'henüz keşif yok'}
            {attractions.length ? ` · ${attractions.length} önerilen yer` : ''}
          </Text>
        </View>
        <Text style={styles.chevronDown}>{open ? '▲' : '▼'}</Text>
      </Pressable>

      {open ? (
        <View style={styles.stopBody}>
          {attractions.length ? (
            <>
              <Text style={styles.subLabel}>Gezilecek yerler — gidileni işaretle</Text>
              {attractions.map((a) => {
                const existing = discByName.get(norm(a.name));
                if (existing) {
                  return (
                    <Pressable
                      key={a.name}
                      onPress={() => openDisc(existing)}
                      style={({ pressed }) => [styles.attrRow, styles.attrVisited, pressed && { opacity: 0.85 }]}
                    >
                      <Text style={styles.check}>✓</Text>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.attrName}>{a.name}</Text>
                        <Text style={styles.attrVisitedHint}>
                          Gidildi · {existing.userNotes ? 'notlu' : 'not ekle'} {existing.photoUri ? '· 📷' : ''} →
                        </Text>
                      </View>
                      <Text style={styles.chevron}>›</Text>
                    </Pressable>
                  );
                }
                return (
                  <View key={a.name} style={styles.attrRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.attrName}>{a.name}</Text>
                      <Text style={styles.attrDesc}>{a.desc}</Text>
                    </View>
                    <Pressable onPress={() => markVisited(a)} style={styles.markBtn} hitSlop={6}>
                      <Text style={styles.markBtnText}>＋ Gidildi</Text>
                    </Pressable>
                  </View>
                );
              })}
            </>
          ) : (
            <Text style={styles.noAttr}>
              Bu durak için arşivde öneri yok. Aşağıdan gidilen yer(ler)i ekleyebilirsin.
            </Text>
          )}

          {extraDiscoveries.length ? (
            <>
              <Text style={styles.subLabel}>Listede olmayan, eklediğin yerler</Text>
              {extraDiscoveries.map((d) => (
                <DiscoveryRow key={d.id} disc={d} onPress={() => openDisc(d)} />
              ))}
            </>
          ) : null}

          <Pressable
            style={styles.addUnderStop}
            onPress={() =>
              navigation.navigate('AddDiscovery', {
                tripId: trip.id,
                stopId: stop.id,
                stopName: stop.name,
                presetCity: place?.city || stop.name,
                presetCountry: place?.country || '',
                presetLat: stop.lat ?? place?.lat ?? null,
                presetLng: stop.lng ?? place?.lng ?? null,
              })
            }
          >
            <Text style={styles.addUnderStopText}>＋ Bu durağa listede olmayan bir yer / fotoğraf ekle</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

export default function DiscoveryHubScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip } = useJournal();
  const trip = getTrip(tripId);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🧭" title="Seyahat bulunamadı" />
      </SafeAreaView>
    );
  }

  const stops = trip.stops || [];
  const stopIds = new Set(stops.map((s) => s.id));
  // stopId'si olmayan ya da artık silinmiş bir durağa ait keşifler = rotadan bağımsız.
  const freeDiscoveries = (trip.discoveries || []).filter((d) => !d.stopId || !stopIds.has(d.stopId));
  const sortedFree = [...freeDiscoveries].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <SectionHeader
          title="Keşif Günlüğü"
          subtitle="Güzergah noktalarını tek tek aç; gezdiğin yerleri işaretle, not ve fotoğraflarını ekle. Rota dışı yer/aktiviteleri en alttan ekle."
        />

        {stops.length ? (
          stops.map((s) => <StopSection key={s.id} trip={trip} stop={s} navigation={navigation} />)
        ) : (
          <Card>
            <Text style={styles.emptyStops}>
              Henüz durak yok. Önce Güzergah Planı’ndan durak ekle; keşifleri duraklara göre burada
              düzenleyebilirsin. Rota dışı keşifleri yine de aşağıdan ekleyebilirsin.
            </Text>
          </Card>
        )}

        {/* Rotadan bağımsız */}
        <View style={styles.freeHeader}>
          <Text style={styles.freeTitle}>🌟 Rotadan bağımsız yerler & aktiviteler</Text>
        </View>
        {sortedFree.length ? (
          <View style={{ marginHorizontal: 16 }}>
            {sortedFree.map((d) => (
              <DiscoveryRow
                key={d.id}
                disc={d}
                onPress={() => navigation.navigate('DiscoveryDetail', { tripId, discoveryId: d.id })}
              />
            ))}
          </View>
        ) : (
          <Text style={styles.freeEmpty}>
            Güzergahta olmayan bir yere gittiysen veya bir aktivite yaptıysan (konser, tekne turu…) buradan
            ekle.
          </Text>
        )}
        <Pressable
          style={styles.addFree}
          onPress={() => navigation.navigate('AddDiscovery', { tripId, stopId: null })}
        >
          <Text style={styles.addFreeText}>＋ Rotadan bağımsız keşif / aktivite ekle</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  stopCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  stopHead: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 },
  stopName: { color: colors.text, fontSize: 16, fontWeight: '700' },
  stopSub: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
  chevronDown: { color: colors.textMuted, fontSize: 12 },
  stopBody: { paddingHorizontal: 16, paddingBottom: 16, gap: 8 },
  subLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  attrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  attrVisited: { borderWidth: 1, borderColor: colors.success + '66' },
  attrName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  attrDesc: { color: colors.textMuted, fontSize: 12, marginTop: 2, lineHeight: 16 },
  attrVisitedHint: { color: colors.success, fontSize: 12, marginTop: 2, fontWeight: '600' },
  check: { color: colors.success, fontSize: 18, fontWeight: '800', width: 20, textAlign: 'center' },
  markBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  markBtnText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  noAttr: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 6, fontStyle: 'italic' },
  discRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    padding: 10,
  },
  thumb: { width: 40, height: 40, borderRadius: 8, backgroundColor: colors.surface },
  discIcon: { fontSize: 20, width: 40, textAlign: 'center' },
  discName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  discMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  chevron: { color: colors.textMuted, fontSize: 20 },
  addUnderStop: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.primary + '99',
    borderStyle: 'dashed',
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  addUnderStopText: { color: colors.primary, fontSize: 13, fontWeight: '700' },
  emptyStops: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  freeHeader: { marginHorizontal: 16, marginTop: 26, marginBottom: 8 },
  freeTitle: { color: colors.text, fontSize: 15, fontWeight: '800' },
  freeEmpty: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginHorizontal: 16,
    fontStyle: 'italic',
  },
  addFree: {
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
  },
  addFreeText: { color: colors.primary, fontSize: 14, fontWeight: '800' },
});

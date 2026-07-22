import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { getVehicle } from '../data/vehicles';
import { checklistProgress } from '../data/checklist';
import { formatShortDate, daysBetween } from '../logic/date';
import { colors } from '../theme';
import { Card, EmptyState, Pill, ProgressBar } from '../components/common';

function TripCard({ trip, onPress }) {
  const vehicle = getVehicle(trip.vehicle);
  const prog = checklistProgress(trip.checklist || []);
  const span = daysBetween(trip.startDate, trip.endDate);
  const dateLabel = [trip.startDate && formatShortDate(trip.startDate), trip.endDate && formatShortDate(trip.endDate)]
    .filter(Boolean)
    .join(' – ');

  return (
    <Card onPress={onPress}>
      <View style={styles.cardTop}>
        <Text style={styles.tripTitle} numberOfLines={1}>
          {trip.title}
        </Text>
        {trip.finished ? <Pill label="Tamamlandı" color={colors.success} /> : <Pill label="Aktif" color={colors.accent} />}
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>
          {vehicle.icon} {vehicle.label}
        </Text>
        {dateLabel ? <Text style={styles.meta}>📅 {dateLabel}</Text> : null}
        {span ? <Text style={styles.meta}>⏳ {span} gün</Text> : null}
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.stat}>📍 {(trip.discoveries || []).length} keşif</Text>
        <Text style={styles.stat}>🗺️ {(trip.stops || []).length} durak</Text>
        <Text style={styles.stat}>✅ %{Math.round(prog.ratio * 100)} hazır</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <ProgressBar ratio={prog.ratio} color={trip.finished ? colors.success : colors.primary} />
      </View>
    </Card>
  );
}

export default function TripsScreen({ navigation }) {
  const { trips, loaded } = useJournal();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>🧭 Gezgin Günlüğü</Text>
          <Text style={styles.appSub}>Seyahatlerin, anıların ve rotaların</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {!loaded ? null : trips.length === 0 ? (
          <EmptyState
            icon="✈️"
            title="Henüz seyahat yok"
            subtitle="İlk seyahatini başlat: hazırlık listesi, güzergah planı ve keşif günlüğü seni bekliyor."
          />
        ) : (
          trips.map((t) => (
            <TripCard key={t.id} trip={t} onPress={() => navigation.navigate('TripDetail', { tripId: t.id })} />
          ))
        )}
      </ScrollView>

      <Pressable style={styles.fab} onPress={() => navigation.navigate('NewTrip')}>
        <Text style={styles.fabText}>＋ Yeni Seyahat</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appName: { color: colors.text, fontSize: 22, fontWeight: '800' },
  appSub: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  tripTitle: { color: colors.text, fontSize: 17, fontWeight: '700', flex: 1 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  meta: { color: colors.textMuted, fontSize: 13 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 10 },
  stat: { color: colors.text, fontSize: 13, fontWeight: '600' },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabText: { color: colors.onPrimary, fontWeight: '800', fontSize: 15 },
});

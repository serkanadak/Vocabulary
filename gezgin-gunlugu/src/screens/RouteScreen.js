import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { VEHICLES, getVehicle } from '../data/vehicles';
import { computeRoute, formatKm, formatDuration, hasCoords } from '../logic/geo';
import { colors } from '../theme';
import { ChipPicker, ConfirmModal, EmptyState } from '../components/common';

export default function RouteScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip, updateTrip, removeStop, reorderStops } = useJournal();
  const trip = getTrip(tripId);
  const [pendingRemove, setPendingRemove] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('AddStop', { tripId })} hitSlop={10}>
          <Text style={{ color: colors.primary, fontWeight: '800' }}>＋ Durak</Text>
        </Pressable>
      ),
    });
  }, [navigation, tripId]);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🧳" title="Seyahat bulunamadı" />
      </SafeAreaView>
    );
  }

  const stops = trip.stops || [];
  const result = computeRoute(stops, trip.vehicle);
  const vehicle = getVehicle(trip.vehicle);

  const move = (index, dir) => {
    const next = [...stops];
    const j = index + dir;
    if (j < 0 || j >= next.length) return;
    [next[index], next[j]] = [next[j], next[index]];
    reorderStops(tripId, next);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.label}>Seyahat aracı</Text>
        <View style={{ paddingHorizontal: 16 }}>
          <ChipPicker
            options={VEHICLES.map((v) => ({ value: v.id, ...v }))}
            value={trip.vehicle}
            onChange={(id) => updateTrip(tripId, { vehicle: id })}
            renderLabel={(o) => `${o.icon} ${o.label}`}
          />
        </View>

        {result.hasAny ? (
          <View style={styles.totals}>
            <View style={styles.totalItem}>
              <Text style={styles.totalNum}>{formatKm(result.totalKm)}</Text>
              <Text style={styles.totalLabel}>Toplam mesafe</Text>
            </View>
            <View style={styles.totalItem}>
              <Text style={styles.totalNum}>{formatDuration(result.totalHours)}</Text>
              <Text style={styles.totalLabel}>Tahmini süre</Text>
            </View>
            <View style={styles.totalItem}>
              <Text style={styles.totalNum}>{stops.length}</Text>
              <Text style={styles.totalLabel}>Durak</Text>
            </View>
          </View>
        ) : null}

        {stops.length === 0 ? (
          <EmptyState
            icon="🗺️"
            title="Durak yok"
            subtitle="Rotanı oluşturmak için durak ekle. Koordinat girersen (veya bilinen bir şehir yazarsan) duraklar arası mesafe ve süre otomatik hesaplanır."
          />
        ) : (
          <View style={styles.timeline}>
            {stops.map((stop, i) => {
              const leg = result.legs[i]; // bu duraktan sonrakine
              return (
                <View key={stop.id}>
                  <View style={styles.stopRow}>
                    <View style={styles.stopIndex}>
                      <Text style={styles.stopIndexText}>{i + 1}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.stopName}>{stop.name}</Text>
                      <Text style={styles.stopMeta}>
                        {hasCoords(stop)
                          ? `${stop.lat.toFixed(3)}, ${stop.lng.toFixed(3)}`
                          : 'Koordinat yok — mesafe hesaplanamıyor'}
                        {stop.note ? ` · ${stop.note}` : ''}
                      </Text>
                    </View>
                    <View style={styles.stopActions}>
                      <Pressable onPress={() => move(i, -1)} hitSlop={6} disabled={i === 0}>
                        <Text style={[styles.moveBtn, i === 0 && styles.moveDisabled]}>▲</Text>
                      </Pressable>
                      <Pressable onPress={() => move(i, 1)} hitSlop={6} disabled={i === stops.length - 1}>
                        <Text style={[styles.moveBtn, i === stops.length - 1 && styles.moveDisabled]}>▼</Text>
                      </Pressable>
                      <Pressable onPress={() => setPendingRemove(stop)} hitSlop={6}>
                        <Text style={styles.removeBtn}>✕</Text>
                      </Pressable>
                    </View>
                  </View>

                  {i < stops.length - 1 ? (
                    <View style={styles.legRow}>
                      <View style={styles.legLine} />
                      <Text style={styles.legText}>
                        {vehicle.icon}{' '}
                        {leg && leg.km != null
                          ? `${formatKm(leg.km)} · ${formatDuration(leg.hours)}`
                          : 'mesafe için iki durakta da koordinat gerekir'}
                      </Text>
                    </View>
                  ) : null}
                </View>
              );
            })}
          </View>
        )}

        <Pressable style={styles.addStopBtn} onPress={() => navigation.navigate('AddStop', { tripId })}>
          <Text style={styles.addStopText}>＋ Durak Ekle</Text>
        </Pressable>

        {result.unknownLegs > 0 && result.hasAny ? (
          <Text style={styles.warn}>
            Not: {result.unknownLegs} bacak koordinat eksikliğinden toplama dahil edilmedi.
          </Text>
        ) : null}
      </ScrollView>

      <ConfirmModal
        visible={!!pendingRemove}
        title="Durağı sil?"
        message={pendingRemove?.name}
        confirmLabel="Sil"
        destructive
        onConfirm={() => {
          removeStop(tripId, pendingRemove.id);
          setPendingRemove(null);
        }}
        onCancel={() => setPendingRemove(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  label: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginTop: 16, marginBottom: 8 },
  totals: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalItem: { flex: 1, alignItems: 'center' },
  totalNum: { color: colors.primary, fontSize: 18, fontWeight: '800' },
  totalLabel: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
  timeline: { marginTop: 16 },
  stopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  stopIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopIndexText: { color: '#0b1a2b', fontWeight: '800' },
  stopName: { color: colors.text, fontSize: 15, fontWeight: '700' },
  stopMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  stopActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  moveBtn: { color: colors.textMuted, fontSize: 14 },
  moveDisabled: { opacity: 0.3 },
  removeBtn: { color: colors.danger, fontSize: 16, fontWeight: '700' },
  legRow: { flexDirection: 'row', alignItems: 'center', paddingLeft: 30, paddingVertical: 6 },
  legLine: { width: 2, height: 22, backgroundColor: colors.border, marginRight: 12, marginLeft: 12 },
  legText: { color: colors.textMuted, fontSize: 12 },
  addStopBtn: {
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  addStopText: { color: colors.primary, fontWeight: '800', fontSize: 15 },
  warn: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginTop: 14, lineHeight: 17 },
});

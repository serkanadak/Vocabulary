import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { getVehicle } from '../data/vehicles';
import { checklistProgress } from '../data/checklist';
import { computeRoute, formatKm, formatDuration } from '../logic/geo';
import { formatLongDate, formatShortDate, daysBetween } from '../logic/date';
import { colors } from '../theme';
import { Card, ProgressBar, Pill, ConfirmModal, EmptyState } from '../components/common';

function NavCard({ icon, title, subtitle, onPress, badge }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.navCard, pressed && { opacity: 0.85 }]}>
      <Text style={styles.navIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.navTitle}>{title}</Text>
        {subtitle ? <Text style={styles.navSub}>{subtitle}</Text> : null}
      </View>
      {badge != null ? <Pill label={String(badge)} color={colors.accent} /> : null}
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

export default function TripDetailScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip, removeTrip, finishTrip, reopenTrip } = useJournal();
  const trip = getTrip(tripId);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: trip?.title || 'Seyahat',
      headerRight: () =>
        trip ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Pressable onPress={() => navigation.navigate('NewTrip', { tripId })} hitSlop={10}>
              <Text style={{ color: colors.primary, fontWeight: '700' }}>Düzenle</Text>
            </Pressable>
            <Pressable onPress={() => setConfirmDelete(true)} hitSlop={10}>
              <Text style={{ color: colors.danger, fontWeight: '700' }}>Sil</Text>
            </Pressable>
          </View>
        ) : null,
    });
  }, [navigation, trip, tripId]);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🧳" title="Seyahat bulunamadı" subtitle="Bu seyahat silinmiş olabilir." />
      </SafeAreaView>
    );
  }

  const vehicle = getVehicle(trip.vehicle);
  const prog = checklistProgress(trip.checklist || []);
  const route2 = computeRoute(trip.stops || [], trip.vehicle);
  const span = daysBetween(trip.startDate, trip.endDate);
  const sortedDisc = [...(trip.discoveries || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Özet başlık */}
        <Pressable
          style={({ pressed }) => [styles.hero, pressed && { opacity: 0.9 }]}
          onPress={() => navigation.navigate('NewTrip', { tripId })}
        >
          <View style={styles.heroTop}>
            <Text style={styles.heroVehicle}>
              {vehicle.icon} {vehicle.label}
            </Text>
            {trip.finished ? (
              <Pill label="Tamamlandı" color={colors.success} filled />
            ) : (
              <Pill label="Aktif" color={colors.accent} />
            )}
          </View>
          <Text style={styles.heroDates}>
            {trip.startDate ? formatLongDate(trip.startDate) : 'Tarih yok'}
            {trip.endDate ? `  →  ${formatShortDate(trip.endDate)}` : ''}
            {span ? `  ·  ${span} gün` : ''}
          </Text>
          {route2.hasAny ? (
            <Text style={styles.heroRoute}>
              🗺️ {formatKm(route2.totalKm)} · ⏱️ {formatDuration(route2.totalHours)}
            </Text>
          ) : null}
          <Text style={styles.heroEditHint}>✏️ Bilgileri düzenle</Text>
        </Pressable>

        {/* Hazırlık */}
        <Text style={styles.sectionLabel}>HAZIRLIK</Text>
        <Card>
          <View style={styles.progRow}>
            <Text style={styles.progTitle}>Hazırlık Listesi</Text>
            <Text style={styles.progPct}>%{Math.round(prog.ratio * 100)}</Text>
          </View>
          <ProgressBar ratio={prog.ratio} color={colors.primary} />
          <Text style={styles.progMeta}>
            ✅ {prog.done} tamam · 🟡 {prog.partial} kısmen · ⛔ {prog.skip} gerek yok · ⬜ {prog.todo} bekliyor
          </Text>
          <Pressable style={styles.linkBtn} onPress={() => navigation.navigate('Checklist', { tripId })}>
            <Text style={styles.linkText}>Listeyi aç →</Text>
          </Pressable>
        </Card>

        {/* Planlama */}
        <Text style={styles.sectionLabel}>PLANLAMA</Text>
        <NavCard
          icon="🗺️"
          title="Güzergah Planı"
          subtitle={
            (trip.stops || []).length
              ? `${trip.stops.length} durak · ${route2.hasAny ? formatKm(route2.totalKm) : 'mesafe için koordinat ekle'}`
              : 'Durak ekle, mesafe & süre hesaplansın'
          }
          badge={(trip.stops || []).length || null}
          onPress={() => navigation.navigate('Route', { tripId })}
        />

        {/* Günlük / Keşifler — detaylar keşif günlüğünün içinde */}
        <Text style={styles.sectionLabel}>GÜNLÜK · KEŞİFLER</Text>
        <NavCard
          icon="🧭"
          title="Keşif Günlüğü"
          subtitle={
            sortedDisc.length
              ? `${sortedDisc.length} keşif · duraklara göre düzenle, fotoğraf & not ekle`
              : 'Güzergah noktalarını aç, gezdiğin yerleri işaretle & ekle'
          }
          badge={sortedDisc.length || null}
          onPress={() => navigation.navigate('DiscoveryHub', { tripId })}
        />

        {/* Harcamalar */}
        <Text style={styles.sectionLabel}>BÜTÇE</Text>
        <NavCard
          icon="🧾"
          title="Harcamalar"
          subtitle={
            (trip.expenses || []).length
              ? `${trip.expenses.length} kayıt · fiş okut ya da elle ekle · EUR/USD/TL karşılığı`
              : 'Fiş okutarak veya elle harcama ekle, EUR/USD/TL karşılığını gör'
          }
          badge={(trip.expenses || []).length || null}
          onPress={() => navigation.navigate('Expenses', { tripId })}
        />

        {/* Çıktılar */}
        <Text style={styles.sectionLabel}>SEYAHATİ BİTİR · ÇIKTILAR</Text>
        <NavCard
          icon="📖"
          title="Albüm / Yayın Planı"
          subtitle="Kronolojik kitapçık & PDF mizanpaj taslağı"
          onPress={() => navigation.navigate('Album', { tripId })}
        />
        <NavCard
          icon="🎬"
          title="Video Kolaj Senaryosu"
          subtitle="Sahne sahne timeline, harita geçişleri, müzik & alt yazı"
          onPress={() => navigation.navigate('VideoScript', { tripId })}
        />

        <Pressable
          style={styles.finishBtn}
          onPress={() => (trip.finished ? reopenTrip(tripId) : setConfirmFinish(true))}
        >
          <Text style={styles.finishText}>
            {trip.finished ? '↩︎ Seyahati yeniden aç' : '🏁 Seyahati Bitir'}
          </Text>
        </Pressable>
      </ScrollView>

      <ConfirmModal
        visible={confirmFinish}
        title="Seyahati bitir?"
        message="Seyahat tamamlandı olarak işaretlenecek. Albüm ve video çıktılarını yine de oluşturabilirsin."
        confirmLabel="Bitir"
        onConfirm={() => {
          finishTrip(tripId);
          setConfirmFinish(false);
        }}
        onCancel={() => setConfirmFinish(false)}
      />
      <ConfirmModal
        visible={confirmDelete}
        title="Seyahati sil?"
        message="Bu seyahat, tüm keşifleri, durakları ve notlarıyla kalıcı olarak silinecek."
        confirmLabel="Sil"
        destructive
        onConfirm={() => {
          setConfirmDelete(false);
          removeTrip(tripId);
          navigation.goBack();
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroVehicle: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  heroDates: { color: colors.text, fontSize: 14, marginTop: 10 },
  heroRoute: { color: colors.textMuted, fontSize: 13, marginTop: 6 },
  heroEditHint: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: 12 },
  sectionLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 8,
  },
  progRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  progTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  progPct: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  progMeta: { color: colors.textMuted, fontSize: 12, marginTop: 10 },
  linkBtn: { marginTop: 12, alignSelf: 'flex-start' },
  linkText: { color: colors.primary, fontWeight: '700', fontSize: 13 },
  navCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  navIcon: { fontSize: 22 },
  navTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  navSub: { color: colors.textMuted, fontSize: 12, marginTop: 3 },
  chevron: { color: colors.textMuted, fontSize: 22, fontWeight: '400' },
  discHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 16 },
  addLink: { color: colors.primary, fontWeight: '700', fontSize: 13, marginTop: 22, marginBottom: 8 },
  emptyDisc: { color: colors.textMuted, fontSize: 13, lineHeight: 19 },
  discCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  discIcon: { fontSize: 20 },
  discTitle: { color: colors.text, fontSize: 15, fontWeight: '600' },
  discMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  finishBtn: {
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  finishText: { color: colors.primary, fontWeight: '800', fontSize: 15 },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { useJournal } from '../state/JournalContext';
import { generateAlbumPlan, albumPlanToText } from '../logic/publish';
import { exportAlbumPdf } from '../logic/albumHtml';
import { colors } from '../theme';
import { EmptyState } from '../components/common';

function Block({ children, style }) {
  return <View style={[styles.block, style]}>{children}</View>;
}

export default function AlbumScreen({ route }) {
  const { tripId } = route.params;
  const { getTrip } = useJournal();
  const trip = getTrip(tripId);
  const [copied, setCopied] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="📖" title="Seyahat bulunamadı" />
      </SafeAreaView>
    );
  }

  if (!(trip.discoveries || []).length) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          icon="📖"
          title="Albüm için içerik yok"
          subtitle="Önce birkaç keşif ekle; sonra buradan kronolojik albüm/PDF mizanpaj planını oluşturayım."
        />
      </SafeAreaView>
    );
  }

  const plan = generateAlbumPlan(trip);

  const copyPlan = async () => {
    await Clipboard.setStringAsync(albumPlanToText(trip));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const makePdf = async () => {
    if (Platform.OS !== 'web') {
      Alert.alert(
        'PDF web sürümünde',
        'Fotoğraflı PDF albümü, uygulamanın tarayıcı (web) sürümünde oluşturulur. Aynı seyahat linkini telefonun tarayıcısında açıp “📄 PDF olarak kaydet” diyebilirsin.'
      );
      return;
    }
    setPdfBusy(true);
    try {
      const res = await exportAlbumPdf(trip);
      if (!res.ok && res.reason === 'popup') {
        Alert.alert(
          'Açılır pencere engellendi',
          'PDF için yeni bir sekme açılması gerekiyor. Tarayıcının açılır pencere (popup) iznini verip tekrar dene.'
        );
      }
    } catch (e) {
      Alert.alert('PDF oluşturulamadı', 'Beklenmedik bir hata oluştu. Tekrar deneyebilirsin.');
    } finally {
      setPdfBusy(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.intro}>
          <Text style={styles.introTitle}>📖 Albüm / Yayın Planı</Text>
          <Text style={styles.introSub}>
            {plan.discoveryCount} keşif · {plan.pages.length} sayfa · {plan.vehicle.icon} {plan.vehicle.label}
          </Text>
          <Pressable style={[styles.pdfBtn, pdfBusy && { opacity: 0.7 }]} onPress={makePdf} disabled={pdfBusy}>
            {pdfBusy ? (
              <ActivityIndicator color="#0b1a2b" />
            ) : (
              <Text style={styles.pdfText}>📄 PDF olarak kaydet</Text>
            )}
          </Pressable>
          <Pressable style={styles.copyBtn} onPress={copyPlan}>
            <Text style={styles.copyText}>{copied ? '✓ Kopyalandı' : '📋 Planı metin olarak kopyala'}</Text>
          </Pressable>
          <Text style={styles.pdfHint}>
            PDF, fotoğrafların gömülü olarak baskıya hazır sayfalara dizilir; açılan pencerede “PDF olarak kaydet”i
            seç. Her şey cihazında kalır.
          </Text>
        </View>

        {/* Kapak */}
        <Text style={styles.stage}>KAPAK</Text>
        <Block style={styles.cover}>
          <Text style={styles.coverTitle}>{plan.cover.title}</Text>
          {plan.cover.subtitle ? <Text style={styles.coverSub}>{plan.cover.subtitle}</Text> : null}
          <Text style={styles.ideaLabel}>🎨 Renk/Tema</Text>
          <Text style={styles.idea}>{plan.cover.colorIdea}</Text>
          <Text style={styles.ideaLabel}>🖼️ Görsel</Text>
          <Text style={styles.idea}>{plan.cover.imageIdea}</Text>
        </Block>

        {/* Giriş */}
        <Text style={styles.stage}>GİRİŞ SAYFASI</Text>
        <Block>
          <Text style={styles.introText}>{plan.intro.text}</Text>
          <Text style={styles.layout}>📐 {plan.intro.layout}</Text>
        </Block>

        {/* Sayfalar */}
        <Text style={styles.stage}>SAYFALAR (KRONOLOJİK)</Text>
        {plan.pages.map((p) => (
          <Block key={p.pageNo}>
            <View style={styles.pageHead}>
              <View style={styles.pageNo}>
                <Text style={styles.pageNoText}>{p.pageNo}</Text>
              </View>
              <Text style={styles.pageDate}>{p.date}</Text>
            </View>
            <Text style={styles.layout}>
              🖼️ {p.photoCount} fotoğraf · {p.layout}
            </Text>
            {p.entries.map((e, i) => (
              <View key={i} style={styles.entry}>
                <Text style={styles.entryTitle}>
                  {e.hasPhoto ? '📷' : '📍'} {e.placeName}
                  {e.photoCount > 1 ? <Text style={styles.entryLoc}>  ×{e.photoCount}</Text> : null}
                  {e.location ? <Text style={styles.entryLoc}>  {e.location}</Text> : null}
                </Text>
                {e.userNotes ? <Text style={styles.entryNote}>✍️ {e.userNotes}</Text> : null}
              </View>
            ))}
          </Block>
        ))}

        {/* Harita */}
        <Text style={styles.stage}>SEYAHAT HARİTASI</Text>
        <Block>
          <Text style={styles.mapRoute}>{plan.mapPage.routeText}</Text>
          {plan.mapPage.totalDistance ? (
            <Text style={styles.mapDist}>Toplam mesafe: {plan.mapPage.totalDistance}</Text>
          ) : null}
          <Text style={styles.layout}>📐 {plan.mapPage.layout}</Text>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  intro: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  introTitle: { color: colors.text, fontSize: 18, fontWeight: '800' },
  introSub: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  pdfBtn: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  pdfText: { color: '#0b1a2b', fontWeight: '800', fontSize: 15 },
  copyBtn: {
    marginTop: 10,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 11,
    alignItems: 'center',
  },
  copyText: { color: colors.text, fontWeight: '700', fontSize: 14 },
  pdfHint: { color: colors.textMuted, fontSize: 12, lineHeight: 17, marginTop: 10 },
  stage: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 8,
  },
  block: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cover: { borderColor: colors.primary + '55' },
  coverTitle: { color: colors.primary, fontSize: 22, fontWeight: '900' },
  coverSub: { color: colors.text, fontSize: 14, marginTop: 4 },
  ideaLabel: { color: colors.text, fontSize: 13, fontWeight: '700', marginTop: 14 },
  idea: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginTop: 4 },
  introText: { color: colors.text, fontSize: 14, lineHeight: 21 },
  layout: { color: colors.accent, fontSize: 12, marginTop: 10, lineHeight: 17 },
  pageHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  pageNo: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNoText: { color: '#0b1a2b', fontWeight: '800', fontSize: 13 },
  pageDate: { color: colors.text, fontSize: 14, fontWeight: '700' },
  entry: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: colors.border },
  entryTitle: { color: colors.text, fontSize: 14, fontWeight: '600' },
  entryLoc: { color: colors.textMuted, fontSize: 12, fontWeight: '400' },
  entryNote: { color: colors.textMuted, fontSize: 12, marginTop: 4, fontStyle: 'italic' },
  mapRoute: { color: colors.text, fontSize: 14, fontWeight: '600', lineHeight: 21 },
  mapDist: { color: colors.textMuted, fontSize: 13, marginTop: 6 },
});

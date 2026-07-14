import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { PLACES } from '../data/places';
import { storageEstimate } from '../logic/storage';
import { colors } from '../theme';
import { Card, Field, ChipPicker, SectionHeader, ProgressBar } from '../components/common';

function fmtBytes(n) {
  if (!n) return '0 MB';
  const mb = n / 1048576;
  if (mb >= 1024) return `${(mb / 1024).toFixed(2)} GB`;
  return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`;
}

function photoCountOf(trips) {
  let n = 0;
  for (const t of trips) {
    for (const d of t.discoveries || []) {
      const arr = Array.isArray(d.photos) && d.photos.length ? d.photos : d.photoUri ? [d.photoUri] : [];
      n += arr.length;
    }
  }
  return n;
}

export default function SettingsScreen() {
  const { settings, updateSettings, trips } = useJournal();

  const totalDiscoveries = trips.reduce((n, t) => n + (t.discoveries || []).length, 0);
  const photoCount = photoCountOf(trips);

  const [storage, setStorage] = useState(undefined); // undefined: yükleniyor, null: yok
  useEffect(() => {
    let alive = true;
    storageEstimate().then((e) => {
      if (alive) setStorage(e);
    });
    return () => {
      alive = false;
    };
  }, [photoCount, totalDiscoveries]);

  const ratio = storage && storage.quota ? Math.min(1, storage.usage / storage.quota) : 0;
  const barColor = ratio > 0.9 ? colors.danger : ratio > 0.7 ? colors.primary : colors.success;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.appName}>⚙️ Ayarlar</Text>
        </View>

        <SectionHeader
          title="Güzergah Mesafesi"
          subtitle="Duraklar arası mesafe nasıl hesaplansın?"
        />
        <Card>
          <ChipPicker
            options={[
              { value: 'on', label: '🛰️ Gerçek yol (çevrimiçi)' },
              { value: 'off', label: '≈ Tahmini (çevrimdışı)' },
            ]}
            value={settings.roadOnline ? 'on' : 'off'}
            onChange={(v) => updateSettings({ roadOnline: v === 'on' })}
            renderLabel={(o) => o.label}
          />
          <Text style={styles.hint}>
            {settings.roadOnline
              ? 'Çevrimiçiyken gerçek karayolu mesafesi (OSRM) kullanılır; Google Haritalar’a yakın olur. İnternet yoksa otomatik olarak tahmine düşer.'
              : 'Yalnızca kuş uçuşu mesafe × yol payı çarpanıyla tahmin yapılır (internet kullanmaz). Gerçek yola göre sapma olabilir.'}
          </Text>
        </Card>

        <SectionHeader
          title="Tarihi/Kültürel Özet Kaynağı"
          subtitle="Keşif eklerken özetler nasıl üretilsin?"
        />
        <Card>
          <ChipPicker
            options={[
              { value: 'local', label: '🗄️ Yerel arşiv' },
              { value: 'ai', label: '🤖 Canlı AI' },
            ]}
            value={settings.aiMode}
            onChange={(v) => updateSettings({ aiMode: v })}
            renderLabel={(o) => o.label}
          />
          {settings.aiMode === 'local' ? (
            <Text style={styles.hint}>
              Çevrimdışı çalışır. {PLACES.length} tanınmış yer için hazır tarihi/kültürel özet ve kaynakça sunar.
              Arşivde olmayan yerlerde boş şablon üretilir.
            </Text>
          ) : (
            <Text style={styles.hint}>
              Arşivde bulunmayan yerler için gerçek AI özeti istenir. İnternet ve geçerli bir API anahtarı gerekir;
              yine de önce yerel arşiv denenir.
            </Text>
          )}
        </Card>

        {settings.aiMode === 'ai' ? (
          <>
            <SectionHeader title="AI Sağlayıcı" subtitle="Anahtar yalnızca bu cihazda saklanır." />
            <Card>
              <Text style={styles.label}>Sağlayıcı</Text>
              <ChipPicker
                options={[
                  { value: 'openai', label: 'OpenAI' },
                  { value: 'claude', label: 'Anthropic (Claude)' },
                ]}
                value={settings.apiProvider}
                onChange={(v) => updateSettings({ apiProvider: v })}
                renderLabel={(o) => o.label}
              />
              <Field
                label="API Anahtarı"
                value={settings.apiKey}
                onChangeText={(v) => updateSettings({ apiKey: v })}
                placeholder={settings.apiProvider === 'claude' ? 'sk-ant-...' : 'sk-...'}
                autoCapitalize="none"
              />
              <Field
                label="Model (opsiyonel)"
                value={settings.apiModel}
                onChangeText={(v) => updateSettings({ apiModel: v })}
                placeholder={settings.apiProvider === 'claude' ? 'claude-3-5-sonnet-latest' : 'gpt-4o-mini'}
                autoCapitalize="none"
              />
              <Text style={styles.warn}>
                ⚠️ API anahtarı cihazda düz metin olarak tutulur. Ortak/paylaşılan cihazlarda dikkatli ol.
              </Text>
            </Card>
          </>
        ) : null}

        <SectionHeader title="Depolama" subtitle="Fotoğraflar ve tüm veriler yalnızca bu cihazda tutulur." />
        <Card>
          {storage === undefined ? (
            <Text style={styles.hint}>Depolama bilgisi hesaplanıyor…</Text>
          ) : storage && storage.quota ? (
            <>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Kullanılan</Text>
                <Text style={styles.statVal}>
                  {fmtBytes(storage.usage)} / {fmtBytes(storage.quota)}
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <ProgressBar ratio={ratio} color={barColor} />
              </View>
              <Text style={styles.hint}>
                %{Math.round(ratio * 100)} dolu · {photoCount} fotoğraf · {totalDiscoveries} keşif
              </Text>
              {ratio > 0.85 ? (
                <Text style={styles.warn}>
                  ⚠️ Depolama doluyor. Yeni fotoğraflar kaydedilemeyebilir; eski/gereksiz fotoğrafları silerek yer
                  açabilirsin.
                </Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.hint}>
              Bu cihaz/tarayıcı depolama tahminini sağlamıyor. Yine de {photoCount} fotoğraf ve {totalDiscoveries}{' '}
              keşif kayıtlı.
            </Text>
          )}
        </Card>

        <SectionHeader title="Özet" />
        <Card>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Seyahat</Text>
            <Text style={styles.statVal}>{trips.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Toplam keşif</Text>
            <Text style={styles.statVal}>{totalDiscoveries}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Yerel arşiv (yer)</Text>
            <Text style={styles.statVal}>{PLACES.length}</Text>
          </View>
        </Card>

        <Text style={styles.about}>
          Gezgin Günlüğü · Seyahat notu, dijital albüm ve video kolaj asistanı. Tüm veriler yalnızca bu cihazda
          saklanır.
        </Text>
      </ScrollView>
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
  label: { color: colors.textMuted, fontSize: 12, marginBottom: 6, marginTop: 12 },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 12, lineHeight: 18 },
  warn: { color: colors.primary, fontSize: 12, marginTop: 12, lineHeight: 17 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  statLabel: { color: colors.textMuted, fontSize: 14 },
  statVal: { color: colors.text, fontSize: 14, fontWeight: '700' },
  about: { color: colors.textMuted, fontSize: 12, textAlign: 'center', paddingHorizontal: 24, marginTop: 20, lineHeight: 18 },
});

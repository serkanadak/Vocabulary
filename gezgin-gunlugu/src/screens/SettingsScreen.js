import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { PLACES } from '../data/places';
import { storageEstimate } from '../logic/storage';
import { resolveCategories } from '../data/expenseCategories';
import { categoryUsage } from '../logic/expenseReport';
import { colors, THEMES, getThemeId, saveThemeId } from '../theme';
import {
  Card,
  Field,
  ChipPicker,
  SectionHeader,
  ProgressBar,
  ConfirmModal,
  SecondaryButton,
} from '../components/common';

// Bir renk paleti önizleme kartı — zemin, yazı ve iki vurgu rengini gösterir.
function ThemeOption({ theme, selected, onPress }) {
  const p = theme.palette;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.themeCard,
        { backgroundColor: p.bg, borderColor: selected ? p.primary : colors.border },
        selected && styles.themeCardSelected,
        pressed && { opacity: 0.9 },
      ]}
    >
      <View style={styles.themeSwatches}>
        <View style={[styles.swatch, { backgroundColor: p.surfaceAlt }]} />
        <View style={[styles.swatch, { backgroundColor: p.primary }]} />
        <View style={[styles.swatch, { backgroundColor: p.accent }]} />
      </View>
      <Text style={[styles.themeLabel, { color: p.text }]}>
        {theme.emoji} {theme.label}
      </Text>
      <Text style={[styles.themeCheck, { color: p.primary }]}>{selected ? '● Seçili' : '○ Seç'}</Text>
    </Pressable>
  );
}

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
  const {
    settings,
    updateSettings,
    trips,
    addExpenseCategory,
    deleteExpenseCategory,
    setExpenseCategoryActive,
  } = useJournal();

  // --- Harcama türleri ---
  const catalog = resolveCategories(settings);
  const usage = categoryUsage(trips);
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');
  const [pendingCatDelete, setPendingCatDelete] = useState(null); // silinecek tür

  const addCat = () => {
    const name = newCatLabel.trim();
    if (!name) return;
    addExpenseCategory(name, newCatIcon);
    setNewCatLabel('');
    setNewCatIcon('');
  };

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

  // Aktif palet önyüklemede localStorage'dan gelir; seçim onun kimliğiyle eşleşir.
  const activeTheme = getThemeId();
  const [pendingTheme, setPendingTheme] = useState(null);

  const chooseTheme = (id) => {
    if (id === activeTheme) return;
    setPendingTheme(id);
  };

  const applyTheme = (id) => {
    saveThemeId(id); // önyüklemede uygulanacak palet
    updateSettings({ theme: id }); // durum/dışa aktarma için de sakla
    setPendingTheme(null);
    // Palet, StyleSheet'ler modül yüklenirken oluştuğundan sayfa yenilenince uygulanır.
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.appName}>⚙️ Ayarlar</Text>
        </View>

        <SectionHeader
          title="Ekran Renk Teması"
          subtitle="Uygulamanın renk paletini seç. Seçince palet uygulanır."
        />
        <Card>
          <View style={styles.themeGrid}>
            {Object.values(THEMES).map((t) => (
              <ThemeOption
                key={t.id}
                theme={t}
                selected={t.id === activeTheme}
                onPress={() => chooseTheme(t.id)}
              />
            ))}
          </View>
          <Text style={styles.hint}>
            Dört tema: 🌊 Deniz, ☀️ Güneş, 🏔️ Dağ, ❄️ Kar. Yeni tema, uygulanması için ekranı bir kez
            yeniler; verilerin ve seyahatlerin korunur.
          </Text>
        </Card>

        <SectionHeader
          title="Harcama Türleri"
          subtitle="Seyahatlerde seçilebilen tür listesini yönet."
        />
        <Card>
          {catalog.map((c) => {
            const used = usage[c.value] || 0;
            const canDelete = !c.builtin && used === 0; // kullanılmamış kullanıcı türü tamamen silinir
            return (
              <View key={c.value} style={styles.catRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.catName, !c.active && styles.catNamePassive]}>
                    {c.icon} {c.label}
                    {c.builtin ? '' : ' ·  eklenen'}
                  </Text>
                  <Text style={styles.catMeta}>
                    {c.active ? 'Aktif' : 'Pasif — seyahatlerde seçilemez'}
                    {used ? ` · ${used} harcama` : ' · hiç kullanılmadı'}
                  </Text>
                </View>
                <Pressable onPress={() => setExpenseCategoryActive(c.value, !c.active)} hitSlop={8}>
                  <Text style={[styles.catAction, c.active && styles.catActionMuted]}>
                    {c.active ? 'Pasifleştir' : 'Aktifleştir'}
                  </Text>
                </Pressable>
                {canDelete ? (
                  <Pressable onPress={() => setPendingCatDelete(c)} hitSlop={8}>
                    <Text style={styles.catDelete}>Sil</Text>
                  </Pressable>
                ) : null}
              </View>
            );
          })}

          <View style={styles.catAddBox}>
            <Text style={styles.label}>Yeni tür ekle</Text>
            <View style={styles.catAddRow}>
              <View style={{ flex: 1 }}>
                <Field
                  value={newCatLabel}
                  onChangeText={setNewCatLabel}
                  placeholder="Tür adı (ör. Otopark)"
                />
              </View>
              <View style={{ width: 88 }}>
                <Field value={newCatIcon} onChangeText={setNewCatIcon} placeholder="🅿️" />
              </View>
            </View>
            <SecondaryButton
              title="＋ Türü ekle"
              onPress={addCat}
              disabled={!newCatLabel.trim()}
              style={{ marginHorizontal: 0, marginTop: 4 }}
            />
          </View>

          <Text style={styles.hint}>
            Harcama girilmiş türler silinemez; “Pasifleştir” ile seyahatlerde seçilmekten çıkarılır ve geçmiş
            kayıtları/raporları bozulmadan kalır. Tekrar “Aktifleştir” dediğinde yeniden seçilebilir hâle gelir.
            Hiç kullanılmamış, kendi eklediğin türler tamamen silinebilir.
          </Text>
        </Card>

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

      <ConfirmModal
        visible={!!pendingCatDelete}
        title="Türü sil?"
        message={
          pendingCatDelete
            ? `“${pendingCatDelete.label}” türü listeden kaldırılacak. Bu türde hiç harcama girilmediği için veri kaybı olmaz.`
            : ''
        }
        confirmLabel="Sil"
        destructive
        onConfirm={() => {
          deleteExpenseCategory(pendingCatDelete.value);
          setPendingCatDelete(null);
        }}
        onCancel={() => setPendingCatDelete(null)}
      />

      <ConfirmModal
        visible={!!pendingTheme}
        title="Temayı değiştir?"
        message={
          pendingTheme
            ? `${THEMES[pendingTheme].emoji} ${THEMES[pendingTheme].label} teması uygulanacak. Uygulama bir kez yenilenecek; tüm verilerin korunur.`
            : ''
        }
        confirmLabel="Uygula"
        onConfirm={() => applyTheme(pendingTheme)}
        onCancel={() => setPendingTheme(null)}
      />
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
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  themeCard: {
    width: '47%',
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  themeCardSelected: { borderWidth: 2 },
  themeSwatches: { flexDirection: 'row', gap: 6 },
  swatch: { width: 26, height: 26, borderRadius: 6 },
  themeLabel: { fontSize: 15, fontWeight: '800' },
  themeCheck: { fontSize: 12, fontWeight: '700' },
  label: { color: colors.textMuted, fontSize: 12, marginBottom: 6, marginTop: 12 },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  catName: { color: colors.text, fontSize: 14, fontWeight: '700' },
  catNamePassive: { color: colors.textMuted, textDecorationLine: 'line-through' },
  catMeta: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  catAction: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  catActionMuted: { color: colors.textMuted },
  catDelete: { color: colors.danger, fontSize: 12, fontWeight: '800' },
  catAddBox: { marginTop: 6 },
  catAddRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 12, lineHeight: 18 },
  warn: { color: colors.primary, fontSize: 12, marginTop: 12, lineHeight: 17 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  statLabel: { color: colors.textMuted, fontSize: 14 },
  statVal: { color: colors.text, fontSize: 14, fontWeight: '700' },
  about: { color: colors.textMuted, fontSize: 12, textAlign: 'center', paddingHorizontal: 24, marginTop: 20, lineHeight: 18 },
});

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { PLACES } from '../data/places';
import { storageEstimate } from '../logic/storage';
import { resolveCategories } from '../data/expenseCategories';
import { categoryUsage } from '../logic/expenseReport';
import { colors, THEMES, getThemeId, saveThemeId } from '../theme';
import { t, LANGS, getLang, saveLang } from '../i18n';
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
        {theme.emoji} {t('theme.' + theme.id)}
      </Text>
      <Text style={[styles.themeCheck, { color: p.primary }]}>{selected ? t('set.themeSelected') : t('set.themeSelect')}</Text>
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
  for (const tr of trips) {
    for (const d of tr.discoveries || []) {
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
    renameExpenseCategory,
    resetExpenseCategoryName,
    writeFailed,
  } = useJournal();

  // --- Harcama türleri ---
  const catalog = resolveCategories(settings);
  const usage = categoryUsage(trips);
  const [newCatLabel, setNewCatLabel] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('');
  const [pendingCatDelete, setPendingCatDelete] = useState(null); // silinecek tür
  const [editCat, setEditCat] = useState(null); // { value, label, icon } — adı düzenlenen tür

  const startEdit = (c) => setEditCat({ value: c.value, label: c.label, icon: c.icon });
  const saveEdit = () => {
    if (!editCat || !editCat.label.trim()) return;
    renameExpenseCategory(editCat.value, editCat.label, editCat.icon);
    setEditCat(null);
  };

  const addCat = () => {
    const name = newCatLabel.trim();
    if (!name) return;
    addExpenseCategory(name, newCatIcon);
    setNewCatLabel('');
    setNewCatIcon('');
  };

  const totalDiscoveries = trips.reduce((n, tr) => n + (tr.discoveries || []).length, 0);
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

  // Dil: tema gibi önyüklemede okunur; seçim değişince sayfa bir kez yenilenir.
  const activeLangId = getLang();
  const [pendingLang, setPendingLang] = useState(null);
  const applyLang = (id) => {
    saveLang(id);
    updateSettings({ lang: id });
    setPendingLang(null);
    if (Platform.OS === 'web' && typeof window !== 'undefined') window.location.reload();
  };

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
          <Text style={styles.appName}>{t('set.title')}</Text>
        </View>

        <SectionHeader title={t('set.lang')} subtitle={t('set.langSub')} />
        <Card>
          <ChipPicker
            options={LANGS.map((l) => ({ value: l.id }))}
            value={activeLangId}
            onChange={(id) => {
              if (id !== activeLangId) setPendingLang(id);
            }}
            renderLabel={(o) => {
              const l = LANGS.find((x) => x.id === o.value);
              return `${l.flag} ${l.label}`;
            }}
          />
          <Text style={styles.hint}>{t('set.langNote')}</Text>
        </Card>

        <SectionHeader
          title={t('set.theme')}
          subtitle={t('set.themeSub')}
        />
        <Card>
          <View style={styles.themeGrid}>
            {Object.values(THEMES).map((th) => (
              <ThemeOption
                key={th.id}
                theme={th}
                selected={th.id === activeTheme}
                onPress={() => chooseTheme(th.id)}
              />
            ))}
          </View>
          <Text style={styles.hint}>
            {t('set.themeHint')}
          </Text>
        </Card>

        <SectionHeader
          title={t('catmgr.title')}
          subtitle={t('catmgr.sub')}
        />
        <Card>
          {catalog.map((c) => {
            const used = usage[c.value] || 0;
            const canDelete = !c.builtin && used === 0; // kullanılmamış kullanıcı türü tamamen silinir
            const editing = editCat && editCat.value === c.value;

            if (editing) {
              return (
                <View key={c.value} style={styles.catEditBox}>
                  <Text style={styles.catEditTitle}>{t('catmgr.renameTitle')}</Text>
                  <View style={styles.catAddRow}>
                    <View style={{ flex: 1 }}>
                      <Field
                        value={editCat.label}
                        onChangeText={(v) => setEditCat((s) => ({ ...s, label: v }))}
                        placeholder={t('catmgr.nameField')}
                      />
                    </View>
                    <View style={{ width: 88 }}>
                      <Field
                        value={editCat.icon}
                        onChangeText={(v) => setEditCat((s) => ({ ...s, icon: v }))}
                        placeholder="🔖"
                      />
                    </View>
                  </View>
                  <Text style={styles.catMeta}>
                    {t('catmgr.renameHint', { n: used || 0 })}
                  </Text>
                  <View style={styles.catEditActions}>
                    <Pressable onPress={saveEdit} hitSlop={8} disabled={!editCat.label.trim()}>
                      <Text style={[styles.catAction, !editCat.label.trim() && styles.catActionMuted]}>{t('common.save')}</Text>
                    </Pressable>
                    <Pressable onPress={() => setEditCat(null)} hitSlop={8}>
                      <Text style={styles.catActionMuted}>{t('common.cancel')}</Text>
                    </Pressable>
                    {c.renamed ? (
                      <Pressable
                        onPress={() => {
                          resetExpenseCategoryName(c.value);
                          setEditCat(null);
                        }}
                        hitSlop={8}
                      >
                        <Text style={styles.catActionMuted}>{t('catmgr.resetName')}</Text>
                      </Pressable>
                    ) : null}
                  </View>
                </View>
              );
            }

            return (
              <View key={c.value} style={styles.catRow}>
                <Pressable style={{ flex: 1 }} onPress={() => startEdit(c)}>
                  <Text style={[styles.catName, !c.active && styles.catNamePassive]}>
                    {c.icon} {c.label}
                    {c.builtin ? '' : t('catmgr.added')}
                  </Text>
                  <Text style={styles.catMeta}>
                    {c.active ? t('catmgr.active') : t('catmgr.passive')}
                    {used ? t('catmgr.usedN', { n: used }) : t('catmgr.unused')}
                  </Text>
                </Pressable>
                <Pressable onPress={() => startEdit(c)} hitSlop={8}>
                  <Text style={styles.catAction}>✏️</Text>
                </Pressable>
                <Pressable onPress={() => setExpenseCategoryActive(c.value, !c.active)} hitSlop={8}>
                  <Text style={[styles.catAction, c.active && styles.catActionMuted]}>
                    {c.active ? t('catmgr.deactivate') : t('catmgr.activate')}
                  </Text>
                </Pressable>
                {canDelete ? (
                  <Pressable onPress={() => setPendingCatDelete(c)} hitSlop={8}>
                    <Text style={styles.catDelete}>{t('common.delete')}</Text>
                  </Pressable>
                ) : null}
              </View>
            );
          })}

          <View style={styles.catAddBox}>
            <Text style={styles.label}>{t('catmgr.newLabel')}</Text>
            <View style={styles.catAddRow}>
              <View style={{ flex: 1 }}>
                <Field
                  value={newCatLabel}
                  onChangeText={setNewCatLabel}
                  placeholder={t('catmgr.namePlaceholder')}
                />
              </View>
              <View style={{ width: 88 }}>
                <Field value={newCatIcon} onChangeText={setNewCatIcon} placeholder="🅿️" />
              </View>
            </View>
            <SecondaryButton
              title={t('catmgr.addBtn')}
              onPress={addCat}
              disabled={!newCatLabel.trim()}
              style={{ marginHorizontal: 0, marginTop: 4 }}
            />
          </View>

          <Text style={styles.hint}>
            {t('catmgr.hint')}
          </Text>
        </Card>

        <SectionHeader
          title={t('set.roadTitle')}
          subtitle={t('set.roadSub')}
        />
        <Card>
          <ChipPicker
            options={[
              { value: 'on', label: t('set.roadOn') },
              { value: 'off', label: t('set.roadOff') },
            ]}
            value={settings.roadOnline ? 'on' : 'off'}
            onChange={(v) => updateSettings({ roadOnline: v === 'on' })}
            renderLabel={(o) => o.label}
          />
          <Text style={styles.hint}>
            {settings.roadOnline ? t('set.roadOnHint') : t('set.roadOffHint')}
          </Text>
        </Card>

        <SectionHeader
          title={t('set.aiTitle')}
          subtitle={t('set.aiSub')}
        />
        <Card>
          <ChipPicker
            options={[
              { value: 'local', label: t('set.aiLocal') },
              { value: 'ai', label: t('set.aiLive') },
            ]}
            value={settings.aiMode}
            onChange={(v) => updateSettings({ aiMode: v })}
            renderLabel={(o) => o.label}
          />
          {settings.aiMode === 'local' ? (
            <Text style={styles.hint}>
              {t('set.aiLocalHint', { n: PLACES.length })}
            </Text>
          ) : (
            <Text style={styles.hint}>
              {t('set.aiLiveHint')}
            </Text>
          )}
        </Card>

        {settings.aiMode === 'ai' ? (
          <>
            <SectionHeader title={t('set.providerTitle')} subtitle={t('set.providerSub')} />
            <Card>
              <Text style={styles.label}>{t('set.provider')}</Text>
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
                label={t('set.apiKey')}
                value={settings.apiKey}
                onChangeText={(v) => updateSettings({ apiKey: v })}
                placeholder={settings.apiProvider === 'claude' ? 'sk-ant-...' : 'sk-...'}
                autoCapitalize="none"
              />
              <Field
                label={t('set.model')}
                value={settings.apiModel}
                onChangeText={(v) => updateSettings({ apiModel: v })}
                placeholder={settings.apiProvider === 'claude' ? 'claude-3-5-sonnet-latest' : 'gpt-4o-mini'}
                autoCapitalize="none"
              />
              <Text style={styles.warn}>
                {t('set.keyWarn')}
              </Text>
            </Card>
          </>
        ) : null}

        <SectionHeader title={t('set.storage')} subtitle={t('set.storageSub')} />
        <Card>
          {writeFailed ? <Text style={styles.warn}>{t('set.writeFailed')}</Text> : null}
          {storage === undefined ? (
            <Text style={styles.hint}>{t('set.storageCalc')}</Text>
          ) : storage && storage.quota ? (
            <>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>{t('set.used')}</Text>
                <Text style={styles.statVal}>
                  {fmtBytes(storage.usage)} / {fmtBytes(storage.quota)}
                </Text>
              </View>
              <View style={{ marginTop: 8 }}>
                <ProgressBar ratio={ratio} color={barColor} />
              </View>
              <Text style={styles.hint}>
                {t('set.storageMeta', { pct: Math.round(ratio * 100), photos: photoCount, disc: totalDiscoveries })}
              </Text>
              {ratio > 0.85 ? (
                <Text style={styles.warn}>
                  {t('set.storageWarn')}
                </Text>
              ) : null}
            </>
          ) : (
            <Text style={styles.hint}>
              {t('set.storageNoEstimate', { photos: photoCount, disc: totalDiscoveries })}
            </Text>
          )}
        </Card>

        <SectionHeader title={t('set.summary')} />
        <Card>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{t('set.tripCount')}</Text>
            <Text style={styles.statVal}>{trips.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{t('set.discTotal')}</Text>
            <Text style={styles.statVal}>{totalDiscoveries}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{t('set.archiveCount')}</Text>
            <Text style={styles.statVal}>{PLACES.length}</Text>
          </View>
        </Card>

        <Text style={styles.about}>
          {t('set.about')}
        </Text>
      </ScrollView>

      <ConfirmModal
        visible={!!pendingLang}
        title={t('set.langConfirm')}
        message={
          pendingLang
            ? t('set.langConfirmMsg', {
                lang: `${(LANGS.find((l) => l.id === pendingLang) || {}).flag || ''} ${
                  (LANGS.find((l) => l.id === pendingLang) || {}).label || ''
                }`.trim(),
              })
            : ''
        }
        confirmLabel={t('set.apply')}
        onConfirm={() => applyLang(pendingLang)}
        onCancel={() => setPendingLang(null)}
      />

      <ConfirmModal
        visible={!!pendingCatDelete}
        title={t('catmgr.deleteConfirm')}
        message={pendingCatDelete ? t('catmgr.deleteConfirmMsg', { name: pendingCatDelete.label }) : ''}
        confirmLabel={t('common.delete')}
        destructive
        onConfirm={() => {
          deleteExpenseCategory(pendingCatDelete.value);
          setPendingCatDelete(null);
        }}
        onCancel={() => setPendingCatDelete(null)}
      />

      <ConfirmModal
        visible={!!pendingTheme}
        title={t('set.themeConfirm')}
        message={
          pendingTheme
            ? t('set.themeConfirmMsg', {
                theme: `${THEMES[pendingTheme].emoji} ${t('theme.' + pendingTheme)}`,
              })
            : ''
        }
        confirmLabel={t('set.apply')}
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
  catEditBox: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.surfaceAlt,
  },
  catEditTitle: { color: colors.text, fontSize: 13, fontWeight: '800' },
  catEditActions: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 12 },
  catAddBox: { marginTop: 6 },
  catAddRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 12, lineHeight: 18 },
  warn: { color: colors.primary, fontSize: 12, marginTop: 12, lineHeight: 17 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  statLabel: { color: colors.textMuted, fontSize: 14 },
  statVal: { color: colors.text, fontSize: 14, fontWeight: '700' },
  about: { color: colors.textMuted, fontSize: 12, textAlign: 'center', paddingHorizontal: 24, marginTop: 20, lineHeight: 18 },
});

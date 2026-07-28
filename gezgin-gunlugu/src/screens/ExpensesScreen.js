import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useJournal } from '../state/JournalContext';
import { preparePhoto } from '../logic/imageStore';
import { readReceipt } from '../logic/receipt';
import { getRates, convertAll, formatMoney, currencySymbol, CURRENCIES, TARGETS } from '../logic/fx';
import {
  DEFAULT_EXPENSE_CATEGORY,
  resolveCategories,
  activeCategories,
  catLabel,
  catIcon,
} from '../data/expenseCategories';
import { PAYMENT_METHODS, DEFAULT_PAYMENT, paymentLabel, paymentIcon } from '../data/paymentMethods';
import { todayKey, isValidDateKey, formatShortDate } from '../logic/date';
import { colors } from '../theme';
import { Field, ChipPicker, PrimaryButton, SecondaryButton, ConfirmModal, EmptyState, Card } from '../components/common';

// Saklanan fiş görüntüsü ayarı: okunaklı ama küçük (veri tek JSON blob'unda tutulur).
const RECEIPT_STORE_OPTS = { maxPx: 900, quality: 0.5 };

function emptyForm() {
  return {
    kind: DEFAULT_EXPENSE_CATEGORY,
    label: '',
    amount: '',
    currency: 'EUR',
    payment: DEFAULT_PAYMENT,
    date: todayKey(),
    receiptPhoto: null,
  };
}

export default function ExpensesScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { getTrip, addExpense, updateExpense, removeExpense, settings } = useJournal();
  const trip = getTrip(tripId);

  const [form, setForm] = useState(null); // null = form kapalı
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [reading, setReading] = useState(false);
  const [notice, setNotice] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Harcamalar',
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('ExpenseReport', { tripId })} hitSlop={10}>
          <Text style={{ color: colors.primary, fontWeight: '700' }}>📊 Rapor</Text>
        </Pressable>
      ),
    });
  }, [navigation, tripId]);

  if (!trip) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState icon="🧾" title="Seyahat bulunamadı" />
      </SafeAreaView>
    );
  }

  const expenses = [...(trip.expenses || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? 1 : -1));

  // Tüm türler (etiket okumak için) ve yalnızca aktif olanlar (seçim için).
  const catalog = resolveCategories(settings);
  const activeList = activeCategories(settings);
  // Hepsi pasifleştirilmişse kilitlenmemek için tüm katalogu göster.
  const active = activeList.length ? activeList : catalog;
  // Düzenlenen kayıt pasif bir türdeyse onu da seçenekler arasında tut ki
  // kullanıcı istemeden türü değiştirmek zorunda kalmasın.
  const pickable =
    form && form.kind && !active.some((c) => c.value === form.kind)
      ? [...active, ...catalog.filter((c) => c.value === form.kind)]
      : active;
  // Yeni kayıt için varsayılan tür: aktifse 'yemek', değilse ilk aktif tür.
  const defaultKind = active.some((c) => c.value === DEFAULT_EXPENSE_CATEGORY)
    ? DEFAULT_EXPENSE_CATEGORY
    : (active[0] && active[0].value) || DEFAULT_EXPENSE_CATEGORY;

  // EUR/USD/TL toplamları (çevrimi olan harcamalar üzerinden).
  const totals = { EUR: 0, USD: 0, TRY: 0 };
  let missing = 0;
  for (const e of expenses) {
    if (e.eq) {
      for (const t of TARGETS) if (typeof e.eq[t] === 'number') totals[t] += e.eq[t];
    } else {
      missing += 1;
    }
  }

  const openAdd = () => {
    setForm({ ...emptyForm(), kind: defaultKind });
    setEditingId(null);
    setNotice('');
  };
  const openEdit = (e) => {
    setForm({
      kind: e.kind || DEFAULT_EXPENSE_CATEGORY,
      label: e.label || '',
      amount: e.amount != null ? String(e.amount) : '',
      currency: e.currency || 'EUR',
      payment: e.payment || DEFAULT_PAYMENT,
      date: e.date || todayKey(),
      receiptPhoto: e.receiptPhoto || null,
    });
    setEditingId(e.id);
    setNotice('');
  };
  const closeForm = () => {
    setForm(null);
    setEditingId(null);
    setNotice('');
  };
  const patchForm = (p) => setForm((f) => ({ ...f, ...p }));

  // Fiş fotoğrafı seç + (AI açıksa) tutarları otomatik oku.
  const scanReceipt = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });
      if (res.canceled || !res.assets?.length) return;
      setReading(true);
      setNotice('');
      // OCR'a okunaklı (büyük) kopya gider; SAKLANAN kopya küçüktür. Fiş
      // görüntüleri tüm seyahat verisiyle aynı JSON'da tutulduğu için büyük
      // saklamak uygulamayı yavaşlatıp çökmesine yol açıyordu.
      const ocrPhoto = await preparePhoto(res.assets[0].uri, { maxPx: 1400, quality: 0.7 });
      const photo = await preparePhoto(res.assets[0].uri, RECEIPT_STORE_OPTS);
      const base = form || { ...emptyForm(), kind: defaultKind };
      const next = { ...base, receiptPhoto: photo };
      try {
        const parsed = await readReceipt(ocrPhoto, settings);
        if (parsed.label) next.label = parsed.label;
        if (parsed.amount != null) next.amount = String(parsed.amount);
        if (parsed.currency) next.currency = parsed.currency;
        if (parsed.kind) next.kind = parsed.kind;
        if (parsed.payment) next.payment = parsed.payment;
        setNotice('Fiş okundu — bilgileri kontrol edip kaydedin.');
      } catch (err) {
        setNotice(
          /AI kapalı/.test(err.message)
            ? 'Fiş eklendi. Otomatik okuma için Ayarlar’dan “Canlı AI”yı açın; şimdilik elle doldurun.'
            : 'Fiş okunamadı — bilgileri elle doldurun. (Fotoğraf eklendi.)'
        );
      }
      setForm(next);
    } catch (e) {
      setNotice('Fotoğraf seçilemedi.');
    } finally {
      setReading(false);
    }
  };

  const attachPhotoOnly = async () => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) return;
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });
      if (res.canceled || !res.assets?.length) return;
      const photo = await preparePhoto(res.assets[0].uri, RECEIPT_STORE_OPTS);
      patchForm({ receiptPhoto: photo });
    } catch (e) {
      /* yoksay */
    }
  };

  const amountNum = Number((form?.amount || '').replace(',', '.'));
  const dateOk = !form?.date || isValidDateKey(form.date);
  const canSave = !!form && form.label.trim().length > 0 && isFinite(amountNum) && amountNum > 0 && dateOk;

  const save = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    let eq = null;
    try {
      const rates = await getRates();
      eq = convertAll(amountNum, form.currency, rates);
    } catch (e) {
      eq = null;
    }
    const payload = {
      kind: form.kind,
      label: form.label.trim(),
      amount: amountNum,
      currency: form.currency,
      payment: form.payment,
      date: form.date.trim() || todayKey(),
      eq,
      receiptPhoto: form.receiptPhoto || null,
    };
    if (editingId) updateExpense(tripId, editingId, payload);
    else addExpense(tripId, payload);
    setSaving(false);
    closeForm();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        {/* Toplam özeti */}
        <View style={styles.totalsCard}>
          <Text style={styles.totalsTitle}>Toplam Harcama</Text>
          <View style={styles.totalsRow}>
            {TARGETS.map((t) => (
              <View key={t} style={styles.totalCell}>
                <Text style={styles.totalCur}>{currencySymbol(t)} {t}</Text>
                <Text style={styles.totalVal}>{formatMoney(totals[t], t)}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.totalsMeta}>
            {expenses.length} kayıt
            {missing ? ` · ${missing} kaydın karşılığı hesaplanamadı (çevrimdışı)` : ' · canlı kurla çevrildi'}
          </Text>
        </View>

        {/* Ekle / Fiş oku eylemleri */}
        {!form ? (
          <View style={styles.actions}>
            <PrimaryButton title="＋ Harcama ekle" onPress={openAdd} style={{ flex: 1, marginHorizontal: 0 }} />
            <SecondaryButton
              title="📷 Fiş oku"
              onPress={() => {
                setForm({ ...emptyForm(), kind: defaultKind });
                setEditingId(null);
                setTimeout(scanReceipt, 0);
              }}
              style={{ flex: 1, marginHorizontal: 0, marginTop: 8 }}
            />
          </View>
        ) : null}

        {/* Form */}
        {form ? (
          <Card style={{ marginTop: 14 }}>
            <Text style={styles.formTitle}>{editingId ? 'Harcamayı düzenle' : 'Yeni harcama'}</Text>

            {reading ? (
              <View style={styles.readingRow}>
                <ActivityIndicator color={colors.primary} />
                <Text style={styles.readingText}>Fiş okunuyor…</Text>
              </View>
            ) : null}

            {form.receiptPhoto ? (
              <View style={styles.receiptWrap}>
                <Image source={{ uri: form.receiptPhoto }} style={styles.receiptImg} resizeMode="cover" />
                <Pressable style={styles.receiptRemove} onPress={() => patchForm({ receiptPhoto: null })} hitSlop={8}>
                  <Text style={styles.receiptRemoveText}>✕</Text>
                </Pressable>
              </View>
            ) : null}

            <View style={styles.receiptBtns}>
              <SecondaryButton
                title={reading ? '…' : '📷 Fiş oku'}
                onPress={scanReceipt}
                disabled={reading}
                style={{ flex: 1, marginHorizontal: 0 }}
              />
              <SecondaryButton
                title="🖼️ Foto ekle"
                onPress={attachPhotoOnly}
                style={{ flex: 1, marginHorizontal: 0, marginLeft: 8 }}
              />
            </View>

            {notice ? <Text style={styles.notice}>{notice}</Text> : null}

            <Text style={styles.fieldLabel}>Tür</Text>
            <ChipPicker
              options={pickable.map((c) => ({ value: c.value }))}
              value={form.kind}
              onChange={(v) => patchForm({ kind: v })}
              renderLabel={(o) => `${catIcon(catalog, o.value)} ${catLabel(catalog, o.value)}`}
            />

            <Field label="Alınan hizmet / mal" value={form.label} onChangeText={(v) => patchForm({ label: v })} placeholder="Akşam yemeği, müze bileti, hediyelik…" />

            <View style={styles.amountRow}>
              <View style={{ flex: 1 }}>
                <Field label="Tutar" value={form.amount} onChangeText={(v) => patchForm({ amount: v })} placeholder="0,00" keyboardType="decimal-pad" />
              </View>
            </View>

            <Text style={styles.fieldLabel}>Para birimi</Text>
            <ChipPicker
              options={CURRENCIES.map((c) => ({ value: c.code }))}
              value={form.currency}
              onChange={(v) => patchForm({ currency: v })}
              renderLabel={(o) => `${currencySymbol(o.value)} ${o.value}`}
            />

            <Text style={styles.fieldLabel}>Ödeme şekli</Text>
            <ChipPicker
              options={PAYMENT_METHODS.map((p) => ({ value: p.value }))}
              value={form.payment}
              onChange={(v) => patchForm({ payment: v })}
              renderLabel={(o) => `${paymentIcon(o.value)} ${paymentLabel(o.value)}`}
            />

            <Field label="📅 Tarih (YYYY-AA-GG)" value={form.date} onChangeText={(v) => patchForm({ date: v })} autoCapitalize="none" placeholder={todayKey()} />
            {!dateOk ? <Text style={styles.err}>Geçersiz tarih biçimi.</Text> : null}

            <View style={styles.formActions}>
              <PrimaryButton title={saving ? 'Kaydediliyor…' : 'Kaydet'} onPress={save} disabled={!canSave || saving} style={{ flex: 1, marginHorizontal: 0 }} />
              <Pressable onPress={closeForm} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Vazgeç</Text>
              </Pressable>
            </View>
          </Card>
        ) : null}

        {/* Liste */}
        {expenses.length ? (
          <View style={{ marginTop: 18 }}>
            {expenses.map((e) => (
              <Pressable key={e.id} style={styles.row} onPress={() => openEdit(e)}>
                {e.receiptPhoto ? (
                  <Image source={{ uri: e.receiptPhoto }} style={styles.thumb} resizeMode="cover" />
                ) : (
                  <View style={styles.thumbIcon}>
                    <Text style={{ fontSize: 20 }}>{catIcon(catalog, e.kind)}</Text>
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.rowLabel} numberOfLines={1}>{e.label}</Text>
                  <Text style={styles.rowMeta}>
                    {formatShortDate(e.date)} · {catLabel(catalog, e.kind)}
                    {e.payment ? ` · ${paymentIcon(e.payment)} ${paymentLabel(e.payment)}` : ''}
                  </Text>
                  {e.eq ? (
                    <Text style={styles.rowEq} numberOfLines={1}>
                      {TARGETS.map((t) => formatMoney(e.eq[t], t)).join('  ·  ')}
                    </Text>
                  ) : (
                    <Text style={styles.rowEqMissing}>karşılık hesaplanamadı</Text>
                  )}
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.rowAmount}>{formatMoney(e.amount, e.currency)}</Text>
                  <Pressable onPress={() => setConfirmDeleteId(e.id)} hitSlop={8} style={styles.delBtn}>
                    <Text style={styles.delText}>Sil</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </View>
        ) : !form ? (
          <EmptyState
            icon="🧾"
            title="Henüz harcama yok"
            subtitle="Fiş okutarak veya elle ekleyerek harcamalarını EUR / USD / TL karşılığıyla takip et."
          />
        ) : null}
      </ScrollView>

      <ConfirmModal
        visible={!!confirmDeleteId}
        title="Harcamayı sil?"
        confirmLabel="Sil"
        destructive
        onConfirm={() => {
          removeExpense(tripId, confirmDeleteId);
          setConfirmDeleteId(null);
        }}
        onCancel={() => setConfirmDeleteId(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  totalsCard: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 16,
    padding: 18,
  },
  totalsTitle: { color: colors.onPrimary, fontSize: 13, fontWeight: '700', opacity: 0.9, letterSpacing: 0.5 },
  totalsRow: { flexDirection: 'row', marginTop: 12, gap: 10 },
  totalCell: { flex: 1 },
  totalCur: { color: colors.onPrimary, fontSize: 12, opacity: 0.85, fontWeight: '700' },
  totalVal: { color: colors.onPrimary, fontSize: 17, fontWeight: '800', marginTop: 3 },
  totalsMeta: { color: colors.onPrimary, fontSize: 11, opacity: 0.85, marginTop: 12 },
  actions: { marginHorizontal: 16, marginTop: 14 },
  formTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginBottom: 4 },
  readingRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  readingText: { color: colors.textMuted, fontSize: 13 },
  receiptWrap: { marginTop: 12, borderRadius: 12, overflow: 'hidden' },
  receiptImg: { width: '100%', height: 180, backgroundColor: colors.surfaceAlt },
  receiptRemove: {
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
  receiptRemoveText: { color: '#fff', fontWeight: '800' },
  receiptBtns: { flexDirection: 'row', marginTop: 12 },
  notice: { color: colors.accent, fontSize: 12, marginTop: 10, lineHeight: 17 },
  fieldLabel: { color: colors.textMuted, fontSize: 12, marginTop: 14, marginBottom: 8 },
  amountRow: { flexDirection: 'row', gap: 10 },
  err: { color: colors.danger, fontSize: 11, marginTop: 4 },
  formActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 16 },
  cancelBtn: { paddingHorizontal: 14, paddingVertical: 12 },
  cancelText: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  thumb: { width: 46, height: 46, borderRadius: 8, backgroundColor: colors.surfaceAlt },
  thumbIcon: {
    width: 46,
    height: 46,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { color: colors.text, fontSize: 15, fontWeight: '700' },
  rowMeta: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  rowEq: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
  rowEqMissing: { color: colors.danger, fontSize: 11, marginTop: 3, fontStyle: 'italic' },
  rowRight: { alignItems: 'flex-end' },
  rowAmount: { color: colors.primary, fontSize: 15, fontWeight: '800' },
  delBtn: { marginTop: 8 },
  delText: { color: colors.danger, fontSize: 12, fontWeight: '700' },
});

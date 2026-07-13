import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { VEHICLES, DEFAULT_VEHICLE } from '../data/vehicles';
import { mergeChecklistWithDefaults, checklistNeedsUpdate } from '../data/checklist';
import { isValidDateKey, todayKey } from '../logic/date';
import { colors } from '../theme';
import { Card, Field, ChipPicker, PrimaryButton, SectionHeader } from '../components/common';

export default function NewTripScreen({ route, navigation }) {
  const { tripId } = route.params || {};
  const { createTrip, updateTrip, getTrip, setChecklist } = useJournal();

  const existing = tripId ? getTrip(tripId) : null;
  const isEdit = !!existing;

  const [title, setTitle] = useState(existing?.title || '');
  const [startDate, setStartDate] = useState(existing ? existing.startDate || '' : todayKey());
  const [endDate, setEndDate] = useState(existing?.endDate || '');
  const [vehicle, setVehicle] = useState(existing?.vehicle || DEFAULT_VEHICLE);

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEdit ? 'Seyahati Düzenle' : 'Yeni Seyahat' });
  }, [navigation, isEdit]);

  const startOk = !startDate || isValidDateKey(startDate);
  const endOk = !endDate || isValidDateKey(endDate);
  const canSave = title.trim().length > 0 && startOk && endOk;

  // Araç değişince hazırlık listesindeki araca özel maddeler (yeşil kart, kasko,
  // vinyet) güncellenmeli; mevcut durum/not ve elle eklenenler korunur.
  const vehicleChanged = isEdit && vehicle !== existing.vehicle;
  const willUpdateChecklist = vehicleChanged && checklistNeedsUpdate(existing.checklist || [], vehicle);

  const save = () => {
    if (!canSave) return;
    if (isEdit) {
      updateTrip(tripId, {
        title: title.trim(),
        startDate: startDate.trim(),
        endDate: endDate.trim(),
        vehicle,
      });
      if (willUpdateChecklist) {
        setChecklist(tripId, mergeChecklistWithDefaults(existing.checklist || [], vehicle));
      }
      navigation.goBack();
    } else {
      const id = createTrip({ title, startDate, endDate, vehicle });
      navigation.replace('TripDetail', { tripId: id });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <SectionHeader
          title={isEdit ? 'Seyahati Düzenle' : 'Yeni Seyahat'}
          subtitle={
            isEdit
              ? 'Seyahatin temel bilgilerini güncelle. Durak, keşif ve notların korunur.'
              : 'Temel bilgileri gir; hazırlık listesi otomatik oluşturulacak.'
          }
        />
        <Card>
          <Field
            label="Seyahat adı"
            value={title}
            onChangeText={setTitle}
            placeholder="ör. Ege Turu 2026"
          />
          <Field
            label="Başlangıç tarihi (YYYY-AA-GG)"
            value={startDate}
            onChangeText={setStartDate}
            placeholder="2026-07-11"
            autoCapitalize="none"
          />
          {!startOk ? <Text style={styles.err}>Geçersiz tarih biçimi.</Text> : null}
          <Field
            label="Bitiş tarihi (opsiyonel)"
            value={endDate}
            onChangeText={setEndDate}
            placeholder="2026-07-20"
            autoCapitalize="none"
          />
          {!endOk ? <Text style={styles.err}>Geçersiz tarih biçimi.</Text> : null}

          <Text style={styles.label}>Seyahat aracı</Text>
          <ChipPicker
            options={VEHICLES.map((v) => ({ value: v.id, ...v }))}
            value={vehicle}
            onChange={setVehicle}
            renderLabel={(o) => `${o.icon} ${o.label}`}
          />
          <Text style={styles.hint}>
            Araç, duraklar arası mesafe ve süre hesabında kullanılır (uçak kuş uçuşu, kara/ray araçları yol
            payıyla).
          </Text>
          {willUpdateChecklist ? (
            <Text style={styles.notice}>
              ℹ️ Araç değişti: hazırlık listesindeki araca özel maddeler (yeşil kart, kasko, vinyet) buna göre
              güncellenecek. İşaretlediğin durumlar ve eklediğin maddeler korunur.
            </Text>
          ) : null}
        </Card>

        <PrimaryButton
          title={isEdit ? 'Değişiklikleri Kaydet' : 'Seyahati Başlat 🌍'}
          onPress={save}
          disabled={!canSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  label: { color: colors.textMuted, fontSize: 12, marginBottom: 6, marginTop: 14 },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 10, lineHeight: 17 },
  notice: {
    color: colors.text,
    fontSize: 12,
    marginTop: 12,
    lineHeight: 17,
    backgroundColor: colors.accent + '22',
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  err: { color: colors.danger, fontSize: 12, marginTop: 4 },
});

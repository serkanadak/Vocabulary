import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { VEHICLES, DEFAULT_VEHICLE } from '../data/vehicles';
import { isValidDateKey, todayKey } from '../logic/date';
import { colors } from '../theme';
import { Card, Field, ChipPicker, PrimaryButton, SectionHeader } from '../components/common';

export default function NewTripScreen({ navigation }) {
  const { createTrip } = useJournal();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(todayKey());
  const [endDate, setEndDate] = useState('');
  const [vehicle, setVehicle] = useState(DEFAULT_VEHICLE);

  const startOk = !startDate || isValidDateKey(startDate);
  const endOk = !endDate || isValidDateKey(endDate);
  const canSave = title.trim().length > 0 && startOk && endOk;

  const save = () => {
    if (!canSave) return;
    const id = createTrip({ title, startDate, endDate, vehicle });
    navigation.replace('TripDetail', { tripId: id });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <SectionHeader title="Yeni Seyahat" subtitle="Temel bilgileri gir; hazırlık listesi otomatik oluşturulacak." />
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
        </Card>

        <PrimaryButton title="Seyahati Başlat 🌍" onPress={save} disabled={!canSave} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  label: { color: colors.textMuted, fontSize: 12, marginBottom: 6, marginTop: 14 },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 10, lineHeight: 17 },
  err: { color: colors.danger, fontSize: 12, marginTop: 4 },
});

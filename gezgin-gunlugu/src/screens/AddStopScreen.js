import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useJournal } from '../state/JournalContext';
import { matchPlace } from '../data/places';
import { colors } from '../theme';
import { Card, Field, PrimaryButton, SectionHeader } from '../components/common';

export default function AddStopScreen({ route, navigation }) {
  const { tripId } = route.params;
  const { addStop } = useJournal();
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [note, setNote] = useState('');

  // Girilen isim bilinen bir yerse koordinat önerisi sun.
  const suggestion = name.trim().length >= 3 ? matchPlace(name) : null;
  const showSuggestion = suggestion && (!lat || !lng);

  const applySuggestion = () => {
    if (!suggestion) return;
    if (!name.trim() || name.trim().length < suggestion.name.length) setName(suggestion.name);
    setLat(String(suggestion.lat));
    setLng(String(suggestion.lng));
  };

  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);
  const latOk = !lat || (!Number.isNaN(parsedLat) && parsedLat >= -90 && parsedLat <= 90);
  const lngOk = !lng || (!Number.isNaN(parsedLng) && parsedLng >= -180 && parsedLng <= 180);
  const canSave = name.trim().length > 0 && latOk && lngOk;

  const save = () => {
    if (!canSave) return;
    addStop(tripId, {
      name: name.trim(),
      lat: lat ? parsedLat : null,
      lng: lng ? parsedLng : null,
      note: note.trim(),
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <SectionHeader
          title="Durak Ekle"
          subtitle="Şehir/mekan adı gir. Bilinen bir yerse koordinatı otomatik önerilir; değilse elle girebilirsin."
        />
        <Card>
          <Field label="Durak adı" value={name} onChangeText={setName} placeholder="ör. Efes, İzmir" />

          {showSuggestion ? (
            <Pressable style={styles.suggestion} onPress={applySuggestion}>
              <Text style={styles.suggestionText}>
                📍 <Text style={styles.bold}>{suggestion.name}</Text> ({suggestion.city}) bulundu — koordinatı kullan (
                {suggestion.lat.toFixed(3)}, {suggestion.lng.toFixed(3)})
              </Text>
            </Pressable>
          ) : null}

          <View style={styles.coordRow}>
            <View style={{ flex: 1 }}>
              <Field
                label="Enlem (lat)"
                value={lat}
                onChangeText={setLat}
                placeholder="37.9410"
                keyboardType="numbers-and-punctuation"
                autoCapitalize="none"
              />
              {!latOk ? <Text style={styles.err}>-90 ile 90 arası olmalı.</Text> : null}
            </View>
            <View style={{ flex: 1 }}>
              <Field
                label="Boylam (lng)"
                value={lng}
                onChangeText={setLng}
                placeholder="27.3419"
                keyboardType="numbers-and-punctuation"
                autoCapitalize="none"
              />
              {!lngOk ? <Text style={styles.err}>-180 ile 180 arası olmalı.</Text> : null}
            </View>
          </View>

          <Field label="Not (opsiyonel)" value={note} onChangeText={setNote} placeholder="ör. 2 gece konaklama" />
          <Text style={styles.hint}>
            Koordinat girmezsen durak listeye eklenir ama bu bacağın mesafesi hesaplanamaz.
          </Text>
        </Card>

        <PrimaryButton title="Durağı Kaydet" onPress={save} disabled={!canSave} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  suggestion: {
    marginTop: 12,
    backgroundColor: colors.accent + '22',
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
  },
  suggestionText: { color: colors.text, fontSize: 13, lineHeight: 18 },
  bold: { fontWeight: '800' },
  coordRow: { flexDirection: 'row', gap: 12 },
  err: { color: colors.danger, fontSize: 11, marginTop: 4 },
  hint: { color: colors.textMuted, fontSize: 12, marginTop: 12, lineHeight: 17 },
});

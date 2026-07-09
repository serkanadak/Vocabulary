import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getById, CATEGORY_META, FREQUENCY } from '../data/ibadetler';
import { useTracker } from '../state/TrackerContext';
import { colors } from '../theme';
import { HukumBadge, Card, PrimaryButton, ConfirmModal } from '../components/common';

const GENDER_NOTE = {
  male_farz_female_nafile:
    'Mukim ve mükellef erkeklere farz-ı ayndır. Kadınlar için farz değildir; kılarlarsa nafile olur.',
};

export default function ItemDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const {
    isCheckedToday,
    toggleToday,
    isCheckedYearly,
    toggleYearly,
    isCheckedLifetime,
    toggleLifetime,
    yearKeyStr,
    customItems,
    removeCustomItem,
  } = useTracker();
  const item = getById(id) || customItems.find((i) => i.id === id);
  const [confirmVisible, setConfirmVisible] = useState(false);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>İbadet bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  const catMeta = CATEGORY_META[item.category];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.header}>
          <Text style={styles.category}>
            {catMeta?.icon} {catMeta?.label}
          </Text>
          <Text style={styles.title}>{item.title}</Text>
          <View style={{ marginTop: 8 }}>
            <HukumBadge hukum={item.hukum} />
          </View>
        </View>

        <Card>
          {item.rekat ? <Text style={styles.meta}>Rekât: {item.rekat}</Text> : null}
          <Text style={styles.description}>{item.description}</Text>
          {GENDER_NOTE[item.gender] ? <Text style={styles.genderNote}>ℹ️ {GENDER_NOTE[item.gender]}</Text> : null}
        </Card>

        {item.frequency === FREQUENCY.OCCASIONAL && (
          <Text style={styles.hint}>Bu ibadet duruma bağlıdır; günlük/yıllık takip listesine girmez.</Text>
        )}

        {item.frequency === FREQUENCY.LIFETIME && (
          <PrimaryButton
            title={isCheckedLifetime(item.id) ? '✓ Yaptım' : 'Yaptım olarak işaretle'}
            onPress={() => toggleLifetime(item.id)}
          />
        )}

        {item.frequency === FREQUENCY.YEARLY_ONCE && (
          <PrimaryButton
            title={isCheckedYearly(item.id) ? `✓ Bu yıl (${yearKeyStr}) yaptım` : `Bu yıl (${yearKeyStr}) için işaretle`}
            onPress={() => toggleYearly(item.id)}
          />
        )}

        {![FREQUENCY.OCCASIONAL, FREQUENCY.LIFETIME].includes(item.frequency) && (
          <PrimaryButton
            title={isCheckedToday(item.id) ? '✓ Bugün işaretlendi' : 'Bugün için işaretle'}
            onPress={() => toggleToday(item.id)}
          />
        )}

        {item.custom && (
          <Pressable style={styles.deleteBtn} onPress={() => setConfirmVisible(true)}>
            <Text style={styles.deleteText}>İlave ibadeti sil</Text>
          </Pressable>
        )}
      </ScrollView>

      <ConfirmModal
        visible={confirmVisible}
        title="İlave ibadet silinsin mi?"
        message={`"${item.title}" kalıcı olarak silinecek.`}
        confirmLabel="Sil"
        destructive
        onCancel={() => setConfirmVisible(false)}
        onConfirm={() => {
          setConfirmVisible(false);
          removeCustomItem(item.id);
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: 16, paddingTop: 12 },
  category: { color: colors.textMuted, fontSize: 13, marginBottom: 4 },
  title: { color: colors.text, fontSize: 22, fontWeight: '800' },
  meta: { color: colors.primary, fontWeight: '700', marginBottom: 8 },
  description: { color: colors.text, fontSize: 14, lineHeight: 21 },
  genderNote: { color: colors.textMuted, fontSize: 12, marginTop: 10, lineHeight: 18 },
  hint: { color: colors.textMuted, fontSize: 12, marginHorizontal: 16, marginTop: 8 },
  notFound: { color: colors.text, padding: 16 },
  deleteBtn: {
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  deleteText: { color: '#ef4444', fontWeight: '700' },
});

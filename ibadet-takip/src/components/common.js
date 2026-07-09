import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, HUKUM_COLORS } from '../theme';
import { HUKUM_META } from '../data/ibadetler';

export function HukumBadge({ hukum }) {
  const meta = HUKUM_META[hukum];
  const color = HUKUM_COLORS[hukum] || colors.primary;
  if (!meta) return null;
  return (
    <View style={[styles.badge, { backgroundColor: color + '33', borderColor: color }]}>
      <Text style={[styles.badgeText, { color }]}>{meta.label}</Text>
    </View>
  );
}

export function SectionHeader({ title, subtitle }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function CheckRow({ title, subtitle, hukum, hukumList, rekat, rekatText, checked, onPress, onLongPress }) {
  const rekatSuffix = rekatText ? ` (${rekatText})` : rekat ? ` (${rekat} rekât)` : '';
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowTitle, checked && styles.rowTitleChecked]}>
          {title}
          {rekatSuffix}
        </Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
      {hukumList ? (
        <View style={styles.badgeStack}>
          {hukumList.map((h) => (
            <HukumBadge key={h} hukum={h} />
          ))}
        </View>
      ) : hukum ? (
        <HukumBadge hukum={hukum} />
      ) : null}
    </Pressable>
  );
}

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryButton({ title, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.8 }, disabled && { opacity: 0.5 }]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  badgeStack: {
    alignItems: 'flex-end',
    gap: 4,
  },
  badgeText: { fontSize: 11, fontWeight: '700' },
  sectionHeader: { paddingHorizontal: 16, paddingTop: 18, paddingBottom: 6 },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  sectionSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.textMuted,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.success, borderColor: colors.success },
  checkmark: { color: '#06281a', fontWeight: '900', fontSize: 14 },
  rowTitle: { color: colors.text, fontSize: 15, fontWeight: '600' },
  rowTitleChecked: { textDecorationLine: 'line-through', color: colors.textMuted },
  rowSubtitle: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
  },
  buttonText: { color: '#1c1305', fontWeight: '800', fontSize: 15 },
});

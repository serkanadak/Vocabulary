import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { colors } from '../theme';

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function Chip({ label, color }) {
  return (
    <View style={[styles.chip, { borderColor: color || colors.border }]}>
      <Text style={[styles.chipText, { color: color || colors.textMuted }]}>{label}</Text>
    </View>
  );
}

export function ProgressBar({ ratio, color }) {
  const pct = Math.max(0, Math.min(1, ratio || 0));
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${pct * 100}%`, backgroundColor: color || colors.primary }]} />
    </View>
  );
}

export function PrimaryButton({ label, onPress, disabled, color }) {
  return (
    <TouchableOpacity
      style={[styles.primaryBtn, { backgroundColor: color || colors.primary }, disabled && styles.btnDisabled]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      <Text style={styles.primaryBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function GhostButton({ label, onPress, danger }) {
  return (
    <TouchableOpacity
      style={[styles.ghostBtn, danger && { borderColor: colors.danger }]}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={[styles.ghostBtnText, danger && { color: colors.danger }]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function Field({ label, ...inputProps }) {
  return (
    <View style={styles.field}>
      {label ? <Text style={styles.fieldLabel}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        {...inputProps}
      />
    </View>
  );
}

export function EmptyState({ text }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  chipText: { fontSize: 11, fontWeight: '600' },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 999 },
  primaryBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#0f172a', fontWeight: '700', fontSize: 15 },
  btnDisabled: { opacity: 0.5 },
  ghostBtn: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  ghostBtnText: { color: colors.text, fontWeight: '600', fontSize: 13 },
  field: { marginBottom: 12 },
  fieldLabel: { color: colors.textMuted, fontSize: 12, marginBottom: 4, fontWeight: '600' },
  input: {
    backgroundColor: colors.surfaceAlt,
    color: colors.text,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  empty: { paddingVertical: 24, alignItems: 'center' },
  emptyText: { color: colors.textMuted, fontSize: 13, textAlign: 'center' },
});

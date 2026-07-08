import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePlanner } from '../state/PlannerContext';
import { colors } from '../theme';

// Ekran başlığının karşı köşesine yerleştirilen, seçili avatarı gösteren
// küçük rozet — tüm sekmelerde tutarlı şekilde kullanılır.
export default function HeaderAvatar() {
  const planner = usePlanner();
  return (
    <View style={styles.bubble}>
      <Text style={styles.emoji}>{planner.avatar.emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1.5,
    borderColor: colors.pink,
  },
  emoji: { fontSize: 16 },
});

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GoalsScreen from '../screens/GoalsScreen';
import MonthDetailScreen from '../screens/MonthDetailScreen';
import HeaderAvatar from '../components/HeaderAvatar';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

// Varsayılan geri ok ikonu bazı ortamlarda (ör. web export) yüklenemeyebiliyor;
// her zaman görünür/tıklanabilir olması için kendi metin tabanlı geri butonumuzu kullanıyoruz.
function BackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} hitSlop={10} style={{ paddingVertical: 4, paddingRight: 8 }}>
      <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '700' }}>‹ Geri</Text>
    </TouchableOpacity>
  );
}

export default function GoalsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text },
        headerLeft: ({ canGoBack }) => (canGoBack ? <BackButton onPress={navigation.goBack} /> : null),
        headerRight: () => <HeaderAvatar />,
      })}
    >
      <Stack.Screen name="GoalsHome" component={GoalsScreen} options={{ title: 'Hedefler' }} />
      <Stack.Screen name="MonthDetail" component={MonthDetailScreen} options={{ title: 'Aylık Hedef' }} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TripsScreen from '../screens/TripsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NewTripScreen from '../screens/NewTripScreen';
import TripDetailScreen from '../screens/TripDetailScreen';
import ChecklistScreen from '../screens/ChecklistScreen';
import RouteScreen from '../screens/RouteScreen';
import AddStopScreen from '../screens/AddStopScreen';
import AddDiscoveryScreen from '../screens/AddDiscoveryScreen';
import DiscoveryDetailScreen from '../screens/DiscoveryDetailScreen';
import AlbumScreen from '../screens/AlbumScreen';
import VideoScriptScreen from '../screens/VideoScriptScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

const TAB_ICONS = { Seyahatler: '🧭', Ayarlar: '⚙️' };

function icon(routeName) {
  return ({ color }) => <Text style={{ fontSize: 18, color }}>{TAB_ICONS[routeName]}</Text>;
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: icon(route.name),
      })}
    >
      <Tab.Screen name="Seyahatler" component={TripsScreen} />
      <Tab.Screen name="Ayarlar" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { color: colors.text },
          headerTintColor: colors.primary,
        }}
      >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="NewTrip" component={NewTripScreen} options={{ title: 'Yeni Seyahat' }} />
        <Stack.Screen name="TripDetail" component={TripDetailScreen} options={{ title: 'Seyahat' }} />
        <Stack.Screen name="Checklist" component={ChecklistScreen} options={{ title: 'Hazırlık Listesi' }} />
        <Stack.Screen name="Route" component={RouteScreen} options={{ title: 'Güzergah Planı' }} />
        <Stack.Screen name="AddStop" component={AddStopScreen} options={{ title: 'Durak Ekle' }} />
        <Stack.Screen name="AddDiscovery" component={AddDiscoveryScreen} options={{ title: 'Keşif Ekle' }} />
        <Stack.Screen name="DiscoveryDetail" component={DiscoveryDetailScreen} options={{ title: 'Keşif' }} />
        <Stack.Screen name="Album" component={AlbumScreen} options={{ title: 'Albüm / Yayın' }} />
        <Stack.Screen name="VideoScript" component={VideoScriptScreen} options={{ title: 'Video Senaryosu' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

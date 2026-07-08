import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TodayScreen from '../screens/TodayScreen';
import GoalsScreen from '../screens/GoalsScreen';
import MonthDetailScreen from '../screens/MonthDetailScreen';
import WeekDetailScreen from '../screens/WeekDetailScreen';
import CurriculumScreen from '../screens/CurriculumScreen';
import ExamResultsScreen from '../screens/ExamResultsScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ParentScreen from '../screens/ParentScreen';
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

const TAB_ICONS = {
  Bugün: '☀️',
  Hedefler: '🎯',
  Müfredat: '📚',
  Denemeler: '📊',
  Ödüller: '🏅',
  Veli: '👪',
};

function icon(routeName) {
  return ({ color }) => <Text style={{ fontSize: 18, color }}>{TAB_ICONS[routeName]}</Text>;
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: icon(route.name),
      })}
    >
      <Tab.Screen name="Bugün" component={TodayScreen} />
      <Tab.Screen name="Hedefler" component={GoalsScreen} />
      <Tab.Screen name="Müfredat" component={CurriculumScreen} />
      <Tab.Screen name="Denemeler" component={ExamResultsScreen} />
      <Tab.Screen name="Ödüller" component={RewardsScreen} />
      <Tab.Screen name="Veli" component={ParentScreen} />
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
        <Stack.Screen name="MonthDetail" component={MonthDetailScreen} options={{ title: 'Aylık Hedef' }} />
        <Stack.Screen name="WeekDetail" component={WeekDetailScreen} options={{ title: 'Haftalık Plan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

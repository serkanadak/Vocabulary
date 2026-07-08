import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PlannerProvider } from './src/state/PlannerContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <PlannerProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </PlannerProvider>
    </SafeAreaProvider>
  );
}

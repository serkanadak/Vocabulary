import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { JournalProvider } from './src/state/JournalContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <JournalProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </JournalProvider>
    </SafeAreaProvider>
  );
}

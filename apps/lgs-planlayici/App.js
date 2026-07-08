import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PlannerProvider } from './src/state/PlannerContext';
import RootNavigator from './src/navigation/RootNavigator';

// Web'de html/body sayfa gibi kayarsa alttaki sekme çubuğu ekran dışına
// taşabiliyor. Sayfayı sabitleyip yalnızca içerik alanlarının (ScrollView)
// kaymasını sağlıyoruz — sekmeler her zaman görünür kalır.
function useFixedWebViewport() {
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const style = document.createElement('style');
    style.textContent = `
      html, body { height: 100%; margin: 0; overflow: hidden; }
      #root { display: flex; height: 100%; flex: 1; }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
}

export default function App() {
  useFixedWebViewport();
  return (
    <SafeAreaProvider>
      <PlannerProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </PlannerProvider>
    </SafeAreaProvider>
  );
}

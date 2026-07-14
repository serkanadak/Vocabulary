// Kalıcı depolama katmanı.
// Web'de localStorage'ın ~5 MB kotası fotoğraflı verilerde yetersiz kalıyor ve
// kayıtlar sessizce başarısız oluyordu. Bu yüzden web'de büyük kapasiteli
// IndexedDB kullanılır (yüzlerce MB). Native'de AsyncStorage'a düşülür.
// Eski localStorage verisi ilk okumada IndexedDB'ye taşınır (migrasyon).
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const DB_NAME = 'gezgin_gunlugu';
const STORE = 'kv';

function idbAvailable() {
  return Platform.OS === 'web' && typeof indexedDB !== 'undefined';
}

let dbPromise = null;
function openDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    }).catch((e) => {
      dbPromise = null;
      throw e;
    });
  }
  return dbPromise;
}

async function idbGet(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const r = tx.objectStore(STORE).get(key);
    r.onsuccess = () => resolve(r.result == null ? null : r.result);
    r.onerror = () => reject(r.error);
  });
}

async function idbSet(key, val) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(val, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function storageGet(key) {
  if (idbAvailable()) {
    try {
      let v = await idbGet(key);
      if (v == null) {
        // Migrasyon: eski localStorage verisi varsa IndexedDB'ye taşı.
        try {
          const old = await AsyncStorage.getItem(key);
          if (old != null) {
            await idbSet(key, old);
            v = old;
          }
        } catch (e) {
          // yok say
        }
      }
      return v;
    } catch (e) {
      // IndexedDB kullanılamıyorsa AsyncStorage'a düş.
    }
  }
  return AsyncStorage.getItem(key);
}

// Tarayıcının verdiği depolama tahmini (kullanılan/kota, bayt). Web dışında null.
export async function storageEstimate() {
  if (
    Platform.OS === 'web' &&
    typeof navigator !== 'undefined' &&
    navigator.storage &&
    typeof navigator.storage.estimate === 'function'
  ) {
    try {
      const e = await navigator.storage.estimate();
      return { usage: e.usage || 0, quota: e.quota || 0 };
    } catch (err) {
      return null;
    }
  }
  return null;
}

export async function storageSet(key, val) {
  if (idbAvailable()) {
    try {
      await idbSet(key, val);
      return;
    } catch (e) {
      // IndexedDB yazamazsa AsyncStorage'ı dene (kota aşabilir ama son çare).
    }
  }
  return AsyncStorage.setItem(key, val);
}

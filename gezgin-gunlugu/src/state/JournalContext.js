// Gezgin Günlüğü durumu: seyahatler (her biri kendi hazırlık checklist'i, durakları,
// keşifleri ile) ve genel ayarlar. AsyncStorage ile cihazda kalıcı saklanır.

import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { Platform } from 'react-native';
import { storageGet, storageSet } from '../logic/storage';
import { createDefaultChecklist, createChecklistItem, dedupeChecklist } from '../data/checklist';
import { DEFAULT_VEHICLE } from '../data/vehicles';
import { BUILTIN_EXPENSE_CATEGORIES, slugifyCategory } from '../data/expenseCategories';
import { todayKey } from '../logic/date';

const STORAGE_KEY = '@gezgin_gunlugu_v1';
const JournalContext = createContext(null);

const DEFAULT_SETTINGS = {
  aiMode: 'local', // 'local' | 'ai'
  apiProvider: 'openai', // 'openai' | 'claude'
  apiKey: '',
  apiModel: '',
  roadOnline: true, // çevrimiçiyken gerçek yol mesafesi (OSRM); kapalıysa yalnızca tahmin
  lang: 'tr', // arayüz dili: 'tr' | 'en' | 'de' (dil önyüklemede localStorage'dan uygulanır)
  theme: 'deniz', // ekran renk paleti: 'deniz' | 'gunes' | 'dag' | 'kar' (palet önyüklemede localStorage'dan uygulanır)
  expenseCatsCustom: [], // Ayarlar'dan eklenen harcama türleri: [{ value, label, icon }]
  expenseCatsInactive: [], // pasif türler (seyahatlerde seçilemez, geçmiş kayıtlarda görünür)
  expenseCatsOverrides: {}, // yeniden adlandırma: { [value]: { label, icon } } — anahtar sabit kalır
};

const initialState = {
  loaded: false,
  trips: [],
  settings: DEFAULT_SETTINGS,
};

function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

// Belirli bir seyahati güncelleyen küçük yardımcı (immutable).
function mapTrip(trips, tripId, fn) {
  return trips.map((t) => (t.id === tripId ? fn(t) : t));
}

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      const rawTrips = Array.isArray(action.payload?.trips) ? action.payload.trips : [];
      // Eski kayıtlarda oluşmuş yinelenen hazırlık maddelerini (ör. çift E-SIM) temizle.
      // Ayrıca kapak fotoğrafının `photoUri` kopyasını düşür: aynı base64 verisi
      // hem photos[0] hem photoUri'de duruyordu ve kayıtlı veriyi (dolayısıyla
      // her yazmadaki JSON boyutunu) gereksiz yere iki katına çıkarıyordu.
      // Veri kaybı yok: aynı fotoğraf photos[0]'da duruyor.
      const trips = rawTrips.map((t) => ({
        ...t,
        checklist: dedupeChecklist(t.checklist || []),
        discoveries: (t.discoveries || []).map((d) =>
          Array.isArray(d.photos) && d.photos.length && d.photoUri ? { ...d, photoUri: null } : d
        ),
      }));
      return {
        ...state,
        loaded: true,
        trips,
        settings: { ...DEFAULT_SETTINGS, ...(action.payload?.settings || {}) },
      };
    }

    case 'ADD_TRIP':
      return { ...state, trips: [action.trip, ...state.trips] };

    case 'UPDATE_TRIP':
      return { ...state, trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, ...action.patch })) };

    case 'REMOVE_TRIP':
      return { ...state, trips: state.trips.filter((t) => t.id !== action.tripId) };

    // --- Checklist ---
    case 'SET_CHECK_STATUS':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          checklist: t.checklist.map((c) => (c.id === action.itemId ? { ...c, status: action.status } : c)),
        })),
      };
    case 'SET_CHECK_NOTE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          checklist: t.checklist.map((c) => (c.id === action.itemId ? { ...c, note: action.note } : c)),
        })),
      };
    case 'SET_CHECKLIST':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, checklist: action.checklist })),
      };
    case 'ADD_CHECK_ITEM':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, checklist: [...t.checklist, action.item] })),
      };
    case 'REMOVE_CHECK_ITEM':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          checklist: t.checklist.filter((c) => c.id !== action.itemId),
        })),
      };

    // --- Duraklar ---
    case 'ADD_STOP':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, stops: [...(t.stops || []), action.stop] })),
      };
    case 'UPDATE_STOP':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          stops: (t.stops || []).map((s) => (s.id === action.stopId ? { ...s, ...action.patch } : s)),
        })),
      };
    case 'REMOVE_STOP':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          stops: (t.stops || []).filter((s) => s.id !== action.stopId),
        })),
      };
    case 'REORDER_STOPS':
      return { ...state, trips: mapTrip(state.trips, action.tripId, (t) => ({ ...t, stops: action.stops })) };

    // --- Keşifler ---
    case 'ADD_DISCOVERY':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          discoveries: [...(t.discoveries || []), action.discovery],
        })),
      };
    case 'UPDATE_DISCOVERY':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          discoveries: (t.discoveries || []).map((d) =>
            d.id === action.discoveryId ? { ...d, ...action.patch } : d
          ),
        })),
      };
    case 'REMOVE_DISCOVERY':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          discoveries: (t.discoveries || []).filter((d) => d.id !== action.discoveryId),
        })),
      };

    // --- Harcamalar ---
    case 'ADD_EXPENSE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          expenses: [...(t.expenses || []), action.expense],
        })),
      };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          expenses: (t.expenses || []).map((e) =>
            e.id === action.expenseId ? { ...e, ...action.patch } : e
          ),
        })),
      };
    case 'REMOVE_EXPENSE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          expenses: (t.expenses || []).filter((e) => e.id !== action.expenseId),
        })),
      };

    // --- Günlük notlar (tarihe bağlı serbest günlük) ---
    case 'ADD_DAY_NOTE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          dayNotes: [...(t.dayNotes || []), action.note],
        })),
      };
    case 'UPDATE_DAY_NOTE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          dayNotes: (t.dayNotes || []).map((n) => (n.id === action.noteId ? { ...n, ...action.patch } : n)),
        })),
      };
    case 'REMOVE_DAY_NOTE':
      return {
        ...state,
        trips: mapTrip(state.trips, action.tripId, (t) => ({
          ...t,
          dayNotes: (t.dayNotes || []).filter((n) => n.id !== action.noteId),
        })),
      };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.patch } };

    default:
      return state;
  }
}

export function JournalProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      try {
        const raw = await storageGet(STORAGE_KEY);
        dispatch({ type: 'HYDRATE', payload: raw ? JSON.parse(raw) : {} });
      } catch (e) {
        dispatch({ type: 'HYDRATE', payload: {} });
      }
    })();
  }, []);

  // Kalıcılaştırma GECİKTİRİLİR (debounce).
  // Tüm seyahatler (fotoğraflar base64 gömülü) tek bir JSON olarak yazılır; bu
  // veri onlarca MB olabilir ve JSON.stringify ana iş parçacığını kilitler.
  // Her tuş vuruşunda/işaretlemede yazmak telefonda donmaya ve sekmenin
  // bellek yetersizliğinden çökip yeniden başlamasına yol açıyordu. Bu yüzden
  // hızlı ardışık değişiklikler tek bir yazmada birleştirilir; sekme
  // kapanırken/arka plana alınırken bekleyen yazma hemen boşaltılır.
  const pendingRef = useRef(null);
  const timerRef = useRef(null);

  const flushNow = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const data = pendingRef.current;
    if (!data) return;
    pendingRef.current = null;
    try {
      storageSet(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // Yazılamadıysa (ör. depolama dolu) mevcut kayıt bozulmaz.
    }
  }, []);

  useEffect(() => {
    if (!state.loaded) return undefined;
    pendingRef.current = { trips: state.trips, settings: state.settings };
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(flushNow, 800);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state.trips, state.settings, state.loaded, flushNow]);

  // Sekme kapanırken / gizlenirken bekleyen yazmayı kaybetme.
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;
    const onHide = () => flushNow();
    window.addEventListener('pagehide', onHide);
    window.addEventListener('beforeunload', onHide);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushNow();
    });
    return () => {
      window.removeEventListener('pagehide', onHide);
      window.removeEventListener('beforeunload', onHide);
    };
  }, [flushNow]);

  const value = useMemo(() => {
    const createTrip = ({ title, startDate, endDate, vehicle }) => {
      const trip = {
        id: uid('trip'),
        title: (title || '').trim() || 'Yeni Seyahat',
        startDate: startDate || todayKey(),
        endDate: endDate || '',
        vehicle: vehicle || DEFAULT_VEHICLE,
        finished: false,
        createdAt: new Date().toISOString(),
        checklist: createDefaultChecklist(vehicle || DEFAULT_VEHICLE),
        stops: [],
        discoveries: [],
        expenses: [],
        dayNotes: [],
      };
      dispatch({ type: 'ADD_TRIP', trip });
      return trip.id;
    };

    const getTrip = (tripId) => state.trips.find((t) => t.id === tripId) || null;

    return {
      loaded: state.loaded,
      trips: state.trips,
      settings: state.settings,
      // trip
      createTrip,
      getTrip,
      updateTrip: (tripId, patch) => dispatch({ type: 'UPDATE_TRIP', tripId, patch }),
      removeTrip: (tripId) => dispatch({ type: 'REMOVE_TRIP', tripId }),
      finishTrip: (tripId) => dispatch({ type: 'UPDATE_TRIP', tripId, patch: { finished: true } }),
      reopenTrip: (tripId) => dispatch({ type: 'UPDATE_TRIP', tripId, patch: { finished: false } }),
      // checklist
      setCheckStatus: (tripId, itemId, status) => dispatch({ type: 'SET_CHECK_STATUS', tripId, itemId, status }),
      setCheckNote: (tripId, itemId, note) => dispatch({ type: 'SET_CHECK_NOTE', tripId, itemId, note }),
      setChecklist: (tripId, checklist) => dispatch({ type: 'SET_CHECKLIST', tripId, checklist }),
      addCheckItem: (tripId, title, icon) =>
        dispatch({ type: 'ADD_CHECK_ITEM', tripId, item: createChecklistItem(title, icon) }),
      removeCheckItem: (tripId, itemId) => dispatch({ type: 'REMOVE_CHECK_ITEM', tripId, itemId }),
      // stops
      addStop: (tripId, stop) => dispatch({ type: 'ADD_STOP', tripId, stop: { id: uid('stop'), ...stop } }),
      updateStop: (tripId, stopId, patch) => dispatch({ type: 'UPDATE_STOP', tripId, stopId, patch }),
      removeStop: (tripId, stopId) => dispatch({ type: 'REMOVE_STOP', tripId, stopId }),
      reorderStops: (tripId, stops) => dispatch({ type: 'REORDER_STOPS', tripId, stops }),
      // discoveries
      addDiscovery: (tripId, discovery) =>
        dispatch({ type: 'ADD_DISCOVERY', tripId, discovery: { id: uid('disc'), ...discovery } }),
      updateDiscovery: (tripId, discoveryId, patch) =>
        dispatch({ type: 'UPDATE_DISCOVERY', tripId, discoveryId, patch }),
      removeDiscovery: (tripId, discoveryId) => dispatch({ type: 'REMOVE_DISCOVERY', tripId, discoveryId }),
      // expenses
      addExpense: (tripId, expense) =>
        dispatch({ type: 'ADD_EXPENSE', tripId, expense: { id: uid('exp'), ...expense } }),
      updateExpense: (tripId, expenseId, patch) =>
        dispatch({ type: 'UPDATE_EXPENSE', tripId, expenseId, patch }),
      removeExpense: (tripId, expenseId) => dispatch({ type: 'REMOVE_EXPENSE', tripId, expenseId }),
      // günlük notlar
      addDayNote: (tripId, note) =>
        dispatch({ type: 'ADD_DAY_NOTE', tripId, note: { id: uid('day'), createdAt: new Date().toISOString(), ...note } }),
      updateDayNote: (tripId, noteId, patch) => dispatch({ type: 'UPDATE_DAY_NOTE', tripId, noteId, patch }),
      removeDayNote: (tripId, noteId) => dispatch({ type: 'REMOVE_DAY_NOTE', tripId, noteId }),
      // settings
      updateSettings: (patch) => dispatch({ type: 'UPDATE_SETTINGS', patch }),
      // harcama türleri (Ayarlar) — pasif tür seyahatlerde seçilemez ama geçmişte kalır
      addExpenseCategory: (label, icon) => {
        const name = (label || '').trim();
        if (!name) return null;
        const value = slugifyCategory(name);
        const custom = Array.isArray(state.settings.expenseCatsCustom) ? state.settings.expenseCatsCustom : [];
        const builtinHit = BUILTIN_EXPENSE_CATEGORIES.some((c) => c.value === value);
        const customHit = custom.some((c) => c.value === value);
        // Zaten varsa yeniden ekleme; pasifse aktifleştir.
        if (builtinHit || customHit) {
          dispatch({
            type: 'UPDATE_SETTINGS',
            patch: {
              expenseCatsInactive: (state.settings.expenseCatsInactive || []).filter((v) => v !== value),
            },
          });
          return value;
        }
        dispatch({
          type: 'UPDATE_SETTINGS',
          patch: {
            expenseCatsCustom: [...custom, { value, label: name, icon: (icon || '').trim() || '🔖' }],
            expenseCatsInactive: (state.settings.expenseCatsInactive || []).filter((v) => v !== value),
          },
        });
        return value;
      },
      // Türün adını/ikonunu değiştirir. ANAHTAR (value) korunur; bu yüzden o
      // türde girilmiş harcamalar yeni adla görünmeye devam eder.
      renameExpenseCategory: (value, label, icon) => {
        const name = (label || '').trim();
        if (!value || !name) return;
        const ov = { ...(state.settings.expenseCatsOverrides || {}) };
        ov[value] = { label: name, icon: (icon || '').trim() || ov[value]?.icon || '' };
        dispatch({ type: 'UPDATE_SETTINGS', patch: { expenseCatsOverrides: ov } });
      },
      // Yeniden adlandırmayı kaldırıp özgün ada döner.
      resetExpenseCategoryName: (value) => {
        const ov = { ...(state.settings.expenseCatsOverrides || {}) };
        delete ov[value];
        dispatch({ type: 'UPDATE_SETTINGS', patch: { expenseCatsOverrides: ov } });
      },
      // Kullanıcı türünü tamamen kaldırır (yalnızca hiç harcama girilmemişse çağrılmalı).
      deleteExpenseCategory: (value) => {
        const ov = { ...(state.settings.expenseCatsOverrides || {}) };
        delete ov[value];
        dispatch({
          type: 'UPDATE_SETTINGS',
          patch: {
            expenseCatsCustom: (state.settings.expenseCatsCustom || []).filter((c) => c.value !== value),
            expenseCatsInactive: (state.settings.expenseCatsInactive || []).filter((v) => v !== value),
            expenseCatsOverrides: ov,
          },
        });
      },
      // Türü pasifleştir / yeniden aktifleştir.
      setExpenseCategoryActive: (value, active) => {
        const cur = state.settings.expenseCatsInactive || [];
        const next = active ? cur.filter((v) => v !== value) : cur.includes(value) ? cur : [...cur, value];
        dispatch({ type: 'UPDATE_SETTINGS', patch: { expenseCatsInactive: next } });
      },
    };
  }, [state]);

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
}

export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error('useJournal must be used within JournalProvider');
  return ctx;
}

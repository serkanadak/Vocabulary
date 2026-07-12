// Gezgin Günlüğü durumu: seyahatler (her biri kendi hazırlık checklist'i, durakları,
// keşifleri ile) ve genel ayarlar. AsyncStorage ile cihazda kalıcı saklanır.

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDefaultChecklist, createChecklistItem } from '../data/checklist';
import { DEFAULT_VEHICLE } from '../data/vehicles';
import { todayKey } from '../logic/date';

const STORAGE_KEY = '@gezgin_gunlugu_v1';
const JournalContext = createContext(null);

const DEFAULT_SETTINGS = {
  aiMode: 'local', // 'local' | 'ai'
  apiProvider: 'openai', // 'openai' | 'claude'
  apiKey: '',
  apiModel: '',
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
    case 'HYDRATE':
      return {
        ...state,
        loaded: true,
        trips: Array.isArray(action.payload?.trips) ? action.payload.trips : [],
        settings: { ...DEFAULT_SETTINGS, ...(action.payload?.settings || {}) },
      };

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
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        dispatch({ type: 'HYDRATE', payload: raw ? JSON.parse(raw) : {} });
      } catch (e) {
        dispatch({ type: 'HYDRATE', payload: {} });
      }
    })();
  }, []);

  useEffect(() => {
    if (!state.loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ trips: state.trips, settings: state.settings })).catch(
      () => {}
    );
  }, [state.trips, state.settings, state.loaded]);

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
      // settings
      updateSettings: (patch) => dispatch({ type: 'UPDATE_SETTINGS', patch }),
    };
  }, [state]);

  return <JournalContext.Provider value={value}>{children}</JournalContext.Provider>;
}

export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error('useJournal must be used within JournalProvider');
  return ctx;
}

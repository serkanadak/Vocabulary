// İbadet takip durumu: günlük işaretlemeler, yıllık/ömürlük işaretlemeler,
// ilave (kullanıcı tanımlı) ibadetler ve ayarlar. AsyncStorage ile cihazda
// kalıcı saklanır.

import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todayKey, yearKey } from '../logic/date';

const STORAGE_KEY = '@ibadetlerim_v1';
const TrackerContext = createContext(null);

const DEFAULT_SETTINGS = {
  gender: 'male', // 'male' | 'female'
  showNafile: false,
  kurbanEligible: false,
  ramadanStart: '',
  ramadanEnd: '',
  eidRamadanStart: '',
  eidRamadanEnd: '',
  eidKurbanStart: '',
  eidKurbanEnd: '',
  kazaStartDate: '', // geçmiş namaz (kaza) takibinin başlangıç tarihi
};

const initialState = {
  loaded: false,
  byDate: {}, // { '2026-07-09': { itemId: true } }
  byYear: {}, // { '2026': { itemId: true } }
  lifetime: {}, // { itemId: true }
  customItems: [], // kullanıcının eklediği ilave ibadetler
  settings: DEFAULT_SETTINGS,
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return {
        ...state,
        loaded: true,
        byDate: action.payload?.byDate || {},
        byYear: action.payload?.byYear || {},
        lifetime: action.payload?.lifetime || {},
        customItems: action.payload?.customItems || [],
        settings: { ...DEFAULT_SETTINGS, ...(action.payload?.settings || {}) },
      };
    case 'TOGGLE_DATE': {
      const { dateKey, itemId } = action;
      const dayMap = { ...(state.byDate[dateKey] || {}) };
      dayMap[itemId] = !dayMap[itemId];
      return { ...state, byDate: { ...state.byDate, [dateKey]: dayMap } };
    }
    case 'SET_DATE': {
      const { dateKey, itemId, value } = action;
      const dayMap = { ...(state.byDate[dateKey] || {}) };
      dayMap[itemId] = value;
      return { ...state, byDate: { ...state.byDate, [dateKey]: dayMap } };
    }
    case 'TOGGLE_YEAR': {
      const { yKey, itemId } = action;
      const yMap = { ...(state.byYear[yKey] || {}) };
      yMap[itemId] = !yMap[itemId];
      return { ...state, byYear: { ...state.byYear, [yKey]: yMap } };
    }
    case 'TOGGLE_LIFETIME': {
      const { itemId } = action;
      return { ...state, lifetime: { ...state.lifetime, [itemId]: !state.lifetime[itemId] } };
    }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case 'ADD_CUSTOM':
      return { ...state, customItems: [...state.customItems, action.item] };
    case 'REMOVE_CUSTOM':
      return { ...state, customItems: state.customItems.filter((i) => i.id !== action.id) };
    case 'RESET':
      return { ...initialState, loaded: true };
    default:
      return state;
  }
}

export function TrackerProvider({ children }) {
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
    const { byDate, byYear, lifetime, customItems, settings } = state;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ byDate, byYear, lifetime, customItems, settings })).catch(
      () => {}
    );
  }, [state.byDate, state.byYear, state.lifetime, state.customItems, state.settings, state.loaded]);

  const value = useMemo(() => {
    const dKey = todayKey();
    const yKey = yearKey();

    const isCheckedOn = (dateKey, itemId) => !!state.byDate[dateKey]?.[itemId];
    const isCheckedToday = (itemId) => isCheckedOn(dKey, itemId);
    const toggleToday = (itemId) => dispatch({ type: 'TOGGLE_DATE', dateKey: dKey, itemId });
    const toggleOnDate = (dateKey, itemId) => dispatch({ type: 'TOGGLE_DATE', dateKey, itemId });
    const setCheckedToday = (itemId, value) => dispatch({ type: 'SET_DATE', dateKey: dKey, itemId, value });
    const setCheckedOnDate = (dateKey, itemId, value) => dispatch({ type: 'SET_DATE', dateKey, itemId, value });

    const isCheckedYearly = (itemId) => !!state.byYear[yKey]?.[itemId];
    const toggleYearly = (itemId) => dispatch({ type: 'TOGGLE_YEAR', yKey, itemId });

    const isCheckedLifetime = (itemId) => !!state.lifetime[itemId];
    const toggleLifetime = (itemId) => dispatch({ type: 'TOGGLE_LIFETIME', itemId });

    const updateSettings = (patch) => dispatch({ type: 'UPDATE_SETTINGS', patch });
    const addCustomItem = (item) => dispatch({ type: 'ADD_CUSTOM', item });
    const removeCustomItem = (id) => dispatch({ type: 'REMOVE_CUSTOM', id });
    const reset = () => dispatch({ type: 'RESET' });

    return {
      loaded: state.loaded,
      byDate: state.byDate,
      byYear: state.byYear,
      lifetime: state.lifetime,
      customItems: state.customItems,
      settings: state.settings,
      todayKey: dKey,
      yearKeyStr: yKey,
      isCheckedOn,
      isCheckedToday,
      toggleToday,
      toggleOnDate,
      setCheckedToday,
      setCheckedOnDate,
      isCheckedYearly,
      toggleYearly,
      isCheckedLifetime,
      toggleLifetime,
      updateSettings,
      addCustomItem,
      removeCustomItem,
      reset,
    };
  }, [state]);

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error('useTracker must be used within TrackerProvider');
  return ctx;
}

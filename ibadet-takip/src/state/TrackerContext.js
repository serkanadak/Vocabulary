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
    case 'BULK_SET': {
      const { pairs, value } = action; // pairs: [{ dateKey, itemId }]
      const byDate = { ...state.byDate };
      for (const { dateKey, itemId } of pairs) {
        byDate[dateKey] = { ...(byDate[dateKey] || {}), [itemId]: value };
      }
      return { ...state, byDate };
    }
    // status: true (yapıldı) | 'na' (bana uygulanmıyor) | undefined (bekliyor)
    case 'SET_YEAR_STATUS': {
      const { yKey, itemId, status } = action;
      const yMap = { ...(state.byYear[yKey] || {}) };
      if (status === undefined) delete yMap[itemId];
      else yMap[itemId] = status;
      return { ...state, byYear: { ...state.byYear, [yKey]: yMap } };
    }
    case 'SET_LIFETIME_STATUS': {
      const { itemId, status } = action;
      const lifetime = { ...state.lifetime };
      if (status === undefined) delete lifetime[itemId];
      else lifetime[itemId] = status;
      return { ...state, lifetime };
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
    const bulkSetChecked = (pairs, value) => dispatch({ type: 'BULK_SET', pairs, value });

    const yearlyStatus = (itemId) => state.byYear[yKey]?.[itemId]; // true | 'na' | undefined
    const isCheckedYearly = (itemId) => yearlyStatus(itemId) === true;
    const isNotApplicableYearly = (itemId) => yearlyStatus(itemId) === 'na';
    const setYearlyStatus = (itemId, status) => dispatch({ type: 'SET_YEAR_STATUS', yKey, itemId, status });
    const toggleYearly = (itemId) => setYearlyStatus(itemId, isCheckedYearly(itemId) ? undefined : true);
    const toggleYearlyNotApplicable = (itemId) => setYearlyStatus(itemId, isNotApplicableYearly(itemId) ? undefined : 'na');

    const lifetimeStatus = (itemId) => state.lifetime[itemId]; // true | 'na' | undefined
    const isCheckedLifetime = (itemId) => lifetimeStatus(itemId) === true;
    const isNotApplicableLifetime = (itemId) => lifetimeStatus(itemId) === 'na';
    const setLifetimeStatus = (itemId, status) => dispatch({ type: 'SET_LIFETIME_STATUS', itemId, status });
    const toggleLifetime = (itemId) => setLifetimeStatus(itemId, isCheckedLifetime(itemId) ? undefined : true);
    const toggleLifetimeNotApplicable = (itemId) =>
      setLifetimeStatus(itemId, isNotApplicableLifetime(itemId) ? undefined : 'na');

    const updateSettings = (patch) => dispatch({ type: 'UPDATE_SETTINGS', patch });
    const addCustomItem = (item) => dispatch({ type: 'ADD_CUSTOM', item });
    const removeCustomItem = (id) => dispatch({ type: 'REMOVE_CUSTOM', id });
    const reset = () => dispatch({ type: 'RESET' });

    // Yedekleme: mevcut durumu taşınabilir bir JSON metnine çevirir.
    const exportSnapshot = () => {
      const { byDate, byYear, lifetime, customItems, settings } = state;
      return JSON.stringify(
        { app: 'ibadetlerim', version: 1, exportedAt: new Date().toISOString(), data: { byDate, byYear, lifetime, customItems, settings } },
        null,
        2
      );
    };

    // Geri yükleme: dışa aktarılan (veya eski) bir JSON metnini doğrulayıp yükler.
    // Başarılıysa null, hata varsa kullanıcıya gösterilecek bir mesaj döner.
    const importSnapshot = (text) => {
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        return 'Geçersiz JSON: metin doğru yapıştırılmamış olabilir.';
      }
      const payload = parsed?.data && typeof parsed.data === 'object' ? parsed.data : parsed;
      if (!payload || typeof payload !== 'object') {
        return 'Tanınmayan yedek biçimi.';
      }
      dispatch({ type: 'HYDRATE', payload });
      return null;
    };

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
      bulkSetChecked,
      isCheckedYearly,
      toggleYearly,
      isNotApplicableYearly,
      toggleYearlyNotApplicable,
      isCheckedLifetime,
      toggleLifetime,
      isNotApplicableLifetime,
      toggleLifetimeNotApplicable,
      updateSettings,
      addCustomItem,
      removeCustomItem,
      reset,
      exportSnapshot,
      importSnapshot,
    };
  }, [state]);

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error('useTracker must be used within TrackerProvider');
  return ctx;
}

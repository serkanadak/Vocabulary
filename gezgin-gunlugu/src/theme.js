// Ortak tema/renkler — kullanıcı Ayarlar'dan 4 renk paleti seçebilir:
// Deniz (varsayılan), Güneş, Dağ, Kar. Hepsi koyu zeminli/açık metinlidir; böylece
// tüm ekranların StyleSheet varsayımları (koyu zemin + açık yazı + parlak vurgu
// üzerinde koyu metin) her palette geçerli kalır.
//
// StyleSheet.create modül yüklenirken çalıştığından palet, önyükleme sırasında
// senkron okunabilen localStorage'dan seçilir. Seçim değişince Ayarlar sayfası
// localStorage'a yazıp sayfayı yeniler; yeni palet böylece tüm ekranlara uygulanır.

export const THEMES = {
  deniz: {
    id: 'deniz',
    label: 'Deniz',
    emoji: '🌊',
    palette: {
      bg: '#0b1a2b',
      surface: '#122a42',
      surfaceAlt: '#1c3d5c',
      text: '#eaf4ff',
      textMuted: '#9bb8d3',
      primary: '#f5a623',
      accent: '#2dd4bf',
      border: '#1c3d5c',
      success: '#22c55e',
      danger: '#ef4444',
    },
  },
  gunes: {
    id: 'gunes',
    label: 'Güneş',
    emoji: '☀️',
    palette: {
      bg: '#1e1408',
      surface: '#33240f',
      surfaceAlt: '#4a3418',
      text: '#fff5e8',
      textMuted: '#e0b783',
      primary: '#fbbf24',
      accent: '#fb7185',
      border: '#4a3418',
      success: '#22c55e',
      danger: '#ef4444',
    },
  },
  dag: {
    id: 'dag',
    label: 'Dağ',
    emoji: '🏔️',
    palette: {
      bg: '#0e1a13',
      surface: '#182a1e',
      surfaceAlt: '#26402e',
      text: '#eaf6ee',
      textMuted: '#a2c3ad',
      primary: '#34d399',
      accent: '#a3e635',
      border: '#26402e',
      success: '#22c55e',
      danger: '#ef4444',
    },
  },
  kar: {
    id: 'kar',
    label: 'Kar',
    emoji: '❄️',
    palette: {
      bg: '#0f1720',
      surface: '#1b2732',
      surfaceAlt: '#2a3a48',
      text: '#f2f8ff',
      textMuted: '#adc6da',
      primary: '#7dd3fc',
      accent: '#c4b5fd',
      border: '#2a3a48',
      success: '#22c55e',
      danger: '#ef4444',
    },
  },
};

export const DEFAULT_THEME = 'deniz';
const STORAGE_KEY = 'gg_theme_v1';

function readSavedThemeId() {
  try {
    if (typeof localStorage !== 'undefined') {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v && THEMES[v]) return v;
    }
  } catch (e) {
    /* localStorage erişilemezse varsayılana düş */
  }
  return DEFAULT_THEME;
}

// Önyüklemede seçili palet (senkron).
export const activeThemeId = readSavedThemeId();

// Tüm ekranların import ettiği renkler — seçili paletten kopyalanır.
export const colors = { ...THEMES[activeThemeId].palette };

// Hazırlık checklist durum renkleri — palete göre türetilir.
export const CHECK_COLORS = {
  todo: colors.textMuted,
  done: colors.success,
  partial: colors.primary,
  skip: '#64748b',
};

export function getThemeId() {
  return activeThemeId;
}

// Seçimi kalıcı yap. Palet ancak sayfa yeniden yüklendiğinde uygulanır.
export function saveThemeId(id) {
  if (!THEMES[id]) return false;
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, id);
      return true;
    }
  } catch (e) {
    /* yoksay */
  }
  return false;
}

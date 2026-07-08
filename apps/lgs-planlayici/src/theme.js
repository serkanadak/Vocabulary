// Ortak tema/renkler.
export const colors = {
  bg: '#111827',
  surface: '#1f2937',
  surfaceAlt: '#374151',
  text: '#f3f4f6',
  textMuted: '#9ca3af',
  primary: '#14b8a6',
  gold: '#f59e0b',
  border: '#374151',
  success: '#22c55e',
  danger: '#ef4444',
};

export const SUBJECT_COLORS = {
  Türkçe: '#f472b6',
  Matematik: '#60a5fa',
  'Fen Bilimleri': '#34d399',
  'Sosyal Bilgiler': '#fbbf24',
  'T.C. İnkılap Tarihi ve Atatürkçülük': '#fbbf24',
  'Din Kültürü ve Ahlak Bilgisi': '#a78bfa',
  İngilizce: '#22d3ee',
};

export function subjectColor(subject) {
  return SUBJECT_COLORS[subject] || colors.primary;
}

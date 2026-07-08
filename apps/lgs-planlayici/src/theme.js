// Ortak tema/renkler — açık zemin, canlı vurgu renkleri.
export const colors = {
  bg: '#f4f7fd',
  surface: '#ffffff',
  surfaceAlt: '#e9eef8',
  text: '#1e2532',
  textMuted: '#64748b',
  primary: '#0d9488',
  gold: '#d97706',
  border: '#dbe2ef',
  success: '#16a34a',
  danger: '#e11d48',
};

export const SUBJECT_COLORS = {
  Türkçe: '#db2777',
  Matematik: '#2563eb',
  'Fen Bilimleri': '#059669',
  'Sosyal Bilgiler': '#d97706',
  'T.C. İnkılap Tarihi ve Atatürkçülük': '#c2410c',
  'Din Kültürü ve Ahlak Bilgisi': '#7c3aed',
  İngilizce: '#0891b2',
};

export function subjectColor(subject) {
  return SUBJECT_COLORS[subject] || colors.primary;
}

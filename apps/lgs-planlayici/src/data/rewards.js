// Soyut ödül ekonomisi: puan, seviye ve rozet tanımları. Gerçek/nakdi karşılığı yoktur.

export function pointsForTask(estMinutes) {
  const minutes = Number(estMinutes) || 15;
  return Math.max(5, Math.round(minutes / 3));
}

export const LEVELS = [
  { minPoints: 0, title: 'Başlangıç' },
  { minPoints: 100, title: 'Kâşif' },
  { minPoints: 250, title: 'Azimli' },
  { minPoints: 450, title: 'Sebatkâr' },
  { minPoints: 700, title: 'Usta' },
  { minPoints: 1000, title: 'Uzman' },
  { minPoints: 1400, title: 'Şampiyon' },
  { minPoints: 1900, title: 'Efsane' },
];

export function levelForPoints(points) {
  let current = LEVELS[0];
  let index = 0;
  LEVELS.forEach((lvl, i) => {
    if (points >= lvl.minPoints) {
      current = lvl;
      index = i;
    }
  });
  const next = LEVELS[index + 1];
  return {
    index: index + 1,
    title: current.title,
    nextTitle: next ? next.title : null,
    pointsToNext: next ? next.minPoints - points : 0,
    progressRatio: next ? (points - current.minPoints) / (next.minPoints - current.minPoints) : 1,
  };
}

export const BADGES = [
  {
    id: 'ilk-adim',
    title: 'İlk Adım',
    description: 'İlk görevini tamamladın',
    icon: '🌱',
    color: '#16a34a',
    check: (s) => s.totalTasksCompleted >= 1,
  },
  {
    id: 'uc-gunluk-seri',
    title: '3 Günlük Seri',
    description: '3 gün üst üste çalıştın',
    icon: '🔥',
    color: '#f97316',
    check: (s) => s.longestStreak >= 3,
  },
  {
    id: 'yedi-gunluk-seri',
    title: 'Bir Haftalık Azim',
    description: '7 gün üst üste çalıştın',
    icon: '⚡',
    color: '#eab308',
    check: (s) => s.longestStreak >= 7,
  },
  {
    id: 'otuz-gunluk-seri',
    title: 'Ay Boyu Sebat',
    description: '30 gün üst üste çalıştın',
    icon: '👑',
    color: '#a855f7',
    check: (s) => s.longestStreak >= 30,
  },
  {
    id: 'ceyrek-yuzluk',
    title: 'Çeyrek Yüzlük',
    description: '25 görev tamamladın',
    icon: '🎯',
    color: '#2563eb',
    check: (s) => s.totalTasksCompleted >= 25,
  },
  {
    id: 'yuzler-kulubu',
    title: 'Yüzler Kulübü',
    description: '100 görev tamamladın',
    icon: '🏆',
    color: '#d97706',
    check: (s) => s.totalTasksCompleted >= 100,
  },
  {
    id: 'ilk-deneme',
    title: 'İlk Deneme',
    description: 'İlk deneme sınavı sonucunu kaydettin',
    icon: '📝',
    color: '#0891b2',
    check: (s) => s.examResultsCount >= 1,
  },
  {
    id: 'deneme-ustasi',
    title: 'Deneme Ustası',
    description: '5 deneme sınavı sonucu kaydettin',
    icon: '📊',
    color: '#7c3aed',
    check: (s) => s.examResultsCount >= 5,
  },
  {
    id: 'kendi-yolunu-ciz',
    title: 'Kendi Yolunu Çiz',
    description: 'Müfredata kendi konunu ekledin',
    icon: '🧭',
    color: '#db2777',
    check: (s) => s.customTopicsCount >= 1,
  },
];

export function evaluateBadges(stats, unlockedIds) {
  const unlocked = new Set(unlockedIds);
  const newlyUnlocked = [];
  BADGES.forEach((badge) => {
    if (!unlocked.has(badge.id) && badge.check(stats)) {
      newlyUnlocked.push(badge.id);
    }
  });
  return newlyUnlocked;
}

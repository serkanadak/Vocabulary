// Kullanıcı avatarları. Bir kısmı baştan açık, diğerleri belirli rozetler
// kazanıldığında (önemli başarılarda) açılır.
import { BADGES } from './rewards';

export const AVATARS = [
  { id: 'cat', emoji: '🐱', label: 'Kedi', requiredBadgeId: null },
  { id: 'fox', emoji: '🦊', label: 'Tilki', requiredBadgeId: null },
  { id: 'panda', emoji: '🐼', label: 'Panda', requiredBadgeId: null },
  { id: 'wolf', emoji: '🐺', label: 'Kurt', requiredBadgeId: 'yedi-gunluk-seri' },
  { id: 'owl', emoji: '🦉', label: 'Baykuş', requiredBadgeId: 'ceyrek-yuzluk' },
  { id: 'unicorn', emoji: '🦄', label: 'Tek Boynuzlu At', requiredBadgeId: 'deneme-ustasi' },
  { id: 'lion', emoji: '🦁', label: 'Aslan', requiredBadgeId: 'yuzler-kulubu' },
  { id: 'dragon', emoji: '🐉', label: 'Ejderha', requiredBadgeId: 'otuz-gunluk-seri' },
];

export function defaultAvatarId() {
  return AVATARS[0].id;
}

export function avatarById(id) {
  return AVATARS.find((a) => a.id === id) || AVATARS[0];
}

export function avatarRequirementLabel(avatar) {
  if (!avatar.requiredBadgeId) return 'Baştan açık';
  const badge = BADGES.find((b) => b.id === avatar.requiredBadgeId);
  return badge ? `"${badge.title}" rozetiyle açılır` : 'Bir rozetle açılır';
}

export function evaluateAvatarUnlocks(unlockedBadgeIds, alreadyUnlockedAvatarIds) {
  const already = new Set(alreadyUnlockedAvatarIds);
  const newlyUnlocked = [];
  AVATARS.forEach((avatar) => {
    if (already.has(avatar.id)) return;
    if (!avatar.requiredBadgeId || unlockedBadgeIds.includes(avatar.requiredBadgeId)) {
      newlyUnlocked.push(avatar.id);
    }
  });
  return newlyUnlocked;
}

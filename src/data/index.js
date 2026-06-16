// Veri katmanı: tüm kaynakları birleştirir, doğrular ve sorgu yardımcıları sunar.
// Kelimeler ve veriler uygulamaya gömülüdür (Özellik 1) — çalışma zamanında ağ gerekmez.

import business from './words.business';
import economics from './words.economics';
import communication from './words.communication';
import general from './words.general';
import idioms from './idioms';
import generated from './generated';
import storiesData from './stories';
import { validateEntry } from './schema';

// Curated (elle hazırlanmış) + generated (içe aktarılan/üretilen) havuz.
const RAW = [
  ...business,
  ...economics,
  ...communication,
  ...general,
  ...idioms,
  ...generated,
];

// Aynı id'nin iki kez gelmesini önle (curated her zaman önceliklidir).
const byId = new Map();
for (const entry of RAW) {
  if (!entry || !entry.id) continue;
  if (!byId.has(entry.id)) byId.set(entry.id, entry);
}

export const WORDS = Array.from(byId.values());
export const WORD_MAP = byId;
export const STORIES = storiesData;

export function getWord(id) {
  return WORD_MAP.get(id) || null;
}

export function searchWords(query) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return WORDS;
  return WORDS.filter((w) => {
    if (w.headword.toLowerCase().includes(q)) return true;
    return w.meanings.some(
      (m) => m.tr.toLowerCase().includes(q) || (m.en || '').toLowerCase().includes(q)
    );
  });
}

export function filterWords({ levels, domains, types } = {}) {
  return WORDS.filter((w) => {
    if (levels && levels.length && !levels.includes(w.level)) return false;
    if (domains && domains.length && !w.domains.some((d) => domains.includes(d))) return false;
    if (types && types.length && !types.includes(w.type)) return false;
    return true;
  });
}

// Geliştirme zamanı tutarlılık kontrolü (yalnızca __DEV__ modunda uyarır).
export function auditDataset() {
  const problems = [];
  for (const w of WORDS) {
    const errs = validateEntry(w);
    if (errs.length) problems.push({ id: w.id, errs });
  }
  return problems;
}

if (typeof __DEV__ !== 'undefined' && __DEV__) {
  const problems = auditDataset();
  if (problems.length) {
    // eslint-disable-next-line no-console
    console.warn(`[veri] ${problems.length} kayıtta şema uyarısı var`, problems.slice(0, 5));
  }
}

export const STATS = {
  total: WORDS.length,
  curated: WORDS.length - generated.length,
  generated: generated.length,
};

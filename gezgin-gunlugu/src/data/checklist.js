// Seyahat hazırlık checklist'i — varsayılan şablon + durum modeli.
// Her seyahat oluşturulurken bu şablon kopyalanır; kullanıcı elle madde ekleyebilir.

export const CHECK_STATUS = {
  TODO: 'todo',
  DONE: 'done',
  PARTIAL: 'partial',
  SKIP: 'skip',
};

export const CHECK_STATUS_META = {
  todo: { label: 'Bekliyor', short: '', icon: '⬜' },
  done: { label: 'Tamam', short: 'Tamam', icon: '✅' },
  partial: { label: 'Kısmen', short: 'Kısmen', icon: '🟡' },
  skip: { label: 'Gerek Yok', short: 'Gerek Yok', icon: '⛔' },
};

// Dokununca sıradaki duruma geçiş: bekliyor → tamam → kısmen → gerek yok → bekliyor
export const STATUS_CYCLE = ['todo', 'done', 'partial', 'skip'];

export function nextStatus(status) {
  const i = STATUS_CYCLE.indexOf(status);
  return STATUS_CYCLE[(i + 1) % STATUS_CYCLE.length];
}

const DEFAULT_ITEMS = [
  { icon: '🛂', title: 'Pasaport / kimlik & vize kontrolü' },
  { icon: '🎫', title: 'Ulaşım biletleri (uçak/tren/otobüs)' },
  { icon: '🏨', title: 'Konaklama rezervasyonları' },
  { icon: '💊', title: 'Sağlık, ilaç & seyahat sigortası' },
  { icon: '💳', title: 'Para / döviz & kart bildirimi' },
  { icon: '🔌', title: 'Şarj aleti, priz adaptörü & powerbank' },
  { icon: '📱', title: 'Offline harita & çeviri uygulamaları' },
  { icon: '🎒', title: 'Bavul & kıyafet (hava durumuna göre)' },
  { icon: '📷', title: 'Kamera / telefon & yedek hafıza' },
  { icon: '🗺️', title: 'Günlük gezi rotası taslağı' },
];

let counter = 0;
function uid() {
  counter += 1;
  return `chk_${Date.now().toString(36)}_${counter}`;
}

// Yeni bir seyahat için taze checklist üretir (her madde 'todo' durumunda).
export function createDefaultChecklist() {
  return DEFAULT_ITEMS.map((it) => ({
    id: uid(),
    icon: it.icon,
    title: it.title,
    status: CHECK_STATUS.TODO,
    custom: false,
  }));
}

// Kullanıcının elle eklediği madde.
export function createChecklistItem(title, icon = '📌') {
  return {
    id: uid(),
    icon,
    title: title.trim(),
    status: CHECK_STATUS.TODO,
    custom: true,
  };
}

// Checklist ilerleme özeti.
export function checklistProgress(items = []) {
  const total = items.length;
  const done = items.filter((i) => i.status === 'done').length;
  const partial = items.filter((i) => i.status === 'partial').length;
  const skip = items.filter((i) => i.status === 'skip').length;
  const todo = items.filter((i) => i.status === 'todo').length;
  // "Gerek Yok" hariç tutularak tamamlanma oranı; kısmi = yarım sayılır.
  const relevant = total - skip;
  const ratio = relevant === 0 ? 1 : (done + partial * 0.5) / relevant;
  return { total, done, partial, skip, todo, ratio };
}

// Seyahat hazırlık checklist'i — varsayılan şablon + durum modeli.
// Her seyahat oluşturulurken bu şablon kopyalanır; kullanıcı elle madde ekleyebilir.
import { isOwnVehicle } from './vehicles';

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

// Birbiriyle sıkı ilişkili olmayan işler ayrı maddeler olarak tutulur (ör. vize
// pasaporttan; sigorta ilaçtan; kart bildirimi paradan; çeviri uygulaması haritadan
// bağımsız birer görevdir). Yalnızca aynı amaca hizmet edenler tek maddede birleşiktir
// (ör. şarj/adaptör/powerbank hepsi "güç"; bavul & kıyafet aynı hazırlık).
const DEFAULT_ITEMS = [
  { icon: '🛂', title: 'Pasaport / kimlik geçerliliği' },
  { icon: '📄', title: 'Vize başvurusu / kontrolü' },
  { icon: '🛃', title: 'Yurt dışı çıkış harcı (ödeme)' },
  { icon: '🎫', title: 'Ulaşım biletleri (uçak/tren/otobüs)' },
  { icon: '🏨', title: 'Konaklama rezervasyonları' },
  { icon: '💊', title: 'İlaç & kişisel sağlık malzemeleri' },
  { icon: '🛡️', title: 'Seyahat sağlık sigortası' },
  { icon: '💳', title: 'Para / döviz' },
  { icon: '🏦', title: 'Bankaya yurt dışı kart bildirimi' },
  { icon: '🔌', title: 'Şarj aleti, priz adaptörü & powerbank' },
  { icon: '📱', title: 'E-SIM / yerel data hattı' },
  { icon: '📲', title: 'Offline harita indir' },
  { icon: '🈯', title: 'Çeviri uygulaması' },
  { icon: '🎒', title: 'Bavul & kıyafet (hava durumuna göre)' },
  { icon: '📷', title: 'Kamera / telefon & yedek hafıza' },
  { icon: '🗺️', title: 'Günlük gezi rotası taslağı' },
];

// Yurt dışına kendi aracıyla çıkanlar için ek maddeler (yeşil kart + kasko kapsam).
// Yalnızca "kendi aracı" olan vasıtalarda (araba, karavanlar, motosiklet) eklenir.
const VEHICLE_EXIT_ITEMS = [
  { icon: '🟢', title: 'Yeşil kart (yurt dışı araç trafik sigortası)' },
  { icon: '🚗', title: 'Kasko yurt dışı kapsam genişletme' },
  { icon: '🛣️', title: 'Vinyet / otoyol geçiş (HGS · OGS · vinyet)' },
];

// Verilen araca göre tam varsayılan madde listesini ({icon,title}) döndürür.
// Araç sigortası maddeleri, çıkış harcının hemen ardından eklenir.
export function defaultItemsFor(vehicleId) {
  if (!isOwnVehicle(vehicleId)) return [...DEFAULT_ITEMS];
  const at = DEFAULT_ITEMS.findIndex((i) => i.title.startsWith('Yurt dışı çıkış harcı')) + 1;
  return [...DEFAULT_ITEMS.slice(0, at), ...VEHICLE_EXIT_ITEMS, ...DEFAULT_ITEMS.slice(at)];
}

let counter = 0;
function uid() {
  counter += 1;
  return `chk_${Date.now().toString(36)}_${counter}`;
}

// Yeni bir seyahat için taze checklist üretir (her madde 'todo' durumunda).
// Araç bilgisi verilirse (ör. 'car', 'motokaravan') araç sigortası maddeleri de eklenir.
export function createDefaultChecklist(vehicleId) {
  return defaultItemsFor(vehicleId).map((it) => ({
    id: uid(),
    icon: it.icon,
    title: it.title,
    status: CHECK_STATUS.TODO,
    note: '',
    custom: false,
  }));
}

// Basit başlık normalleştirmesi (mevcut listede eksik varsayılanları bulmak için).
function normTitle(t) {
  return (t || '').toLocaleLowerCase('tr').replace(/\s+/g, ' ').trim();
}

// Mevcut listeyi güncel varsayılanlarla birleştirir:
//  - Güncel varsayılan maddeler (araca göre) sırasıyla yer alır; başlığı hâlâ
//    eşleşen maddelerin durum ve notu KORUNUR.
//  - Artık varsayılan olmayan eski maddeler (ör. "Pasaport & vize" birleşiği)
//    düşer; elle eklenen (custom) maddeler aynen saklanır.
export function mergeChecklistWithDefaults(existingItems, vehicleId) {
  const existing = existingItems || [];
  const defs = defaultItemsFor(vehicleId);
  const defTitles = new Set(defs.map((d) => normTitle(d.title)));
  const merged = defs.map((it) => {
    const prev = existing.find((e) => normTitle(e.title) === normTitle(it.title));
    return {
      id: prev?.id || uid(),
      icon: it.icon,
      title: it.title,
      status: prev?.status || CHECK_STATUS.TODO,
      note: prev?.note || '',
      custom: false,
    };
  });
  const customs = existing.filter((e) => e.custom && !defTitles.has(normTitle(e.title)));
  return [...merged, ...customs];
}

// Mevcut listenin varsayılan bölümü güncel varsayılanlardan farklı mı?
export function checklistNeedsUpdate(existingItems, vehicleId) {
  const defs = new Set(defaultItemsFor(vehicleId).map((d) => normTitle(d.title)));
  const cur = new Set((existingItems || []).filter((e) => !e.custom).map((e) => normTitle(e.title)));
  if (defs.size !== cur.size) return true;
  for (const t of defs) if (!cur.has(t)) return true;
  return false;
}

// Kullanıcının elle eklediği madde.
export function createChecklistItem(title, icon = '📌') {
  return {
    id: uid(),
    icon,
    title: title.trim(),
    status: CHECK_STATUS.TODO,
    note: '',
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

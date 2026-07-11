// Dinamik video kolaj senaryosu üreticisi.
// Yüklenen fotoğraf/keşiflerden sahne sahne (timeline) sinematik bir kurgu çıkarır;
// harita geçişlerini, müzik/ritim ve alt yazı/dış ses metinlerini planlar.
import { formatShortDate } from './date';
import { getVehicle } from '../data/vehicles';
import { computeRoute, formatKm } from './geo';

const MUSIC_MOODS = {
  plane: 'Ferah, yükselen orkestral / cinematic (BPM ~90)',
  car: 'Yol hissi veren indie-folk, gitar riff (BPM ~110)',
  bus: 'Sıcak lo-fi, yumuşak ritim (BPM ~95)',
  train: 'Ritmik, tekrarlı tren tıkırtısına oturan elektronik (BPM ~100)',
  motorbike: 'Enerjik rock/electro, güçlü davul (BPM ~125)',
  bike: 'Neşeli akustik pop (BPM ~115)',
  walk: 'Sakin ambient / piyano (BPM ~75)',
};

const SCENE_TYPE = {
  INTRO: 'intro',
  TRANSITION: 'transition',
  PLACE: 'place',
  OUTRO: 'outro',
};

// Saniyeyi "0:08" biçimine çevirir.
function ts(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function generateVideoScript(trip, opts = {}) {
  const perPlace = opts.perPlaceSeconds || 5; // her keşif sahnesi
  const transition = opts.transitionSeconds || 2; // harita geçişi
  const vehicle = getVehicle(trip.vehicle);
  const route = computeRoute(trip.stops || [], trip.vehicle);
  const discoveries = [...(trip.discoveries || [])].sort((a, b) => ((a.date || '') < (b.date || '') ? -1 : 1));

  const scenes = [];
  let t = 0;

  // 1) Giriş / açılış kartı
  scenes.push({
    index: scenes.length + 1,
    start: t,
    type: SCENE_TYPE.INTRO,
    title: 'Açılış',
    duration: 3,
    visual: trip.discoveries?.[0]?.photoUri
      ? 'İlk keşif fotoğrafına yavaş zoom-in (Ken Burns), üstüne başlık yazısı belirir.'
      : 'Karartılmış dünya haritasında başlangıç noktasına doğru kamera dalışı.',
    transition: 'Fade-in',
    onScreenText: `${trip.title || 'Seyahat'} · ${vehicle.icon} ${vehicle.label}`,
    voiceover: `${trip.title || 'Yolculuğumuz'} başlıyor...`,
    music: 'Yumuşak giriş, tema henüz kurulurken',
  });
  t += 3;

  // 2) Her keşif için: harita fly-through geçişi + mekan sahnesi
  discoveries.forEach((d, i) => {
    const prev = discoveries[i - 1];
    scenes.push({
      index: scenes.length + 1,
      start: t,
      type: SCENE_TYPE.TRANSITION,
      title: `Harita Geçişi → ${d.placeName}`,
      duration: transition,
      visual:
        prev && prev.lat != null && d.lat != null
          ? `3B harita fly-through: ${prev.placeName} pininden ${d.placeName} pinine kavisli uçuş; rota çizgisi çizilir.`
          : `3B harita: kamera ${d.placeName} konumuna dünya üzerinden dalış yapar, pin düşer.`,
      transition: 'Map fly-through (3D)',
      onScreenText: [d.city, d.country].filter(Boolean).join(', '),
      voiceover: '',
      music: 'Vuruş yükselir (build-up)',
    });
    t += transition;

    scenes.push({
      index: scenes.length + 1,
      start: t,
      type: SCENE_TYPE.PLACE,
      title: d.placeName,
      duration: perPlace,
      visual: d.photoUri
        ? 'Keşif fotoğrafı tam ekran; hafif Ken Burns + kenarlarda sinematik letterbox.'
        : 'Konum adı büyük tipografiyle; arka planda ilgili harita dokusu kayar.',
      transition: i % 2 === 0 ? 'Whip-pan' : 'Cross-dissolve',
      onScreenText: `${d.placeName}${d.date ? ' · ' + formatShortDate(d.date) : ''}`,
      voiceover: shortLine(d),
      music: 'Ana tema, sahne temposunda',
    });
    t += perPlace;
  });

  // 3) Kapanış
  scenes.push({
    index: scenes.length + 1,
    start: t,
    type: SCENE_TYPE.OUTRO,
    title: 'Kapanış',
    duration: 4,
    visual: 'Tüm rotanın haritada tek seferde çizilmesi (hızlandırılmış), ardından karartma.',
    transition: 'Zoom-out + fade',
    onScreenText: route.hasAny
      ? `${(trip.stops || []).length} durak · ${formatKm(route.totalKm)} · ${discoveries.length} anı`
      : `${discoveries.length} anı`,
    voiceover: 'Ve yolculuk burada son buldu — bir sonrakine kadar.',
    music: 'Tema doruğa çıkar, sonra yumuşak kapanış',
  });
  t += 4;

  return {
    meta: {
      title: trip.title || 'Seyahat',
      totalScenes: scenes.length,
      totalDuration: t,
      totalDurationLabel: ts(t),
      musicMood: MUSIC_MOODS[vehicle.id] || MUSIC_MOODS.car,
      vehicle,
    },
    scenes,
  };
}

function shortLine(d) {
  if (!d.summary) return d.placeName;
  const firstSentence = d.summary.split(/(?<=[.!?])\s/)[0];
  return firstSentence.length > 140 ? firstSentence.slice(0, 137) + '...' : firstSentence;
}

// Senaryoyu panoya kopyalanabilir düz metne (Markdown) çevirir.
export function videoScriptToText(trip) {
  const script = generateVideoScript(trip);
  const L = [];
  L.push(`# ${script.meta.title} — Video Kolaj Senaryosu`);
  L.push(
    `Toplam ${script.meta.totalScenes} sahne · ~${script.meta.totalDurationLabel} · Müzik: ${script.meta.musicMood}`
  );
  L.push('');
  L.push('## Timeline');
  script.scenes.forEach((s) => {
    L.push('');
    L.push(`### ${ts(s.start)} — Sahne ${s.index}: ${s.title} (${s.duration}s)`);
    L.push(`- Görsel: ${s.visual}`);
    L.push(`- Geçiş: ${s.transition}`);
    if (s.onScreenText) L.push(`- Alt yazı: ${s.onScreenText}`);
    if (s.voiceover) L.push(`- Dış ses: ${s.voiceover}`);
    L.push(`- Müzik: ${s.music}`);
  });
  return L.join('\n');
}

export { SCENE_TYPE };

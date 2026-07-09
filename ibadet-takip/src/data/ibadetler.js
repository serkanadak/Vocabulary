// Sünni itikat (Hanefi fıkhı esaslı) ibadet veri modeli.
// Kaynak: ../../../docs/ibadetler-farz-vacip-sunnet.md

export const HUKUM = {
  FARZ_AYN: 'farz_ayn',
  FARZ_KIFAYE: 'farz_kifaye',
  VACIP: 'vacip',
  SUNNET_MUEKKEDE: 'sunnet_muekkede',
  SUNNET_GAYRIMUEKKEDE: 'sunnet_gayrimuekkede',
};

export const HUKUM_META = {
  [HUKUM.FARZ_AYN]: { label: 'Farz', short: 'F', order: 0 },
  [HUKUM.FARZ_KIFAYE]: { label: 'Farz-ı Kifaye', short: 'FK', order: 1 },
  [HUKUM.VACIP]: { label: 'Vacip', short: 'V', order: 2 },
  [HUKUM.SUNNET_MUEKKEDE]: { label: 'Sünnet (Müekkede)', short: 'S', order: 3 },
  [HUKUM.SUNNET_GAYRIMUEKKEDE]: { label: 'Sünnet (Nafile)', short: 'N', order: 4 },
};

export const CATEGORY = {
  NAMAZ: 'namaz',
  ORUC: 'oruc',
  ZEKAT: 'zekat',
  HAC: 'hac',
  KURBAN: 'kurban',
};

export const CATEGORY_META = {
  [CATEGORY.NAMAZ]: { label: 'Namaz', icon: '🕌' },
  [CATEGORY.ORUC]: { label: 'Oruç', icon: '🌙' },
  [CATEGORY.ZEKAT]: { label: 'Zekât', icon: '🤲' },
  [CATEGORY.HAC]: { label: 'Hac & Umre', icon: '🕋' },
  [CATEGORY.KURBAN]: { label: 'Kurban', icon: '🐑' },
};

// Aynı vakte ait farz + sünnet kayıtlarını "Bugün" listesinde tek satırda
// göstermek için kullanılan vakit grubu etiketleri.
export const NAMAZ_GROUP_LABELS = {
  sabah: 'Sabah Namazı',
  ogle: 'Öğle Namazı',
  ikindi: 'İkindi Namazı',
  aksam: 'Akşam Namazı',
  yatsi: 'Yatsı Namazı',
};

// frequency: takvimde ne zaman "bugün yapılacaklar" listesine düşeceğini belirler.
export const FREQUENCY = {
  DAILY: 'daily', // her gün
  OPTIONAL_DAILY: 'optional_daily', // her gün, ama varsayılan gizli/opsiyonel nafile
  WEEKLY_FRIDAY: 'weekly_friday', // yalnızca Cuma günü
  OPTIONAL_WEEKLY_MON_THU: 'optional_weekly_mon_thu', // pazartesi & perşembe, opsiyonel
  OPTIONAL_MONTHLY: 'optional_monthly', // ayda birkaç gün (kameri, kullanıcı kendi takip eder)
  YEARLY_RAMADAN: 'yearly_ramadan', // Ayarlar'da girilen Ramazan tarih aralığında her gün
  YEARLY_EID_RAMADAN: 'yearly_eid_ramadan', // Ayarlar'da girilen Ramazan Bayramı günü/aralığı
  YEARLY_EID_KURBAN: 'yearly_eid_kurban', // Ayarlar'da girilen Kurban Bayramı günü/aralığı
  YEARLY_ONCE: 'yearly_once', // yılda bir kez, kullanıcı manuel işaretler (takvime bağlı değil)
  LIFETIME: 'lifetime', // ömürde bir kez, manuel işaretlenir
  OCCASIONAL: 'occasional', // duruma bağlı (örn. cenaze namazı), günlük listeye girmez, yalnızca bilgi amaçlı
};

// gender: 'all' | 'male' | 'female' | 'male_farz_female_nafile'
export const IBADETLER = [
  // ---- NAMAZ ----
  {
    id: 'namaz-sabah-sunnet',
    title: 'Sabah Namazı Sünneti',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_MUEKKEDE,
    frequency: FREQUENCY.DAILY,
    rekat: 2,
    gender: 'all',
    group: 'sabah',
    description: 'Sabah farzından önce kılınır. Terki mekruh sayılan sünnet-i müekkededir.',
  },
  {
    id: 'namaz-sabah-farz',
    title: 'Sabah Namazı Farzı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.DAILY,
    rekat: 2,
    gender: 'all',
    group: 'sabah',
    description: 'Günün 5 vakit farz namazından ilkidir.',
  },
  {
    id: 'namaz-ogle-ilk-sunnet',
    title: 'Öğle Namazı İlk Sünneti',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_MUEKKEDE,
    frequency: FREQUENCY.DAILY,
    rekat: 4,
    gender: 'all',
    group: 'ogle',
    description: 'Öğle farzından önce kılınan 4 rekât sünnet-i müekkede.',
  },
  {
    id: 'namaz-ogle-farz',
    title: 'Öğle Namazı Farzı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.DAILY,
    rekat: 4,
    gender: 'all',
    group: 'ogle',
    description: '5 vakit farz namazdan biri.',
  },
  {
    id: 'namaz-ogle-son-sunnet',
    title: 'Öğle Namazı Son Sünneti',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_MUEKKEDE,
    frequency: FREQUENCY.DAILY,
    rekat: 2,
    gender: 'all',
    group: 'ogle',
    description: 'Öğle farzından sonra kılınan 2 rekât sünnet-i müekkede.',
  },
  {
    id: 'namaz-ikindi-sunnet',
    title: 'İkindi Namazı Sünneti',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.OPTIONAL_DAILY,
    rekat: 4,
    gender: 'all',
    group: 'ikindi',
    description: 'İkindi farzından önce kılınan 4 rekât, sünnet-i gayr-i müekkede (nafile).',
  },
  {
    id: 'namaz-ikindi-farz',
    title: 'İkindi Namazı Farzı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.DAILY,
    rekat: 4,
    gender: 'all',
    group: 'ikindi',
    description: '5 vakit farz namazdan biri.',
  },
  {
    id: 'namaz-aksam-farz',
    title: 'Akşam Namazı Farzı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.DAILY,
    rekat: 3,
    gender: 'all',
    group: 'aksam',
    description: '5 vakit farz namazdan biri.',
  },
  {
    id: 'namaz-aksam-sunnet',
    title: 'Akşam Namazı Sünneti',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_MUEKKEDE,
    frequency: FREQUENCY.DAILY,
    rekat: 2,
    gender: 'all',
    group: 'aksam',
    description: 'Akşam farzından sonra kılınan 2 rekât sünnet-i müekkede.',
  },
  {
    id: 'namaz-evvabin',
    title: 'Evvâbin Namazı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.OPTIONAL_DAILY,
    rekat: 6,
    gender: 'all',
    description: 'Akşam namazının sünnetinden sonra kılınan nafile (2\'şer veya 4+2 rekât).',
  },
  {
    id: 'namaz-yatsi-ilk-sunnet',
    title: 'Yatsı Namazı İlk Sünneti',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.OPTIONAL_DAILY,
    rekat: 4,
    gender: 'all',
    group: 'yatsi',
    description: 'Yatsı farzından önce kılınan 4 rekât, sünnet-i gayr-i müekkede (nafile).',
  },
  {
    id: 'namaz-yatsi-farz',
    title: 'Yatsı Namazı Farzı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.DAILY,
    rekat: 4,
    gender: 'all',
    group: 'yatsi',
    description: '5 vakit farz namazdan sonuncusu.',
  },
  {
    id: 'namaz-yatsi-sunnet',
    title: 'Yatsı Namazı Sünneti',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_MUEKKEDE,
    frequency: FREQUENCY.DAILY,
    rekat: 2,
    gender: 'all',
    group: 'yatsi',
    description: 'Yatsı farzından sonra kılınan 2 rekât sünnet-i müekkede.',
  },
  {
    id: 'namaz-vitir',
    title: 'Vitir Namazı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.DAILY,
    rekat: 3,
    gender: 'all',
    description:
      'Yatsıdan sonra kılınan 3 rekât, son rekâtta kunut duası okunur. Hanefi mezhebinde vaciptir (diğer 3 mezhepte sünnettir).',
  },
  {
    id: 'namaz-teheccud',
    title: 'Teheccüd (Gece Namazı)',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.OPTIONAL_DAILY,
    rekat: 2,
    gender: 'all',
    description: 'Gecenin son üçte biri gibi kılınan, çokça tavsiye edilen nafile namaz.',
  },
  {
    id: 'namaz-cuma-farz',
    title: 'Cuma Namazı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.WEEKLY_FRIDAY,
    rekat: 2,
    gender: 'male_farz_female_nafile',
    description:
      'Cuma günü öğle namazının yerine geçer. Mukim ve mükellef erkeklere farz-ı ayndır; kadınlar için farz değildir, kılarlarsa nafile yerine geçer ve öğle namazı yerine sayılır.',
  },
  {
    id: 'namaz-teravih',
    title: 'Teravih Namazı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_MUEKKEDE,
    frequency: FREQUENCY.YEARLY_RAMADAN,
    rekat: 20,
    gender: 'all',
    description: 'Ramazan gecelerine mahsus, Hanefi mezhebinde 20 rekât kılınan sünnet-i müekkede.',
  },
  {
    id: 'namaz-bayram-ramazan',
    title: 'Ramazan Bayramı Namazı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.YEARLY_EID_RAMADAN,
    rekat: 2,
    gender: 'male_farz_female_nafile',
    description: 'Bayram sabahı kılınır, her rekâtta 3 ilave tekbir alınır. Hanefi\'de vaciptir.',
  },
  {
    id: 'namaz-bayram-kurban',
    title: 'Kurban Bayramı Namazı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.YEARLY_EID_KURBAN,
    rekat: 2,
    gender: 'male_farz_female_nafile',
    description: 'Bayram sabahı kılınır, her rekâtta 3 ilave tekbir alınır. Hanefi\'de vaciptir.',
  },
  {
    id: 'namaz-cenaze',
    title: 'Cenaze Namazı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.FARZ_KIFAYE,
    frequency: FREQUENCY.OCCASIONAL,
    gender: 'all',
    description: 'Bir cenaze olduğunda kılınır; topluluktan bir kısmı kılarsa diğerlerinden sorumluluk düşer.',
  },

  // ---- ORUÇ ----
  {
    id: 'oruc-ramazan',
    title: 'Ramazan Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.YEARLY_RAMADAN,
    gender: 'all',
    description: 'Ramazan ayının 29 veya 30 günü boyunca tutulan farz oruç.',
  },
  {
    id: 'oruc-arefe',
    title: 'Arefe Günü Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.YEARLY_ONCE,
    gender: 'all',
    description: 'Kurban Bayramı arefesinde tutulan müstehap oruç (hacca gidenler için tutulmaz).',
  },
  {
    id: 'oruc-asure',
    title: 'Aşûre Günü Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.YEARLY_ONCE,
    gender: 'all',
    description: '10 Muharrem günü, tercihen 9 veya 11. günle birlikte tutulan müstehap oruç.',
  },
  {
    id: 'oruc-sevval',
    title: 'Şevval Ayı 6 Günü',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.YEARLY_ONCE,
    gender: 'all',
    description: 'Ramazan Bayramı\'ndan sonra Şevval ayı içinde tutulan 6 günlük müstehap oruç.',
  },
  {
    id: 'oruc-pazartesi-persembe',
    title: 'Pazartesi - Perşembe Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.OPTIONAL_WEEKLY_MON_THU,
    gender: 'all',
    description: 'Hz. Peygamber\'in düzenli tuttuğu haftalık müstehap oruç günleri.',
  },
  {
    id: 'oruc-eyyam-i-biyz',
    title: 'Eyyâm-ı Bîz Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.OPTIONAL_MONTHLY,
    gender: 'all',
    description: 'Her kamerî ayın 13-14-15. günlerinde tutulan müstehap oruç.',
  },
  {
    id: 'oruc-adak',
    title: 'Adak (Nezir) Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.YEARLY_ONCE,
    gender: 'all',
    description: 'Kişinin kendi üzerine adakla vacip kıldığı oruç; ayrıca bozulan nafile orucun kazası ve keffaret oruçları da vaciptir.',
  },

  // ---- ZEKÂT ----
  {
    id: 'zekat-mal',
    title: 'Zekât',
    category: CATEGORY.ZEKAT,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.YEARLY_ONCE,
    gender: 'all',
    description:
      'Nisap miktarına ulaşan ve üzerinden bir kamerî yıl geçen mal üzerinden ödenir (nakit/ticaret malında %2,5).',
  },
  {
    id: 'zekat-fitre',
    title: 'Sadaka-i Fıtır (Fitre)',
    category: CATEGORY.ZEKAT,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.YEARLY_EID_RAMADAN,
    gender: 'all',
    description: 'Ramazan Bayramı namazından önce, ihtiyaç fazlası malı olan her Müslümanın kendisi ve bakmakla yükümlü olduğu kişiler için ödemesi.',
  },
  {
    id: 'zekat-akika',
    title: 'Akika Kurbanı',
    category: CATEGORY.ZEKAT,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.LIFETIME,
    gender: 'all',
    description: 'Yeni doğan çocuk için kesilen, cumhura göre sünnet/müstehap kurban.',
  },

  // ---- HAC & UMRE ----
  {
    id: 'hac-farz',
    title: 'Hac',
    category: CATEGORY.HAC,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.LIFETIME,
    gender: 'all',
    description: 'İstitâat (bedenen ve mâlen güç yetirebilme) şartını taşıyan her mükellefe ömürde bir kez farzdır.',
  },
  {
    id: 'hac-umre',
    title: 'Umre',
    category: CATEGORY.HAC,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.LIFETIME,
    gender: 'all',
    description: 'Hanefi mezhebinde ömürde bir kez vaciptir (Şafii mezhebinde farzdır).',
  },

  // ---- KURBAN ----
  {
    id: 'kurban-bayram',
    title: 'Kurban Bayramı Kurbanı',
    category: CATEGORY.KURBAN,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.YEARLY_EID_KURBAN,
    gender: 'all',
    description:
      'Nisap miktarına sahip, akıllı, bâliğ, mukim her Müslümana Kurban Bayramı günlerinde Hanefi mezhebinde vaciptir (diğer 3 mezhepte sünnet-i müekkededir).',
  },
];

export function getById(id) {
  return IBADETLER.find((i) => i.id === id);
}

export function getByCategory(category) {
  return IBADETLER.filter((i) => i.category === category);
}

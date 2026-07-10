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
  DIGER: 'diger',
};

export const CATEGORY_META = {
  [CATEGORY.NAMAZ]: { label: 'Namaz', icon: '🕌' },
  [CATEGORY.ORUC]: { label: 'Oruç', icon: '🌙' },
  [CATEGORY.ZEKAT]: { label: 'Zekât', icon: '🤲' },
  [CATEGORY.HAC]: { label: 'Hac & Umre', icon: '🕋' },
  [CATEGORY.KURBAN]: { label: 'Kurban', icon: '🐑' },
  [CATEGORY.DIGER]: { label: 'Diğer (İlave)', icon: '➕' },
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
// summary: ibadetin anlamı (neden yapıldığı) ve genel hatlarıyla nasıl yapıldığına
// dair kısa bir özet — Kategoriler ekranından ibadet detayına girildiğinde gösterilir.
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
    summary:
      'Sabah namazının vaktine girerken kılınan, Hz. Peygamber\'in hiç terk etmediği rivayet edilen bir sünnettir. Sabah farzından önce, tek başına ve kıraati içinden okuyarak 2 rekât olarak kılınır.',
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
    summary:
      'Günün ilk farz namazı olup Allah\'a kulluğun günün başında tazelenmesini ifade eder. Niyet edilip iftitah tekbiriyle başlanır, her rekâtta Fatiha ve bir sûre okunarak rükû-secde ile 2 rekât kılınıp selamla bitirilir.',
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
    summary:
      'Öğle vaktine girerken nafile ibadetle Allah\'a yönelişi pekiştiren sünnet-i müekkededir. Farzdan önce, tek başına, kıraati içinden okuyarak 4 rekât (iki selamla) kılınır.',
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
    summary:
      'Günün ortasında, dünya işlerinin arasında kulu Rabbine yeniden bağlayan farz namazdır. Cemaatle veya tek başına, kıraati içinden okuyarak 4 rekât olarak kılınır.',
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
    summary:
      'Öğle farzının hemen ardından kılınıp o vaktin sünnetini tamamlayan sünnet-i müekkededir. Farzdan sonra, içinden okuyarak, 2 rekât olarak kılınır.',
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
    summary:
      'Hz. Peygamber\'in ara sıra kıldığı, terkinde günah olmayan fakat sevabı büyük olan bir nafiledir. İkindi farzından önce, içinden okuyarak, 4 rekât (iki selamla) kılınır.',
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
    summary:
      'Kur\'an\'da "orta namaz" olarak özellikle vurgulanan, günün en meşgul saatinde bile ihmal edilmemesi öğütlenen farz namazdır. İçinden okuyarak 4 rekât olarak kılınır.',
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
    summary:
      'Gündüzün bitip gecenin başladığı anda kılınan, günün şükrünü ifade eden farz namazdır. İlk iki rekâtı açıktan (cemaatle kılınırken), üçüncü rekâtı içinden okunarak kılınır.',
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
    summary:
      'Akşam farzının hemen peşinden kılınıp günün namazını nafile ile taçlandıran sünnet-i müekkededir. Farzdan sonra içinden okuyarak 2 rekât kılınır.',
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
    summary:
      '"Evvâbîn" (Allah\'a sürekli dönenler) adıyla anılan, akşamla yatsı arasındaki vakti değerlendiren faziletli bir nafiledir. Akşam sünnetinden sonra, ikişer rekâtlık selamlarla toplam 6 rekât olarak kılınır.',
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
    summary:
      'Yatsı vaktine girerken kılınan, terkinde sakınca olmayan fakat fazileti yüksek bir nafiledir. Yatsı farzından önce, içinden okuyarak, 4 rekât kılınır.',
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
    summary:
      'Günün son farz namazı olup uykuya geçmeden önce Allah\'a son bir yönelişi ifade eder. İçinden okuyarak 4 rekât olarak kılınır.',
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
    summary:
      'Yatsı farzının ardından kılınan, günün namaz sünnetlerini tamamlayan sünnet-i müekkededir. Farzdan sonra içinden okuyarak 2 rekât kılınır.',
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
    summary:
      '"Vitir" tek sayı demektir; günün namazını tek bir rekâtla kapatıp güne dua ile son verir. Yatsıdan sonra 3 rekât kılınır; üçüncü rekâtta rükûdan önce eller kaldırılıp kunut duası okunur.',
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
    summary:
      'Gecenin sessizliğinde kılınan, Kur\'an\'da övülen ve Hz. Peygamber\'in özenle devam ettiği en faziletli nafile namazlardandır. Uyanıp gecenin son üçte biri gibi bir vakitte, dilenen sayıda 2\'şer rekât olarak kılınır.',
  },
  {
    id: 'namaz-cuma-ilk-sunnet',
    title: 'Cuma Namazı İlk Sünneti',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_MUEKKEDE,
    frequency: FREQUENCY.WEEKLY_FRIDAY,
    rekat: 4,
    gender: 'all',
    group: 'ogle',
    description: 'Cuma farzından önce kılınan 4 rekât sünnet-i müekkede.',
    summary:
      'Cuma namazına hazırlığı ifade eden, o güne özgü bir sünnettir. Cuma farzından önce, camide, içinden okuyarak 4 rekât kılınır.',
  },
  {
    id: 'namaz-cuma-farz',
    title: 'Cuma Namazı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.FARZ_AYN,
    frequency: FREQUENCY.WEEKLY_FRIDAY,
    rekat: 2,
    gender: 'male_farz_female_nafile',
    group: 'ogle',
    description:
      'Cuma günü öğle namazının yerine geçer. Mukim ve mükellef erkeklere farz-ı ayndır; kadınlar için farz değildir, kılarlarsa nafile yerine geçer ve öğle namazı yerine sayılır.',
    summary:
      'Haftanın en faziletli günü olan Cuma\'da Müslümanların topluca Allah\'a yönelmesini sağlayan, öğle namazının yerine geçen farz namazdır. İki hutbe dinlendikten sonra imam eşliğinde, açıktan okunarak 2 rekât cemaatle kılınır.',
  },
  {
    id: 'namaz-cuma-son-sunnet',
    title: 'Cuma Namazı Son Sünneti',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.SUNNET_MUEKKEDE,
    frequency: FREQUENCY.WEEKLY_FRIDAY,
    rekat: 4,
    gender: 'all',
    group: 'ogle',
    description: 'Cuma farzından sonra kılınan 4 rekât sünnet-i müekkede.',
    summary:
      'Cuma farzının ardından kılınıp o günün namazını tamamlayan sünnettir. Farzdan sonra içinden okuyarak 4 rekât kılınır.',
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
    summary:
      'Ramazan gecelerine özgü, Kur\'an\'ın topluca hatmedilmesine de vesile olan, cemaatle kılınması teşvik edilen sünnet-i müekkededir. Yatsı farzından sonra, vitirden önce, genelde ikişer veya dörder rekâtlık bölümler halinde toplam 20 rekât kılınır.',
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
    summary:
      'Bir aylık orucun tamamlanmasının sevincini topluca Allah\'a şükrederek ifade eden bayram namazıdır. Bayram sabahı, namazdan sonra hutbe okunmak üzere, her rekâtta 3\'er ilave tekbirle 2 rekât kılınır.',
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
    summary:
      'Hz. İbrahim\'in teslimiyetini anan Kurban Bayramı\'nın topluca kutlanmasını sağlayan namazdır. Bayram sabahı, namazdan sonra hutbe okunmak üzere, her rekâtta 3\'er ilave tekbirle 2 rekât kılınır.',
  },
  {
    id: 'namaz-cenaze',
    title: 'Cenaze Namazı',
    category: CATEGORY.NAMAZ,
    hukum: HUKUM.FARZ_KIFAYE,
    frequency: FREQUENCY.OCCASIONAL,
    gender: 'all',
    description: 'Bir cenaze olduğunda kılınır; topluluktan bir kısmı kılarsa diğerlerinden sorumluluk düşer.',
    summary:
      'Ölen bir Müslümana son bir dua ve şefaat vesilesi olan, rükû-secde içermeyen özel bir namazdır. Ayakta dört tekbirle kılınır: ilk tekbirde Sübhaneke, ikincide salevat, üçüncüde cenaze duası okunur, dördüncü tekbirin ardından selam verilir.',
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
    summary:
      'Nefsi terbiye eden, takvayı artıran ve Kur\'an\'ın indiği ayı ihya eden, İslam\'ın beş şartından biridir. İmsak vaktinden (fecrin doğuşundan) güneşin batışına kadar niyet edilip yeme, içme ve orucu bozan şeylerden sakınılarak tutulur.',
  },
  {
    id: 'oruc-arefe',
    title: 'Arefe Günü Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.YEARLY_ONCE,
    gender: 'all',
    description: 'Kurban Bayramı arefesinde tutulan müstehap oruç (hacca gidenler için tutulmaz).',
    summary:
      'Kurban Bayramı arefesinde tutulan, önceki ve sonraki yılın küçük günahlarına kefaret olacağı umulan faziletli bir oruçtur. Hacılar güçlü kalabilsin diye hacca gidenlere tutulması tavsiye edilmez; diğerleri niyet edip gün boyu yeme-içmeden sakınarak tutar.',
  },
  {
    id: 'oruc-asure',
    title: 'Aşûre Günü Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.YEARLY_ONCE,
    gender: 'all',
    description: '10 Muharrem günü, tercihen 9 veya 11. günle birlikte tutulan müstehap oruç.',
    summary:
      'Muharrem ayının 10. günü olan Aşûre\'de, Hz. Musa ve kavminin kurtuluşunu anarak tutulan köklü bir müstehap oruçtur. Yalnızca 10. güne özgü kılınmaması için tercihen 9. veya 11. günle birlikte iki gün tutulması tavsiye edilir.',
  },
  {
    id: 'oruc-sevval',
    title: 'Şevval Ayı 6 Günü',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.YEARLY_ONCE,
    gender: 'all',
    description: 'Ramazan Bayramı\'ndan sonra Şevval ayı içinde tutulan 6 günlük müstehap oruç.',
    summary:
      '"Ramazan\'ı tutup ardından Şevval\'den altı gün ekleyen, sanki bütün yılı oruçlu geçirmiş gibi olur" hadisine dayanan faziletli bir oruçtur. Ramazan Bayramı\'ndan sonra Şevval ayı içinde, art arda veya aralıklı olarak 6 gün tutulur.',
  },
  {
    id: 'oruc-pazartesi-persembe',
    title: 'Pazartesi - Perşembe Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.OPTIONAL_WEEKLY_MON_THU,
    gender: 'all',
    description: 'Hz. Peygamber\'in düzenli tuttuğu haftalık müstehap oruç günleri.',
    summary:
      'Amellerin Allah\'a arz edildiği günler olduğu rivayet edilen Pazartesi ve Perşembe günlerinde, Hz. Peygamber\'in düzenli olarak tuttuğu bir sünnettir. Haftanın bu iki gününde, diğer nafile oruçlar gibi niyet edilerek tutulur.',
  },
  {
    id: 'oruc-eyyam-i-biyz',
    title: 'Eyyâm-ı Bîz Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.OPTIONAL_MONTHLY,
    gender: 'all',
    description: 'Her kamerî ayın 13-14-15. günlerinde tutulan müstehap oruç.',
    summary:
      '"Beyaz/aydınlık günler" anlamına gelen, ayın dolunay haline yaklaştığı günlerde tutulan, sevabı bütün ayı oruçlu geçirmiş gibi yazılan bir sünnettir. Her kamerî ayın 13, 14 ve 15. günlerinde tutulur.',
  },
  {
    id: 'oruc-adak',
    title: 'Adak (Nezir) Orucu',
    category: CATEGORY.ORUC,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.YEARLY_ONCE,
    gender: 'all',
    description: 'Kişinin kendi üzerine adakla vacip kıldığı oruç; ayrıca bozulan nafile orucun kazası ve keffaret oruçları da vaciptir.',
    summary:
      'Kişinin "şu işim gerçekleşirse şu kadar gün oruç tutacağım" gibi kendi üzerine adakla (nezirle) vacip kıldığı oruçtur; herkese değil, yalnızca adak adayana ve adanan şart gerçekleşince gereklidir. Adanan gün sayısı kadar, niyet edilip normal oruç gibi tutulur.',
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
    summary:
      'Malın zekâtını vermek, servetteki fakirin hakkını ona ulaştırıp malı hem manen hem toplumsal olarak temizleyen (arındıran) bir ibadettir. Nisap miktarına ulaşan ve üzerinden bir kamerî yıl geçen nakit/ticaret malının %2,5\'i (kırkta biri) hesaplanıp muhtaç kişilere verilir.',
  },
  {
    id: 'zekat-fitre',
    title: 'Sadaka-i Fıtır (Fitre)',
    category: CATEGORY.ZEKAT,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.YEARLY_EID_RAMADAN,
    gender: 'all',
    description: 'Ramazan Bayramı namazından önce, ihtiyaç fazlası malı olan her Müslümanın kendisi ve bakmakla yükümlü olduğu kişiler için ödemesi.',
    summary:
      'Orucun küçük kusurlarını telafi eden ve bayram sevincine yoksulları da ortak eden bir mali ibadettir. Ramazan Bayramı namazından önce, temel ihtiyaç fazlası malı olan herkesin kendisi ve bakmakla yükümlü olduğu kişiler için belirlenen miktarı ödemesiyle yerine getirilir.',
  },
  {
    id: 'zekat-akika',
    title: 'Akika Kurbanı',
    category: CATEGORY.ZEKAT,
    hukum: HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: FREQUENCY.LIFETIME,
    gender: 'all',
    description: 'Yeni doğan çocuk için kesilen, cumhura göre sünnet/müstehap kurban.',
    summary:
      'Yeni doğan çocuk için şükür ifadesi olarak kesilen, çocuğun sağlığına ve bereketine vesile olacağı umulan bir kurbandır. Doğumdan sonra (tercihen yedinci günde), erkek çocuk için iki, kız çocuk için bir koyun/keçi kesilip eti dağıtılarak yerine getirilir.',
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
    summary:
      'İslam\'ın beş şartından biri olup dünyanın dört bir yanından Müslümanları Kâbe etrafında eşit kıyafetlerle bir araya getiren, hayatta bir kez yapılan büyük bir ibadettir. İhrama girilir, Arafat\'ta vakfe yapılır, Kâbe tavaf edilir, Safa ile Merve arasında sa\'y yapılır ve belirlenen menasik sırasıyla tamamlanır.',
  },
  {
    id: 'hac-umre',
    title: 'Umre',
    category: CATEGORY.HAC,
    hukum: HUKUM.VACIP,
    frequency: FREQUENCY.LIFETIME,
    gender: 'all',
    description: 'Hanefi mezhebinde ömürde bir kez vaciptir (Şafii mezhebinde farzdır).',
    summary:
      'Haccın küçüğü sayılan, yılın her mevsiminde yapılabilen bir ziyaret ve ibadettir. İhrama girilir, Kâbe tavaf edilir, Safa ile Merve arasında sa\'y yapılır ve tıraş olunarak ihramdan çıkılır.',
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
    summary:
      'Hz. İbrahim\'in oğlunu Allah için kurban etmeye hazır oluşunu anan, malını Allah rızası için paylaşmayı öğreten bir ibadettir. Kurban Bayramı\'nın ilk üç günü içinde, nisap sahibi her Müslüman uygun bir hayvan kestirip etini kendisi, akrabaları ve muhtaçlar arasında paylaştırır.',
  },
];

export function getById(id) {
  return IBADETLER.find((i) => i.id === id);
}

export function getByCategory(category) {
  return IBADETLER.filter((i) => i.category === category);
}

// İlave (kullanıcı tanımlı) ibadet oluşturmak için kullanılan seçenekler ve fabrika fonksiyonu.
export const CUSTOM_FREQUENCY_OPTIONS = [
  { value: FREQUENCY.DAILY, label: 'Her gün (zorunlu listede)' },
  { value: FREQUENCY.OPTIONAL_DAILY, label: 'Her gün (nafile listesinde)' },
  { value: FREQUENCY.YEARLY_ONCE, label: 'Yılda bir (takvime bağlı değil)' },
  { value: FREQUENCY.LIFETIME, label: 'Ömürde bir' },
];

export const CUSTOM_HUKUM_OPTIONS = Object.values(HUKUM);

export function createCustomItem({ title, category, hukum, frequency, rekat, description }) {
  return {
    id: `custom-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
    title: title.trim(),
    category: category || CATEGORY.DIGER,
    hukum: hukum || HUKUM.SUNNET_GAYRIMUEKKEDE,
    frequency: frequency || FREQUENCY.OPTIONAL_DAILY,
    rekat: rekat ? Number(rekat) : undefined,
    gender: 'all',
    description: description?.trim() || 'Kullanıcı tarafından eklenen ilave ibadet.',
    custom: true,
  };
}

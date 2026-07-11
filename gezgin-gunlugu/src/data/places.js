// Yerel (çevrimdışı) tarihi & kültürel yerler veri tabanı.
// Kullanıcı bir konum/mekan ismi girdiğinde ya da fotoğraf eklerken burada eşleşme aranır.
// Eşleşme bulunursa hazır tarihi/kültürel özet ve kaynakça kullanılır; bulunmazsa
// (Ayarlar'dan canlı AI açık değilse) boş şablon üretilir.

export const PLACES = [
  {
    id: 'ayasofya',
    name: 'Ayasofya',
    city: 'İstanbul',
    country: 'Türkiye',
    lat: 41.0086,
    lng: 28.9802,
    aliases: ['ayasofya', 'hagia sophia', 'sancta sophia', 'aya sofya', 'hagia sofia'],
    summary:
      'Ayasofya, 537 yılında Doğu Roma (Bizans) İmparatoru I. Justinianus tarafından bir katedral olarak tamamlandı ve neredeyse bin yıl boyunca dünyanın en büyük kubbeli yapısı olarak kaldı. Isidoros ve Anthemios’un tasarladığı, yeri âdeta havada asılı gibi görünen devasa merkezi kubbesi, mühendislik tarihinin dönüm noktalarından biri sayılır. 1453’te İstanbul’un fethiyle camiye çevrildi; Osmanlı döneminde eklenen minareler, mihrap ve hat levhalarıyla iki büyük medeniyetin izlerini aynı mekânda taşır.\n\n1935’te Atatürk’ün kararıyla müzeye dönüştürülen yapı, 2020’de yeniden ibadete açıldı. İçindeki altın zeminli Bizans mozaikleri, devşirme sütunları ve “terleyen sütun” gibi efsaneleriyle, Doğu ile Batı’nın, Hristiyanlık ile İslam’ın kesiştiği eşsiz bir kültürel katman sunar. İstanbul’un tarihi yarımadasının kalbinde, Sultanahmet Meydanı’na bakar.',
    sources: [
      'UNESCO World Heritage List — Historic Areas of Istanbul',
      'T.C. Kültür ve Turizm Bakanlığı — Ayasofya-i Kebir Cami-i Şerifi',
    ],
  },
  {
    id: 'sultanahmet',
    name: 'Sultanahmet Camii (Mavi Cami)',
    city: 'İstanbul',
    country: 'Türkiye',
    lat: 41.0054,
    lng: 28.9768,
    aliases: ['sultanahmet', 'sultan ahmet', 'blue mosque', 'mavi cami', 'sultanahmet camii'],
    summary:
      'Sultan I. Ahmed adına Mimar Sedefkâr Mehmed Ağa tarafından 1609–1616 arasında inşa edilen Sultanahmet Camii, altı minaresi ve iç mekânını süsleyen on binlerce İznik çinisiyle ünlüdür. Bu mavi-yeşil tonlu çiniler yapıya Batı dillerinde “Blue Mosque” (Mavi Cami) adını kazandırmıştır. Klasik Osmanlı mimarisinin doruk örneklerinden biri olan cami, kademeli yarım kubbeleriyle Ayasofya’ya bilinçli bir karşılık niteliği taşır.\n\nCami, Bizans’ın Hipodrom alanının hemen yanında yükselir; avlusu, Dikilitaş ve çevredeki tarihi yapılarla birlikte İstanbul’un en yoğun ziyaret edilen meydanını oluşturur. Hâlâ aktif bir ibadethane olduğundan namaz vakitleri dışında ziyarete açıktır.',
    sources: [
      'UNESCO World Heritage List — Historic Areas of Istanbul',
      'Lonely Planet — Blue Mosque (Sultanahmet Camii)',
    ],
  },
  {
    id: 'topkapi',
    name: 'Topkapı Sarayı',
    city: 'İstanbul',
    country: 'Türkiye',
    lat: 41.0115,
    lng: 28.9834,
    aliases: ['topkapi', 'topkapı', 'topkapi sarayi', 'topkapı sarayı', 'topkapi palace'],
    summary:
      'Topkapı Sarayı, Fatih Sultan Mehmed’in emriyle 1460’lı yıllarda kurulmuş ve yaklaşık dört yüzyıl boyunca Osmanlı padişahlarının hem devlet merkezi hem de ikametgâhı olmuştur. Avlular halinde genişleyen yapı; Divan-ı Hümâyun, Harem, mutfaklar ve hazine daireleriyle bir saraydan çok küçük bir şehir gibidir. Sarayın konumu, Haliç, Boğaz ve Marmara’nın buluştuğu Sarayburnu’na hâkimdir.\n\nBugün müze olan sarayda Kutsal Emanetler Dairesi, murassa Topkapı Hançeri ve Kaşıkçı Elması gibi hazineler sergilenir. İnce işçilikli çeşmeleri, çini panoları ve manzara köşkleriyle Osmanlı saray yaşamının en zengin maddi tanığıdır.',
    sources: [
      'UNESCO World Heritage List — Historic Areas of Istanbul',
      'Millî Saraylar / Topkapı Sarayı Müzesi resmi portalı',
    ],
  },
  {
    id: 'kapadokya',
    name: 'Kapadokya (Göreme)',
    city: 'Nevşehir',
    country: 'Türkiye',
    lat: 38.6431,
    lng: 34.8289,
    aliases: ['kapadokya', 'cappadocia', 'goreme', 'göreme', 'peribacaları', 'peri bacaları', 'uchisar', 'uçhisar'],
    summary:
      'Kapadokya, milyonlarca yıl önce Erciyes, Hasan ve Göllü dağlarının püskürttüğü volkanik tüfün rüzgâr ve suyla aşınmasıyla oluşan “peri bacaları” manzarasıyla dünyaca tanınır. Yumuşak kayaların kolay oyulabilir yapısı, insanların binlerce yıl boyunca buraya evler, kiliseler ve Derinkuyu gibi çok katlı yeraltı şehirleri kazmasına imkân vermiştir.\n\nGöreme Açık Hava Müzesi’ndeki kaya kiliseleri, erken Hristiyanlık döneminin fresklerini barındırır ve bölge UNESCO Dünya Mirası Listesi’nde yer alır. Gün doğumunda yüzlerce sıcak hava balonunun vadiler üzerinde süzülmesi, Kapadokya’nın simgesi hâline gelmiştir.',
    sources: [
      'UNESCO World Heritage List — Göreme National Park and the Rock Sites of Cappadocia',
      'T.C. Kültür ve Turizm Bakanlığı — Kapadokya',
    ],
  },
  {
    id: 'efes',
    name: 'Efes Antik Kenti',
    city: 'İzmir (Selçuk)',
    country: 'Türkiye',
    lat: 37.9410,
    lng: 27.3419,
    aliases: ['efes', 'ephesus', 'efes antik kenti', 'celsus', 'celsus kütüphanesi'],
    summary:
      'Efes, Antik Çağ’da Ege kıyısının en görkemli liman kentlerinden biriydi; İyon, Helenistik ve Roma dönemlerinde önemli bir ticaret, din ve kültür merkezi olarak parladı. Cephe mimarisiyle büyüleyen Celsus Kütüphanesi, 25 bin kişilik Büyük Tiyatro ve mermer döşeli Kuretler Caddesi, kentin ihtişamını bugüne taşır. Dünyanın Yedi Harikası’ndan Artemis Tapınağı da buradaydı.\n\nHristiyanlık tarihinde de merkezî bir yere sahip olan Efes, Aziz Pavlus’un vaaz verdiği ve Meryem Ana’nın son yıllarını geçirdiğine inanılan bölgeye ev sahipliği yapar. Kent, 2015’ten bu yana UNESCO Dünya Mirası Listesi’nde yer almaktadır.',
    sources: [
      'UNESCO World Heritage List — Ephesus',
      'Lonely Planet — Ephesus',
    ],
  },
  {
    id: 'pamukkale',
    name: 'Pamukkale & Hierapolis',
    city: 'Denizli',
    country: 'Türkiye',
    lat: 37.9203,
    lng: 29.1206,
    aliases: ['pamukkale', 'hierapolis', 'travertenler', 'cotton castle', 'pamukkale travertenleri'],
    summary:
      'Pamukkale, kalsiyum karbonatça zengin termal suların yamaç boyunca akarken bıraktığı bembeyaz traverten teraslarıyla âdeta bir “pamuk kalesi” görünümü sunar. Bu doğal oluşum, binlerce yıldır şifa arayanları kendine çekmiştir. Teraslardan yükselen sıcak sular, üstteki antik havuzlarda hâlâ ziyaretçilere açıktır.\n\nTeraslarin hemen üzerinde, MÖ 2. yüzyılda kurulan antik kaplıca kenti Hierapolis uzanır; geniş nekropolü, tiyatrosu ve Apollon Tapınağı’yla dikkat çeker. Doğal ve kültürel değerleri birleştiren alan, UNESCO Dünya Mirası Listesi’nde karma miras olarak yer alır.',
    sources: [
      'UNESCO World Heritage List — Hierapolis-Pamukkale',
      'T.C. Kültür ve Turizm Bakanlığı — Pamukkale',
    ],
  },
  {
    id: 'gobeklitepe',
    name: 'Göbeklitepe',
    city: 'Şanlıurfa',
    country: 'Türkiye',
    lat: 37.2233,
    lng: 38.9224,
    aliases: ['gobeklitepe', 'göbeklitepe', 'göbekli tepe', 'gobekli tepe', 'potbelly hill'],
    summary:
      'Göbeklitepe, yaklaşık 12 bin yıl öncesine (MÖ 9600 dolayları) tarihlenen ve bilinen en eski anıtsal tapınma yapılarını barındıran Neolitik bir alandır. Buradaki T biçimli dev dikili taşlar; tilki, yılan, yaban domuzu ve turna gibi hayvan kabartmalarıyla süslüdür. Alanın en çarpıcı yanı, henüz tarımın ve yerleşik köy yaşamının yaygınlaşmadığı bir çağda inşa edilmiş olmasıdır — bu, “önce tapınak mı, önce şehir mi?” tartışmasını başlatmıştır.\n\nSık sık “tarihin sıfır noktası” olarak anılan Göbeklitepe, insanlık tarihinin başlangıcına dair pek çok varsayımı yeniden yazdırmıştır. Alan 2018’de UNESCO Dünya Mirası Listesi’ne girmiştir.',
    sources: [
      'UNESCO World Heritage List — Göbekli Tepe',
      'Alman Arkeoloji Enstitüsü (DAI) — Göbekli Tepe kazı raporları',
    ],
  },
  {
    id: 'nemrut',
    name: 'Nemrut Dağı',
    city: 'Adıyaman',
    country: 'Türkiye',
    lat: 37.9809,
    lng: 38.7411,
    aliases: ['nemrut', 'nemrut dağı', 'nemrut dagi', 'mount nemrut', 'kommagene'],
    summary:
      'Nemrut Dağı’nın 2.100 metrelik zirvesinde, MÖ 1. yüzyılda Kommagene Kralı I. Antiokhos tarafından yaptırılan görkemli bir hierothesion (anıt-mezar ve kült alanı) yer alır. Kırılıp yere düşmüş dev tanrı ve kral başları, Yunan ve Pers panteonlarını birleştiren eşsiz bir sentezi temsil eder; bu da Kommagene’nin Doğu ile Batı arasındaki köprü konumunu yansıtır.\n\nDevasa heykellerin çevrelediği doğu ve batı terasları, özellikle gün doğumu ve gün batımında büyüleyici bir manzara sunar. Alan 1987’den beri UNESCO Dünya Mirası Listesi’nde yer almaktadır.',
    sources: [
      'UNESCO World Heritage List — Nemrut Dağ',
      'Lonely Planet — Nemrut Dağı (Mount Nemrut)',
    ],
  },
  {
    id: 'truva',
    name: 'Truva (Troya) Antik Kenti',
    city: 'Çanakkale',
    country: 'Türkiye',
    lat: 39.9576,
    lng: 26.2389,
    aliases: ['truva', 'troya', 'troy', 'troia', 'ilion', 'truva atı'],
    summary:
      'Truva, Homeros’un İlyada destanında anlatılan efsanevi savaşın geçtiği kenttir ve arkeolojik olarak üst üste kurulmuş dokuz yerleşim katmanını barındırır; en eskisi MÖ 3000’lere kadar iner. 19. yüzyılda Heinrich Schliemann’ın kazıları, uzun süre yalnızca mit sanılan kentin gerçekliğini gün ışığına çıkarmıştır.\n\nSurları, rampası ve tapınak kalıntılarıyla Truva, mit ile tarihin iç içe geçtiği ender yerlerden biridir. Ziyaretçi alanındaki tahta Truva Atı replikası, destanın en ünlü sahnesini simgeler. Kent 1998’den beri UNESCO Dünya Mirası Listesi’ndedir.',
    sources: [
      'UNESCO World Heritage List — Archaeological Site of Troy',
      'T.C. Kültür ve Turizm Bakanlığı — Troya Ören Yeri',
    ],
  },
  {
    id: 'anitkabir',
    name: 'Anıtkabir',
    city: 'Ankara',
    country: 'Türkiye',
    lat: 39.9250,
    lng: 32.8367,
    aliases: ['anitkabir', 'anıtkabir', 'ataturk mausoleum', 'atatürk anıtmezar'],
    summary:
      'Anıtkabir, Türkiye Cumhuriyeti’nin kurucusu Mustafa Kemal Atatürk’ün anıtmezarıdır. Mimar Emin Onat ve Orhan Arda’nın tasarımıyla 1944–1953 arasında inşa edilmiş, Selçuklu ve Hitit motiflerinden esinlenen sade ama anıtsal bir üslupla yükselmiştir. Aslanlı Yol, tören meydanı ve mermer sütunlu mozole, ziyaretçileri saygılı bir sükûnete davet eder.\n\nKompleks içindeki Atatürk ve Kurtuluş Savaşı Müzesi, ulusal tarih açısından zengin bir koleksiyon sunar. Ankara’nın en çok ziyaret edilen anıtı olan Anıtkabir, resmî törenlerin ve ulusal günlerin de merkezidir.',
    sources: [
      'T.C. Millî Savunma Bakanlığı — Anıtkabir resmi portalı',
      'Lonely Planet — Anıtkabir',
    ],
  },
  {
    id: 'sumela',
    name: 'Sümela Manastırı',
    city: 'Trabzon',
    country: 'Türkiye',
    lat: 40.6903,
    lng: 39.6586,
    aliases: ['sumela', 'sümela', 'sumela manastırı', 'sumela monastery'],
    summary:
      'Sümela Manastırı, Karadeniz’in sarp Altındere Vadisi’nde, dik bir kaya yüzeyine âdeta yapışmış gibi konumlanan bir Rum Ortodoks manastırıdır. Kuruluşu 4. yüzyıla kadar geriye götürülür; bugünkü görkemli hâlini ise yüzyıllar içinde eklenen şapeller, kütüphane ve keşiş hücreleriyle almıştır. Ana kaya kilisesinin iç ve dış yüzeylerini kaplayan freskler, Bizans dinî resim sanatının etkileyici örnekleridir.\n\nSis içinden yükselen ormanlık dağların ortasındaki konumu, manastıra mistik bir atmosfer katar. Restorasyonların ardından yeniden ziyarete açılan yapı, Karadeniz turizminin simge duraklarından biridir.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — Sümela Manastırı',
      'UNESCO World Heritage Tentative List — Sümela Monastery',
    ],
  },
  {
    id: 'eyfel',
    name: 'Eyfel Kulesi',
    city: 'Paris',
    country: 'Fransa',
    lat: 48.8584,
    lng: 2.2945,
    aliases: ['eyfel', 'eiffel', 'eiffel tower', 'tour eiffel', 'eyfel kulesi'],
    summary:
      'Eyfel Kulesi, 1889 Dünya Fuarı için mühendis Gustave Eiffel’in şirketi tarafından inşa edilen 330 metrelik demir kafes bir kuledir. İlk yapıldığında pek çok Parisli tarafından eleştirilmiş olsa da kısa sürede Paris’in ve modern mühendisliğin simgesi hâline gelmiştir. Üç katındaki seyir teraslarından şehrin ışıltılı panoraması izlenebilir.\n\nGece boyunca her saat başı parıldayan aydınlatmasıyla kule, romantizmin ve Fransız kültürünün dünya çapındaki en tanınmış imgelerinden biridir. Şehrin Champ de Mars bahçelerine bakan konumu, piknik ve fotoğraf için idealdir.',
    sources: [
      'La Tour Eiffel — resmi site (toureiffel.paris)',
      'Lonely Planet — Eiffel Tower',
    ],
  },
  {
    id: 'kolezyum',
    name: 'Kolezyum',
    city: 'Roma',
    country: 'İtalya',
    lat: 41.8902,
    lng: 12.4922,
    aliases: ['kolezyum', 'colosseum', 'colosseo', 'flavian amphitheatre', 'amfitiyatro roma'],
    summary:
      'Kolezyum (Flavius Amfitiyatrosu), MS 70–80 arasında Roma İmparatorluğu’nun Flavius hanedanı döneminde inşa edilen, yaklaşık 50 bin seyirci kapasiteli devasa bir arenadır. Gladyatör dövüşleri, hayvan avları ve halka açık gösterilere ev sahipliği yapmıştır. Çok katlı kemer sistemi ve seyirci akışını yöneten planı, Roma mühendisliğinin ustalığını gösterir.\n\nYüzyıllar içinde depremler ve taş yağmasıyla kısmen yıkılsa da Kolezyum, Antik Roma’nın en güçlü simgesi olarak ayaktadır. Roma’nın tarihi merkezinde, Forum Romanum ve Palatino Tepesi’ne komşu konumdadır ve UNESCO Dünya Mirası kapsamındadır.',
    sources: [
      'UNESCO World Heritage List — Historic Centre of Rome',
      'Parco archeologico del Colosseo — resmi site',
    ],
  },
  {
    id: 'akropolis',
    name: 'Akropolis (Parthenon)',
    city: 'Atina',
    country: 'Yunanistan',
    lat: 37.9715,
    lng: 23.7257,
    aliases: ['akropolis', 'acropolis', 'parthenon', 'atina akropolisi', 'partenon'],
    summary:
      'Atina Akropolisi, şehrin üzerinde yükselen kayalık tepede kurulmuş kutsal bir yapılar topluluğudur; en görkemli anıtı, tanrıça Athena’ya adanan Parthenon Tapınağı’dır. MÖ 5. yüzyılda, Perikles döneminde Iktinos ve Kallikrates’in tasarımıyla inşa edilen tapınak, Klasik Yunan mimarisinin ve Dor düzeninin doruk örneği kabul edilir.\n\nErekhtheion, Athena Nike Tapınağı ve anıtsal giriş Propylaia ile birlikte Akropolis, Batı uygarlığının, demokrasinin ve felsefenin doğduğu Antik Atina’nın simgesidir. Alan, UNESCO Dünya Mirası Listesi’nin ilk kayıtlarından biridir.',
    sources: [
      'UNESCO World Heritage List — Acropolis, Athens',
      'Odysseus — Yunanistan Kültür Bakanlığı portalı',
    ],
  },
];

// Basit normalleştirme: küçük harf + Türkçe/aksan sadeleştirme + boşluk temizliği.
export function normalize(text) {
  return (text || '')
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Girdiyi (mekan ismi veya "mekan, şehir") yerel veri tabanıyla eşleştirir.
export function matchPlace(query) {
  const q = normalize(query);
  if (!q) return null;

  for (const place of PLACES) {
    const candidates = [place.name, place.city, ...(place.aliases || [])].map(normalize);
    for (const cand of candidates) {
      if (!cand) continue;
      // İki yönlü içerme: "ayasofya" ↔ "ayasofya istanbul" gibi durumları yakalar.
      if (q === cand || q.includes(cand) || cand.includes(q)) {
        return place;
      }
    }
    // Kelime bazlı eşleşme (ör. "efes antik" -> "efes").
    const qWords = q.split(' ');
    if (qWords.some((w) => w.length >= 4 && candidates.includes(w))) {
      return place;
    }
  }
  return null;
}

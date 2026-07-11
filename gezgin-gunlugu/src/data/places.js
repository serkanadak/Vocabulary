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

  // --- Balkanlar & Orta Avrupa rotası ---
  {
    id: 'filibe',
    name: 'Filibe',
    city: 'Plovdiv',
    country: 'Bulgaristan',
    lat: 42.1354,
    lng: 24.7453,
    aliases: ['filibe', 'plovdiv', 'philippopolis', 'filibe plovdiv'],
    summary:
      'Filibe (Plovdiv), Avrupa’nın kesintisiz yerleşilen en eski kentlerinden biridir; kökleri Trak yerleşimi Eumolpias’a, sekiz bin yıl öncesine uzanır. Makedon Kralı II. Filip’ten aldığı Philippopolis adıyla anıldı; Romalılar döneminde ise yamaca oyulmuş, bugün hâlâ konserlere ev sahipliği yapan görkemli antik tiyatrosuyla parladı. Yedi tepe üzerine kurulu kent, katman katman uygarlığı taşıyan bir açık hava müzesi gibidir.\n\nArnavut kaldırımlı Eski Şehir’i (Stariyat Grad), cumbalı ve renkli Bulgar Uyanış Dönemi konaklarıyla ünlüdür. 2019’da Avrupa Kültür Başkenti seçilen Filibe, antik Roma stadyumu, Osmanlı Cuma Camii ve canlı sanatçı mahallesi Kapana ile geçmişi ve bugünü iç içe yaşatır.',
    sources: [
      'Visit Plovdiv — Resmî kent turizm portalı',
      'Lonely Planet — Plovdiv',
    ],
  },
  {
    id: 'sofya',
    name: 'Sofya',
    city: 'Sofia',
    country: 'Bulgaristan',
    lat: 42.6977,
    lng: 23.3219,
    aliases: ['sofya', 'sofia', 'serdica', 'sredets'],
    summary:
      'Bulgaristan’ın başkenti Sofya, iki bin yılı aşan tarihiyle Balkanların en eski kentlerindendir; Roma döneminde Serdica adıyla önemli bir merkezdi ve İmparator Konstantin’in “Serdica benim Roma’mdır” dediği söylenir. Şehrin merkezindeki metro kazılarında ortaya çıkan Roma kalıntıları, modern kentin altındaki antik dokuyu gözler önüne serer. Kentin arması “Büyür ama yaşlanmaz” sözünü taşır.\n\nSofya’nın simgesi, altın kubbeleriyle görkemli Aleksandr Nevski Katedrali’dir. Yakınındaki UNESCO Dünya Mirası Boyana Kilisesi’nin freskleri, ortaçağ Bulgar resminin başyapıtı sayılır. Arka planda yükselen Vitoşa Dağı, şehre dört mevsim doğa ve kayak imkânı sunar.',
    sources: [
      'UNESCO World Heritage List — Boyana Church',
      'Lonely Planet — Sofia',
    ],
  },
  {
    id: 'nis',
    name: 'Niş',
    city: 'Niš',
    country: 'Sırbistan',
    lat: 43.3209,
    lng: 21.8958,
    aliases: ['nis', 'niš', 'naissus'],
    summary:
      'Niş, Balkanların en eski kentlerinden biridir ve Roma döneminde Naissus adıyla bilinirdi; Hristiyanlığı serbest bırakan Milano Fermanı’nın sahibi Büyük Konstantin’in doğduğu yer olmasıyla tarihe geçer. Konumu, yüzyıllar boyunca Orta Avrupa ile İstanbul’u bağlayan yol üzerinde stratejik bir kavşak olmasını sağladı.\n\nKentin Osmanlı yapımı kalesi (Niš Kalesi) bugün canlı bir park ve etkinlik alanıdır. 1809’daki Sırp ayaklanmasının ardından yapılan ürpertici Kafatası Kulesi (Ćele Kula) ve Roma imparatorluk villası Mediana, Niş’in acı ve ihtişamla örülü tarihini anlatır.',
    sources: [
      'Sırbistan Ulusal Turizm Örgütü (Serbia.travel) — Niš',
      'Lonely Planet — Niš',
    ],
  },
  {
    id: 'belgrad',
    name: 'Belgrad',
    city: 'Beograd',
    country: 'Sırbistan',
    lat: 44.7866,
    lng: 20.4489,
    aliases: ['belgrad', 'beograd', 'belgrade', 'singidunum'],
    summary:
      'Sırbistan’ın başkenti Belgrad, adını “Beyaz Şehir” anlamına gelen Beograd’dan alır ve Sava ile Tuna nehirlerinin buluştuğu noktada yükselir. Kelt Singidunum’undan Roma’ya, Bizans’tan Osmanlı ve Avusturya-Macaristan’a kadar sayısız uygarlığın el değiştirdiği kent, tam kırk kez yıkılıp yeniden kurulduğu söylenen bir hayatta kalma öyküsüdür.\n\nİki nehre hâkim Kalemegdan Kalesi, kentin tarihî kalbi ve en sevilen buluşma yeridir. Bohem Skadarlija sokağı, nehir üzerindeki yüzer kulüpleriyle (splav) Belgrad, Balkanların en enerjik gece hayatına da ev sahipliği yapar.',
    sources: [
      'Sırbistan Ulusal Turizm Örgütü (Serbia.travel) — Belgrad',
      'Lonely Planet — Belgrade',
    ],
  },
  {
    id: 'budapeste',
    name: 'Budapeşte',
    city: 'Budapest',
    country: 'Macaristan',
    lat: 47.4979,
    lng: 19.0402,
    aliases: ['budapeste', 'budapeşte', 'budapest', 'buda', 'peşte', 'peste'],
    summary:
      'Macaristan’ın başkenti Budapeşte, 1873’te Tuna’nın iki yakasındaki Buda ile Peşte’nin birleşmesiyle doğdu ve “Tuna’nın İncisi” olarak anılır. Nehir kıyısındaki panoraması, Buda Kalesi ve Andrássy Bulvarı UNESCO Dünya Mirası Listesi’ndedir. Tepedeki Balıkçı Tabyası ve Matyas Kilisesi’nden bakıldığında, karşı yakadaki neo-gotik Parlamento binası masalsı bir görüntü sunar.\n\nZincir Köprü iki yakayı zarifçe birbirine bağlar. Yüzlerce yıllık termal kaynakları üzerine kurulu Széchenyi ve Gellért kaplıcaları, kenti dünyanın en ünlü “kaplıca başkenti” yapar. Kahvehaneleri, ruin barları ve zengin müzik geleneğiyle Budapeşte, ihtişamı ve keyfi bir arada sunar.',
    sources: [
      'UNESCO World Heritage List — Budapest, the Banks of the Danube',
      'Lonely Planet — Budapest',
    ],
  },
  {
    id: 'viyana',
    name: 'Viyana',
    city: 'Wien',
    country: 'Avusturya',
    lat: 48.2082,
    lng: 16.3738,
    aliases: ['viyana', 'wien', 'vienna', 'vindobona'],
    summary:
      'Avusturya’nın başkenti Viyana, yüzyıllarca Habsburg İmparatorluğu’nun görkemli merkezi oldu ve tarihî çekirdeği UNESCO Dünya Mirası Listesi’ndedir. Barok Schönbrunn ve Belvedere sarayları, gotik Aziz Stephan Katedrali ve Ringstrasse boyunca sıralanan anıtsal yapılar, imparatorluk ihtişamını bugüne taşır.\n\nViyana aynı zamanda “müziğin başkenti”dir: Mozart, Beethoven, Schubert ve Strauss bu şehirde yaşadı, besteledi. Yeni Yıl Konseri, opera baloları ve köşe başındaki geleneksel kahvehaneleriyle kent, klasik zarafeti günlük yaşamın içine yerleştirir.',
    sources: [
      'UNESCO World Heritage List — Historic Centre of Vienna',
      'Wien.info — Viyana resmî turizm portalı',
    ],
  },
  {
    id: 'hallstatt',
    name: 'Hallstatt',
    city: 'Salzkammergut',
    country: 'Avusturya',
    lat: 47.5622,
    lng: 13.6493,
    aliases: ['hallstatt', 'hallstatt gölü', 'hallstatter see'],
    summary:
      'Hallstatt, Avusturya Alpleri’nde bir gölün kıyısı ile dik dağlar arasına sıkışmış, dünyanın en çok fotoğraflanan köylerinden biridir. Ahşap evlerinin gölde yansıması, kartpostal güzelliğinde bir manzara sunar. Köyün bulunduğu Hallstatt-Dachstein / Salzkammergut kültürel peyzajı UNESCO Dünya Mirası Listesi’ndedir.\n\nBölgenin asıl zenginliği tuzdur: yaklaşık yedi bin yıldır işletilen dünyanın en eski tuz madeni buradadır. Demir Çağı’nın bir evresi (“Hallstatt kültürü”) adını bu yerden alır. Dağ eteğindeki panoramik teras ve tuz madeni turu, köyün derin tarihini gözler önüne serer.',
    sources: [
      'UNESCO World Heritage List — Hallstatt-Dachstein/Salzkammergut Cultural Landscape',
      'Hallstatt.net — Resmî bölge turizm portalı',
    ],
  },
  {
    id: 'salzburg',
    name: 'Salzburg',
    city: 'Salzburg',
    country: 'Avusturya',
    lat: 47.8095,
    lng: 13.0550,
    aliases: ['salzburg', 'mozart şehri'],
    summary:
      'Salzburg, Alplerin eteğinde, barok mimarisiyle bütünlük taşıyan tarihî merkeziyle UNESCO Dünya Mirası Listesi’nde yer alır. Adı “tuz kalesi” anlamına gelir ve kentin zenginliği yüzyıllarca tuz ticaretinden geldi. Tepede yükselen Hohensalzburg Kalesi, Orta Avrupa’nın en iyi korunmuş ortaçağ kalelerinden biridir.\n\nSalzburg, Wolfgang Amadeus Mozart’ın doğduğu şehir olmasıyla dünya çapında ünlüdür; her yıl düzenlenen Salzburg Festivali klasik müzik takviminin zirvelerindendir. Mirabell Bahçeleri ve dar barok sokakları, aynı zamanda “Bir Aşk Uğruna” (The Sound of Music) filminin de sahnesi olmuştur.',
    sources: [
      'UNESCO World Heritage List — Historic Centre of the City of Salzburg',
      'Salzburg.info — Resmî kent turizm portalı',
    ],
  },
  {
    id: 'graz',
    name: 'Graz',
    city: 'Steiermark',
    country: 'Avusturya',
    lat: 47.0707,
    lng: 15.4395,
    aliases: ['graz', 'steiermark', 'styria'],
    summary:
      'Avusturya’nın ikinci büyük kenti Graz, kırmızı kiremitli çatıları ve iyi korunmuş Rönesans-barok dokusuyla dikkat çeker; tarihî merkezi ve Eggenberg Sarayı UNESCO Dünya Mirası Listesi’ndedir. Kentin ortasındaki Schlossberg tepesi ve simgesi olan Saat Kulesi (Uhrturm), şehre panoramik bir bakış sunar.\n\nCanlı bir üniversite kenti olan Graz, geçmişin zarafetini çağdaş tasarımla harmanlar; nehir üzerindeki yapay ada Murinsel ve fütüristik çağdaş sanat müzesi Kunsthaus (“dost canlısı uzaylı” lakaplı) bunun en çarpıcı örnekleridir. 2003’te Avrupa Kültür Başkenti seçilmiştir.',
    sources: [
      'UNESCO World Heritage List — City of Graz – Historic Centre and Schloss Eggenberg',
      'Graz Tourismus — Resmî kent turizm portalı',
    ],
  },
  {
    id: 'bratislava',
    name: 'Bratislava',
    city: 'Bratislava',
    country: 'Slovakya',
    lat: 48.1486,
    lng: 17.1077,
    aliases: ['bratislava', 'pressburg', 'pozsony'],
    summary:
      'Slovakya’nın başkenti Bratislava, Tuna kıyısında, Avusturya ve Macaristan sınırlarının hemen yanında yükselen kompakt ve keyifli bir kenttir. Nehre ve şehre hâkim tepedeki dört köşe kulesiyle Bratislava Kalesi, kentin simgesidir. Bir zamanlar Macar krallarının taç giydiği Aziz Martin Katedrali de buradadır.\n\nBarok sarayları, dar Arnavut kaldırımlı sokakları ve neşeli meydanlarıyla Eski Şehir, gezmesi kolay ve samimi bir atmosfer sunar. Köşe başlarındaki bronz heykeller (özellikle rögardan başını uzatan “Čumil”) kente eğlenceli bir dokunuş katar. Viyana’ya yalnızca bir saat uzaklıktadır.',
    sources: [
      'Visit Bratislava — Resmî kent turizm portalı',
      'Lonely Planet — Bratislava',
    ],
  },
  {
    id: 'saraybosna',
    name: 'Saraybosna',
    city: 'Sarajevo',
    country: 'Bosna-Hersek',
    lat: 43.8563,
    lng: 18.4131,
    aliases: ['saraybosna', 'sarajevo', 'baščaršija', 'bascarsija'],
    summary:
      'Bosna-Hersek’in başkenti Saraybosna, cami, kilise, katedral ve sinagogun yürüme mesafesinde bir arada bulunduğu kültürel çeşitliliğiyle “Avrupa’nın Kudüs’ü” olarak anılır. Osmanlı’nın kurduğu Başçarşı (Baščaršija), bakır ustaları, çeşmeleri ve Gazi Hüsrev Bey Camii ile kentin tarihî kalbidir. Bir sokak, âdeta doğu ile batının buluştuğu çizgi gibi Osmanlı çarşısından Avusturya-Macaristan cephelerine geçiverir.\n\nLatin Köprüsü, 1914’te Arşidük Franz Ferdinand’a düzenlenen ve I. Dünya Savaşı’nı ateşleyen suikastin yeridir. 1984 Kış Olimpiyatları’na ev sahipliği yapan kent, 1990’ların uzun kuşatmasının izlerini “Saraybosna gülleri” denen anıtlarla hâlâ taşır; yine de dayanıklılığın ve bir arada yaşamanın simgesi olmayı sürdürür.',
    sources: [
      'Sarajevo Navigator — Resmî kent turizm portalı',
      'Lonely Planet — Sarajevo',
    ],
  },
  {
    id: 'mostar',
    name: 'Mostar',
    city: 'Hersek',
    country: 'Bosna-Hersek',
    lat: 43.3438,
    lng: 17.8078,
    aliases: ['mostar', 'stari most', 'mostar köprüsü'],
    summary:
      'Mostar, adını Neretva Nehri üzerindeki eşsiz taş köprüsünü bekleyen köprü muhafızlarından (mostari) alır. Osmanlı mimarı Mimar Hayruddin’in 1566’da tamamladığı Stari Most (Eski Köprü), tek kemerli zarif kavisiyle yüzyıllarca kentin simgesi oldu. 1993’te savaşta yıkılan köprü, 2004’te aslına uygun biçimde yeniden inşa edildi ve UNESCO Dünya Mirası Listesi’ne girdi.\n\nCesur dalgıçların köprüden yeşil Neretva sularına atladığı manzara, Mostar’ın en ünlü geleneğidir. Arnavut kaldırımlı çarşısı, camileri ve bakır işleriyle Eski Şehir, farklı kültürlerin yüzyıllarca yan yana yaşadığı bir buluşma noktasıdır.',
    sources: [
      'UNESCO World Heritage List — Old Bridge Area of the Old City of Mostar',
      'Lonely Planet — Mostar',
    ],
  },
  {
    id: 'uskup',
    name: 'Üsküp',
    city: 'Skopje',
    country: 'Kuzey Makedonya',
    lat: 41.9981,
    lng: 21.4254,
    aliases: ['uskup', 'üsküp', 'skopje', 'skopye'],
    summary:
      'Kuzey Makedonya’nın başkenti Üsküp, Vardar Nehri’nin iki yakasına yayılır ve Balkanların en büyük Osmanlı çarşılarından birine ev sahipliği yapar. 15. yüzyıldan kalma Taş Köprü, eski çarşı ile modern meydanı birbirine bağlar; tepedeki Kale (Kale Fortress) kente hâkimdir. Kentin dar sokaklarındaki camiler, hanlar ve hamamlar, yüzyıllık ticaret geleneğini yaşatır.\n\nÜsküp, Rahibe Teresa’nın doğduğu şehir olmasıyla da anılır. Son yıllarda meydanlara dikilen çok sayıda anıt ve neoklasik cephe (“Skopje 2014” projesi) kente tartışmalı ama çarpıcı bir görünüm kazandırmıştır. Eski ile yeninin keskin karşıtlığı, Üsküp’ü Balkanların en özgün başkentlerinden biri yapar.',
    sources: [
      'Kuzey Makedonya Ulusal Turizm Portalı (Macedonia-Timeless)',
      'Lonely Planet — Skopje',
    ],
  },
  {
    id: 'ohrid',
    name: 'Ohrid',
    city: 'Ohrid',
    country: 'Kuzey Makedonya',
    lat: 41.1231,
    lng: 20.8016,
    aliases: ['ohrid', 'ohri', 'ohrid gölü', 'lake ohrid', 'kaneo'],
    summary:
      'Ohrid, Avrupa’nın en eski ve en derin göllerinden biri olan, üç milyon yılı aşkın yaşıyla âdeta canlı bir fosil sayılan Ohrid Gölü’nün kıyısında kuruludur. Hem doğal hem kültürel değerleriyle UNESCO Dünya Mirası Listesi’nde yer alan ender karma alanlardandır. Gölün üzerindeki kayalığa tüneyen Sveti Jovan Kaneo Kilisesi, Balkanların en ikonik manzaralarından biridir.\n\nBir zamanlar 365 kilisesiyle “Balkanların Kudüs’ü” olarak anılan Ohrid, Slav yazısının ve Ortodoks kültürünün önemli bir beşiğiydi. Kentin tepesindeki Çar Samuil Kalesi, antik tiyatrosu ve arnavut kaldırımlı eski mahalleleri, göl kıyısı huzuruyla birleşir.',
    sources: [
      'UNESCO World Heritage List — Natural and Cultural Heritage of the Ohrid region',
      'Lonely Planet — Ohrid',
    ],
  },
  {
    id: 'prizren',
    name: 'Prizren',
    city: 'Prizren',
    country: 'Kosova',
    lat: 42.2139,
    lng: 20.7397,
    aliases: ['prizren', 'prizen'],
    summary:
      'Prizren, Kosova’nın kültür ve tarih başkenti kabul edilir; Osmanlı dokusunu en iyi koruyan Balkan kentlerinden biridir. Bistrica Deresi’nin böldüğü kent, taş köprüsü, arnavut kaldırımlı sokakları ve zarif Sinan Paşa Camii ile bir açık hava müzesini andırır. Tepedeki Prizren Kalesi (Kaljaja), çatıların ve minarelerin üzerinden geniş bir panorama sunar.\n\nKent, 1878’de Arnavut ulusal uyanışının simgesi olan Prizren Birliği’nin kurulduğu yer olmasıyla da tarihe geçer. Camileri, kiliseleri ve tekkeleriyle çok katmanlı bir miras taşıyan Prizren, her yaz düzenlenen DokuFest belgesel film festivaliyle de tanınır.',
    sources: [
      'Kosova Turizm — Resmî tanıtım portalı',
      'Lonely Planet — Prizren',
    ],
  },
  {
    id: 'dubrovnik',
    name: 'Dubrovnik',
    city: 'Dalmaçya',
    country: 'Hırvatistan',
    lat: 42.6407,
    lng: 18.1077,
    aliases: ['dubrovnik', 'ragusa', 'dubrovnik surları'],
    summary:
      'Adriyatik’in İncisi olarak anılan Dubrovnik, denize bakan sarp kıyıda, neredeyse eksiksiz korunmuş ortaçağ surlarıyla çevrili görkemli bir kenttir; tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir. Bir zamanlar bağımsız ve zengin bir deniz cumhuriyeti (Ragusa) olan şehir, Venedik’e rakip bir ticaret gücüydü ve diplomasideki inceliğiyle ün yaptı.\n\nCilalı taş ana caddesi Stradun, barok kiliseleri ve iki kilometreyi aşan sur yürüyüşü, ziyaretçileri geçmişe götürür. Surların üzerinden bakıldığında turuncu çatılar ile masmavi deniz kusursuz bir kompozisyon oluşturur; kent, “Taht Oyunları”nda King’s Landing olarak da dünyaca tanınmıştır.',
    sources: [
      'UNESCO World Heritage List — Old City of Dubrovnik',
      'Hırvatistan Turizm Kurumu (Croatia.hr) — Dubrovnik',
    ],
  },
  {
    id: 'zadar',
    name: 'Zadar',
    city: 'Dalmaçya',
    country: 'Hırvatistan',
    lat: 44.1194,
    lng: 15.2314,
    aliases: ['zadar', 'iadera', 'deniz orgu', 'sea organ'],
    summary:
      'Zadar, üç bin yıllık geçmişiyle Dalmaçya kıyısının en eski kentlerindendir; Roma dönemi forumu, dairesel Aziz Donatus Kilisesi ve antik sütunları, modern kent dokusunun içine serpiştirilmiştir. Yarımada üzerindeki eski şehir, tarih ile deniz arasında zarif bir denge kurar.\n\nKentin en özgün iki eseri çağdaştır: Nikola Bašić’in tasarladığı Deniz Orgu, dalgaların basıncıyla mermer basamaklardan doğaçlama melodiler üretir; hemen yanındaki “Güneşe Selam” ise gün boyu depoladığı güneş enerjisiyle geceleri ışık gösterisine dönüşür. Alfred Hitchcock’un “dünyanın en güzel gün batımı” dediği manzara da buradan izlenir.',
    sources: [
      'Hırvatistan Turizm Kurumu (Croatia.hr) — Zadar',
      'Lonely Planet — Zadar',
    ],
  },
  {
    id: 'zagreb',
    name: 'Zagreb',
    city: 'Zagreb',
    country: 'Hırvatistan',
    lat: 45.8150,
    lng: 15.9819,
    aliases: ['zagreb', 'agram'],
    summary:
      'Hırvatistan’ın başkenti Zagreb, ortaçağ dokusunu koruyan tepedeki Yukarı Şehir (Gornji Grad) ile 19. yüzyıl Avusturya-Macaristan mimarisinin egemen olduğu Aşağı Şehir’in buluştuğu bir kenttir. Yukarı Şehir’deki Aziz Mark Kilisesi, rengârenk çinili çatısındaki armalarla şehrin en tanınmış imgelerinden biridir; Lotrščak Kulesi’nden her öğlen atılan top sesi asırlık bir gelenektir.\n\nBan Jelačić Meydanı kentin canlı kalbidir; çevresindeki kafeler, çarşılar ve müzeler (aralarında özgün “Kopmuş İlişkiler Müzesi”) Zagreb’e rahat ve kültürlü bir hava katar. Funiküleriyle, yeşil parkları ve kahve keyfiyle şehir, gösterişten çok samimiyetiyle öne çıkar.',
    sources: [
      'Hırvatistan Turizm Kurumu (Croatia.hr) — Zagreb',
      'Lonely Planet — Zagreb',
    ],
  },
  {
    id: 'prag',
    name: 'Prag',
    city: 'Praha',
    country: 'Çekya',
    lat: 50.0755,
    lng: 14.4378,
    aliases: ['prag', 'praha', 'prague', 'prag kalesi', 'charles köprüsü'],
    summary:
      '“Yüz Kuleli Şehir” olarak anılan Prag, Çekya’nın başkentidir ve tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir. Vltava Nehri üzerindeki heykellerle bezeli Charles Köprüsü, dünyanın en büyük antik kale kompleksi sayılan Prag Kalesi’ni Eski Şehir’e bağlar. Gotik, barok ve rönesans yapılar iç içe geçerek masalsı bir siluet oluşturur.\n\nEski Şehir Meydanı’ndaki 15. yüzyıldan kalma Astronomik Saat (Orloj), her saat başı figürlü gösterisiyle kalabalıkları toplar. Franz Kafka’nın izlerini taşıyan dar sokakları, bira kültürü ve konser salonlarıyla Prag, Orta Avrupa’nın en romantik başkentlerinden biridir.',
    sources: [
      'UNESCO World Heritage List — Historic Centre of Prague',
      'Prague City Tourism (Prague.eu) — Resmî portal',
    ],
  },
  {
    id: 'budva',
    name: 'Budva',
    city: 'Budva Rivierası',
    country: 'Karadağ',
    lat: 42.2911,
    lng: 18.8401,
    aliases: ['budva', 'budua'],
    summary:
      'Budva, Adriyatik kıyısındaki iki bin beş yüz yılı aşkın geçmişiyle Karadağ’ın en eski yerleşimlerindendir. Venedik döneminden kalma surlarla çevrili Eski Şehir (Stari Grad), dar taş sokakları, meydanları ve deniz kenarındaki kalesiyle küçük ama etkileyici bir labirenttir. Kıvrımlı sahil şeridi ve canlı gece hayatı, kente “Karadağ’ın Miami’si” lakabını kazandırmıştır.\n\nBudva Rivierası, ince çakıllı koyları ve turkuaz sularıyla ünlüdür. Yakınındaki, bir zamanlar balıkçı köyü olup lüks bir otele dönüşen Sveti Stefan adacığı, bölgenin en ikonik manzarasını sunar.',
    sources: [
      'Karadağ Ulusal Turizm Örgütü (Montenegro.travel) — Budva',
      'Lonely Planet — Budva',
    ],
  },
  {
    id: 'kotor',
    name: 'Kotor',
    city: 'Kotor Körfezi',
    country: 'Karadağ',
    lat: 42.4247,
    lng: 18.7712,
    aliases: ['kotor', 'cattaro', 'kotor körfezi', 'boka kotorska'],
    summary:
      'Kotor, sarp dağların denize dik indiği, âdeta bir fiyort görünümündeki Boka Kotorska (Kotor Körfezi) kıyısında saklıdır; körfez ve tarihî kent birlikte UNESCO Dünya Mirası Listesi’nde yer alır. Venedik izleri taşıyan surlarla çevrili Eski Şehir, meydanları, kiliseleri ve romanesk Aziz Trifon Katedrali ile ortaçağ atmosferini korur.\n\nKentin en unutulmaz deneyimi, dağ yamacına tırmanan surlar boyunca yaklaşık 1.350 basamak çıkarak Aziz İoannes (San Giovanni) Kalesi’ne ulaşmaktır; zirveden körfezin ve kırmızı çatıların panoraması nefes kesicidir. Kotor, Adriyatik’in en dramatik doğal ve tarihî manzaralarından birini sunar.',
    sources: [
      'UNESCO World Heritage List — Natural and Culturo-Historical Region of Kotor',
      'Karadağ Ulusal Turizm Örgütü (Montenegro.travel) — Kotor',
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

// Bir yerin tüm eşleştirme adaylarını (ad, şehir, takma adlar) normalize edip döndürür.
function candidatesOf(place) {
  return [place.name, place.city, ...(place.aliases || [])].map(normalize).filter(Boolean);
}

// Girdiyi (mekan ismi veya "mekan, şehir") yerel veri tabanıyla eşleştirir.
// Öncelik: (1) tam eşleşme, (2) sorguda bütün kelime olarak geçen ad — en uzun ad
// kazanır. Böylece "Sofya", "Ayasofya"nın alt dizesi olsa da yanlış eşleşmez.
export function matchPlace(query) {
  const q = normalize(query);
  if (!q) return null;

  // 1) Tam eşleşme
  for (const place of PLACES) {
    if (candidatesOf(place).some((c) => c === q)) return place;
  }

  // 2) Sorgu, bilinen bir adı bütün kelime(ler) olarak içeriyor mu?
  //    (ör. "efes antik kenti" -> "efes", "kotor körfezi gezisi" -> "kotor körfezi")
  //    Kısa bir alt dizenin yanlış eşleşmemesi için en uzun aday kazanır.
  const padded = ` ${q} `;
  let best = null;
  let bestLen = 0;
  for (const place of PLACES) {
    for (const c of candidatesOf(place)) {
      if (c.length >= 3 && padded.includes(` ${c} `) && c.length > bestLen) {
        best = place;
        bestLen = c.length;
      }
    }
  }
  return best;
}

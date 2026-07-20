// Yerel (çevrimdışı) tarihi & kültürel yerler veri tabanı.
// Kullanıcı bir konum/mekan ismi girdiğinde ya da fotoğraf eklerken burada eşleşme aranır.
// Eşleşme bulunursa hazır tarihi/kültürel özet ve kaynakça kullanılır; bulunmazsa
// (Ayarlar'dan canlı AI açık değilse) boş şablon üretilir.

export const PLACES = [
  // ===================== TÜRKİYE — ŞEHİRLER =====================
  {
    id: 'istanbul',
    name: 'İstanbul',
    city: 'İstanbul',
    country: 'Türkiye',
    lat: 41.0082,
    lng: 28.9784,
    aliases: ['istanbul', 'constantinople', 'konstantinopolis', 'byzantion', 'stambul'],
    summary:
      'İki kıtayı birbirine bağlayan İstanbul, Roma, Bizans ve Osmanlı imparatorluklarına başkentlik yapmış; tarih boyunca dünyanın en stratejik ve görkemli şehirlerinden biri olmuştur. Boğaz’ın iki yakasına yayılan kent; Ayasofya, Sultanahmet ve Topkapı gibi anıtlarıyla farklı medeniyetlerin izlerini aynı silüette taşır.\n\nKapalıçarşı’nın labirent sokaklarından Galata’nın dar yokuşlarına, Boğaz vapurlarından tarihî yarımadanın minarelerine kadar İstanbul, geçmiş ile bugünü kesintisiz bir enerjiyle harmanlar. Tarihi Yarımada UNESCO Dünya Mirası Listesi’ndedir.',
    sources: [
      'UNESCO World Heritage List — Historic Areas of Istanbul',
      'T.C. Kültür ve Turizm Bakanlığı — İstanbul',
    ],
  },
  {
    id: 'edirne',
    name: 'Edirne',
    city: 'Edirne',
    country: 'Türkiye',
    lat: 41.6771,
    lng: 26.5557,
    aliases: ['edirne', 'adrianople', 'hadrianopolis'],
    summary:
      'Bir zamanlar Osmanlı’nın başkenti olan Edirne, Bulgaristan ve Yunanistan sınırının hemen yanında, ülkenin Avrupa’ya açılan kapısıdır. Kentin tacı, Mimar Sinan’ın “ustalık eserim” dediği ve UNESCO Dünya Mirası Listesi’nde yer alan Selimiye Camii’dir.\n\nEski Cami, Üç Şerefeli Cami, tarihî bedestenler ve Meriç Nehri üzerindeki zarif Osmanlı köprüleriyle Edirne bir açık hava müzesidir. Her yıl düzenlenen Kırkpınar Yağlı Güreşleri de kente özgü asırlık bir gelenektir.',
    sources: [
      'UNESCO World Heritage List — Selimiye Mosque and its Social Complex',
      'T.C. Kültür ve Turizm Bakanlığı — Edirne',
    ],
  },
  {
    id: 'izmir',
    name: 'İzmir',
    city: 'İzmir',
    country: 'Türkiye',
    lat: 38.4237,
    lng: 27.1428,
    aliases: ['izmir', 'smyrna', 'smirna'],
    summary:
      'Ege’nin incisi İzmir, üç bin yılı aşan geçmişiyle antik Smyrna’dan bugüne uzanan bir liman kentidir. Körfez boyunca uzanan Kordon, Saat Kulesi’nin bulunduğu Konak Meydanı ve tarihî Kemeraltı Çarşısı kentin canlı kalbini oluşturur.\n\nAkdeniz esintili, özgür ruhlu atmosferiyle İzmir; Efes, Bergama ve Çeşme gibi hazinelere de kapı açar. Agora, Kadifekale ve tarihî asansörü, kentin katmanlı geçmişini bugüne taşır.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — İzmir',
      'Lonely Planet — İzmir',
    ],
  },
  {
    id: 'bursa',
    name: 'Bursa',
    city: 'Bursa',
    country: 'Türkiye',
    lat: 40.1885,
    lng: 29.061,
    aliases: ['bursa', 'prusa'],
    summary:
      'Osmanlı Devleti’nin ilk başkenti Bursa, “Yeşil Bursa” lakabıyla anılan, Uludağ’ın eteğine kurulu tarihî bir kenttir. Ulu Cami, Yeşil Cami ve Yeşil Türbe, erken Osmanlı mimarisinin en zarif örneklerindendir.\n\nİpek ticaretinin merkezi Koza Han, kaplıcaları ve UNESCO Dünya Mirası Listesi’ndeki Cumalıkızık köyüyle Bursa, tarihi ve doğayı bir arada sunar. Kış aylarında Uludağ önemli bir kayak merkezidir.',
    sources: [
      'UNESCO World Heritage List — Bursa and Cumalıkızık',
      'T.C. Kültür ve Turizm Bakanlığı — Bursa',
    ],
  },
  {
    id: 'canakkale',
    name: 'Çanakkale',
    city: 'Çanakkale',
    country: 'Türkiye',
    lat: 40.1553,
    lng: 26.4142,
    aliases: ['canakkale', 'çanakkale', 'dardanelles', 'gelibolu', 'gallipoli'],
    summary:
      'Çanakkale, Boğaz’ın iki yakasında Asya ile Avrupa’yı buluşturan, tarih ve mitolojiyle yüklü bir kenttir. Efsanevi Truva antik kenti (UNESCO) ile I. Dünya Savaşı’nın kader anlarına sahne olan Gelibolu Yarımadası buradadır.\n\nŞehitlikler, anıtlar ve Anzak Koyu her yıl binlerce ziyaretçiyi ağırlar. Çimenlik Kalesi, kordon boyu ve karşı kıyıdaki Truva Atı replikasıyla Çanakkale, geçmişin ağırlığını huzurlu bir deniz kentiyle birleştirir.',
    sources: [
      'UNESCO World Heritage List — Archaeological Site of Troy',
      'T.C. Kültür ve Turizm Bakanlığı — Çanakkale (Tarihi Alan Başkanlığı)',
    ],
  },
  {
    id: 'antalya',
    name: 'Antalya',
    city: 'Antalya',
    country: 'Türkiye',
    lat: 36.8969,
    lng: 30.7133,
    aliases: ['antalya', 'attaleia'],
    summary:
      'Akdeniz kıyısının turizm başkenti Antalya, antik Attaleia’dan bugüne uzanan tarihi ve turkuaz sahilleriyle ünlüdür. Surlarla çevrili tarihî Kaleiçi, dar sokakları, Osmanlı konakları ve Roma dönemi Hadrian Kapısı ile bir açık hava müzesini andırır.\n\nKent merkezindeki Düden Şelalesi, zengin Antalya Müzesi ve çevredeki Aspendos, Perge, Side gibi antik kentlerle bölge, tarih ve tatili bir arada sunar. Toroslar ile deniz arasındaki konumu eşsiz manzaralar yaratır.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — Antalya',
      'Lonely Planet — Antalya',
    ],
  },
  {
    id: 'ankara',
    name: 'Ankara',
    city: 'Ankara',
    country: 'Türkiye',
    lat: 39.9334,
    lng: 32.8597,
    aliases: ['ankara', 'angora', 'ankyra'],
    summary:
      'Türkiye Cumhuriyeti’nin başkenti Ankara, Hitit’ten Frig’e, Roma’dan Osmanlı’ya uzanan köklü bir geçmişe sahiptir. Cumhuriyet’in kurucusu Atatürk’ün anıtmezarı Anıtkabir, kentin en önemli simgesi ve ulusal bir buluşma noktasıdır.\n\nTepedeki Ankara Kalesi, dünyaca ünlü Anadolu Medeniyetleri Müzesi ve Roma dönemi kalıntılarıyla başkent, idari kimliğinin yanında derin bir tarih de barındırır.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — Ankara',
      'Anadolu Medeniyetleri Müzesi — resmi portal',
    ],
  },
  {
    id: 'konya',
    name: 'Konya',
    city: 'Konya',
    country: 'Türkiye',
    lat: 37.8746,
    lng: 32.4932,
    aliases: ['konya', 'iconium', 'ikonyum'],
    summary:
      'Selçuklu Devleti’ne başkentlik yapan Konya, Mevlânâ Celâleddîn-i Rûmî’nin şehri olarak dünyaca tanınır. Yeşil kubbeli Mevlânâ Müzesi ve türbesi, her yıl milyonlarca ziyaretçiyi ağırlar; Şeb-i Arûs törenleri ve sema, kentin manevi kimliğini yaşatır.\n\nAlâeddin Camii, İnce Minareli Medrese gibi Selçuklu eserleri ve insanlık tarihinin en eski yerleşimlerinden Çatalhöyük (UNESCO) ile Konya, maneviyat ve tarihin buluştuğu bir merkezdir.',
    sources: [
      'UNESCO World Heritage List — Çatalhöyük Neolithic Site',
      'T.C. Kültür ve Turizm Bakanlığı — Konya',
    ],
  },
  {
    id: 'trabzon',
    name: 'Trabzon',
    city: 'Trabzon',
    country: 'Türkiye',
    lat: 41.0027,
    lng: 39.7168,
    aliases: ['trabzon', 'trebizond', 'trapezus'],
    summary:
      'Karadeniz kıyısının en önemli tarihî kenti Trabzon, bir zamanlar İpek Yolu’nun batı ucundaki zengin bir liman ve Trabzon Rum İmparatorluğu’nun başkentiydi. Kentin simgesi, sarp bir kaya yüzeyine tutunan Sümela Manastırı’dır.\n\nFreskli Ayasofya Müzesi, Atatürk Köşkü ve çevredeki Uzungöl gibi doğa harikalarıyla Trabzon, tarih ile yemyeşil dağların iç içe geçtiği eşsiz bir bölgedir.',
    sources: [
      'T.C. Kültür ve Turizm Bakanlığı — Trabzon (Sümela)',
      'Lonely Planet — Trabzon',
    ],
  },
  {
    id: 'gaziantep',
    name: 'Gaziantep',
    city: 'Gaziantep',
    country: 'Türkiye',
    lat: 37.0662,
    lng: 37.3833,
    aliases: ['gaziantep', 'antep', 'ayintab'],
    summary:
      'Güneydoğu’nun köklü kenti Gaziantep, binlerce yıllık geçmişi ve dünyaca ünlü mutfağıyla bir UNESCO Gastronomi Şehri’dir. Dünyanın en büyük mozaik koleksiyonlarından birini barındıran Zeugma Mozaik Müzesi, kentin en görkemli hazinesidir.\n\nTarihî Gaziantep Kalesi, bakırcılar çarşısı, tarihî hanları ve baklavasıyla ünlü mutfak kültürüyle Antep, tarih ve lezzeti bir arada sunar.',
    sources: [
      'Zeugma Mozaik Müzesi — resmi portal',
      'T.C. Kültür ve Turizm Bakanlığı — Gaziantep',
    ],
  },

  // ============= TÜRKİYE — DİĞER İLLER =============
  { id: 'adana', name: 'Adana', city: 'Adana', country: 'Türkiye', lat: 37.0, lng: 35.3213, aliases: ['adana'], summary: 'Çukurova’nın sıcak ve bereketli kenti Adana; tarihî Taşköprü, dev Sabancı Merkez Camii ve dünyaca ünlü Adana kebabı ile lezzet ve tarihi birleştirir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Adana', 'Lonely Planet — Adana'] },
  { id: 'mersin', name: 'Mersin', city: 'Mersin', country: 'Türkiye', lat: 36.8121, lng: 34.6415, aliases: ['mersin', 'icel', 'içel'], summary: 'Akdeniz kıyısındaki Mersin; uzun sahilleri, antik Soli-Pompeiopolis kalıntıları, Cennet-Cehennem obrukları ve Kızkalesi ile deniz ve tarihi buluşturur.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Mersin', 'Lonely Planet — Mersin'] },
  { id: 'hatay', name: 'Hatay (Antakya)', city: 'Antakya', country: 'Türkiye', lat: 36.2025, lng: 36.1606, aliases: ['hatay', 'antakya', 'antioch', 'antakia'], summary: 'Medeniyetler mozaiği Hatay; dünyanın en zengin mozaik koleksiyonlarından Hatay Arkeoloji Müzesi, ilk mağara kiliselerinden St. Pierre ve eşsiz mutfağıyla ünlüdür.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Hatay', 'Lonely Planet — Antakya'] },
  { id: 'kahramanmaras', name: 'Kahramanmaraş', city: 'Kahramanmaraş', country: 'Türkiye', lat: 37.5858, lng: 36.9371, aliases: ['kahramanmaras', 'kahramanmaraş', 'maras', 'maraş'], summary: 'Dövme dondurması ve acılı mutfağıyla ünlü Kahramanmaraş; tarihî kalesi ve bakırcılar çarşısıyla Güneydoğu’nun köklü kentlerindendir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kahramanmaraş'] },
  { id: 'osmaniye', name: 'Osmaniye', city: 'Osmaniye', country: 'Türkiye', lat: 37.0682, lng: 36.2616, aliases: ['osmaniye'], summary: 'Çukurova ile Amanos Dağları arasındaki Osmaniye; görkemli Hitit sonrası Karatepe-Aslantaş açık hava müzesi ve Kastabala antik kentiyle tanınır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Osmaniye'] },
  { id: 'kilis', name: 'Kilis', city: 'Kilis', country: 'Türkiye', lat: 36.7184, lng: 37.1212, aliases: ['kilis'], summary: 'Suriye sınırındaki küçük ve tarihî Kilis; Osmanlı camileri, tarihî hanları ve zeytinyağıyla bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kilis'] },
  { id: 'isparta', name: 'Isparta', city: 'Isparta', country: 'Türkiye', lat: 37.7648, lng: 30.5566, aliases: ['isparta'], summary: 'Göller Yöresi’ndeki Isparta; gül bahçeleri ve gülyağıyla ünlüdür. Eğirdir Gölü ve yakınındaki antik Sagalassos kenti bölgenin hazineleridir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Isparta'] },
  { id: 'burdur', name: 'Burdur', city: 'Burdur', country: 'Türkiye', lat: 37.7203, lng: 30.2908, aliases: ['burdur'], summary: 'Göller bölgesindeki Burdur; Salda Gölü’nün bembeyaz kıyıları (“Türkiye’nin Maldivleri”) ve iyi korunmuş antik Sagalassos kentiyle öne çıkar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Burdur (Salda)'] },
  { id: 'afyon', name: 'Afyonkarahisar', city: 'Afyonkarahisar', country: 'Türkiye', lat: 38.7507, lng: 30.5567, aliases: ['afyon', 'afyonkarahisar'], summary: 'Kayalık kalesiyle Afyonkarahisar; termal kaplıcaları, mermeri, sucuğu ve lokumuyla ünlü bir İç Ege kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Afyonkarahisar'] },
  { id: 'kutahya', name: 'Kütahya', city: 'Kütahya', country: 'Türkiye', lat: 39.42, lng: 29.9833, aliases: ['kutahya', 'kütahya'], summary: 'Çini ve seramiğin başkenti Kütahya; tarihî konakları, kalesi ve yakınındaki antik Aizanoi (Zeus Tapınağı) kentiyle bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kütahya'] },
  { id: 'usak', name: 'Uşak', city: 'Uşak', country: 'Türkiye', lat: 38.6823, lng: 29.4082, aliases: ['usak', 'uşak'], summary: 'Ege ile İç Anadolu arasındaki Uşak; ünlü “Karun Hazineleri”ni barındıran müzesi ve tarihî halı dokumacılığıyla tanınır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Uşak'] },
  { id: 'manisa', name: 'Manisa', city: 'Manisa', country: 'Türkiye', lat: 38.6191, lng: 27.4289, aliases: ['manisa', 'magnesia'], summary: 'Şehzadeler şehri Manisa; Mesir Macunu Festivali, tarihî camileri, Spil Dağı (Ağlayan Kaya/Niobe) ve antik Sardes kentiyle zengindir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Manisa'] },
  { id: 'aydin', name: 'Aydın', city: 'Aydın', country: 'Türkiye', lat: 37.856, lng: 27.8416, aliases: ['aydin', 'aydın', 'kusadasi', 'kuşadası', 'didim'], summary: 'Ege’nin verimli Aydın’ı; Kuşadası tatil beldesi, görkemli Apollon Tapınağı’yla Didim, antik Afrodisias, Priene ve Milet kentleriyle turizmin kalbindedir.', sources: ['UNESCO World Heritage List — Aphrodisias', 'T.C. Kültür ve Turizm Bakanlığı — Aydın'] },
  { id: 'mugla', name: 'Muğla', city: 'Muğla', country: 'Türkiye', lat: 37.2153, lng: 28.3636, aliases: ['mugla', 'muğla', 'bodrum', 'fethiye', 'marmaris', 'dalyan'], summary: 'Turkuaz kıyının incisi Muğla; Bodrum, Marmaris, Fethiye (Ölüdeniz) ve Datça gibi dünyaca ünlü tatil beldeleri, koyları ve mavi yolculuk rotalarıyla Türkiye’nin en gözde turizm bölgesidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Muğla', 'Lonely Planet — Bodrum'] },
  { id: 'denizli', name: 'Denizli', city: 'Denizli', country: 'Türkiye', lat: 37.7765, lng: 29.0864, aliases: ['denizli', 'pamukkale denizli'], summary: 'Bembeyaz travertenleriyle Pamukkale (UNESCO) ve antik Hierapolis kentiyle ünlü Denizli; horozu, dokumacılığı ve yakınındaki Laodikeia antik kentiyle de bilinir.', sources: ['UNESCO World Heritage List — Hierapolis-Pamukkale', 'T.C. Kültür ve Turizm Bakanlığı — Denizli'] },
  { id: 'balikesir', name: 'Balıkesir', city: 'Balıkesir', country: 'Türkiye', lat: 39.6484, lng: 27.8826, aliases: ['balikesir', 'balıkesir', 'ayvalik', 'ayvalık', 'edremit', 'cunda'], summary: 'İki denize kıyısı olan Balıkesir; zeytiniyle ünlü Ayvalık ve Cunda Adası, Edremit Körfezi ve Kaz Dağları ile doğa ve deniz turizminin merkezlerindendir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Balıkesir'] },
  { id: 'tekirdag', name: 'Tekirdağ', city: 'Tekirdağ', country: 'Türkiye', lat: 40.9781, lng: 27.5117, aliases: ['tekirdag', 'tekirdağ'], summary: 'Marmara kıyısındaki Tekirdağ; köftesi, rakısı ve Rákóczi Müzesi ile bilinen bir Trakya kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Tekirdağ'] },
  { id: 'kirklareli', name: 'Kırklareli', city: 'Kırklareli', country: 'Türkiye', lat: 41.7355, lng: 27.2244, aliases: ['kirklareli', 'kırklareli', 'kiyikoy', 'kıyıköy'], summary: 'Trakya’nın kuzeyindeki Kırklareli; Istranca ormanları, Karadeniz kıyısı Kıyıköy ve Dupnisa Mağarası ile doğa turizmiyle öne çıkar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kırklareli'] },
  { id: 'kocaeli', name: 'Kocaeli', city: 'İzmit', country: 'Türkiye', lat: 40.8533, lng: 29.8815, aliases: ['kocaeli', 'izmit', 'i̇zmit'], summary: 'Sanayi ve tarih kenti Kocaeli (İzmit); Osmanlı Saat Kulesi, Kartepe kayak merkezi ve Maşukiye yaylalarıyla bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kocaeli'] },
  { id: 'sakarya', name: 'Sakarya', city: 'Adapazarı', country: 'Türkiye', lat: 40.7569, lng: 30.3783, aliases: ['sakarya', 'adapazari', 'adapazarı', 'sapanca'], summary: 'Sakarya; huzurlu Sapanca Gölü, yemyeşil Maşukiye ve Acarlar Longozu ile hafta sonu doğa kaçışlarının gözdesidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Sakarya'] },
  { id: 'yalova', name: 'Yalova', city: 'Yalova', country: 'Türkiye', lat: 40.65, lng: 29.2667, aliases: ['yalova'], summary: 'Marmara kıyısındaki küçük Yalova; termal kaplıcaları, Atatürk’ün Yürüyen Köşkü ve şelaleleriyle bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Yalova'] },
  { id: 'bilecik', name: 'Bilecik', city: 'Bilecik', country: 'Türkiye', lat: 40.1451, lng: 29.9799, aliases: ['bilecik', 'sogut', 'söğüt'], summary: 'Osmanlı’nın kuruluş toprakları Bilecik; Söğüt (Ertuğrul Gazi Türbesi) ve tarihî Osmaneli evleriyle tanınır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bilecik'] },
  { id: 'eskisehir', name: 'Eskişehir', city: 'Eskişehir', country: 'Türkiye', lat: 39.7767, lng: 30.5206, aliases: ['eskisehir', 'eskişehir'], summary: 'Öğrenci ve kanal kenti Eskişehir; Porsuk Çayı’nda gondollar, renkli Odunpazarı evleri, lületaşı ve tema parklarıyla canlı ve modern bir atmosfer sunar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Eskişehir'] },
  { id: 'kayseri', name: 'Kayseri', city: 'Kayseri', country: 'Türkiye', lat: 38.7312, lng: 35.4787, aliases: ['kayseri', 'caesarea'], summary: 'Erciyes Dağı’nın eteğindeki Kayseri; tarihî kalesi ve Selçuklu eserleri, Erciyes kayak merkezi, pastırma-sucuğu ve yakınındaki Kapadokya ile öne çıkar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kayseri'] },
  { id: 'nevsehir', name: 'Nevşehir', city: 'Nevşehir', country: 'Türkiye', lat: 38.6939, lng: 34.6857, aliases: ['nevsehir', 'nevşehir', 'kapadokya nevsehir'], summary: 'Kapadokya’nın kalbi Nevşehir; peri bacaları, Göreme kaya kiliseleri (UNESCO), yeraltı şehirleri ve gün doğumu balon turlarıyla Türkiye’nin en büyülü bölgesidir.', sources: ['UNESCO World Heritage List — Göreme and Cappadocia', 'T.C. Kültür ve Turizm Bakanlığı — Nevşehir'] },
  { id: 'nigde', name: 'Niğde', city: 'Niğde', country: 'Türkiye', lat: 37.9667, lng: 34.6833, aliases: ['nigde', 'niğde'], summary: 'Kapadokya’nın güneyindeki Niğde; Aladağlar Milli Parkı, Gümüşler Manastırı ve Narlıgöl krater gölüyle doğa severlere hitap eder.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Niğde'] },
  { id: 'aksaray', name: 'Aksaray', city: 'Aksaray', country: 'Türkiye', lat: 38.3687, lng: 34.037, aliases: ['aksaray'], summary: 'Aksaray; yeşil vadisiyle Ihlara Vadisi, Selime Katedrali ve tarihî Sultanhanı Kervansarayı ile Kapadokya bölgesinin önemli duraklarındandır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Aksaray (Ihlara)'] },
  { id: 'kirsehir', name: 'Kırşehir', city: 'Kırşehir', country: 'Türkiye', lat: 39.1425, lng: 34.1709, aliases: ['kirsehir', 'kırşehir'], summary: 'Ahilik kültürünün merkezi Kırşehir; Cacabey Medresesi, Aşık Paşa ve Ahi Evran türbeleri ile termal kaynaklarıyla bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kırşehir'] },
  { id: 'karaman', name: 'Karaman', city: 'Karaman', country: 'Türkiye', lat: 37.1811, lng: 33.2149, aliases: ['karaman'], summary: 'Türkçenin resmî dil ilan edildiği Karaman; kaya kiliseleriyle Binbir Kilise (Madenşehir), Karaman Kalesi ve Türk dilinin öncüsü Yunus Emre’nin izleriyle bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Karaman'] },
  { id: 'kirikkale', name: 'Kırıkkale', city: 'Kırıkkale', country: 'Türkiye', lat: 39.8468, lng: 33.5153, aliases: ['kirikkale', 'kırıkkale'], summary: 'Ankara’nın doğusundaki Kırıkkale; Kızılırmak kıyısı ve tarihî Kapulukaya ile bilinen bir İç Anadolu kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kırıkkale'] },
  { id: 'cankiri', name: 'Çankırı', city: 'Çankırı', country: 'Türkiye', lat: 40.6013, lng: 33.6134, aliases: ['cankiri', 'çankırı'], summary: 'Çankırı; benzersiz Tuz Mağarası (yeraltı tuz labirenti) ve tarihî çarşısıyla tanınan bir İç Anadolu kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Çankırı'] },
  { id: 'yozgat', name: 'Yozgat', city: 'Yozgat', country: 'Türkiye', lat: 39.8181, lng: 34.8147, aliases: ['yozgat'], summary: 'Yozgat; Çamlık Milli Parkı, tarihî Çapanoğlu Camii ve yakınındaki antik Kerkenes ile bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Yozgat'] },
  { id: 'corum', name: 'Çorum', city: 'Çorum', country: 'Türkiye', lat: 40.5506, lng: 34.9556, aliases: ['corum', 'çorum', 'hattusa', 'hattuşa'], summary: 'Leblebi kenti Çorum; Hitit İmparatorluğu’nun başkenti Hattuşa (UNESCO) ve açık hava tapınağı Yazılıkaya ile tarih tutkunlarının uğrağıdır.', sources: ['UNESCO World Heritage List — Hattusha (Boğazköy)', 'T.C. Kültür ve Turizm Bakanlığı — Çorum'] },
  { id: 'amasya', name: 'Amasya', city: 'Amasya', country: 'Türkiye', lat: 40.6499, lng: 35.8353, aliases: ['amasya'], summary: 'Yeşilırmak kıyısındaki şiirsel Amasya; nehir yansımalı tarihî Yalıboyu konakları, kayalara oyulmuş Pontus kral mezarları ve şehzadeler geçmişiyle büyüler.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Amasya'] },
  { id: 'tokat', name: 'Tokat', city: 'Tokat', country: 'Türkiye', lat: 40.3167, lng: 36.5544, aliases: ['tokat'], summary: 'Tokat; tarihî kalesi, Ballıca Mağarası ve yazma baskı sanatıyla bilinen köklü bir Karadeniz-İç Anadolu kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Tokat'] },
  { id: 'sivas', name: 'Sivas', city: 'Sivas', country: 'Türkiye', lat: 39.7477, lng: 37.0179, aliases: ['sivas'], summary: 'Cumhuriyet tarihinin kongre kenti Sivas; taş işçiliğiyle göz kamaştıran Selçuklu medreseleri (Çifte Minareli, Gök Medrese) ve şifalı balıklı Kangal kaplıcasıyla ünlüdür.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Sivas'] },
  { id: 'samsun', name: 'Samsun', city: 'Samsun', country: 'Türkiye', lat: 41.2867, lng: 36.33, aliases: ['samsun'], summary: 'Karadeniz’in büyük kenti Samsun; Kurtuluş Savaşı’nın başladığı Bandırma Vapuru ve Amazon köyü temalı parkı, uzun sahili ve Amisos tepesiyle bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Samsun'] },
  { id: 'ordu', name: 'Ordu', city: 'Ordu', country: 'Türkiye', lat: 40.9839, lng: 37.8764, aliases: ['ordu'], summary: 'Fındık diyarı Ordu; teleferikle çıkılan Boztepe’den körfez manzarası ve yaylalarıyla Karadeniz’in şirin kentlerindendir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Ordu'] },
  { id: 'giresun', name: 'Giresun', city: 'Giresun', country: 'Türkiye', lat: 40.9128, lng: 38.3895, aliases: ['giresun'], summary: 'Giresun; Karadeniz’in tek adası Giresun Adası, tarihî kalesi ve yaylalarıyla (Kümbet, Bektaş) bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Giresun'] },
  { id: 'rize', name: 'Rize', city: 'Rize', country: 'Türkiye', lat: 41.0201, lng: 40.5234, aliases: ['rize', 'ayder', ' i̇kizdere'], summary: 'Çay ve yağmurun diyarı Rize; sisli Ayder Yaylası, kaplıcaları, Fırtına Deresi kemer köprüleri ve Zil Kale ile Doğu Karadeniz’in yeşil cennetidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Rize'] },
  { id: 'artvin', name: 'Artvin', city: 'Artvin', country: 'Türkiye', lat: 41.1828, lng: 41.8183, aliases: ['artvin', 'karagol', 'karagöl'], summary: 'Yeşilin bin tonu Artvin; Karagöl-Sahara Milli Parkı, sisli yaylalar (Kafkasör), tarihî Gürcü kiliseleri ve Çoruh Nehri rafting rotalarıyla ünlüdür.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Artvin'] },
  { id: 'gumushane', name: 'Gümüşhane', city: 'Gümüşhane', country: 'Türkiye', lat: 40.4603, lng: 39.4814, aliases: ['gumushane', 'gümüşhane'], summary: 'Gümüşhane; devasa Karaca Mağarası, Santa Harabeleri ve Zigana yaylalarıyla bilinen bir dağ kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Gümüşhane'] },
  { id: 'bayburt', name: 'Bayburt', city: 'Bayburt', country: 'Türkiye', lat: 40.2552, lng: 40.2249, aliases: ['bayburt'], summary: 'Türkiye’nin en küçük illerinden Bayburt; Anadolu’nun en büyük kalelerinden biri ve Baksı Müzesi ile bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bayburt'] },
  { id: 'sinop', name: 'Sinop', city: 'Sinop', country: 'Türkiye', lat: 42.0231, lng: 35.1531, aliases: ['sinop'], summary: 'Türkiye’nin en kuzey ucundaki Sinop; tarihî cezaevi, kalesi, Diogenes’in memleketi oluşu ve şirin limanıyla huzurlu bir Karadeniz kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Sinop'] },
  { id: 'kastamonu', name: 'Kastamonu', city: 'Kastamonu', country: 'Türkiye', lat: 41.3887, lng: 33.7827, aliases: ['kastamonu'], summary: 'Tarihî konakların kenti Kastamonu; kalesi, Nasrullah Camii, Ilgaz Dağı ve yakınındaki UNESCO korumalı Kasaba köyü (Mahmutbey Camii) ile öne çıkar.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Kastamonu'] },
  { id: 'karabuk', name: 'Karabük (Safranbolu)', city: 'Safranbolu', country: 'Türkiye', lat: 41.2061, lng: 32.6204, aliases: ['karabuk', 'karabük', 'safranbolu'], summary: 'Karabük’ün gözbebeği Safranbolu; kusursuz korunmuş Osmanlı evleri, çarşısı ve konaklarıyla bütünüyle UNESCO Dünya Mirası bir açık hava müzesidir.', sources: ['UNESCO World Heritage List — City of Safranbolu', 'T.C. Kültür ve Turizm Bakanlığı — Karabük'] },
  { id: 'bartin', name: 'Bartın', city: 'Bartın', country: 'Türkiye', lat: 41.6344, lng: 32.3375, aliases: ['bartin', 'bartın', 'amasra'], summary: 'Bartın; Karadeniz’in incisi Amasra’nın iki koylu limanı, kalesi ve taş sokaklarıyla sevilen bir sahil kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bartın (Amasra)'] },
  { id: 'zonguldak', name: 'Zonguldak', city: 'Zonguldak', country: 'Türkiye', lat: 41.4564, lng: 31.7987, aliases: ['zonguldak'], summary: 'Kömür kenti Zonguldak; Gökgöl ve Cehennemağzı mağaraları ile Karadeniz sahilleriyle bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Zonguldak'] },
  { id: 'duzce', name: 'Düzce', city: 'Düzce', country: 'Türkiye', lat: 40.8438, lng: 31.1565, aliases: ['duzce', 'düzce'], summary: 'Düzce; şelaleli Güzeldere, Samandere ve yemyeşil Uğursuyu tabiat alanları ile Akçakoca sahilleriyle doğa turizminin gözdesidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Düzce'] },
  { id: 'bolu', name: 'Bolu', city: 'Bolu', country: 'Türkiye', lat: 40.7392, lng: 31.6089, aliases: ['bolu', 'abant', 'kartalkaya', 'yedigoller', 'yedigöller'], summary: 'Doğa cenneti Bolu; sisli Abant Gölü, sonbaharda rengârenk Yedigöller Milli Parkı, Kartalkaya kayak merkezi ve aşçılarıyla ünlüdür.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bolu'] },
  { id: 'malatya', name: 'Malatya', city: 'Malatya', country: 'Türkiye', lat: 38.3552, lng: 38.3095, aliases: ['malatya'], summary: 'Kayısı diyarı Malatya; antik Aslantepe Höyüğü (UNESCO), tarihî Battalgazi ve Nemrut’a açılan konumuyla bilinir.', sources: ['UNESCO World Heritage List — Arslantepe Mound', 'T.C. Kültür ve Turizm Bakanlığı — Malatya'] },
  { id: 'elazig', name: 'Elazığ', city: 'Elazığ', country: 'Türkiye', lat: 38.681, lng: 39.2264, aliases: ['elazig', 'elazığ', 'harput'], summary: 'Elazığ; tarihî Harput mahallesi (kale ve camileri), Hazar Gölü ve Keban Barajı ile bilinir; kiraz ve orcik lezzetleriyle anılır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Elazığ (Harput)'] },
  { id: 'tunceli', name: 'Tunceli', city: 'Tunceli', country: 'Türkiye', lat: 39.1079, lng: 39.5401, aliases: ['tunceli', 'dersim'], summary: 'Doğa harikası Tunceli (Dersim); turkuaz Munzur Vadisi Milli Parkı, gözeleri ve rafting rotalarıyla el değmemiş güzelliklere sahiptir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Tunceli (Munzur)'] },
  { id: 'bingol', name: 'Bingöl', city: 'Bingöl', country: 'Türkiye', lat: 38.8853, lng: 40.4966, aliases: ['bingol', 'bingöl'], summary: 'Bingöl; buzul gölleri (Bingöl-Yüzengöller), kaplıcaları ve Kırkgöze yaylalarıyla bilinen bir Doğu Anadolu kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Bingöl'] },
  { id: 'mus', name: 'Muş', city: 'Muş', country: 'Türkiye', lat: 38.9462, lng: 41.7539, aliases: ['mus', 'muş'], summary: 'Muş; ilkbaharda mor menekşe ovaları, Murat Nehri kanyonu ve tarihî Muş Kalesi ile bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Muş'] },
  { id: 'bitlis', name: 'Bitlis', city: 'Bitlis', country: 'Türkiye', lat: 38.4006, lng: 42.1095, aliases: ['bitlis', 'ahlat', 'nemrut krater'], summary: 'Bitlis; devasa Nemrut Krater Gölü, Selçuklu mezar taşlarıyla ünlü Ahlat ve tarihî taş kentiyle bilinir.', sources: ['UNESCO Tentative List — Ahlat', 'T.C. Kültür ve Turizm Bakanlığı — Bitlis'] },
  { id: 'van', name: 'Van', city: 'Van', country: 'Türkiye', lat: 38.4891, lng: 43.4089, aliases: ['van'], summary: 'Türkiye’nin en büyük gölünün kıyısındaki Van; adasındaki 10. yy Akdamar Kilisesi, kahvaltısı, Van kedisi ve tarihî Van Kalesi (Tuşpa) ile ünlüdür.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Van (Akdamar)'] },
  { id: 'hakkari', name: 'Hakkâri', city: 'Hakkâri', country: 'Türkiye', lat: 37.5744, lng: 43.7408, aliases: ['hakkari', 'hakkâri', 'cilo'], summary: 'Türkiye’nin dağlık güneydoğu ucundaki Hakkâri; buzullarıyla Cilo-Sat Dağları ve Türkiye’nin en yüksek şelalelerinden biriyle doğa tutkunlarını çeker.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Hakkâri'] },
  { id: 'siirt', name: 'Siirt', city: 'Siirt', country: 'Türkiye', lat: 37.9333, lng: 41.95, aliases: ['siirt'], summary: 'Siirt; battaniyesi, fıstığı ve tarihî Ulu Camii ile Aydınlar (Tillo) ilçesinin bilim geleneğiyle tanınır.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Siirt'] },
  { id: 'sirnak', name: 'Şırnak', city: 'Şırnak', country: 'Türkiye', lat: 37.5164, lng: 42.4611, aliases: ['sirnak', 'şırnak', 'cizre'], summary: 'Şırnak; tarihî Cizre (Nuh’un gemisi ve Kırmızı Medrese efsaneleri) ve Cudi Dağı ile bilinen bir sınır kentidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Şırnak'] },
  { id: 'batman', name: 'Batman', city: 'Batman', country: 'Türkiye', lat: 37.8812, lng: 41.1351, aliases: ['batman', 'hasankeyf'], summary: 'Batman; Dicle kıyısındaki binlerce yıllık Hasankeyf ve tarihî Malabadi Köprüsü ile bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Batman (Hasankeyf)'] },
  { id: 'diyarbakir', name: 'Diyarbakır', city: 'Diyarbakır', country: 'Türkiye', lat: 37.9144, lng: 40.2306, aliases: ['diyarbakir', 'diyarbakır', 'amed'], summary: 'Bazalttan siyah surlarıyla Diyarbakır; Çin Seddi’nden sonra en uzun sur olan surları ve Hevsel Bahçeleri (UNESCO), tarihî Ulu Camii ve On Gözlü Köprü ile köklü bir Mezopotamya kentidir.', sources: ['UNESCO World Heritage List — Diyarbakır Fortress and Hevsel Gardens', 'T.C. Kültür ve Turizm Bakanlığı — Diyarbakır'] },
  { id: 'mardin', name: 'Mardin', city: 'Mardin', country: 'Türkiye', lat: 37.3212, lng: 40.7245, aliases: ['mardin'], summary: 'Mezopotamya ovasına bakan yamaca kurulu Mardin; bal rengi taş evleri, telkâri işçiliği, Deyrulzafaran Manastırı ve çok kültürlü dokusuyla bir açık hava müzesidir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Mardin', 'Lonely Planet — Mardin'] },
  { id: 'sanliurfa', name: 'Şanlıurfa', city: 'Şanlıurfa', country: 'Türkiye', lat: 37.1591, lng: 38.7969, aliases: ['sanliurfa', 'şanlıurfa', 'urfa', 'gobeklitepe sehir'], summary: '“Peygamberler Şehri” Şanlıurfa; insanlık tarihinin sıfır noktası Göbeklitepe (UNESCO), kutsal balıklı göl (Balıklıgöl), tarihî çarşıları ve mutfağıyla köklü bir merkezdir.', sources: ['UNESCO World Heritage List — Göbekli Tepe', 'T.C. Kültür ve Turizm Bakanlığı — Şanlıurfa'] },
  { id: 'adiyaman', name: 'Adıyaman', city: 'Adıyaman', country: 'Türkiye', lat: 37.7648, lng: 38.2786, aliases: ['adiyaman', 'adıyaman', 'nemrut adiyaman'], summary: 'Adıyaman; zirvesindeki dev tanrı-kral heykelleriyle Nemrut Dağı (UNESCO), Cendere Köprüsü ve Kommagene mirasıyla ünlüdür.', sources: ['UNESCO World Heritage List — Nemrut Dağ', 'T.C. Kültür ve Turizm Bakanlığı — Adıyaman'] },
  { id: 'erzurum', name: 'Erzurum', city: 'Erzurum', country: 'Türkiye', lat: 39.9, lng: 41.27, aliases: ['erzurum'], summary: 'Doğu Anadolu’nun yüksek kenti Erzurum; Çifte Minareli Medrese ve Üç Kümbetler gibi Selçuklu eserleri, Palandöken kayak merkezi ve cağ kebabıyla ünlüdür.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Erzurum'] },
  { id: 'erzincan', name: 'Erzincan', city: 'Erzincan', country: 'Türkiye', lat: 39.75, lng: 39.5, aliases: ['erzincan', 'kemaliye'], summary: 'Erzincan; Karanlık Kanyon’un sarp yolları ve “Taş Yolu” ile ünlü Kemaliye (Eğin), Ergan kayak merkezi ve tulum peyniriyle bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Erzincan'] },
  { id: 'kars', name: 'Kars', city: 'Kars', country: 'Türkiye', lat: 40.6013, lng: 43.0975, aliases: ['kars', 'ani'], summary: 'Kars; “bin bir kilise şehri” antik Ani harabeleri (UNESCO), Baltık mimarili taş konakları, kaz eti-gravyeri ve Sarıkamış kayak merkeziyle öne çıkar.', sources: ['UNESCO World Heritage List — Archaeological Site of Ani', 'T.C. Kültür ve Turizm Bakanlığı — Kars'] },
  { id: 'ardahan', name: 'Ardahan', city: 'Ardahan', country: 'Türkiye', lat: 41.1105, lng: 42.7022, aliases: ['ardahan', 'cildir', 'çıldır'], summary: 'Yüksek yayla kenti Ardahan; kışın buz tutan Çıldır Gölü’nde atlı kızak, şelaleleri ve el değmemiş doğasıyla bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Ardahan'] },
  { id: 'igdir', name: 'Iğdır', city: 'Iğdır', country: 'Türkiye', lat: 39.888, lng: 44.0048, aliases: ['igdir', 'iğdır'], summary: 'Ağrı Dağı’nın eteğindeki Iğdır; ovası, kayısısı ve Ağrı Dağı tırmanışlarına açılan konumuyla bilinir.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Iğdır'] },
  { id: 'agri', name: 'Ağrı', city: 'Ağrı', country: 'Türkiye', lat: 39.7191, lng: 43.0503, aliases: ['agri', 'ağrı', 'agri dagi', 'ararat'], summary: 'Türkiye’nin çatısı Ağrı; 5.137 m ile ülkenin en yüksek dağı Ağrı Dağı (Ararat), İshak Paşa Sarayı ve göktaşı çukuruyla ünlüdür.', sources: ['T.C. Kültür ve Turizm Bakanlığı — Ağrı (İshak Paşa)'] },

  // ============= TÜRKİYE — SINIR GİRİŞ/ÇIKIŞ KAPILARI =============
  {
    id: 'kapikule',
    name: 'Kapıkule Sınır Kapısı',
    city: 'Edirne',
    country: 'Türkiye',
    lat: 41.7186,
    lng: 26.34,
    aliases: ['kapikule', 'kapıkule', 'kapitan andreevo'],
    summary:
      'Türkiye’nin Bulgaristan’a (ve Avrupa’ya) açılan en büyük ve en işlek kara sınır kapısıdır; karşı tarafta Bulgaristan’ın Kapitan Andreevo kapısı yer alır. Edirne’ye yaklaşık 18 km uzaklıktadır ve Avrupa’ya karayolu seyahatlerinin ana güzergâhıdır. Yoğun dönemlerde bekleme süreleri uzayabilir.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
      'Emniyet Genel Müdürlüğü — Sınır Kapıları',
    ],
  },
  {
    id: 'hamzabeyli',
    name: 'Hamzabeyli Sınır Kapısı',
    city: 'Edirne',
    country: 'Türkiye',
    lat: 41.9772,
    lng: 26.6839,
    aliases: ['hamzabeyli', 'lesovo'],
    summary:
      'Edirne’nin kuzeyinde, Türkiye’yi Bulgaristan’ın Lesovo kapısına bağlayan sınır kapısıdır. Kapıkule’ye alternatif olarak, özellikle yoğun dönemlerde tercih edilir.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'dereko',
    name: 'Dereköy Sınır Kapısı',
    city: 'Kırklareli',
    country: 'Türkiye',
    lat: 41.926,
    lng: 27.546,
    aliases: ['dereko', 'dereköy', 'malko tarnovo'],
    summary:
      'Kırklareli’nde, Türkiye’yi Bulgaristan’ın Malko Tarnovo kapısına bağlayan sınır kapısıdır. Istranca Dağları üzerinden geçen, Karadeniz kıyısına yakın alternatif bir güzergâhtır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'ipsala',
    name: 'İpsala Sınır Kapısı',
    city: 'Edirne',
    country: 'Türkiye',
    lat: 40.9268,
    lng: 26.3878,
    aliases: ['ipsala', 'i̇psala', 'kipoi'],
    summary:
      'Edirne’nin İpsala ilçesinde, Türkiye’yi Yunanistan’ın Kipoi kapısına bağlayan sınır kapısıdır. Yunanistan ve Batı Avrupa’ya (Meriç Nehri üzerinden) karayolu geçişlerinin başlıca noktasıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'sarp',
    name: 'Sarp Sınır Kapısı',
    city: 'Artvin',
    country: 'Türkiye',
    lat: 41.514,
    lng: 41.548,
    aliases: ['sarp', 'sarpi'],
    summary:
      'Karadeniz kıyısında, Artvin’in Hopa ilçesine bağlı Sarp’ta yer alan; Türkiye’yi Gürcistan’ın Sarpi kapısına bağlayan sınır kapısıdır. Kafkaslara ve Batum’a açılan ana geçiştir.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'turkgozu',
    name: 'Türkgözü Sınır Kapısı',
    city: 'Ardahan',
    country: 'Türkiye',
    lat: 41.42,
    lng: 42.85,
    aliases: ['turkgozu', 'türkgözü', 'kartsakhi'],
    summary:
      'Ardahan’ın Posof ilçesinde, Türkiye’yi Gürcistan’ın Kartsakhi kapısına bağlayan sınır kapısıdır. Tiflis yönüne iç bölgelerden geçiş sağlar.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'gurbulak',
    name: 'Gürbulak Sınır Kapısı',
    city: 'Ağrı',
    country: 'Türkiye',
    lat: 39.382,
    lng: 44.348,
    aliases: ['gurbulak', 'gürbulak', 'bazargan'],
    summary:
      'Ağrı’nın Doğubayazıt ilçesinde, Ağrı Dağı eteğinde; Türkiye’yi İran’ın Bazargan kapısına bağlayan en işlek doğu sınır kapısıdır. İran’a karayolu geçişinin ana noktasıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'kapikoy',
    name: 'Kapıköy Sınır Kapısı',
    city: 'Van',
    country: 'Türkiye',
    lat: 38.72,
    lng: 44.35,
    aliases: ['kapikoy', 'kapıköy', 'razi'],
    summary:
      'Van’ın Saray ilçesinde, Türkiye’yi İran’ın Razi kapısına bağlayan sınır kapısıdır. Demiryolu bağlantısıyla da öne çıkar.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'esendere',
    name: 'Esendere Sınır Kapısı',
    city: 'Hakkâri',
    country: 'Türkiye',
    lat: 38.3,
    lng: 44.55,
    aliases: ['esendere', 'sero'],
    summary:
      'Hakkâri’nin Yüksekova ilçesinde, Türkiye’yi İran’ın Sero kapısına bağlayan güneydoğu sınır kapısıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'habur',
    name: 'Habur Sınır Kapısı',
    city: 'Şırnak',
    country: 'Türkiye',
    lat: 37.135,
    lng: 42.453,
    aliases: ['habur', 'ibrahim khalil', 'i̇brahim halil'],
    summary:
      'Şırnak’ın Silopi ilçesinde, Türkiye’yi Irak’ın (Kürt Bölgesi) İbrahim Halil kapısına bağlayan, ticaretin yoğun olduğu güney sınır kapısıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'cilvegozu',
    name: 'Cilvegözü Sınır Kapısı',
    city: 'Hatay',
    country: 'Türkiye',
    lat: 36.22,
    lng: 36.68,
    aliases: ['cilvegozu', 'cilvegözü', 'bab al-hawa'],
    summary:
      'Hatay’ın Reyhanlı ilçesinde, Türkiye’yi Suriye’nin Bab el-Hava kapısına bağlayan sınır kapısıdır. (Geçiş durumu güncel koşullara göre değişebilir.)',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'oncupinar',
    name: 'Öncüpınar Sınır Kapısı',
    city: 'Kilis',
    country: 'Türkiye',
    lat: 36.66,
    lng: 37.12,
    aliases: ['oncupinar', 'öncüpınar', 'bab al-salam'],
    summary:
      'Kilis’te, Türkiye’yi Suriye’nin Bab es-Selam kapısına bağlayan sınır kapısıdır. (Geçiş durumu güncel koşullara göre değişebilir.)',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },
  {
    id: 'dilucu',
    name: 'Dilucu Sınır Kapısı',
    city: 'Iğdır',
    country: 'Türkiye',
    lat: 39.61,
    lng: 44.98,
    aliases: ['dilucu', 'nahcivan', 'nahçıvan', 'sadarak'],
    summary:
      'Iğdır’ın Aralık ilçesinde, Türkiye’yi Azerbaycan’ın Nahçıvan Özerk Cumhuriyeti’ne (Sederek) bağlayan sınır kapısıdır. Türkiye’nin Azerbaycan ile tek doğrudan kara bağlantısıdır.',
    sources: [
      'T.C. Ticaret Bakanlığı — Gümrük Kapıları',
    ],
  },

  // ===================== AVRUPA — ŞEHİRLER =====================
  // --- Fransa ---
  {
    id: 'paris',
    name: 'Paris',
    city: 'Paris',
    country: 'Fransa',
    lat: 48.8566,
    lng: 2.3522,
    aliases: ['paris', 'pari'],
    summary:
      'Işık Şehri Paris, yüzyıllardır sanatın, modanın, felsefenin ve romantizmin dünya başkenti olmuş; Fransız tarihinin ve devriminin de kalbinde yer almıştır. Seine Nehri’nin iki yakasına yayılan kent, zarif bulvarları ve anıtsal mimarisiyle bir açık hava müzesi gibidir.\n\nEyfel Kulesi, dünyanın en büyük müzelerinden Louvre, gotik Notre-Dame Katedrali, Champs-Élysées Bulvarı ve sanatçıların uğrağı Montmartre tepesi başlıca simgeleridir. Kafeleri, pastaneleri ve Seine kıyısı yürüyüşleriyle Paris, dünyanın en çok ziyaret edilen şehirlerinden biridir.',
    sources: ['UNESCO World Heritage List — Paris, Banks of the Seine', 'Lonely Planet — Paris'],
  },
  {
    id: 'nice',
    name: 'Nice',
    city: 'Nice',
    country: 'Fransa',
    lat: 43.7102,
    lng: 7.262,
    aliases: ['nice', 'nis fransa', 'cote dazur'],
    summary:
      'Fransız Rivierası’nın (Côte d’Azur) parlayan incisi Nice, ılıman iklimi ve turkuaz deniziyle 19. yüzyıldan beri Avrupa seçkinlerinin gözde kışlık durağı olmuştur. Uzun süre İtalyan etkisi taşıyan kent, kendine özgü bir Akdeniz kimliği sunar.\n\nDeniz boyunca uzanan ünlü Promenade des Anglais, renkli binaları ve pazarıyla Eski Şehir (Vieux Nice) ve tepedeki kale manzarası başlıca cazibelerdir. Nice ayrıca Monako, Cannes, Antibes ve kartpostal köyü Èze’e açılan mükemmel bir üstür.',
    sources: ['Lonely Planet — Nice', 'Explore Nice Côte d’Azur — resmi turizm'],
  },
  {
    id: 'lyon',
    name: 'Lyon',
    city: 'Lyon',
    country: 'Fransa',
    lat: 45.764,
    lng: 4.8357,
    aliases: ['lyon', 'lugdunum'],
    summary:
      'Rhône ve Saône nehirlerinin buluştuğu Lyon, Roma döneminden Rönesans’a ve ipek ticaretine uzanan iki bin yıllık zengin bir geçmişe sahip Fransa’nın ikinci büyük metropolüdür. Tarihî bölgeleri UNESCO Dünya Mirası Listesi’ndedir.\n\nRönesans dokulu Vieux Lyon, ipek işçilerinin kullandığı gizli geçitler (traboules), tepedeki Fourvière Bazilikası ve Roma tiyatroları kentin öne çıkanlarıdır. Geleneksel “bouchon” lokantaları ve köklü mutfağıyla Lyon, Fransa’nın gastronomi başkenti olarak da anılır.',
    sources: ['UNESCO World Heritage List — Historic Site of Lyon', 'Lonely Planet — Lyon'],
  },
  {
    id: 'marseille',
    name: 'Marsilya',
    city: 'Marseille',
    country: 'Fransa',
    lat: 43.2965,
    lng: 5.3698,
    aliases: ['marsilya', 'marseille'],
    summary:
      'Fransa’nın en eski kenti Marsilya, 2.600 yıl önce Antik Yunanlılar tarafından kurulmuş, Akdeniz’in en büyük ve en çok kültürlü limanlarından biridir. Farklı halkların buluştuğu bu canlı liman, ham ve tutkulu bir enerji taşır.\n\nBalıkçı teknelerinin dizildiği tarihî Eski Liman (Vieux-Port), şehre tepeden bakan Notre-Dame de la Garde Bazilikası, modern MuCEM müzesi ve kentin çevresindeki turkuaz Calanques koyları başlıca duraklardır. Balık çorbası bouillabaisse kentin simge lezzetidir.',
    sources: ['Lonely Planet — Marseille', 'Fransa Turizm — Marsilya'],
  },
  {
    id: 'bordeaux',
    name: 'Bordeaux',
    city: 'Bordeaux',
    country: 'Fransa',
    lat: 44.8378,
    lng: -0.5792,
    aliases: ['bordeaux', 'bordo'],
    summary:
      'Dünyanın en ünlü şarap bölgelerinden birinin merkezi Bordeaux, Garonne Nehri kıyısındaki zarif 18. yüzyıl mimarisiyle “Küçük Paris” olarak anılan bir kenttir. Tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.\n\nDünyanın en büyük yaya meydanlarından Place de la Bourse ve karşısındaki büyüleyici “su aynası” (Miroir d’eau), zarif bulvarları ve şarap kültürünü anlatan modern Cité du Vin müzesi başlıca cazibelerdir. Çevredeki Médoc ve Saint-Émilion bağları şarap turları için idealdir.',
    sources: ['UNESCO World Heritage List — Bordeaux, Port of the Moon', 'Lonely Planet — Bordeaux'],
  },

  // --- İtalya ---
  {
    id: 'roma',
    name: 'Roma',
    city: 'Roma',
    country: 'İtalya',
    lat: 41.9028,
    lng: 12.4964,
    aliases: ['roma', 'rome', 'roman'],
    summary:
      'Ebedî Şehir Roma, iki bin yılı aşkın süredir Batı uygarlığının kalbi olmuş; önce Roma İmparatorluğu’na, ardından Katolik dünyasına başkentlik yapmıştır. Kolezyum ve Forum Romanum’dan Panteon’a uzanan antik anıtlar, kentin sokaklarında Rönesans ve barok katmanlarıyla iç içe geçer.\n\nTrevi Çeşmesi’ne bozuk para atmaktan İspanyol Merdivenleri’nde oturmaya, dünyanın en küçük devleti Vatikan’da Sistine Şapeli’ni görmekten Trastevere’nin dar sokaklarında akşam yemeğine kadar Roma her adımda tarih ile yaşam sevincini birleştirir. Tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Rome', 'Lonely Planet — Rome'],
  },
  {
    id: 'venedik',
    name: 'Venedik',
    city: 'Venezia',
    country: 'İtalya',
    lat: 45.4408,
    lng: 12.3155,
    aliases: ['venedik', 'venezia', 'venice', 'venesia'],
    summary:
      'Adriyatik’in bir lagünündeki 100’den fazla küçük ada üzerine kurulu Venedik, yüzyıllar boyunca Doğu ile Batı arasındaki deniz ticaretine hükmeden güçlü bir cumhuriyetin başkentiydi. Otomobilsiz kent, kanallar ve köprülerle örülü benzersiz bir labirenttir.\n\nSan Marco Meydanı ve Bazilikası, Doj Sarayı, Rialto Köprüsü ve gondol turlarıyla Venedik dünyanın en romantik şehirlerinden biridir. Renkli evleriyle Burano ve cam ustalarıyla Murano adaları da kolayca gezilebilir. Tüm kent ve lagünü UNESCO Dünya Mirası Listesi’ndedir.',
    sources: ['UNESCO World Heritage List — Venice and its Lagoon', 'Lonely Planet — Venice'],
  },
  {
    id: 'floransa',
    name: 'Floransa',
    city: 'Firenze',
    country: 'İtalya',
    lat: 43.7696,
    lng: 11.2558,
    aliases: ['floransa', 'firenze', 'florence'],
    summary:
      'Rönesans’ın doğduğu şehir Floransa, Medici ailesinin himayesinde Leonardo, Michelangelo ve Botticelli gibi dehalara ev sahipliği yaparak Avrupa sanatının seyrini değiştirmiştir. Arno Nehri kıyısındaki kent, adeta açık hava sanat galerisi gibidir.\n\nBrunelleschi’nin kubbesiyle taçlanan Duomo, dünyanın en zengin koleksiyonlarından Uffizi Galerisi, dükkânlarla dolu Ponte Vecchio ve Michelangelo’nun David heykeliyle Floransa paha biçilmez bir hazinedir. Piazzale Michelangelo’dan izlenen gün batımı kentin en sevilen manzarasıdır. Tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Florence', 'Lonely Planet — Florence'],
  },
  {
    id: 'milano',
    name: 'Milano',
    city: 'Milano',
    country: 'İtalya',
    lat: 45.4642,
    lng: 9.19,
    aliases: ['milano', 'milan'],
    summary:
      'İtalya’nın kuzeyindeki Milano, ülkenin ekonomi, moda ve tasarım başkentidir; aynı zamanda katmanlı bir tarihe ve zengin bir sanat mirasına sahiptir. Lombardiya’nın bu canlı metropolü, geleneksel İtalyan zarafetini modern bir dinamizmle harmanlar.\n\nYüzyıllarca süren inşaatıyla görkemli gotik Duomo, cam tavanlı Galleria Vittorio Emanuele II pasajı, dünyaca ünlü La Scala opera binası ve Leonardo da Vinci’nin “Son Akşam Yemeği” freski kentin başlıca cazibeleridir. Milano ayrıca alışveriş ve futbol tutkusunun da merkezidir.',
    sources: ['Lonely Planet — Milan', 'İtalya Turizm — Milano'],
  },
  {
    id: 'napoli',
    name: 'Napoli',
    city: 'Napoli',
    country: 'İtalya',
    lat: 40.8518,
    lng: 14.2681,
    aliases: ['napoli', 'naples'],
    summary:
      'Vezüv Yanardağı’nın gölgesinde, Napoli Körfezi’ne kurulu Napoli, tutkulu ve gürültülü ruhuyla İtalya’nın en özgün kentlerinden biridir. Pizzanın doğduğu şehir olarak kabul edilir; sokak yaşamı ve mutfağı efsanevidir.\n\nUNESCO korumasındaki labirent gibi tarihî merkezi, yer altı kalıntıları ve müzeleriyle keşfedilmeyi bekler. Napoli aynı zamanda küllerin altında donmuş antik Pompeii, masalsı Amalfi Kıyısı ve Capri Adası’na açılan bir kapıdır.',
    sources: ['UNESCO World Heritage List — Historic Centre of Naples', 'Lonely Planet — Naples'],
  },

  // --- İspanya ---
  {
    id: 'barselona',
    name: 'Barselona',
    city: 'Barcelona',
    country: 'İspanya',
    lat: 41.3874,
    lng: 2.1686,
    aliases: ['barselona', 'barcelona'],
    summary:
      'Katalonya’nın canlı başkenti Barselona, Gaudí’nin Sagrada Família ve Park Güell gibi masalsı eserleri, Gotik Mahalle ve La Rambla’sıyla mimari ve deniz keyfini birleştirir.',
    sources: ['UNESCO World Heritage List — Works of Antoni Gaudí', 'Lonely Planet — Barcelona'],
  },
  {
    id: 'madrid',
    name: 'Madrid',
    city: 'Madrid',
    country: 'İspanya',
    lat: 40.4168,
    lng: -3.7038,
    aliases: ['madrid'],
    summary:
      'İspanya’nın başkenti Madrid, dünyaca ünlü Prado Müzesi, görkemli Kraliyet Sarayı, canlı Plaza Mayor’u ve geniş Retiro Parkı’yla sanatın ve gece hayatının merkezidir.',
    sources: ['Lonely Planet — Madrid', 'İspanya Turizm — Madrid'],
  },
  {
    id: 'sevilla',
    name: 'Sevilla',
    city: 'Sevilla',
    country: 'İspanya',
    lat: 37.3891,
    lng: -5.9845,
    aliases: ['sevilla', 'seville', 'sevilya'],
    summary:
      'Endülüs’ün ruhu Sevilla; Mağribi-Hristiyan mimarinin başyapıtı Alcázar, dev katedrali ve Giralda kulesi (UNESCO) ile flamenkonun ateşini bir arada sunar. Plaza de España göz kamaştırır.',
    sources: ['UNESCO World Heritage List — Cathedral, Alcázar and Archivo de Indias, Seville', 'Lonely Planet — Seville'],
  },
  {
    id: 'granada',
    name: 'Granada',
    city: 'Granada',
    country: 'İspanya',
    lat: 37.1773,
    lng: -3.5986,
    aliases: ['granada'],
    summary:
      'Sierra Nevada eteğindeki Granada’nın tacı, İslam sanatının doruğu Elhamra Sarayı ve Generalife bahçeleridir (UNESCO). Albaicín’in dar sokakları ve çingene mağaralarıyla Endülüs mirasını yaşatır.',
    sources: ['UNESCO World Heritage List — Alhambra, Generalife and Albayzín, Granada', 'Lonely Planet — Granada'],
  },
  {
    id: 'valensiya',
    name: 'Valensiya',
    city: 'Valencia',
    country: 'İspanya',
    lat: 39.4699,
    lng: -0.3763,
    aliases: ['valensiya', 'valencia'],
    summary:
      'Paella’nın doğduğu Valensiya, fütüristik Sanat ve Bilim Şehri (Calatrava), tarihî ipek borsası Lonja (UNESCO) ve geniş plajlarıyla geleneksel ile moderni birleştirir.',
    sources: ['UNESCO World Heritage List — La Lonja de la Seda de Valencia', 'Lonely Planet — Valencia'],
  },

  // --- Almanya ---
  {
    id: 'berlin',
    name: 'Berlin',
    city: 'Berlin',
    country: 'Almanya',
    lat: 52.52,
    lng: 13.405,
    aliases: ['berlin'],
    summary:
      'Almanya’nın başkenti Berlin, 20. yüzyılın en dramatik olaylarına sahne olmuş; iki dünya savaşı, Nazi dönemi ve Soğuk Savaş’ta kenti ikiye bölen Berlin Duvarı’nın izlerini taşır. Bugün ise Avrupa’nın en yaratıcı ve özgür metropollerinden biridir.\n\nBrandenburg Kapısı, Reichstag, Duvar’ın açık hava galerisi East Side Gallery ve dünyaca ünlü müzelerin toplandığı Müze Adası (UNESCO) başlıca duraklardır. Dinamik sanat sahnesi, gece hayatı ve katmanlı tarihiyle Berlin geçmiş ile geleceği çarpıcı biçimde birleştirir.',
    sources: ['UNESCO World Heritage List — Museumsinsel (Museum Island), Berlin', 'Lonely Planet — Berlin'],
  },
  {
    id: 'munih',
    name: 'Münih',
    city: 'München',
    country: 'Almanya',
    lat: 48.1351,
    lng: 11.582,
    aliases: ['munih', 'münih', 'munchen', 'münchen', 'munich'],
    summary:
      'Bavyera’nın başkenti Münih, geleneksel Alman kültürünün, biranın ve refahın simgesi olmuş canlı bir kenttir. Kraliyet geçmişi, sanat müzeleri ve Alplere yakınlığıyla gelenek ile modern yaşamı zarifçe harmanlar.\n\nSaatli kulesiyle Marienplatz meydanı, asırlık bira bahçeleri, Hofbräuhaus ve her sonbahar milyonlarca ziyaretçi çeken Oktoberfest kentin ruhunu yansıtır. Münih ayrıca Neuschwanstein Şatosu, Alpler ve göller gibi masalsı Bavyera manzaralarına açılan bir kapıdır.',
    sources: ['Lonely Planet — Munich', 'Almanya Turizm — München'],
  },
  {
    id: 'koln',
    name: 'Köln',
    city: 'Köln',
    country: 'Almanya',
    lat: 50.9375,
    lng: 6.9603,
    aliases: ['koln', 'köln', 'cologne', 'kolonya'],
    summary:
      'Ren Nehri kıyısındaki Köln, iki bin yıllık Roma geçmişine sahip Almanya’nın en eski büyük kentlerinden biridir. Simgesi, gökyüzüne uzanan ikiz kuleleriyle Avrupa’nın en görkemli gotik yapılarından Köln Katedrali’dir (UNESCO).\n\nİnşası altı yüzyıldan fazla süren katedralin yanı sıra tarihî eski şehir, Ren kıyısı, Roman-Germen Müzesi ve çikolata müzesi kenti canlı kılar. Kendine özgü lehçesi, yerel Kölsch birası ve coşkulu karnavalıyla Köln keyifli bir Ren metropolüdür.',
    sources: ['UNESCO World Heritage List — Cologne Cathedral', 'Lonely Planet — Cologne'],
  },
  {
    id: 'hamburg',
    name: 'Hamburg',
    city: 'Hamburg',
    country: 'Almanya',
    lat: 53.5511,
    lng: 9.9937,
    aliases: ['hamburg'],
    summary:
      'Almanya’nın kuzeyindeki Hamburg, ülkenin en büyük limanı ve su kanallarıyla örülü zengin bir ticaret kentidir; Venedik ve Amsterdam’dan daha fazla köprüsü olduğu söylenir. Yüzyıllardır denizciliğin ve ticaretin kalbi olmuştur.\n\nKızıl tuğlalı antrepolardan oluşan Speicherstadt semti (UNESCO), liman üzerinde yükselen modern Elbphilharmonie konser salonu ve efsanevi eğlence caddesi Reeperbahn kentin simgeleridir. Alster gölleri, canlı pazarları ve deniz atmosferiyle Hamburg zarif bir metropoldür.',
    sources: ['UNESCO World Heritage List — Speicherstadt and Kontorhaus District', 'Lonely Planet — Hamburg'],
  },

  // --- Yunanistan ---
  {
    id: 'atina',
    name: 'Atina',
    city: 'Athína',
    country: 'Yunanistan',
    lat: 37.9838,
    lng: 23.7275,
    aliases: ['atina', 'athens', 'athina'],
    summary:
      'Batı uygarlığının, demokrasinin ve felsefenin beşiği Atina; Akropolis ve Parthenon’dan antik Agora’ya uzanan görkemli mirasıyla dünyanın en eski şehirlerindendir. Plaka’nın dar sokakları modern kentle iç içedir.',
    sources: ['UNESCO World Heritage List — Acropolis, Athens', 'Lonely Planet — Athens'],
  },
  {
    id: 'selanik',
    name: 'Selanik',
    city: 'Thessaloniki',
    country: 'Yunanistan',
    lat: 40.6401,
    lng: 22.9444,
    aliases: ['selanik', 'thessaloniki', 'salonika'],
    summary:
      'Yunanistan’ın ikinci büyük kenti Selanik, Bizans surları ve kiliseleri (UNESCO), simge Beyaz Kule’si ve Osmanlı izleriyle katmanlı bir tarih sunar. Atatürk’ün doğduğu ev de buradadır.',
    sources: ['UNESCO World Heritage List — Palaeochristian and Byzantine Monuments of Thessalonika', 'Lonely Planet — Thessaloniki'],
  },
  {
    id: 'santorini',
    name: 'Santorini',
    city: 'Santorini',
    country: 'Yunanistan',
    lat: 36.4162,
    lng: 25.4325,
    aliases: ['santorini', 'thira', 'fira'],
    summary:
      'Bir volkanik kalderanın kenarına kurulu Santorini, beyaz badanalı evleri, mavi kubbeli kiliseleri ve dünyaca ünlü Oia gün batımıyla Ege’nin en ikonik adasıdır.',
    sources: ['Lonely Planet — Santorini', 'Yunanistan Turizm — Santorini'],
  },

  // --- Hollanda ---
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    city: 'Amsterdam',
    country: 'Hollanda',
    lat: 52.3676,
    lng: 4.9041,
    aliases: ['amsterdam'],
    summary:
      'Kanalları UNESCO Dünya Mirası olan Amsterdam; Van Gogh ve Rijksmuseum gibi müzeleri, Anne Frank Evi ve bisikletli yaşamıyla zarif ve özgür ruhlu bir başkenttir.',
    sources: ['UNESCO World Heritage List — Seventeenth-century canal ring of Amsterdam', 'Lonely Planet — Amsterdam'],
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam',
    city: 'Rotterdam',
    country: 'Hollanda',
    lat: 51.9244,
    lng: 4.4777,
    aliases: ['rotterdam'],
    summary:
      'II. Dünya Savaşı sonrası yeniden doğan Rotterdam, cesur modern mimarisiyle (Küp Evler, Markthal, Erasmus Köprüsü) Avrupa’nın en yenilikçi liman kentidir.',
    sources: ['Lonely Planet — Rotterdam', 'Hollanda Turizm — Rotterdam'],
  },

  // --- Portekiz ---
  {
    id: 'lizbon',
    name: 'Lizbon',
    city: 'Lisboa',
    country: 'Portekiz',
    lat: 38.7223,
    lng: -9.1393,
    aliases: ['lizbon', 'lisboa', 'lisbon'],
    summary:
      'Yedi tepeye kurulu Lizbon; sarı tramvayları, Alfama’nın fado dolu sokakları, Belém Kulesi ve Jerónimos Manastırı (UNESCO) ile Atlantik ışığında parlar.',
    sources: ['UNESCO World Heritage List — Monastery of the Hieronymites and Tower of Belém', 'Lonely Planet — Lisbon'],
  },
  {
    id: 'porto',
    name: 'Porto',
    city: 'Porto',
    country: 'Portekiz',
    lat: 41.1579,
    lng: -8.6291,
    aliases: ['porto', 'oporto'],
    summary:
      'Porto şarabının anavatanı Porto; Douro Nehri kıyısındaki renkli Ribeira mahallesi (UNESCO), Dom Luís I Köprüsü ve çini kaplı kiliseleriyle büyüleyici bir kenttir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Oporto', 'Lonely Planet — Porto'],
  },

  // --- Birleşik Krallık ---
  {
    id: 'londra',
    name: 'Londra',
    city: 'London',
    country: 'Birleşik Krallık',
    lat: 51.5074,
    lng: -0.1278,
    aliases: ['londra', 'london'],
    summary:
      'Dünyanın en etkili metropollerinden Londra; Big Ben ve Parlamento, Londra Kulesi (UNESCO), British Museum ve kraliyet saraylarıyla tarih, kültür ve modern yaşamı bir arada sunar.',
    sources: ['UNESCO World Heritage List — Tower of London', 'Lonely Planet — London'],
  },
  {
    id: 'edinburgh',
    name: 'Edinburgh',
    city: 'Edinburgh',
    country: 'Birleşik Krallık',
    lat: 55.9533,
    lng: -3.1883,
    aliases: ['edinburgh', 'edinburg'],
    summary:
      'İskoçya’nın başkenti Edinburgh; tepedeki kalesi, ortaçağ Old Town’u ile Gürcü Yeni Şehri (UNESCO) ve dünyaca ünlü festivalleriyle dramatik ve edebi bir atmosfer sunar.',
    sources: ['UNESCO World Heritage List — Old and New Towns of Edinburgh', 'Lonely Planet — Edinburgh'],
  },

  // --- İsviçre ---
  {
    id: 'zurih',
    name: 'Zürih',
    city: 'Zürich',
    country: 'İsviçre',
    lat: 47.3769,
    lng: 8.5417,
    aliases: ['zurih', 'zürih', 'zurich', 'zürich'],
    summary:
      'İsviçre’nin en büyük kenti Zürih, Zürih Gölü’nün kuzey ucunda ve Limmat Nehri kıyısında kurulu, dünyanın önde gelen finans merkezlerinden biridir; aynı zamanda beklenmedik ölçüde canlı bir kültür ve gece hayatı sunar. Yüksek yaşam kalitesiyle sürekli anılır.\n\nŞık Bahnhofstrasse alışveriş caddesi, dar sokaklı tarihî Old Town (Altstadt), Chagall vitraylarıyla ünlü Fraumünster kilisesi ve göl kıyısı gezileri başlıca cazibelerdir. Uzaktaki karlı Alp zirvelerinin göle yansıması kente muhteşem bir arka plan katar.',
    sources: ['Lonely Planet — Zürich', 'İsviçre Turizm — Zürich'],
  },
  {
    id: 'luzern',
    name: 'Luzern',
    city: 'Luzern',
    country: 'İsviçre',
    lat: 47.0502,
    lng: 8.3093,
    aliases: ['luzern', 'lucerne'],
    summary:
      'Orta İsviçre’de, adını taşıyan gölün kıyısında karlı dağların eteğinde kurulu Luzern, ülkenin en pitoresk kentlerinden biridir. Korunmuş ortaçağ dokusu ve göl-dağ manzarasıyla İsviçre’nin kartpostal görüntüsünü sunar.\n\nGölün üstünden geçen, çiçeklerle bezeli 14. yüzyıldan kalma ahşap Kapellbrücke köprüsü, kayaya oyulmuş dokunaklı Ağlayan Aslan anıtı ve tarihî meydanları kentin simgeleridir. Buradan Pilatus ve Rigi dağlarına çıkan dişli tren ve teleferik turları yapılabilir.',
    sources: ['Lonely Planet — Lucerne', 'İsviçre Turizm — Luzern'],
  },
  {
    id: 'interlaken',
    name: 'Interlaken',
    city: 'Interlaken',
    country: 'İsviçre',
    lat: 46.6863,
    lng: 7.8632,
    aliases: ['interlaken'],
    summary:
      'İki gölün (Thun ve Brienz) arasında, tam da isminin anlamına uygun biçimde kurulu Interlaken, İsviçre Alpleri’nin görkemli Jungfrau bölgesine açılan kapıdır. Eiger, Mönch ve Jungfrau zirvelerinin çevrelediği bir dağ tatili merkezidir.\n\nTrenle ulaşılan, “Avrupa’nın Çatısı” Jungfraujoch’un buzul manzarası, çağlayanlarıyla ünlü Lauterbrunnen vadisi ve Grindelwald köyü başlıca duraklardır. Yamaç paraşütü, kayak ve dağ yürüyüşleri gibi macera sporlarıyla Interlaken adrenalin tutkunlarının da gözdesidir.',
    sources: ['Lonely Planet — Interlaken', 'İsviçre Turizm — Interlaken'],
  },

  // --- Belçika ---
  {
    id: 'bruksel',
    name: 'Brüksel',
    city: 'Brussel',
    country: 'Belçika',
    lat: 50.8503,
    lng: 4.3517,
    aliases: ['bruksel', 'brüksel', 'brussels', 'bruxelles'],
    summary:
      'Avrupa Birliği’nin başkenti Brüksel; altın işlemeli Grand-Place meydanı (UNESCO), Manneken Pis, Atomium ve çikolata-waffle kültürüyle tarihi ve uluslararası bir kenttir.',
    sources: ['UNESCO World Heritage List — La Grand-Place, Brussels', 'Lonely Planet — Brussels'],
  },
  {
    id: 'bruges',
    name: 'Bruges',
    city: 'Brugge',
    country: 'Belçika',
    lat: 51.2093,
    lng: 3.2247,
    aliases: ['bruges', 'brugge', 'brugge belcika'],
    summary:
      '“Kuzeyin Venedik’i” Bruges; kanalları, ortaçağdan kalma tarihî merkezi (UNESCO), Çan Kulesi (Belfort) ve arnavut kaldırımlı meydanlarıyla âdeta bir masal şehridir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Brugge', 'Lonely Planet — Bruges'],
  },

  // --- Polonya ---
  {
    id: 'krakow',
    name: 'Krakow',
    city: 'Kraków',
    country: 'Polonya',
    lat: 50.0647,
    lng: 19.945,
    aliases: ['krakow', 'kraków', 'cracow'],
    summary:
      'Polonya’nın eski başkenti Krakow; Avrupa’nın en büyük ortaçağ meydanlarından Rynek Główny, Wawel Kalesi ve tarihî merkezi (UNESCO) ile savaştan sağ çıkmış bir kültür hazinesidir. Auschwitz ve Tuz Madeni’ne yakındır.',
    sources: ['UNESCO World Heritage List — Historic Centre of Kraków', 'Lonely Planet — Kraków'],
  },
  {
    id: 'varsova',
    name: 'Varşova',
    city: 'Warszawa',
    country: 'Polonya',
    lat: 52.2297,
    lng: 21.0122,
    aliases: ['varsova', 'varşova', 'warsaw', 'warszawa'],
    summary:
      'Savaşta yıkılıp aslına uygun yeniden inşa edilen Varşova’nın Eski Şehri UNESCO Dünya Mirası’dır. Kraliyet Sarayı, Łazienki Parkı ve dirençli ruhuyla Polonya’nın canlı başkentidir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Warsaw', 'Lonely Planet — Warsaw'],
  },

  // ===================== AFRİKA — ŞEHİRLER =====================
  // --- Mısır ---
  {
    id: 'kahire',
    name: 'Kahire',
    city: 'Cairo',
    country: 'Mısır',
    lat: 30.0444,
    lng: 31.2357,
    aliases: ['kahire', 'cairo', 'kahira', 'giza', 'gize'],
    summary:
      'Nil kıyısındaki uçsuz bucaksız Kahire, hemen yanı başındaki Giza Piramitleri ve Sfenks ile antik dünyanın tek ayakta kalan harikasına ev sahipliği yapar. Han el-Halili çarşısı, İslami Kahire’nin camileri ve dünyaca ünlü Mısır Müzesi ile firavunlardan bugüne uzanan bir tarih sunar.',
    sources: ['UNESCO World Heritage List — Memphis and its Necropolis (Pyramids of Giza)', 'Lonely Planet — Cairo'],
  },
  {
    id: 'luksor',
    name: 'Luksor',
    city: 'Luxor',
    country: 'Mısır',
    lat: 25.6872,
    lng: 32.6396,
    aliases: ['luksor', 'luxor', 'teb', 'thebes'],
    summary:
      'Antik Teb’in üzerine kurulu Luksor, “dünyanın en büyük açık hava müzesi” sayılır. Karnak ve Luksor tapınakları, Nil’in batı yakasındaki Krallar Vadisi ve Hatşepsut Tapınağı ile firavunların ihtişamını bugüne taşır.',
    sources: ['UNESCO World Heritage List — Ancient Thebes with its Necropolis', 'Lonely Planet — Luxor'],
  },
  {
    id: 'asvan',
    name: 'Asvan',
    city: 'Aswan',
    country: 'Mısır',
    lat: 24.0889,
    lng: 32.8998,
    aliases: ['asvan', 'aswan', 'assuan'],
    summary:
      'Nil’in en güzel manzaralarına sahip Asvan; feluka yelkenlileri, Philae Tapınağı ve adalarıyla huzurlu bir Nubya kentidir. Güneyindeki devasa Abu Simbel tapınakları bölgenin en görkemli hazinesidir.',
    sources: ['UNESCO World Heritage List — Nubian Monuments from Abu Simbel to Philae', 'Lonely Planet — Aswan'],
  },
  {
    id: 'iskenderiye',
    name: 'İskenderiye',
    city: 'Alexandria',
    country: 'Mısır',
    lat: 31.2001,
    lng: 29.9187,
    aliases: ['iskenderiye', 'alexandria', 'iskandariya'],
    summary:
      'Büyük İskender’in kurduğu Akdeniz kenti İskenderiye, antik dünyanın ünlü kütüphanesine ve deniz fenerine ev sahipliği yapmıştı. Bugün modern Bibliotheca Alexandrina, Kaitbay Kalesi ve yeraltı mezarlarıyla köklü geçmişini yaşatır.',
    sources: ['Lonely Planet — Alexandria', 'Bibliotheca Alexandrina — resmi portal'],
  },

  // --- Fas ---
  {
    id: 'marakes',
    name: 'Marakeş',
    city: 'Marrakech',
    country: 'Fas',
    lat: 31.6295,
    lng: -7.9811,
    aliases: ['marakes', 'marakeş', 'marrakech', 'marrakesh'],
    summary:
      '“Kızıl Şehir” Marakeş, canlı Jemaa el-Fnaa meydanı, labirent souk’ları ve Koutoubia Camii’nin minaresiyle duyulara hitap eden bir Fas kentidir. Bahia Sarayı ve Majorelle Bahçesi gibi vahalarıyla renk ve dinginliği bir arada sunar.',
    sources: ['UNESCO World Heritage List — Medina of Marrakesh', 'Lonely Planet — Marrakesh'],
  },
  {
    id: 'fes',
    name: 'Fes',
    city: 'Fès',
    country: 'Fas',
    lat: 34.0181,
    lng: -5.0078,
    aliases: ['fes', 'fez', 'fès'],
    summary:
      'Fas’ın manevi ve kültürel başkenti Fes, dünyanın en büyük ve en iyi korunmuş ortaçağ medinalarından birine sahiptir (UNESCO). Dar dokuma sokakları, dünyanın en eski üniversitesi Al-Karaouine ve renkli Chouara tabakhanesiyle zamanda yolculuk yaşatır.',
    sources: ['UNESCO World Heritage List — Medina of Fez', 'Lonely Planet — Fez'],
  },
  {
    id: 'safsavan',
    name: 'Şafşavan',
    city: 'Chefchaouen',
    country: 'Fas',
    lat: 35.1688,
    lng: -5.2636,
    aliases: ['safsavan', 'şafşavan', 'chefchaouen', 'chaouen', 'mavi sehir'],
    summary:
      'Rif Dağları’na yaslanan Şafşavan, mavinin her tonuna boyanmış sokaklarıyla “Mavi Şehir” olarak ünlüdür. Fotojenik medinası ve dağ manzaralarıyla Fas’ın en sevilen kaçış noktalarından biridir.',
    sources: ['Lonely Planet — Chefchaouen', 'Fas Turizm — Chefchaouen'],
  },
  {
    id: 'kazablanka',
    name: 'Kazablanka',
    city: 'Casablanca',
    country: 'Fas',
    lat: 33.5731,
    lng: -7.5898,
    aliases: ['kazablanka', 'casablanca', 'dar el beida'],
    summary:
      'Fas’ın modern yüzü Kazablanka; denize uzanan devasa II. Hassan Camii, art deco mimarisi ve Corniche sahiliyle Atlantik kıyısında canlı bir metropoldür.',
    sources: ['Lonely Planet — Casablanca', 'Fas Turizm — Casablanca'],
  },

  // --- Güney Afrika ---
  {
    id: 'capetown',
    name: 'Cape Town',
    city: 'Cape Town',
    country: 'Güney Afrika',
    lat: -33.9249,
    lng: 18.4241,
    aliases: ['cape town', 'capetown', 'kaapstad', 'kap sehri'],
    summary:
      'Table Mountain’ın eteğinde iki okyanusun buluştuğu Cape Town, dünyanın en güzel konumlu kentlerinden biridir. Ümit Burnu, V&A Waterfront, penguen kolonili plajlar ve şarap bağlarıyla doğa ve şehri kusursuz birleştirir.',
    sources: ['UNESCO World Heritage List — Cape Floral Region', 'Lonely Planet — Cape Town'],
  },
  {
    id: 'johannesburg',
    name: 'Johannesburg',
    city: 'Johannesburg',
    country: 'Güney Afrika',
    lat: -26.2041,
    lng: 28.0473,
    aliases: ['johannesburg', 'joburg', 'jozi'],
    summary:
      'Güney Afrika’nın en büyük kenti Johannesburg; Apartheid Müzesi, Mandela’nın izlerini taşıyan Soweto ve yakınındaki “İnsanlığın Beşiği” fosil alanlarıyla ülkenin tarihini ve dönüşümünü anlatır.',
    sources: ['UNESCO World Heritage List — Fossil Hominid Sites (Cradle of Humankind)', 'Lonely Planet — Johannesburg'],
  },

  // --- Tanzanya ---
  {
    id: 'zanzibar',
    name: 'Zanzibar (Stone Town)',
    city: 'Zanzibar',
    country: 'Tanzanya',
    lat: -6.1659,
    lng: 39.2026,
    aliases: ['zanzibar', 'stone town', 'unguja'],
    summary:
      'Hint Okyanusu’nun baharat adası Zanzibar; Afrika, Arap ve Hint kültürlerinin kaynaştığı tarihî Stone Town (UNESCO), oymalı ahşap kapıları ve bembeyaz plajlarıyla büyüler.',
    sources: ['UNESCO World Heritage List — Stone Town of Zanzibar', 'Lonely Planet — Zanzibar'],
  },
  {
    id: 'arusha',
    name: 'Arusha',
    city: 'Arusha',
    country: 'Tanzanya',
    lat: -3.3869,
    lng: 36.683,
    aliases: ['arusha', 'serengeti', 'ngorongoro'],
    summary:
      'Kuzey Tanzanya safari turlarının kapısı Arusha; Serengeti Milli Parkı, Ngorongoro Krateri ve Kilimanjaro’ya açılan bir üstür. Büyük göç ve vahşi yaşamın kalbine buradan ulaşılır.',
    sources: ['UNESCO World Heritage List — Serengeti National Park', 'Lonely Planet — Arusha'],
  },

  // --- Kenya ---
  {
    id: 'nairobi',
    name: 'Nairobi',
    city: 'Nairobi',
    country: 'Kenya',
    lat: -1.2921,
    lng: 36.8219,
    aliases: ['nairobi'],
    summary:
      'Kenya’nın başkenti Nairobi, şehrin hemen yanındaki milli parkta safari yapılabilen ender metropoldür. Fil yetimhanesi ve Zürafa Merkezi gibi deneyimlerle vahşi yaşamı kent hayatına taşır; Maasai Mara’ya açılan kapıdır.',
    sources: ['Kenya Wildlife Service — Nairobi National Park', 'Lonely Planet — Nairobi'],
  },

  // --- Tunus ---
  {
    id: 'tunus',
    name: 'Tunus',
    city: 'Tunis',
    country: 'Tunus',
    lat: 36.8065,
    lng: 10.1815,
    aliases: ['tunus', 'tunis', 'kartaca', 'carthage'],
    summary:
      'Tunus’un başkenti; UNESCO listesindeki tarihî medinası, yakınındaki antik Kartaca kalıntıları ve mavi-beyaz Sidi Bou Said köyüyle Akdeniz, Arap ve Roma mirasını bir arada sunar. Bardo Müzesi eşsiz mozaik koleksiyonuyla ünlüdür.',
    sources: ['UNESCO World Heritage List — Medina of Tunis / Carthage', 'Lonely Planet — Tunis'],
  },

  // --- Etiyopya ---
  {
    id: 'lalibela',
    name: 'Lalibela',
    city: 'Lalibela',
    country: 'Etiyopya',
    lat: 12.0319,
    lng: 39.0413,
    aliases: ['lalibela'],
    summary:
      'Etiyopya’nın kutsal kenti Lalibela, 12.-13. yüzyılda tek parça kayadan oyularak inşa edilen 11 anıtsal kilisesiyle dünyada eşi olmayan bir hac merkezidir (UNESCO). “Yeni Kudüs” olarak da anılır.',
    sources: ['UNESCO World Heritage List — Rock-Hewn Churches, Lalibela', 'Lonely Planet — Lalibela'],
  },

  // ===================== ASYA — ŞEHİRLER =====================
  // --- Japonya ---
  {
    id: 'tokyo',
    name: 'Tokyo',
    city: 'Tokyo',
    country: 'Japonya',
    lat: 35.6762,
    lng: 139.6503,
    aliases: ['tokyo', 'tokio', 'edo'],
    summary:
      'Gelenek ile ultra-modernliğin baş döndürücü bir uyumla buluştuğu Tokyo; neon ışıklı Shibuya kavşağından sakin Meiji Tapınağı’na, gökdelenlerden çiçek açan bahçelere uzanır. Dünyanın en büyük ve en dinamik metropollerinden biridir.',
    sources: ['Japan National Tourism Organization — Tokyo', 'Lonely Planet — Tokyo'],
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    city: 'Kyoto',
    country: 'Japonya',
    lat: 35.0116,
    lng: 135.7681,
    aliases: ['kyoto', 'kioto'],
    summary:
      'Japonya’nın eski başkenti Kyoto, bin yılı aşkın geçmişiyle geleneksel Japonya’nın kalbidir. Altın Pavyon, kırmızı torii tünelli Fushimi Inari ve geyşaların dolaştığı Gion mahallesiyle UNESCO mirası tapınaklarla doludur.',
    sources: ['UNESCO World Heritage List — Historic Monuments of Ancient Kyoto', 'Lonely Planet — Kyoto'],
  },
  {
    id: 'osaka',
    name: 'Osaka',
    city: 'Osaka',
    country: 'Japonya',
    lat: 34.6937,
    lng: 135.5023,
    aliases: ['osaka'],
    summary:
      'Japonya’nın sokak lezzetleri başkenti Osaka; görkemli Osaka Kalesi, neon dolu Dotonbori eğlence bölgesi ve samimi ruhuyla ünlüdür. Nara ve Kyoto’ya kolay ulaşımıyla bölgenin canlı merkezidir.',
    sources: ['Japan National Tourism Organization — Osaka', 'Lonely Planet — Osaka'],
  },
  {
    id: 'hiroshima',
    name: 'Hiroşima',
    city: 'Hiroshima',
    country: 'Japonya',
    lat: 34.3853,
    lng: 132.4553,
    aliases: ['hiroshima', 'hiroşima'],
    summary:
      'Hiroşima, atom bombasının izlerini barış mesajına dönüştüren Barış Anıtı (Genbaku Dome, UNESCO) ve müzesiyle dünyaya umut sunar. Yakınındaki Miyajima Adası’nda denizin ortasında yükselen ünlü torii kapısı yer alır.',
    sources: ['UNESCO World Heritage List — Hiroshima Peace Memorial', 'Lonely Planet — Hiroshima'],
  },
  {
    id: 'nara',
    name: 'Nara',
    city: 'Nara',
    country: 'Japonya',
    lat: 34.6851,
    lng: 135.8048,
    aliases: ['nara'],
    summary:
      'Japonya’nın ilk kalıcı başkenti Nara; özgürce dolaşan geyikleri, dev Buda heykelini barındıran Todai-ji ve fenerlerle bezeli Kasuga Tapınağı’yla (UNESCO) huzurlu bir açık hava müzesidir.',
    sources: ['UNESCO World Heritage List — Historic Monuments of Ancient Nara', 'Lonely Planet — Nara'],
  },

  // --- Çin ---
  {
    id: 'pekin',
    name: 'Pekin',
    city: 'Beijing',
    country: 'Çin',
    lat: 39.9042,
    lng: 116.4074,
    aliases: ['pekin', 'beijing', 'peking'],
    summary:
      'Çin’in başkenti Pekin, imparatorluk mirasının merkezidir; Yasak Şehir, Tiananmen Meydanı ve Cennet Tapınağı buradadır. Kentin hemen dışında dünyanın en görkemli yapısı Çin Seddi uzanır.',
    sources: ['UNESCO World Heritage List — Imperial Palace / Great Wall', 'Lonely Planet — Beijing'],
  },
  {
    id: 'sanghay',
    name: 'Şanghay',
    city: 'Shanghai',
    country: 'Çin',
    lat: 31.2304,
    lng: 121.4737,
    aliases: ['sanghay', 'şanghay', 'shanghai'],
    summary:
      'Çin’in fütüristik vitrini Şanghay; tarihî Bund rıhtımının karşısında yükselen Pudong gökdelenleri, klasik Yu Bahçesi ve canlı çarşılarıyla geçmiş ile geleceği aynı silüette birleştirir.',
    sources: ['Lonely Planet — Shanghai', 'Çin Turizm — Shanghai'],
  },
  {
    id: 'xian',
    name: "Xi'an",
    city: "Xi'an",
    country: 'Çin',
    lat: 34.3416,
    lng: 108.9398,
    aliases: ['xian', "xi'an", 'sian'],
    summary:
      'İpek Yolu’nun doğu ucundaki antik başkent Xi’an, binlerce pişmiş toprak asker ve atın koruduğu Terracotta Ordusu’na (UNESCO) ev sahipliği yapar. İyi korunmuş şehir surları ve Müslüman çarşısıyla köklü bir merkezdir.',
    sources: ['UNESCO World Heritage List — Mausoleum of the First Qin Emperor (Terracotta Army)', 'Lonely Planet — Xi’an'],
  },
  {
    id: 'guilin',
    name: 'Guilin',
    city: 'Guilin',
    country: 'Çin',
    lat: 25.2736,
    lng: 110.2907,
    aliases: ['guilin', 'yangshuo'],
    summary:
      'Guilin ve çevresi, Li Nehri boyunca sisler içinde yükselen karst tepeleriyle Çin resimlerinden fırlamış gibidir. Yangshuo’ya tekne turu, dünyanın en ikonik doğa manzaralarından birini sunar.',
    sources: ['Lonely Planet — Guilin', 'Çin Turizm — Guilin'],
  },

  // --- Hindistan ---
  {
    id: 'delhi',
    name: 'Delhi',
    city: 'Delhi',
    country: 'Hindistan',
    lat: 28.6139,
    lng: 77.209,
    aliases: ['delhi', 'yeni delhi', 'new delhi'],
    summary:
      'Hindistan’ın başkenti Delhi, Babür ihtişamı ile modern başkentin buluştuğu bir zıtlıklar şehridir. Kızıl Kale, Kutub Minar ve Humayun Türbesi (UNESCO) ile Eski Delhi’nin kaotik çarşıları aynı kentte yaşar.',
    sources: ['UNESCO World Heritage List — Humayun’s Tomb / Qutb Minar', 'Lonely Planet — Delhi'],
  },
  {
    id: 'agra',
    name: 'Agra',
    city: 'Agra',
    country: 'Hindistan',
    lat: 27.1767,
    lng: 78.0081,
    aliases: ['agra', 'tac mahal', 'taj mahal'],
    summary:
      'Agra, dünyanın en ünlü aşk anıtı Tac Mahal’in şehridir; beyaz mermer türbe, gün doğumunda büyüleyici bir görüntü sunar. Agra Kalesi ve yakındaki Fatehpur Sikri de UNESCO Dünya Mirası’dır.',
    sources: ['UNESCO World Heritage List — Taj Mahal', 'Lonely Planet — Agra'],
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    city: 'Jaipur',
    country: 'Hindistan',
    lat: 26.9124,
    lng: 75.7873,
    aliases: ['jaipur', 'pembe sehir'],
    summary:
      'Racastan’ın “Pembe Şehri” Jaipur; Amber Kalesi, Rüzgâr Sarayı (Hawa Mahal) ve Şehir Sarayı’yla masalsı bir maharaja başkentidir (UNESCO). Renkli çarşıları ve kraliyet mirasıyla büyüler.',
    sources: ['UNESCO World Heritage List — Jaipur City', 'Lonely Planet — Jaipur'],
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    city: 'Varanasi',
    country: 'Hindistan',
    lat: 25.3176,
    lng: 82.9739,
    aliases: ['varanasi', 'benares', 'kasi'],
    summary:
      'Ganj kıyısındaki Varanasi, Hinduizmin en kutsal şehri ve dünyanın kesintisiz yaşayan en eski kentlerindendir. Şafakta nehir üzerindeki ritüeller (ghat’lar) ve akşam Ganga Aarti töreni derin bir manevi deneyim sunar.',
    sources: ['Lonely Planet — Varanasi', 'Hindistan Turizm — Varanasi'],
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    city: 'Mumbai',
    country: 'Hindistan',
    lat: 19.076,
    lng: 72.8777,
    aliases: ['mumbai', 'bombay'],
    summary:
      'Hindistan’ın enerjik metropolü ve Bollywood’un evi Mumbai; Hindistan Kapısı, Victoria Terminus (UNESCO) ve deniz kıyısı Marine Drive ile sömürge mimarisini modern yaşamla birleştirir.',
    sources: ['UNESCO World Heritage List — Chhatrapati Shivaji Terminus', 'Lonely Planet — Mumbai'],
  },

  // --- Birleşik Arap Emirlikleri ---
  {
    id: 'dubai',
    name: 'Dubai',
    city: 'Dubai',
    country: 'Birleşik Arap Emirlikleri',
    lat: 25.2048,
    lng: 55.2708,
    aliases: ['dubai'],
    summary:
      'Çölün ortasında yükselen ihtişam kenti Dubai; dünyanın en yüksek binası Burj Khalifa, yapay ada Palm Jumeirah ve dev alışveriş merkezleriyle mühendislik ve lüksün sınırlarını zorlar. Tarihî Al Fahidi semti eski Dubai’yi yaşatır.',
    sources: ['Visit Dubai — resmi turizm portalı', 'Lonely Planet — Dubai'],
  },
  {
    id: 'abudabi',
    name: 'Abu Dabi',
    city: 'Abu Dhabi',
    country: 'Birleşik Arap Emirlikleri',
    lat: 24.4539,
    lng: 54.3773,
    aliases: ['abu dabi', 'abu dhabi', 'abudabi'],
    summary:
      'BAE’nin başkenti Abu Dabi; göz kamaştıran beyaz Şeyh Zayed Camii, Louvre Abu Dhabi ve Ferrari World ile kültür, sanat ve eğlenceyi bir araya getirir.',
    sources: ['Visit Abu Dhabi — resmi turizm portalı', 'Lonely Planet — Abu Dhabi'],
  },

  // --- Tayland ---
  {
    id: 'bangkok',
    name: 'Bangkok',
    city: 'Bangkok',
    country: 'Tayland',
    lat: 13.7563,
    lng: 100.5018,
    aliases: ['bangkok', 'krung thep'],
    summary:
      'Tayland’ın canlı başkenti Bangkok; ışıltılı Büyük Saray ve Zümrüt Buda, nehir üzerindeki Wat Arun tapınağı ve hareketli sokak pazarlarıyla duyulara ziyafet çeker. Efsanevi sokak yemekleriyle de ünlüdür.',
    sources: ['Tourism Authority of Thailand — Bangkok', 'Lonely Planet — Bangkok'],
  },
  {
    id: 'chiangmai',
    name: 'Chiang Mai',
    city: 'Chiang Mai',
    country: 'Tayland',
    lat: 18.7883,
    lng: 98.9853,
    aliases: ['chiang mai', 'chiangmai'],
    summary:
      'Kuzey Tayland’ın dağlık kültür başkenti Chiang Mai; surlarla çevrili eski şehrindeki yüzlerce tapınak, tepedeki Doi Suthep ve etik fil kampları ile huzurlu bir kaçış sunar.',
    sources: ['Tourism Authority of Thailand — Chiang Mai', 'Lonely Planet — Chiang Mai'],
  },
  {
    id: 'phuket',
    name: 'Phuket',
    city: 'Phuket',
    country: 'Tayland',
    lat: 7.8804,
    lng: 98.3923,
    aliases: ['phuket', 'puket'],
    summary:
      'Tayland’ın en büyük adası Phuket; turkuaz koyları, çevredeki Phi Phi ve Phang Nga (James Bond Adası) manzaraları ve canlı sahil hayatıyla tropik bir tatil merkezidir.',
    sources: ['Tourism Authority of Thailand — Phuket', 'Lonely Planet — Phuket'],
  },

  // --- Endonezya ---
  {
    id: 'bali',
    name: 'Bali',
    city: 'Bali (Ubud)',
    country: 'Endonezya',
    lat: 8.5069,
    lng: 115.2625,
    aliases: ['bali', 'ubud', 'denpasar'],
    summary:
      '“Tanrılar Adası” Bali; pirinç teraslarıyla yeşeren Ubud, deniz kenarındaki Tanah Lot ve Uluwatu tapınakları ve manevi atmosferiyle Endonezya’nın en sevilen tropik cennetidir.',
    sources: ['UNESCO World Heritage List — Cultural Landscape of Bali Province', 'Lonely Planet — Bali'],
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    city: 'Yogyakarta',
    country: 'Endonezya',
    lat: -7.7956,
    lng: 110.3695,
    aliases: ['yogyakarta', 'jogja', 'yogya'],
    summary:
      'Java’nın kültür kalbi Yogyakarta; dünyanın en büyük Budist tapınağı Borobudur ve görkemli Hindu tapınağı Prambanan’a (her ikisi UNESCO) açılan kapıdır. Sultan Sarayı ve batik geleneğiyle de zengindir.',
    sources: ['UNESCO World Heritage List — Borobudur / Prambanan Temple Compounds', 'Lonely Planet — Yogyakarta'],
  },

  // --- Vietnam ---
  {
    id: 'hanoi',
    name: 'Hanoi',
    city: 'Hanoi',
    country: 'Vietnam',
    lat: 21.0278,
    lng: 105.8342,
    aliases: ['hanoi'],
    summary:
      'Vietnam’ın bin yıllık başkenti Hanoi; dar sokaklı Eski Mahalle, Hoan Kiem Gölü ve sömürge mimarisiyle çarpıcı bir Doğu-Batı karışımı sunar. Ünlü Ha Long Körfezi’ne açılan kapıdır.',
    sources: ['Lonely Planet — Hanoi', 'Vietnam Turizm — Hanoi'],
  },
  {
    id: 'hochiminh',
    name: 'Ho Chi Minh',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    lat: 10.8231,
    lng: 106.6297,
    aliases: ['ho chi minh', 'saigon', 'hochiminh'],
    summary:
      'Vietnam’ın en canlı kenti Ho Chi Minh (Saigon); sömürge yapıları, Savaş Kalıntıları Müzesi, hareketli pazarları ve yakınındaki Cu Chi tünelleriyle ülkenin dinamik yüzüdür.',
    sources: ['Lonely Planet — Ho Chi Minh City', 'Vietnam Turizm — Ho Chi Minh'],
  },
  {
    id: 'halong',
    name: 'Ha Long Körfezi',
    city: 'Ha Long',
    country: 'Vietnam',
    lat: 20.9101,
    lng: 107.1839,
    aliases: ['ha long', 'halong', 'ha long korfezi'],
    summary:
      'Zümrüt sulardan yükselen binlerce kireçtaşı adasıyla Ha Long Körfezi, dünyanın en büyüleyici deniz manzaralarından biridir (UNESCO). Geleneksel yelkenli teknelerle yapılan turlar bölgenin ruhunu yansıtır.',
    sources: ['UNESCO World Heritage List — Ha Long Bay', 'Lonely Planet — Ha Long Bay'],
  },

  // --- Kamboçya ---
  {
    id: 'siemreap',
    name: 'Siem Reap (Angkor)',
    city: 'Siem Reap',
    country: 'Kamboçya',
    lat: 13.3671,
    lng: 103.8448,
    aliases: ['siem reap', 'angkor', 'angkor wat', 'siemreap'],
    summary:
      'Siem Reap, dünyanın en büyük dinî anıtı Angkor Wat’a ve Khmer İmparatorluğu’nun devasa tapınak-şehrine (UNESCO) açılan kapıdır. Ağaç kökleriyle sarılı Ta Prohm ve gülümseyen yüzleriyle Bayon büyüleyicidir.',
    sources: ['UNESCO World Heritage List — Angkor', 'Lonely Planet — Siem Reap'],
  },

  // --- Singapur ---
  {
    id: 'singapur',
    name: 'Singapur',
    city: 'Singapore',
    country: 'Singapur',
    lat: 1.3521,
    lng: 103.8198,
    aliases: ['singapur', 'singapore'],
    summary:
      'Şehir-devlet Singapur; gökdelenlerin arasındaki fütüristik Gardens by the Bay, çatısında havuz olan Marina Bay Sands ve çok kültürlü mahalleleriyle temizlik, düzen ve modernliğin simgesidir.',
    sources: ['Visit Singapore — resmi turizm portalı', 'Lonely Planet — Singapore'],
  },

  // --- İran ---
  {
    id: 'isfahan',
    name: 'İsfahan',
    city: 'Isfahan',
    country: 'İran',
    lat: 32.6546,
    lng: 51.668,
    aliases: ['isfahan', 'i̇sfahan', 'esfahan'],
    summary:
      '“Dünyanın yarısı” denen İsfahan, İran’ın en görkemli kentidir; dünyanın en büyük meydanlarından Nakş-ı Cihan (UNESCO), çini kubbeli camiler ve tarihî köprüleriyle İslam sanatının doruğunu sergiler.',
    sources: ['UNESCO World Heritage List — Meidan Emam, Esfahan', 'Lonely Planet — Esfahan'],
  },
  {
    id: 'siraz',
    name: 'Şiraz',
    city: 'Shiraz',
    country: 'İran',
    lat: 29.5918,
    lng: 52.5837,
    aliases: ['siraz', 'şiraz', 'shiraz'],
    summary:
      'Şairlerin, güllerin ve şarabın şehri Şiraz; ışıkla oynayan Pembe Cami (Nasır el-Mülk), Hafız ve Sadi’nin türbeleri ve yakınındaki antik Pers başkenti Persepolis’le (UNESCO) İran kültürünün kalbidir.',
    sources: ['UNESCO World Heritage List — Persepolis', 'Lonely Planet — Shiraz'],
  },
  {
    id: 'tahran',
    name: 'Tahran',
    city: 'Tehran',
    country: 'İran',
    lat: 35.6892,
    lng: 51.389,
    aliases: ['tahran', 'tehran', 'teheran'],
    summary:
      'İran’ın başkenti Tahran; Golestan Sarayı (UNESCO), zengin mücevher ve müzeleri ve Elburz Dağları manzarasıyla modern İran’ın canlı merkezidir.',
    sources: ['UNESCO World Heritage List — Golestan Palace', 'Lonely Planet — Tehran'],
  },

  // --- Ürdün ---
  {
    id: 'petra',
    name: 'Petra',
    city: 'Petra (Wadi Musa)',
    country: 'Ürdün',
    lat: 30.3285,
    lng: 35.4444,
    aliases: ['petra', 'wadi musa'],
    summary:
      'Kızıl kayalara oyulmuş antik Nebati kenti Petra, dar bir kanyonun (Siq) sonunda beliren görkemli Hazine (Al-Khazneh) cephesiyle dünyanın yeni yedi harikasından biridir (UNESCO).',
    sources: ['UNESCO World Heritage List — Petra', 'Lonely Planet — Petra'],
  },
  {
    id: 'amman',
    name: 'Amman',
    city: 'Amman',
    country: 'Ürdün',
    lat: 31.9454,
    lng: 35.9284,
    aliases: ['amman'],
    summary:
      'Ürdün’ün başkenti Amman; tepedeki antik Kale (Citadel), iyi korunmuş Roma Tiyatrosu ve canlı çarşılarıyla köklü bir tarihi modern yaşamla birleştirir. Petra, Wadi Rum ve Ölü Deniz’e açılan üstür.',
    sources: ['Visit Jordan — resmi turizm portalı', 'Lonely Planet — Amman'],
  },

  // --- Özbekistan ---
  {
    id: 'semerkand',
    name: 'Semerkand',
    city: 'Samarkand',
    country: 'Özbekistan',
    lat: 39.627,
    lng: 66.975,
    aliases: ['semerkand', 'samarkand', 'samarkant'],
    summary:
      'İpek Yolu’nun incisi Semerkand; turkuaz kubbeleri ve devasa çinili medreseleriyle Registan Meydanı, Timur’un türbesi ve Bibi-Hanım Camii’yle (UNESCO) Orta Asya İslam sanatının en görkemli örneklerini sunar.',
    sources: ['UNESCO World Heritage List — Samarkand – Crossroad of Cultures', 'Lonely Planet — Samarkand'],
  },
  {
    id: 'buhara',
    name: 'Buhara',
    city: 'Bukhara',
    country: 'Özbekistan',
    lat: 39.7747,
    lng: 64.4286,
    aliases: ['buhara', 'bukhara', 'buchara'],
    summary:
      'İki bin yıllık kutsal kervan şehri Buhara; kesintisiz ayakta kalan tarihî merkezi (UNESCO), minareleri, medreseleri ve kubbeli çarşılarıyla âdeta yaşayan bir açık hava müzesidir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Bukhara', 'Lonely Planet — Bukhara'],
  },

  // --- Nepal ---
  {
    id: 'katmandu',
    name: 'Katmandu',
    city: 'Kathmandu',
    country: 'Nepal',
    lat: 27.7172,
    lng: 85.324,
    aliases: ['katmandu', 'kathmandu'],
    summary:
      'Himalayalar’ın eteğindeki Katmandu; oymalı tapınaklarla dolu Durbar Meydanları, kutsal Pashupatinath ve gözlü Boudhanath stupasıyla (UNESCO) Hindu ve Budist mirasın buluştuğu manevi bir vadidir. Everest treklerine açılan kapıdır.',
    sources: ['UNESCO World Heritage List — Kathmandu Valley', 'Lonely Planet — Kathmandu'],
  },

  // --- Güney Kore ---
  {
    id: 'seul',
    name: 'Seul',
    city: 'Seoul',
    country: 'Güney Kore',
    lat: 37.5665,
    lng: 126.978,
    aliases: ['seul', 'seoul'],
    summary:
      'Güney Kore’nin başkenti Seul; görkemli Gyeongbokgung Sarayı ve nöbet töreni, geleneksel Bukchon Hanok köyü ve N Seoul Kulesi ile K-pop çağının parıltısını asırlık mirasla birleştirir.',
    sources: ['Korea Tourism Organization — Seoul', 'Lonely Planet — Seoul'],
  },

  // ================ AVUSTRALYA & OKYANUSYA — ŞEHİRLER ================
  {
    id: 'sydney',
    name: 'Sydney',
    city: 'Sydney',
    country: 'Avustralya',
    lat: -33.8688,
    lng: 151.2093,
    aliases: ['sydney', 'sidney'],
    summary:
      'Avustralya’nın simge kenti Sydney; yelken çatılı ikonik Opera Binası, dev Liman Köprüsü ve ünlü Bondi Plajı’yla dünyanın en güzel doğal limanlarından birine kuruludur.',
    sources: ['UNESCO World Heritage List — Sydney Opera House', 'Lonely Planet — Sydney'],
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    city: 'Melbourne',
    country: 'Avustralya',
    lat: -37.8136,
    lng: 144.9631,
    aliases: ['melbourne'],
    summary:
      'Avustralya’nın kültür ve kahve başkenti Melbourne; sokak sanatlı ara sokakları, viktoryen mimarisi, spor tutkusu ve canlı yeme-içme sahnesiyle sürekli “yaşanabilir şehir” seçilir.',
    sources: ['Lonely Planet — Melbourne', 'Visit Victoria — Melbourne'],
  },
  {
    id: 'cairns',
    name: 'Cairns',
    city: 'Cairns',
    country: 'Avustralya',
    lat: -16.9186,
    lng: 145.7781,
    aliases: ['cairns', 'great barrier reef', 'buyuk set resifi'],
    summary:
      'Tropik kuzey Avustralya’daki Cairns, dünyanın en büyük mercan resifi Büyük Set Resifi’ne (UNESCO) ve yağmur ormanlarına açılan kapıdır. Dalış ve şnorkel cennetidir.',
    sources: ['UNESCO World Heritage List — Great Barrier Reef', 'Lonely Planet — Cairns'],
  },
  {
    id: 'uluru',
    name: 'Uluru',
    city: 'Uluru (Ayers Rock)',
    country: 'Avustralya',
    lat: -25.3444,
    lng: 131.0369,
    aliases: ['uluru', 'ayers rock'],
    summary:
      'Kızıl çölün ortasında yükselen devasa kutsal kaya Uluru, Aborjin kültürünün kalbi ve Avustralya’nın en ikonik doğa anıtıdır (UNESCO). Gün doğumu ve batımında renk değiştirir.',
    sources: ['UNESCO World Heritage List — Uluru-Kata Tjuta National Park', 'Lonely Planet — Uluru'],
  },
  {
    id: 'auckland',
    name: 'Auckland',
    city: 'Auckland',
    country: 'Yeni Zelanda',
    lat: -36.8485,
    lng: 174.7633,
    aliases: ['auckland', 'okland'],
    summary:
      '“Yelkenler Şehri” Auckland, iki limanı ve sönmüş volkan tepeleri arasına kurulu, Yeni Zelanda’nın en büyük kentidir. Sky Tower ve çevredeki adalarla doğa ile şehri birleştirir.',
    sources: ['Lonely Planet — Auckland', 'Tourism New Zealand — Auckland'],
  },
  {
    id: 'queenstown',
    name: 'Queenstown',
    city: 'Queenstown',
    country: 'Yeni Zelanda',
    lat: -45.0312,
    lng: 168.6626,
    aliases: ['queenstown'],
    summary:
      'Dünyanın macera başkenti Queenstown; göl kıyısında, karlı Remarkables dağlarının eteğinde bungee jumping, kayak ve nefes kesen manzaralarıyla ünlüdür. Milford Sound’a açılan kapıdır.',
    sources: ['Lonely Planet — Queenstown', 'Tourism New Zealand — Queenstown'],
  },

  // ===================== AMERİKA — ŞEHİRLER =====================
  // --- ABD ---
  {
    id: 'newyork',
    name: 'New York',
    city: 'New York',
    country: 'Amerika Birleşik Devletleri',
    lat: 40.7128,
    lng: -74.006,
    aliases: ['new york', 'newyork', 'nyc', 'manhattan'],
    summary:
      '“Uyumayan Şehir” New York; Özgürlük Heykeli, Times Square’in ışıkları, Central Park ve gökdelen silüetiyle dünyanın kültür, sanat ve finans başkentlerinden biridir.',
    sources: ['UNESCO World Heritage List — Statue of Liberty', 'Lonely Planet — New York City'],
  },
  {
    id: 'sanfrancisco',
    name: 'San Francisco',
    city: 'San Francisco',
    country: 'Amerika Birleşik Devletleri',
    lat: 37.7749,
    lng: -122.4194,
    aliases: ['san francisco', 'sanfrancisco', 'frisco'],
    summary:
      'Tepeleri, tramvayları ve sisli körfeziyle San Francisco; simge Golden Gate Köprüsü, Alcatraz adası ve renkli mahalleleriyle Kaliforniya’nın en çekici kentlerinden biridir.',
    sources: ['Lonely Planet — San Francisco', 'Visit California — San Francisco'],
  },
  {
    id: 'losangeles',
    name: 'Los Angeles',
    city: 'Los Angeles',
    country: 'Amerika Birleşik Devletleri',
    lat: 34.0522,
    lng: -118.2437,
    aliases: ['los angeles', 'losangeles', 'la', 'hollywood'],
    summary:
      'Sinemanın başkenti Los Angeles; Hollywood tabelası, Walk of Fame, sahilleri ve tema parklarıyla yıldız tozu ve Kaliforniya güneşini bir arada sunar.',
    sources: ['Lonely Planet — Los Angeles', 'Discover Los Angeles — resmi turizm'],
  },
  {
    id: 'lasvegas',
    name: 'Las Vegas',
    city: 'Las Vegas',
    country: 'Amerika Birleşik Devletleri',
    lat: 36.1699,
    lng: -115.1398,
    aliases: ['las vegas', 'lasvegas', 'vegas'],
    summary:
      'Çölün ortasındaki eğlence şehri Las Vegas; ışıltılı Strip’i, temalı dev otelleri ve gösterileriyle 7/24 canlıdır. Grand Canyon ve Hoover Barajı’na açılan üstür.',
    sources: ['Lonely Planet — Las Vegas', 'Visit Las Vegas — resmi turizm'],
  },
  {
    id: 'washington',
    name: 'Washington D.C.',
    city: 'Washington',
    country: 'Amerika Birleşik Devletleri',
    lat: 38.9072,
    lng: -77.0369,
    aliases: ['washington', 'washington dc', 'dc'],
    summary:
      'ABD’nin başkenti Washington D.C.; Capitol, Beyaz Saray, Lincoln Anıtı ve National Mall boyunca sıralanan dünyaca ünlü (ve ücretsiz) Smithsonian müzeleriyle ulusal tarihin merkezidir.',
    sources: ['Lonely Planet — Washington DC', 'Smithsonian — resmi portal'],
  },

  // --- Kanada ---
  {
    id: 'toronto',
    name: 'Toronto',
    city: 'Toronto',
    country: 'Kanada',
    lat: 43.6532,
    lng: -79.3832,
    aliases: ['toronto'],
    summary:
      'Kanada’nın en büyük kenti Toronto; simge CN Tower, göl kıyısı silüeti ve dünyanın en çok kültürlü metropollerinden biri oluşuyla öne çıkar. Niagara Şelalesi’ne açılan kapıdır.',
    sources: ['Lonely Planet — Toronto', 'Destination Toronto — resmi turizm'],
  },
  {
    id: 'vancouver',
    name: 'Vancouver',
    city: 'Vancouver',
    country: 'Kanada',
    lat: 49.2827,
    lng: -123.1207,
    aliases: ['vancouver'],
    summary:
      'Okyanus ile karlı dağlar arasına kurulu Vancouver; Stanley Park, asma köprüleri ve doğa ile iç içe yaşam tarzıyla Kanada’nın en güzel konumlu kentlerindendir.',
    sources: ['Lonely Planet — Vancouver', 'Destination Vancouver — resmi turizm'],
  },
  {
    id: 'montreal',
    name: 'Montreal',
    city: 'Montréal',
    country: 'Kanada',
    lat: 45.5019,
    lng: -73.5674,
    aliases: ['montreal', 'montréal'],
    summary:
      'Kuzey Amerika’nın en Avrupai kentlerinden Montreal; arnavut kaldırımlı Eski Montreal, Notre-Dame Bazilikası ve canlı festival kültürüyle Fransız ve Kuzey Amerika ruhunu harmanlar.',
    sources: ['Lonely Planet — Montréal', 'Tourisme Montréal — resmi turizm'],
  },

  // --- Meksika ---
  {
    id: 'mexicocity',
    name: 'Meksiko',
    city: 'Ciudad de México',
    country: 'Meksika',
    lat: 19.4326,
    lng: -99.1332,
    aliases: ['meksiko', 'mexico city', 'mexico', 'cdmx'],
    summary:
      'Meksika’nın canlı başkenti Meksiko; Aztek başkenti Tenochtitlan üzerine kuruludur. Zócalo meydanı, Antropoloji Müzesi ve yakınındaki dev Teotihuacan piramitleriyle (UNESCO) köklü bir uygarlığı yaşatır.',
    sources: ['UNESCO World Heritage List — Historic Centre of Mexico City / Teotihuacan', 'Lonely Planet — Mexico City'],
  },
  {
    id: 'cancun',
    name: 'Cancún',
    city: 'Cancún',
    country: 'Meksika',
    lat: 21.1619,
    lng: -86.8515,
    aliases: ['cancun', 'cancún', 'riviera maya'],
    summary:
      'Karayipler’in turkuaz sularına açılan Cancún; bembeyaz plajları, Riviera Maya tatil beldeleri ve yakınındaki Maya harikası Chichén Itzá ve Tulum ile deniz ve tarihi birleştirir.',
    sources: ['UNESCO World Heritage List — Chichen-Itza', 'Lonely Planet — Cancún'],
  },

  // --- Küba ---
  {
    id: 'havana',
    name: 'Havana',
    city: 'La Habana',
    country: 'Küba',
    lat: 23.1136,
    lng: -82.3666,
    aliases: ['havana', 'la habana'],
    summary:
      'Zamanın durduğu Havana; klasik Amerikan arabaları, rengârenk sömürge cepheli Eski Havana (UNESCO), malecón sahili ve canlı salsa müziğiyle eşsiz bir atmosfer sunar.',
    sources: ['UNESCO World Heritage List — Old Havana and its Fortifications', 'Lonely Planet — Havana'],
  },

  // --- Brezilya ---
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    city: 'Rio de Janeiro',
    country: 'Brezilya',
    lat: -22.9068,
    lng: -43.1729,
    aliases: ['rio', 'rio de janeiro'],
    summary:
      '“Muhteşem Şehir” Rio de Janeiro; kollarını açan dev Kurtarıcı İsa heykeli, Şeker Somunu Tepesi, Copacabana ve İpanema plajları ve karnavalıyla doğanın ve enerjinin buluştuğu yerdir.',
    sources: ['UNESCO World Heritage List — Rio de Janeiro: Carioca Landscapes', 'Lonely Planet — Rio de Janeiro'],
  },
  {
    id: 'saopaulo',
    name: 'São Paulo',
    city: 'São Paulo',
    country: 'Brezilya',
    lat: -23.5505,
    lng: -46.6333,
    aliases: ['sao paulo', 'são paulo', 'saopaulo'],
    summary:
      'Güney yarımkürenin en büyük metropolü São Paulo; dünya mutfakları, güçlü sanat sahnesi (MASP) ve sınırsız gece hayatıyla Brezilya’nın kültür ve iş merkezidir.',
    sources: ['Lonely Planet — São Paulo', 'Visit São Paulo — resmi turizm'],
  },

  // --- Arjantin ---
  {
    id: 'buenosaires',
    name: 'Buenos Aires',
    city: 'Buenos Aires',
    country: 'Arjantin',
    lat: -34.6037,
    lng: -58.3816,
    aliases: ['buenos aires', 'buenosaires'],
    summary:
      '“Güney Amerika’nın Parisi” Buenos Aires; tango tutkusu, zarif bulvarları, renkli La Boca mahallesi ve ünlü Recoleta Mezarlığı’yla Avrupa şıklığını Latin ruhuyla birleştirir.',
    sources: ['Lonely Planet — Buenos Aires', 'Turismo Buenos Aires — resmi'],
  },

  // --- Peru ---
  {
    id: 'cusco',
    name: 'Cusco (Machu Picchu)',
    city: 'Cusco',
    country: 'Peru',
    lat: -13.5319,
    lng: -71.9675,
    aliases: ['cusco', 'cuzco', 'machu picchu', 'machupicchu'],
    summary:
      'İnka İmparatorluğu’nun başkenti Cusco, bulutların üzerindeki kayıp şehir Machu Picchu’ya (UNESCO) açılan kapıdır. İnka taş duvarları üzerine kurulu sömürge mimarisi ve Kutsal Vadi ile büyüler.',
    sources: ['UNESCO World Heritage List — Historic Sanctuary of Machu Picchu', 'Lonely Planet — Cusco'],
  },
  {
    id: 'lima',
    name: 'Lima',
    city: 'Lima',
    country: 'Peru',
    lat: -12.0464,
    lng: -77.0428,
    aliases: ['lima'],
    summary:
      'Peru’nun başkenti Lima; sömürge dönemi tarihî merkezi (UNESCO), okyanusa bakan Miraflores yamaçları ve dünyaca ünlü mutfağıyla (ceviche) Güney Amerika’nın gastronomi merkezidir.',
    sources: ['UNESCO World Heritage List — Historic Centre of Lima', 'Lonely Planet — Lima'],
  },

  // --- Şili ---
  {
    id: 'santiago',
    name: 'Santiago',
    city: 'Santiago',
    country: 'Şili',
    lat: -33.4489,
    lng: -70.6693,
    aliases: ['santiago', 'santiago sili'],
    summary:
      'And Dağları’nın karlı zirveleri altında uzanan Santiago; canlı meydanları, tepelerden panoramaları ve çevredeki şarap vadileriyle Şili’nin modern ve dinamik başkentidir.',
    sources: ['Lonely Planet — Santiago', 'Chile Travel — Santiago'],
  },

  // --- Kolombiya ---
  {
    id: 'cartagena',
    name: 'Cartagena',
    city: 'Cartagena',
    country: 'Kolombiya',
    lat: 10.391,
    lng: -75.4794,
    aliases: ['cartagena', 'kartagena'],
    summary:
      'Karayip kıyısındaki Cartagena; surlarla çevrili rengârenk sömürge Eski Şehri (UNESCO), çiçekli balkonları ve sıcak Latin atmosferiyle Kolombiya’nın en büyüleyici kentidir.',
    sources: ['UNESCO World Heritage List — Port, Fortresses and Group of Monuments, Cartagena', 'Lonely Planet — Cartagena'],
  },

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

  // --- Arnavutluk & İtalya & Yunanistan rota ek şehirleri ---
  { id: 'tiran', name: 'Tiran', city: 'Tiran', country: 'Arnavutluk', lat: 41.3275, lng: 19.8187, aliases: ['tiran', 'tirana'], summary: 'Arnavutluk’un renkli başkenti Tiran; Skanderbeg Meydanı, Et’hem Bey Camii, komünizm dönemi sığınağı Bunk’Art ve Dajti Dağı teleferiğiyle bilinir.', sources: ['Arnavutluk Ulusal Turizm Ajansı — Tiran', 'Lonely Planet — Tirana'] },
  { id: 'shkoder', name: 'İşkodra (Shkodër)', city: 'İşkodra', country: 'Arnavutluk', lat: 42.0685, lng: 19.5126, aliases: ['shkoder', 'shkodër', 'iskodra', 'işkodra', 'scutari', 'skadar'], summary: 'Arnavutluk’un en eski kentlerinden İşkodra; göle ve nehirlere hâkim Rozafa Kalesi, Marubi Fotoğraf Müzesi ve bisiklet kültürüyle öne çıkar.', sources: ['Arnavutluk Ulusal Turizm Ajansı — Shkodër'] },
  { id: 'lezhe', name: 'Lezhë (Lesh)', city: 'Lezhë', country: 'Arnavutluk', lat: 41.7836, lng: 19.6436, aliases: ['lezhe', 'lezhë', 'lesh', 'leş', 'alessio'], summary: 'Kuzey Arnavutluk’ta tarihî Lezhë (Lesh); ulusal kahraman Skanderbeg’in mezar-anıtının bulunduğu kilise ve tepedeki kalesiyle bilinir.', sources: ['Arnavutluk Ulusal Turizm Ajansı — Lezhë'] },
  { id: 'trieste', name: 'Trieste', city: 'Trieste', country: 'İtalya', lat: 45.6495, lng: 13.7768, aliases: ['trieste', 'triyeste', 'tergeste'], summary: 'İtalya’nın kuzeydoğu ucunda, Slovenya sınırındaki Trieste; bir zamanlar Avusturya-Macaristan İmparatorluğu’nun en önemli limanı olarak Orta Avrupa esintisi taşıyan kozmopolit bir kenttir. Farklı kültürlerin, dinlerin ve edebiyatların buluştuğu bir sınır şehridir.\n\nDenize açılan görkemli Piazza Unità d’Italia, körfeze tepeden bakan bembeyaz Miramare Şatosu, Roma tiyatrosu kalıntıları ve James Joyce ile Italo Svevo’nun uğrağı tarihî kahvehaneleriyle Trieste, kahve ve edebiyat kültürüyle anılır.', sources: ['Italia.it — Trieste'] },
  { id: 'treviso', name: 'Treviso', city: 'Treviso', country: 'İtalya', lat: 45.6669, lng: 12.2431, aliases: ['treviso'], summary: 'Venedik’in yalnızca yarım saat kuzeyindeki Treviso; su kanalları, freskli evleri ve surlarla çevrili tarihî merkeziyle çoğu zaman gözden kaçan bir Veneto incisidir. Prosecco köpüklü şarabının ve tiramisu tatlısının anavatanı sayılır.\n\nKemer altı yolları, kanal kıyısındaki eski su değirmenleri ve kalbindeki Piazza dei Signori meydanıyla kent, kalabalıklardan uzak sakin bir İtalyan atmosferi sunar. Çevredeki Prosecco bağları UNESCO Dünya Mirası kapsamındadır.', sources: ['Italia.it — Treviso'] },
  { id: 'pisa', name: 'Pisa', city: 'Pisa', country: 'İtalya', lat: 43.7228, lng: 10.3966, aliases: ['pisa'], summary: 'Toskana’da Arno Nehri kıyısındaki Pisa, Orta Çağ’da güçlü bir deniz cumhuriyetiydi ve dünyanın en tanınmış yapılarından birine ev sahipliği yapar. “Mucizeler Meydanı” (Piazza dei Miracoli) UNESCO Dünya Mirası Listesi’ndedir.\n\nZemininin çökmesiyle eğilen ünlü Çan Kulesi’nin (Eğik Kule) yanı sıra meydandaki görkemli katedral, yuvarlak vaftizhane ve anıtsal mezarlık da görülmeye değerdir. Köklü üniversitesiyle Pisa aynı zamanda canlı bir öğrenci kentidir.', sources: ['UNESCO World Heritage List — Piazza del Duomo, Pisa'] },
  { id: 'bari', name: 'Bari', city: 'Bari', country: 'İtalya', lat: 41.1171, lng: 16.8719, aliases: ['bari'], summary: 'Güney İtalya’da Puglia bölgesinin başkenti Bari, Adriyatik kıyısındaki hareketli bir liman ve feribot kentidir. Yunanistan ile Balkanlar’a açılan konumu, onu yüzyıllardır bir kavşak noktası kılmıştır.\n\nLabirent gibi dar sokaklarıyla eski şehir Bari Vecchia’da kadınlar hâlâ kapı önünde el yapımı orecchiette makarnası açar. Aziz Nikolaos’un (Noel Baba’nın esin kaynağı) kutsal emanetlerini barındıran görkemli bazilika, kenti Ortodoks dünyası için önemli bir hac merkezine dönüştürür.', sources: ['Italia.it — Bari'] },
  { id: 'igumenitsa', name: 'İgumenitsa', city: 'İgumenitsa', country: 'Yunanistan', lat: 39.504, lng: 20.266, aliases: ['igumenitsa', 'igoumenitsa', 'igoumenitza', 'lgumemiça', 'igumenice'], summary: 'Yunanistan’ın kuzeybatısındaki liman kenti İgumenitsa; İtalya ve Korfu feribotlarının kalkış noktası, çevresindeki koy ve plajlarıyla bir geçiş durağıdır.', sources: ['Visit Greece — Igoumenitsa'] },
  { id: 'kavala', name: 'Kavala', city: 'Kavala', country: 'Yunanistan', lat: 40.9397, lng: 24.4019, aliases: ['kavala', 'kavála', 'neapolis'], summary: 'Kuzey Yunanistan’ın liman kenti Kavala; yamaçtaki Panagia eski mahallesi, kemerli Kamares su kemeri, Mehmet Ali Paşa’nın doğduğu ev ve İmaret külliyesiyle güçlü Osmanlı izleri taşır.', sources: ['Visit Greece — Kavala'] },
  { id: 'ljubljana', name: 'Ljubljana', city: 'Ljubljana', country: 'Slovenya', lat: 46.0569, lng: 14.5058, aliases: ['ljubljana', 'lübliyana', 'lubliyana', 'laybach'], summary: 'Slovenya’nın şirin başkenti Ljubljana; tepedeki kalesi, Ljubljanica Nehri kıyısı kafeleri, mimar Plečnik’in Üç Köprü’sü ve ejderha figürleriyle yaya dostu, yeşil bir Orta Avrupa kentidir.', sources: ['Slovenya Turizm Kurulu (I Feel Slovenia) — Ljubljana', 'Lonely Planet — Ljubljana'] },
  { id: 'bled', name: 'Bled Gölü', city: 'Bled', country: 'Slovenya', lat: 46.3683, lng: 14.1146, aliases: ['bled', 'bled gölü', 'bled golu', 'blejsko jezero', 'bled lake'], summary: 'Julian Alpleri eteğindeki Bled; ortasında kilise bulunan adası, gölü çevreleyen uçurumdaki Bled Kalesi ve geleneksel pletna tekneleriyle Slovenya’nın kartpostal simgesidir.', sources: ['Slovenya Turizm Kurulu (I Feel Slovenia) — Bled', 'Lonely Planet — Lake Bled'] },
  { id: 'sirmione', name: 'Sirmione', city: 'Sirmione', country: 'İtalya', lat: 45.4949, lng: 10.606, aliases: ['sirmione', 'garda sirmione'], summary: 'Garda Gölü’nün güneyinde göle doğru uzanan ince bir yarımadanın ucundaki Sirmione, sularla çevrili masalsı konumuyla İtalya’nın en sevilen göl kasabalarından biridir. Antik çağlardan beri termal kaplıcalarıyla ünlüdür.\n\nKasabanın girişini koruyan, su üstüne kurulu Scaliger Kalesi ve yarımadanın ucundaki devasa Roma villası kalıntıları “Catullus Mağaraları” başlıca cazibelerdir. Dar sokakları, dondurmacıları ve göl manzaralı kıyısıyla Sirmione huzurlu bir kaçamak sunar.', sources: ['Italia.it — Sirmione', 'Lonely Planet — Sirmione'] },
  // --- İtalya ara/geçiş durakları ---
  { id: 'verona', name: 'Verona', city: 'Verona', country: 'İtalya', lat: 45.4384, lng: 10.9916, aliases: ['verona'], summary: 'Adige Nehri’nin kıvrımına kurulu Verona, Shakespeare’in “Romeo ve Juliet” trajedisine sahne olmasıyla dünya çapında ün kazanmış romantik bir kenttir. Roma’dan Orta Çağ’a uzanan zengin geçmişiyle tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.\n\nHer yaz opera festivaline ev sahipliği yapan olağanüstü korunmuş Roma Arenası, efsanevi Juliet’in balkonu ve zarif Piazza delle Erbe meydanı kentin başlıca noktalarıdır. Verona ayrıca Garda Gölü’ne açılan bir kapıdır.', sources: ['UNESCO World Heritage List — City of Verona', 'Italia.it — Verona'] },
  { id: 'padova', name: 'Padova', city: 'Padova', country: 'İtalya', lat: 45.4064, lng: 11.8768, aliases: ['padova', 'padua'], summary: 'Venedik’in hemen batısındaki Padova (Padua), İtalya’nın en eski üniversite kentlerinden biridir; Galileo’nun da ders verdiği üniversitesi 1222’de kurulmuştur. Sanat ve bilim geleneğiyle köklü bir kültür merkezidir.\n\nGiotto’nun çığır açan fresklerini barındıran Scrovegni Şapeli (UNESCO), büyük bir hac merkezi olan Aziz Antonio Bazilikası ve dünyanın en eski akademik botanik bahçelerinden biri kentin hazineleridir. Geniş meydanları ve kemer altı yollarıyla Padova canlı bir öğrenci atmosferi taşır.', sources: ['UNESCO World Heritage List — Padua’s fourteenth-century fresco cycles', 'Italia.it — Padova'] },
  { id: 'vicenza', name: 'Vicenza', city: 'Vicenza', country: 'İtalya', lat: 45.5455, lng: 11.5354, aliases: ['vicenza'], summary: 'Kuzey İtalya’da Vicenza, 16. yüzyıl mimarı Andrea Palladio’nun kentidir; onun klasik oranlara dayalı üslubu tüm dünyada “Palladyan” mimariyi doğurmuştur. Kentin kendisi ve çevresindeki villalar UNESCO Dünya Mirası Listesi’ndedir.\n\nPalladio’nun ahşap sahne dekoruyla dünyanın en eski kapalı tiyatrolarından Teatro Olimpico, şehir meydanındaki Basilica Palladiana ve tepedeki Villa La Rotonda başlıca eserleridir. Vicenza aynı zamanda köklü bir kuyumculuk ve altın işleme merkezidir.', sources: ['UNESCO World Heritage List — City of Vicenza and the Palladian Villas of the Veneto'] },
  { id: 'bologna', name: 'Bologna', city: 'Bologna', country: 'İtalya', lat: 44.4949, lng: 11.3426, aliases: ['bologna'], summary: 'Emilia-Romagna’nın başkenti Bologna, 1088’de kurulan ve dünyanın en eski üniversitesine ev sahipliği yapan canlı bir öğrenci kentidir. Kızıl tuğlalı yapıları nedeniyle “la Rossa”, köklü mutfağı nedeniyle “la Grassa” (bereketli) lakaplarıyla anılır.\n\nKilometrelerce uzanan tarihî kemer altı yolları (portici) UNESCO Dünya Mirası Listesi’ndedir. Devasa Piazza Maggiore meydanı, göğe yükselen iki eğik kule (Asinelli ve Garisenda) ve tagliatelle, tortellini gibi lezzetleriyle Bologna İtalyan mutfağının kalbidir.', sources: ['UNESCO World Heritage List — The Porticoes of Bologna', 'Italia.it — Bologna'] },
  { id: 'bergamo', name: 'Bergamo', city: 'Bergamo', country: 'İtalya', lat: 45.6983, lng: 9.6773, aliases: ['bergamo'], summary: 'Milano’nun kuzeydoğusundaki Bergamo, iki farklı yüzü olan bir kenttir: ovadaki modern aşağı şehir (Città Bassa) ve tepede Venedik surlarıyla çevrili büyüleyici tarihî üst şehir (Città Alta). Surlar UNESCO Dünya Mirası kapsamındadır.\n\nBir füniküler ile ulaşılan Città Alta’da zarif Piazza Vecchia meydanı, Colleoni Şapeli ve Santa Maria Maggiore Bazilikası bulunur. Dar taş sokakları ve panoramik teraslarıyla Bergamo, Alpler’e ve göllere açılan keyifli bir duraktır.', sources: ['Italia.it — Bergamo'] },
  { id: 'como', name: 'Como Gölü', city: 'Como', country: 'İtalya', lat: 45.8081, lng: 9.0852, aliases: ['como', 'como gölü', 'lago di como', 'lake como', 'bellagio'], summary: 'Alpler’in eteğinde buzul oyuğunda uzanan ters Y biçimli Como Gölü, İtalya’nın en derin ve en zarif göllerinden biridir. Yüzyıllardır aristokratları, sanatçıları ve günümüzde ünlüleri kıyısındaki villalara çeken bir cazibe merkezidir.\n\nGöl kıyısındaki Bellagio, Varenna ve Menaggio gibi renkli kasabalar; görkemli bahçeleriyle Villa del Balbianello ve Villa Carlotta ile tekne turları başlıca deneyimlerdir. Karlı dağların suya yansıdığı manzarası, gölü İtalya’nın en romantik köşelerinden biri yapar.', sources: ['Italia.it — Lago di Como'] },
  { id: 'bolzano', name: 'Bolzano', city: 'Bolzano', country: 'İtalya', lat: 46.4983, lng: 11.3548, aliases: ['bolzano', 'bozen'], summary: 'Güney Tirol’ün (Alto Adige) başkenti Bolzano, İtalyan ve Cermen kültürlerinin iç içe geçtiği, Dolomitler’e açılan bir Alp kentidir. Sokaklarında hem İtalyanca hem Almanca konuşulur; mimarisi ve mutfağı bu ikili kimliği yansıtır.\n\nKentin en ünlü sakini, buzulda donmuş halde bulunan 5.300 yıllık “Buz Adamı Ötzi”dir ve Güney Tirol Arkeoloji Müzesi’nde sergilenir. Kemerli Via dei Portici çarşısı, meydan pazarı ve çevredeki üzüm bağlarıyla Bolzano, dağ yürüyüşleri için ideal bir üstür.', sources: ['Italia.it — Bolzano'] },
  { id: 'trento', name: 'Trento', city: 'Trento', country: 'İtalya', lat: 46.0679, lng: 11.1211, aliases: ['trento', 'trent'], summary: 'Adige Vadisi’nde, Dolomitler’in eteğinde kurulu Trento, İtalyan ve Alp kültürünün buluştuğu zarif bir kenttir. 16. yüzyılda Katolik Kilisesi’nin kaderini belirleyen Trento Konsili’ne ev sahipliği yapmasıyla tarihe geçmiştir.\n\nFreskli cepheleriyle ünlü tarihî merkezinde, prens-piskoposların ikametgâhı görkemli Castello del Buonconsiglio ve Konsil kararlarının alındığı katedral öne çıkar. Çevresindeki dağlar, üzüm bağları ve kayak merkezleriyle Trento doğa ile kültürü birleştirir.', sources: ['Italia.it — Trento'] },
  { id: 'siena', name: 'Siena', city: 'Siena', country: 'İtalya', lat: 43.3188, lng: 11.3308, aliases: ['siena'], summary: 'Toskana tepelerine kurulu Siena, Orta Çağ’da Floransa’nın büyük rakibi olan zengin bir cumhuriyetti; olağanüstü korunmuş gotik kent dokusu bu altın çağı bugüne taşır. Tarihî merkezi bütünüyle UNESCO Dünya Mirası Listesi’ndedir.\n\nDeniz kabuğu biçimli, eğimli Piazza del Campo meydanı kentin kalbidir ve yılda iki kez düzenlenen efsanevi Palio at yarışına sahne olur. Alacalı siyah-beyaz mermer katedrali ve dar ortaçağ sokaklarıyla Siena, adeta zamanda donmuş bir açık hava müzesidir.', sources: ['UNESCO World Heritage List — Historic Centre of Siena'] },
  { id: 'sangimignano', name: 'San Gimignano', city: 'San Gimignano', country: 'İtalya', lat: 43.4674, lng: 11.0431, aliases: ['san gimignano', 'sangimignano'], summary: 'Toskana’nın üzüm bağları arasında bir tepeye kurulu San Gimignano, göğe yükselen ortaçağ taş kuleleriyle “Ortaçağ’ın Manhattan’ı” olarak anılır. Bir zamanlar 70’i aşan kuleden bugün 14’ü ayakta kalmıştır ve kasaba UNESCO korumasındadır.\n\nZengin ailelerin güç gösterisi olarak yükselttiği bu kuleler, kasabaya benzersiz bir siluet kazandırır. Meydanları, sarnıcı ve yerel beyaz şarabı Vernaccia di San Gimignano ile kasaba, Toskana kırsalının en fotojenik duraklarından biridir.', sources: ['UNESCO World Heritage List — Historic Centre of San Gimignano'] },
  { id: 'lucca', name: 'Lucca', city: 'Lucca', country: 'İtalya', lat: 43.843, lng: 10.5027, aliases: ['lucca'], summary: 'Toskana’da, tümüyle sağlam kalmış görkemli Rönesans surlarıyla çevrili Lucca, surların üstünde ağaçlı bir yürüyüş ve bisiklet parkuru bulunan ender kentlerden biridir. Antik Roma dokusunu koruyan sokakları bugün de canlıdır.\n\nRoma amfitiyatrosunun izinden şekillenen oval Piazza dell’Anfiteatro meydanı, çan kuleleri ve kiliseleriyle kent büyüleyicidir. Besteci Giacomo Puccini’nin doğduğu şehir olan Lucca, her yaz müzik etkinlikleriyle de anılır.', sources: ['Italia.it — Lucca'] },
  { id: 'cinqueterre', name: 'Cinque Terre', city: 'Cinque Terre', country: 'İtalya', lat: 44.1069, lng: 9.7292, aliases: ['cinque terre', 'cinqueterre', 'riomaggiore', 'vernazza', 'manarola'], summary: 'Ligurya kıyısında sarp uçurumlara tutunmuş beş renkli balıkçı köyünden (Monterosso, Vernazza, Corniglia, Manarola, Riomaggiore) oluşan Cinque Terre, İtalyan Rivierası’nın en büyüleyici köşelerinden biridir. Bölge hem UNESCO Dünya Mirası hem millî park statüsündedir.\n\nYüzyıllar içinde elle örülen taş teraslarda üzüm ve limon yetiştirilir; köyleri birbirine bağlayan uçurum kenarı patikalar (özellikle “Aşk Yolu”) muhteşem deniz manzaraları sunar. Renkli evler, küçük limanlar ve taze deniz ürünleriyle köyler bir kartpostal gibidir.', sources: ['UNESCO World Heritage List — Portovenere, Cinque Terre'] },
  { id: 'rimini', name: 'Rimini', city: 'Rimini', country: 'İtalya', lat: 44.0594, lng: 12.5683, aliases: ['rimini'], summary: 'Adriyatik kıyısındaki Rimini, geniş kumsalları ve hareketli sahil hayatıyla İtalya’nın en popüler tatil kentlerinden biri olsa da köklü bir Roma geçmişine sahiptir. Yönetmen Federico Fellini’nin doğduğu şehir olmasıyla da anılır.\n\nMÖ 1. yüzyıla ait, hâlâ kullanılan Tiberius Köprüsü ve kente giren Augustus Takı, antik dönemden kalan görkemli anıtlardır. Uzun plajları ve eğlence hayatının yanı sıra Rimini, dünyanın en küçük devletlerinden San Marino’ya açılan bir kapıdır.', sources: ['Italia.it — Rimini'] },
  // --- Slovenya / Hırvatistan / Adriyatik ara duraklar ---
  { id: 'maribor', name: 'Maribor', city: 'Maribor', country: 'Slovenya', lat: 46.5547, lng: 15.6459, aliases: ['maribor'], summary: 'Slovenya’nın ikinci kenti Maribor; dünyanın en yaşlı asması, Drava kıyısı Lent semti ve yakın kayak/bağ bölgeleriyle bilinir.', sources: ['I Feel Slovenia — Maribor'] },
  { id: 'postojna', name: 'Postojna', city: 'Postojna', country: 'Slovenya', lat: 45.7756, lng: 14.2136, aliases: ['postojna', 'postojna magarasi', 'predjama'], summary: 'Postojna; trenle gezilen devasa damlataş mağarası ve uçuruma oyulmuş Predjama Kalesiyle Slovenya’nın en çok ziyaret edilen doğa duraklarındandır.', sources: ['I Feel Slovenia — Postojna Cave'] },
  { id: 'piran', name: 'Piran', city: 'Piran', country: 'Slovenya', lat: 45.5285, lng: 13.5683, aliases: ['piran'], summary: 'Slovenya’nın kısa Adriyatik kıyısındaki Piran; Venedik izli taş sokakları, Tartini Meydanı ve deniz surlarıyla korunmuş bir liman kasabasıdır.', sources: ['I Feel Slovenia — Piran'] },
  { id: 'rovinj', name: 'Rovinj', city: 'Rovinj', country: 'Hırvatistan', lat: 45.0811, lng: 13.6387, aliases: ['rovinj', 'rovigno'], summary: 'İstria’nın en fotojenik kasabası Rovinj; denizden yükselen Aziz Euphemia Kilisesi, renkli balıkçı evleri ve dar sokaklarıyla ünlüdür.', sources: ['Croatia.hr — Rovinj'] },
  { id: 'pula', name: 'Pula', city: 'Pula', country: 'Hırvatistan', lat: 44.8666, lng: 13.8496, aliases: ['pula', 'pola'], summary: 'İstria’nın ucundaki Pula; dünyanın en iyi korunan Roma amfitiyatrolarından biri (Arena), Augustus Tapınağı ve sahilleriyle bilinir.', sources: ['Croatia.hr — Pula'] },
  { id: 'plitvice', name: 'Plitvice Gölleri', city: 'Plitvice', country: 'Hırvatistan', lat: 44.8654, lng: 15.582, aliases: ['plitvice', 'plitvice golleri', 'plitvice lakes', 'plitvicka'], summary: 'Hırvatistan’ın simge milli parkı Plitvice; birbirine şelalelerle bağlanan turkuaz teraslı göller ve ahşap patikalarıyla UNESCO Dünya Mirasıdır.', sources: ['UNESCO World Heritage List — Plitvice Lakes National Park'] },
  { id: 'split', name: 'Split', city: 'Split', country: 'Hırvatistan', lat: 43.5081, lng: 16.4402, aliases: ['split', 'spalato'], summary: 'Dalmaçya’nın kalbi Split; içinde koca bir kentin yaşadığı Diocletianus Sarayı (UNESCO), rıhtımı (Riva) ve adalara açılan limanıyla bilinir.', sources: ['UNESCO World Heritage List — Historical Complex of Split with the Palace of Diocletian'] },
  { id: 'sibenik', name: 'Šibenik', city: 'Šibenik', country: 'Hırvatistan', lat: 43.735, lng: 15.8952, aliases: ['sibenik', 'şibenik'], summary: 'Dalmaçya sahilinde Šibenik; tümüyle taştan yapılmış Aziz Yakup Katedrali (UNESCO), kaleleri ve yakın Krka Şelaleleriyle bilinir.', sources: ['UNESCO World Heritage List — The Cathedral of St James in Šibenik'] },
  { id: 'trogir', name: 'Trogir', city: 'Trogir', country: 'Hırvatistan', lat: 43.515, lng: 16.2517, aliases: ['trogir', 'trau'], summary: 'Küçük bir ada üzerindeki Trogir; Romanesk-gotik dokusu ve Aziz Lawrence Katedraliyle bütünüyle UNESCO korumalı ortaçağ kentidir.', sources: ['UNESCO World Heritage List — Historic City of Trogir'] },
  { id: 'opatija', name: 'Opatija', city: 'Opatija', country: 'Hırvatistan', lat: 45.3378, lng: 14.3053, aliases: ['opatija', 'abbazia'], summary: 'Kvarner Körfezi’nin belle époque tatil kasabası Opatija; villaları, Lungomare sahil yürüyüşü ve “Denizkızı” heykeliyle zarif bir duraktır.', sources: ['Croatia.hr — Opatija'] },
  // --- Almanya ara/geçiş durakları ---
  { id: 'regensburg', name: 'Regensburg', city: 'Regensburg', country: 'Almanya', lat: 49.0134, lng: 12.1016, aliases: ['regensburg'], summary: 'Tuna Nehri kıyısındaki Regensburg, İkinci Dünya Savaşı’ndan neredeyse hasarsız çıkan, Almanya’nın en iyi korunmuş ortaçağ kentlerinden biridir. Roma döneminden Orta Çağ’a uzanan dokusuyla tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.\n\n12. yüzyıldan kalma ünlü Taş Köprü (Steinerne Brücke), göğe yükselen gotik Aziz Petrus Katedrali ve dar sokaklardaki patrisyen kuleleri kenti büyüleyici kılar. Tuna kıyısı bira bahçeleri ve öğrenci nüfusuyla Regensburg canlı bir Bavyera kentidir.', sources: ['UNESCO World Heritage List — Old town of Regensburg with Stadtamhof'] },
  { id: 'nurnberg', name: 'Nürnberg', city: 'Nürnberg', country: 'Almanya', lat: 49.4521, lng: 11.0767, aliases: ['nurnberg', 'nürnberg', 'nuremberg'], summary: 'Bavyera’nın ikinci büyük kenti Nürnberg, Orta Çağ’da Kutsal Roma İmparatorluğu’nun en önemli merkezlerinden biriydi; sanatçı Albrecht Dürer’in de memleketidir. 20. yüzyılda ise Nazi mitingleri ve savaş sonrası Nürnberg Duruşmaları’yla tarihe geçmiştir.\n\nTepedeki görkemli İmparatorluk Kalesi, yarım ahşap evli eski şehir, Dürer’in evi ve Nazi dönemini anlatan Belgeleme Merkezi başlıca duraklardır. Kışın kurulan asırlık Christkindlesmarkt, dünyanın en ünlü Noel pazarlarından biridir.', sources: ['Germany.travel — Nuremberg'] },
  { id: 'wurzburg', name: 'Würzburg', city: 'Würzburg', country: 'Almanya', lat: 49.7913, lng: 9.9534, aliases: ['wurzburg', 'würzburg'], summary: 'Franken bölgesinde, Main Nehri kıyısındaki Würzburg, ünlü “Romantik Yol”un kuzey başlangıç noktasıdır ve şarap kültürüyle anılan zarif bir barok kenttir. Prens-piskoposların yönetiminde görkemli bir sanat merkezi olmuştur.\n\nTiepolo’nun dünyanın en büyük tavan freskini yaptığı görkemli Residenz Sarayı UNESCO Dünya Mirası Listesi’ndedir. Nehre hâkim Marienberg Kalesi, Eski Ana Köprü ve çevredeki bağlarda üretilen Franken şarapları kenti tamamlar.', sources: ['UNESCO World Heritage List — Würzburg Residence'] },
  { id: 'rothenburg', name: 'Rothenburg ob der Tauber', city: 'Rothenburg', country: 'Almanya', lat: 49.3775, lng: 10.1789, aliases: ['rothenburg', 'rothenburg ob der tauber'], summary: 'Romantik Yol’un en sevilen durağı Rothenburg ob der Tauber, surlarıyla tümüyle çevrili, yarım ahşap evleri ve taş sokaklarıyla adeta bir masal kitabından çıkmış ortaçağ kasabasıdır. Zamanın donduğu bu doku, dünyanın dört bir yanından ziyaretçi çeker.\n\nSur boyunca yapılan yürüyüş, meydandaki belediye binası, Plönlein’ın ünlü kartpostal köşesi ve yıl boyu açık Noel dükkânı kasabanın simgeleridir. Franken şarabı ve geleneksel Schneeball tatlısıyla Rothenburg, geçmişe yolculuk gibidir.', sources: ['Germany.travel — Rothenburg ob der Tauber'] },
  { id: 'fussen', name: 'Füssen (Neuschwanstein)', city: 'Füssen', country: 'Almanya', lat: 47.5716, lng: 10.7017, aliases: ['fussen', 'füssen', 'neuschwanstein', 'schwangau'], summary: 'Bavyera Alpleri’nin eteğinde, Avusturya sınırına yakın Füssen, dünyanın en ünlü şatolarına açılan kapı olan şirin bir dağ kasabasıdır. Göller ve karlı zirvelerle çevrili konumu onu doğa tutkunları için de cazip kılar.\n\nKral II. Ludwig’in masalsı Neuschwanstein Şatosu (Disney kalelerine ilham veren yapı) ve sarı Hohenschwangau Şatosu hemen yakınındadır. Renkli tarihî merkezi, Lech Nehri ve çevredeki Alp gölleriyle Füssen, Romantik Yol’un görkemli finalidir.', sources: ['Germany.travel — Neuschwanstein / Füssen'] },
  { id: 'heidelberg', name: 'Heidelberg', city: 'Heidelberg', country: 'Almanya', lat: 49.3988, lng: 8.6724, aliases: ['heidelberg'], summary: 'Neckar Nehri vadisinde kurulu Heidelberg, romantizm çağının şairlerine ilham vermiş, Almanya’nın en eski (1386) üniversitesine ev sahipliği yapan büyüleyici bir kenttir. Savaştan sağ çıkan tarihî merkezi bugün de canlıdır.\n\nŞehre tepeden bakan yıkık kızıl kumtaşı kalesi, Neckar üzerindeki zarif Eski Köprü ve karşı yamaçtaki manzaralı “Filozoflar Yolu” kentin simgeleridir. Öğrenci enerjisi, tarihî meyhaneleri ve romantik atmosferiyle Heidelberg unutulmaz bir duraktır.', sources: ['Germany.travel — Heidelberg'] },
  { id: 'dresden', name: 'Dresden', city: 'Dresden', country: 'Almanya', lat: 51.0504, lng: 13.7373, aliases: ['dresden'], summary: 'Elbe Nehri kıyısındaki Dresden, görkemli barok mimarisiyle “Elbe’nin Floransası” olarak anılır. 1945’teki yıkıcı bombardımanın ardından tarihî merkezi büyük bir titizlikle yeniden inşa edilerek geçmişin ihtişamına kavuşturulmuştur.\n\nUzun süre harabe kalıp yeniden ayağa kaldırılan Frauenkirche, avlusuyla Zwinger sarayı, Semperoper opera binası ve dünyaca ünlü sanat koleksiyonlarıyla kent bir barok hazinesidir. Elbe kıyısı terasları (“Avrupa’nın Balkonu”) da görülmeye değerdir.', sources: ['Germany.travel — Dresden'] },
  { id: 'leipzig', name: 'Leipzig', city: 'Leipzig', country: 'Almanya', lat: 51.3397, lng: 12.3731, aliases: ['leipzig'], summary: 'Doğu Almanya’nın canlı kültür ve müzik kenti Leipzig, Johann Sebastian Bach’ın uzun yıllar çalıştığı bir müzik başkentidir. 1989’da komünist rejimin sonunu getiren barışçıl “Pazartesi Gösterileri” de burada başlamıştır.\n\nBach’ın mezarını barındıran Thomaskirche, zarif tarihî alışveriş pasajları, çağdaş sanat sahnesi ve devasa Uluslar Savaşı Anıtı başlıca duraklardır. Ticaret fuarları, yaratıcı semtleri ve öğrenci nüfusuyla Leipzig yeniden yükselen bir merkezdir.', sources: ['Germany.travel — Leipzig'] },
  { id: 'badenbaden', name: 'Baden-Baden', city: 'Baden-Baden', country: 'Almanya', lat: 48.7606, lng: 8.2396, aliases: ['baden-baden', 'baden baden', 'badenbaden'], summary: 'Kara Orman’ın eteğinde kurulu Baden-Baden, antik Romalılardan bu yana termal kaynaklarıyla ünlü zarif bir kaplıca kentidir. 19. yüzyılda Avrupa aristokrasisinin gözde “yazlık başkenti” olmuştur.\n\nTarihî Friedrichsbad ve modern Caracalla termal hamamları, görkemli Kurhaus kumarhanesi, zarif parklar ve Lichtentaler Allee ağaçlıklı yürüyüş yolu kentin simgeleridir. Festival salonu, at yarışları ve şık atmosferiyle Baden-Baden klasik bir dinlence durağıdır.', sources: ['Germany.travel — Baden-Baden'] },
  { id: 'freiburg', name: 'Freiburg', city: 'Freiburg', country: 'Almanya', lat: 47.999, lng: 7.8421, aliases: ['freiburg', 'freiburg im breisgau'], summary: 'Kara Orman’ın güney kapısı Freiburg, Almanya’nın en güneşli ve en çevreci kentlerinden biridir; canlı bir üniversite kenti olarak genç ve dinamik bir ruh taşır. Ortaçağ dokusu savaş sonrası özenle korunmuştur.\n\nGöğe yükselen kırmızı kumtaşı kulesiyle gotik Freiburg Münster katedrali, sokak kenarlarından şırıl şırıl akan tarihî su kanalları (Bächle) ve renkli meydan pazarı kenti büyüleyici kılar. Çevresindeki bağlar, ormanlar ve yürüyüş yollarıyla Freiburg doğaya açılır.', sources: ['Germany.travel — Freiburg'] },
  // --- İsviçre & Doğu Fransa ara durakları ---
  { id: 'bern', name: 'Bern', city: 'Bern', country: 'İsviçre', lat: 46.948, lng: 7.4474, aliases: ['bern', 'berne'], summary: 'İsviçre’nin başkenti Bern, Aare Nehri’nin bir kıvrımının çevrelediği yarımadaya kurulu, olağanüstü korunmuş ortaçağ dokusuyla UNESCO Dünya Mirası Listesi’nde yer alan zarif bir kenttir. Sakin ve düzenli havasıyla ülkenin siyasi kalbidir.\n\nAltı kilometreyi bulan kemer altı arkatlı alışveriş sokakları, hareketli figürlü Zytglogge saat kulesi, gotik katedrali ve kentin simgesi ayıların yaşadığı park başlıca cazibelerdir. Albert Einstein’ın görelilik kuramını geliştirdiği ev de ziyaret edilebilir.', sources: ['UNESCO World Heritage List — Old City of Berne', 'MySwitzerland — Bern'] },
  { id: 'cenevre', name: 'Cenevre', city: 'Cenevre', country: 'İsviçre', lat: 46.2044, lng: 6.1432, aliases: ['cenevre', 'geneva', 'geneve', 'genf'], summary: 'Léman Gölü’nün güneybatı ucunda, Fransa sınırında kurulu Cenevre, Birleşmiş Milletler’in Avrupa merkezi ve Kızılhaç’ın doğduğu yer olarak dünya diplomasisinin başkentlerinden biridir. Kozmopolit ve zarif bir uluslararası kenttir.\n\nGöl üzerinde 140 metre yükselen su fıskiyesi Jet d’Eau kentin simgesidir; dar sokaklı Eski Şehir, katedrali ve çiçek saati de görülmeye değerdir. Göl kıyısı gezileri, lüks saat mağazaları ve BM binası turlarıyla Cenevre uluslararası bir cazibe sunar.', sources: ['MySwitzerland — Geneva'] },
  { id: 'lausanne', name: 'Lausanne', city: 'Lausanne', country: 'İsviçre', lat: 46.5197, lng: 6.6323, aliases: ['lausanne'], summary: 'Léman Gölü’ne bakan yamaçlara kurulu Lausanne, İsviçre’nin Fransızca konuşulan bölgesinin canlı üniversite ve kültür kentidir. Aynı zamanda Uluslararası Olimpiyat Komitesi’nin merkezi olarak “Olimpiyat Başkenti” unvanını taşır.\n\nGöğe uzanan gotik katedrali, göl kıyısındaki keyifli Ouchy semti ve modern Olimpiyat Müzesi başlıca duraklardır. Dik sokakları, metrosu ve göl manzarasıyla Lausanne, çevredeki Lavaux bağları (UNESCO) için de mükemmel bir üstür.', sources: ['MySwitzerland — Lausanne'] },
  { id: 'montreux', name: 'Montreux', city: 'Montreux', country: 'İsviçre', lat: 46.4312, lng: 6.9107, aliases: ['montreux'], summary: 'Léman Gölü’nün doğu ucunda, dağların koruduğu ılıman bir mikroklime sahip Montreux, palmiyeli sahil promenadıyla “İsviçre Rivierası”nın incisidir. Yıllardır sanatçıları ve müzikseverleri kendine çekmiştir.\n\nGöl kıyısında bir kayalığa kurulu, İsviçre’nin en çok ziyaret edilen tarihî yapısı Chillon Şatosu kentin simgesidir. Çiçeklerle bezeli göl yürüyüş yolu ve dünyaca ünlü Montreux Caz Festivali kenti canlı kılar; Freddie Mercury’nin heykeli de burada göle bakar.', sources: ['MySwitzerland — Montreux'] },
  { id: 'lugano', name: 'Lugano', city: 'Lugano', country: 'İsviçre', lat: 46.0037, lng: 8.9511, aliases: ['lugano'], summary: 'İsviçre’nin İtalyanca konuşulan Ticino bölgesinde, adını taşıyan gölün kıyısında kurulu Lugano, palmiyeleri ve Akdeniz havasıyla “İsviçre’nin güney yüzü” olarak anılır. İtalyan zarafeti ile İsviçre düzenini birleştirir.\n\nGöl kıyısı parkları ve promenadı, arkatlı meydanlar, şık butikler ve göle tepeden bakan Monte Brè ile Monte San Salvatore manzaraları başlıca cazibelerdir. Ilıman iklimi ve göl gezileriyle Lugano, rahat bir dinlence durağıdır.', sources: ['MySwitzerland — Lugano'] },
  { id: 'strasbourg', name: 'Strasbourg', city: 'Strasbourg', country: 'Fransa', lat: 48.5734, lng: 7.7521, aliases: ['strasbourg', 'strazburg'], summary: 'Fransa ile Almanya arasında, Alsas bölgesinin başkenti Strasbourg, iki kültürün yüzyıllar boyunca iç içe geçtiği zarif bir kenttir. Avrupa Parlamentosu’na ev sahipliği yaparak “Avrupa’nın başkenti” unvanını taşır.\n\nPembe kumtaşından göğe uzanan görkemli gotik katedrali, kanallarla çevrili yarım ahşap evli Petite France mahallesi (UNESCO) ve Ill Nehri üzerindeki tekne turları başlıca duraklardır. Alsas mutfağı ve dünyanın en eski Noel pazarlarından biriyle de ünlüdür.', sources: ['UNESCO World Heritage List — Strasbourg, Grande-Île and Neustadt'] },
  { id: 'colmar', name: 'Colmar', city: 'Colmar', country: 'Fransa', lat: 48.0794, lng: 7.3585, aliases: ['colmar'], summary: 'Alsas Şarap Yolu’nun kalbindeki Colmar, renkli yarım ahşap evleri ve çiçekli kanallarıyla adeta bir masal kasabasıdır; çoğu zaman Fransa’nın en güzel küçük kentlerinden biri sayılır. Alman ve Fransız kültürünün kaynaştığı özgün bir atmosfer sunar.\n\nKanal kıyısındaki “Küçük Venedik” (La Petite Venise) semti, korunmuş ortaçağ meydanları ve ressam Grünewald’ın başyapıtını barındıran Unterlinden Müzesi kentin öne çıkanlarıdır. Çevresindeki bağlarda üretilen Alsas beyaz şarapları da meşhurdur.', sources: ['France.fr — Colmar'] },
  { id: 'dijon', name: 'Dijon', city: 'Dijon', country: 'Fransa', lat: 47.322, lng: 5.0415, aliases: ['dijon'], summary: 'Burgonya (Bourgogne) bölgesinin başkenti Dijon, güçlü Burgonya düklerinin yönetiminde bir zamanlar Avrupa’nın en zengin ve sanat dolu saraylarından birine ev sahipliği yapmıştır. Bugün zarif bir şarap ve gastronomi kentidir.\n\nGörkemli Dük Sarayı, rengârenk çinili çatılarıyla ünlü tarihî yapıları ve dokunulduğunda şans getirdiğine inanılan baykuş kabartmasının izlediği yürüyüş rotası kenti keyifli kılar. Ünlü Dijon hardalı ve Côte d’Or bağları bölgeye kimlik katar.', sources: ['France.fr — Dijon'] },
  { id: 'annecy', name: 'Annecy', city: 'Annecy', country: 'Fransa', lat: 45.8992, lng: 6.1294, aliases: ['annecy'], summary: 'Fransız Alpleri’nde, adını taşıdığı berrak gölün kıyısında kurulu Annecy, kanalları ve pastel renkli evleriyle “Alplerin Venedik’i” olarak anılır. Dağlarla çevrili konumu ve tertemiz gölüyle nefes kesen bir doğaya sahiptir.\n\nGölün suladığı kanalların ortasında yükselen eski hapishane Palais de l’Isle, çiçeklerle bezeli köprüleri ve ortaçağ kalesi kentin simgeleridir. Yaz aylarında yüzme, tekne ve bisiklet, kışın ise yakındaki kayak merkezleriyle Annecy dört mevsim cazip bir duraktır.', sources: ['France.fr — Annecy'] },
  { id: 'avignon', name: 'Avignon', city: 'Avignon', country: 'Fransa', lat: 43.9493, lng: 4.8055, aliases: ['avignon'], summary: 'Provence’ta Rhône Nehri kıyısındaki Avignon, 14. yüzyılda papaların Roma yerine burada yaşadığı dönemde Hristiyan dünyasının merkezi olmuştur. Bu görkemli geçmiş kente anıtsal bir miras bırakmıştır ve tarihî merkez UNESCO korumasındadır.\n\nAvrupa’nın en büyük gotik yapılarından devasa Papalık Sarayı (Palais des Papes) ve çocuk şarkısına konu olan yarım kalmış Pont Saint-Bénézet (Pont d’Avignon) köprüsü başlıca simgelerdir. Her yaz düzenlenen ünlü tiyatro festivaliyle de anılır.', sources: ['UNESCO World Heritage List — Historic Centre of Avignon'] },
  { id: 'aix', name: 'Aix-en-Provence', city: 'Aix-en-Provence', country: 'Fransa', lat: 43.5297, lng: 5.4474, aliases: ['aix', 'aix-en-provence', 'aix en provence'], summary: 'Provence’ın zarif kültür kenti Aix-en-Provence, çeşmeleri, ağaçlı bulvarları ve güneşli meydanlarıyla klasik bir güney Fransa atmosferi taşır. Bir zamanlar Provence’ın başkenti olan kent, sanat ve öğrenci enerjisiyle canlıdır.\n\nÇınarlarla gölgelenen görkemli Cours Mirabeau bulvarı, rengârenk meydan pazarları ve ressam Paul Cézanne’ın atölyesi ile onu esinleyen manzaralar başlıca duraklardır. Çevredeki lavanta tarlaları ve bağlarıyla Aix, Provence’ı keşfetmek için ideal bir üstür.', sources: ['France.fr — Aix-en-Provence'] },
  // --- Orta Avrupa (Çekya/Slovakya/Macaristan/Avusturya) ara durakları ---
  { id: 'brno', name: 'Brno', city: 'Brno', country: 'Çekya', lat: 49.1951, lng: 16.6068, aliases: ['brno'], summary: 'Çekya’nın ikinci kenti Brno; tepedeki Špilberk Kalesi, modern mimari başyapıtı Villa Tugendhat (UNESCO) ve canlı öğrenci hayatıyla bilinir.', sources: ['UNESCO World Heritage List — Tugendhat Villa in Brno'] },
  { id: 'ceskykrumlov', name: 'Český Krumlov', city: 'Český Krumlov', country: 'Çekya', lat: 48.8127, lng: 14.3175, aliases: ['cesky krumlov', 'ceskykrumlov', 'krumlov'], summary: 'Vltava’nın kıvrımına kurulu Český Krumlov; devasa kalesi ve kusursuz Rönesans-barok eski şehriyle bütünüyle UNESCO korumalı bir masal kasabasıdır.', sources: ['UNESCO World Heritage List — Historic Centre of Český Krumlov'] },
  { id: 'melk', name: 'Melk (Wachau)', city: 'Melk', country: 'Avusturya', lat: 48.2281, lng: 15.3336, aliases: ['melk', 'wachau'], summary: 'Tuna kıyısındaki Melk; nehre bakan görkemli sarı Barok manastırı ve UNESCO korumalı Wachau bağ vadisine açılan konumuyla bilinir.', sources: ['UNESCO World Heritage List — Wachau Cultural Landscape'] },
  { id: 'gyor', name: 'Győr', city: 'Győr', country: 'Macaristan', lat: 47.6875, lng: 17.6504, aliases: ['gyor', 'győr'], summary: 'Viyana-Budapeşte arasındaki Győr; üç nehrin buluştuğu barok eski şehri, sunağı ve termal suyuyla keyifli bir ara duraktır.', sources: ['Hungary.hu — Győr'] },
  { id: 'eger', name: 'Eger', city: 'Eger', country: 'Macaristan', lat: 47.9026, lng: 20.3772, aliases: ['eger'], summary: 'Macaristan’ın Eger’i; kalesi, Avrupa’nın en kuzeydeki Osmanlı minaresi ve “Bikaver (Boğa Kanı)” şarap mahzenleriyle (Güzel Kadınlar Vadisi) ünlüdür.', sources: ['Hungary.hu — Eger'] },
  { id: 'pecs', name: 'Pécs', city: 'Pécs', country: 'Macaristan', lat: 46.0727, lng: 18.2323, aliases: ['pecs', 'pécs'], summary: 'Güney Macaristan’ın Pécs’i; erken Hristiyan nekropolü (UNESCO), camiden çevrili kilisesi ve Zsolnay çinileriyle çok katmanlı bir kültür kentidir.', sources: ['UNESCO World Heritage List — Early Christian Necropolis of Pécs'] },
  { id: 'szentendre', name: 'Szentendre', city: 'Szentendre', country: 'Macaristan', lat: 47.6694, lng: 19.0759, aliases: ['szentendre'], summary: 'Budapeşte’ye yakın Szentendre; Tuna kıyısında renkli barok evleri, sanatçı galerileri ve Sırp Ortodoks kiliseleriyle sevilen bir gezi kasabasıdır.', sources: ['Hungary.hu — Szentendre'] },
  { id: 'balaton', name: 'Balaton Gölü', city: 'Balaton', country: 'Macaristan', lat: 46.91, lng: 17.889, aliases: ['balaton', 'balaton golu', 'lake balaton', 'tihany', 'balatonfured'], summary: 'Orta Avrupa’nın en büyük gölü Balaton; Tihany yarımadası manastırı, Balatonfüred sahili ve bağlarıyla Macaristan’ın “denizi”dir.', sources: ['Hungary.hu — Lake Balaton'] },
  { id: 'kosice', name: 'Košice', city: 'Košice', country: 'Slovakya', lat: 48.7164, lng: 21.2611, aliases: ['kosice', 'košice', 'kassa'], summary: 'Doğu Slovakya’nın Košice’i; ülkenin en büyük kilisesi olan gotik Aziz Elizabeth Katedrali ve zarif yaya ana caddesiyle bilinir.', sources: ['Slovakia.travel — Košice'] },
  // --- Yunanistan & Balkan ara/geçiş durakları ---
  { id: 'meteora', name: 'Meteora (Kalambaka)', city: 'Kalambaka', country: 'Yunanistan', lat: 39.7217, lng: 21.6306, aliases: ['meteora', 'kalambaka', 'kalabaka'], summary: 'Yunanistan’ın Meteora’sı; gökyüzüne yükselen dev kaya sütunlarının tepesine kurulmuş Ortodoks manastırlarıyla UNESCO korumalı, nefes kesen bir alandır.', sources: ['UNESCO World Heritage List — Meteora'] },
  { id: 'delphi', name: 'Delphi', city: 'Delphi', country: 'Yunanistan', lat: 38.4824, lng: 22.501, aliases: ['delphi', 'delfi'], summary: 'Antik dünyanın “merkezi” Delphi; Parnassos yamacında Apollon Tapınağı, kâhinliği ve tiyatrosuyla UNESCO korumalı kutsal alandır.', sources: ['UNESCO World Heritage List — Archaeological Site of Delphi'] },
  { id: 'nafplio', name: 'Nafplio', city: 'Nafplio', country: 'Yunanistan', lat: 37.5679, lng: 22.801, aliases: ['nafplio', 'nauplio', 'napoli di romania'], summary: 'Mora’nın zarif liman kenti Nafplio; tepedeki Palamidi Kalesi, deniz ortasındaki Bourtzi ve neoklasik eski şehriyle Yunanistan’ın ilk başkentidir.', sources: ['Visit Greece — Nafplio'] },
  { id: 'ioannina', name: 'Ioannina', city: 'Ioannina', country: 'Yunanistan', lat: 39.665, lng: 20.8537, aliases: ['ioannina', 'yanya', 'janina'], summary: 'Epir’in göllü kenti Ioannina (Yanya); Tepedelenli Ali Paşa’nın kalesi, göl adası ve gümüş işçiliğiyle güçlü Osmanlı izleri taşır.', sources: ['Visit Greece — Ioannina'] },
  { id: 'bitola', name: 'Bitola', city: 'Bitola', country: 'Kuzey Makedonya', lat: 41.0314, lng: 21.3347, aliases: ['bitola', 'manastir'], summary: 'Kuzey Makedonya’nın Bitola’sı (Manastır); Şirok Sokak yaya caddesi, konsolosluklar dönemi mimarisi ve yakın antik Heraklea Lynkestis’le bilinir.', sources: ['Macedonia Timeless — Bitola'] },
  { id: 'trebinje', name: 'Trebinje', city: 'Trebinje', country: 'Bosna-Hersek', lat: 42.7113, lng: 18.3444, aliases: ['trebinje'], summary: 'Hersek’in güneyindeki Trebinje; çınarlı meydanı, Osmanlı Arslanagić Köprüsü ve tepedeki Hercegovačka Gračanica manastırıyla sakin bir duraktır.', sources: ['Trebinje Turizm — Trebinje'] },
  { id: 'ston', name: 'Ston', city: 'Ston', country: 'Hırvatistan', lat: 42.8372, lng: 17.6982, aliases: ['ston', 'mali ston'], summary: 'Pelješac yarımadasının girişindeki Ston; “Avrupa’nın Çin Seddi” denen uzun savunma surları, asırlık tuzlaları ve istiridyeleriyle ünlüdür.', sources: ['Croatia.hr — Ston'] },
  // --- İskandinavya: Norveç ---
  { id: 'oslo', name: 'Oslo', city: 'Oslo', country: 'Norveç', lat: 59.9139, lng: 10.7522, aliases: ['oslo'], summary: 'Norveç’in başkenti Oslo; fiyort kıyısındaki Opera binası, Viking Gemisi ve Munch müzeleri, Vigeland heykel parkı ve modern mimarisiyle doğa-kent dengesi sunar.', sources: ['VisitNorway — Oslo'] },
  { id: 'bergen', name: 'Bergen', city: 'Bergen', country: 'Norveç', lat: 60.3913, lng: 5.3221, aliases: ['bergen'], summary: 'Fiyortların kapısı Bergen; renkli ahşap Bryggen rıhtımı (UNESCO), Fløibanen füniküleri ve balık haliyle Norveç’in en sevilen sahil kentidir.', sources: ['UNESCO World Heritage List — Bryggen', 'VisitNorway — Bergen'] },
  { id: 'tromso', name: 'Tromsø', city: 'Tromsø', country: 'Norveç', lat: 69.6492, lng: 18.9553, aliases: ['tromso', 'tromsø'], summary: 'Kutup dairesinin ötesindeki Tromsø; kuzey ışıkları, gece yarısı güneşi, Arktik Katedrali ve teleferikle dağ manzarasıyla Arktik’in başkentidir.', sources: ['VisitNorway — Tromsø'] },
  { id: 'stavanger', name: 'Stavanger', city: 'Stavanger', country: 'Norveç', lat: 58.97, lng: 5.7331, aliases: ['stavanger', 'preikestolen'], summary: 'Güney Norveç’in Stavanger’i; ahşap eski şehri ve yakınındaki 604 m’lik uçurum Preikestolen (Vaiz Kürsüsü) yürüyüşüyle ünlüdür.', sources: ['VisitNorway — Stavanger'] },
  { id: 'alesund', name: 'Ålesund', city: 'Ålesund', country: 'Norveç', lat: 62.4722, lng: 6.1549, aliases: ['alesund', 'ålesund'], summary: 'Ada takımına yayılan Ålesund; art nouveau (Jugendstil) mimarisi, Aksla tepesi panoraması ve Geiranger fiyortuna açılan konumuyla bilinir.', sources: ['VisitNorway — Ålesund'] },
  { id: 'geiranger', name: 'Geirangerfjord', city: 'Geiranger', country: 'Norveç', lat: 62.101, lng: 7.205, aliases: ['geiranger', 'geirangerfjord', 'geiranger fiyort'], summary: 'Norveç fiyortlarının simgesi Geirangerfjord; dik yamaçlardan dökülen “Yedi Kızkardeş” şelaleleri ve terk edilmiş çiftlikleriyle UNESCO Dünya Mirasıdır.', sources: ['UNESCO World Heritage List — West Norwegian Fjords'] },
  { id: 'lofoten', name: 'Lofoten Adaları', city: 'Lofoten', country: 'Norveç', lat: 68.2339, lng: 14.568, aliases: ['lofoten', 'svolvaer', 'reine'], summary: 'Arktik’teki Lofoten; sivri dağların denizden yükseldiği, kırmızı balıkçı kulübeli (rorbu) köyleri, kuzey ışıkları ve gece yarısı güneşiyle büyüleyicidir.', sources: ['VisitNorway — Lofoten'] },
  // --- İskandinavya: İsveç ---
  { id: 'stockholm', name: 'Stockholm', city: 'Stockholm', country: 'İsveç', lat: 59.3293, lng: 18.0686, aliases: ['stockholm'], summary: '14 ada üzerine kurulu İsveç başkenti Stockholm; ortaçağ Gamla Stan’ı, kraliyet sarayı, Vasa gemi müzesi ve tasarım kültürüyle “kuzeyin Venedik’i”dir.', sources: ['VisitSweden — Stockholm'] },
  { id: 'goteborg', name: 'Göteborg', city: 'Göteborg', country: 'İsveç', lat: 57.7089, lng: 11.9746, aliases: ['goteborg', 'göteborg', 'gothenburg'], summary: 'İsveç’in batı kapısı Göteborg; kanalları, Haga semtinin ahşap evleri, Liseberg lunaparkı ve deniz ürünleri çarşısıyla sıcak bir liman kentidir.', sources: ['VisitSweden — Gothenburg'] },
  { id: 'malmo', name: 'Malmö', city: 'Malmö', country: 'İsveç', lat: 55.605, lng: 13.0038, aliases: ['malmo', 'malmö'], summary: 'Öresund Köprüsü’yle Kopenhag’a bağlanan Malmö; burgulu gökdelen Turning Torso, ortaçağ meydanları ve çok kültürlü mutfağıyla modern bir kenttir.', sources: ['VisitSweden — Malmö'] },
  { id: 'uppsala', name: 'Uppsala', city: 'Uppsala', country: 'İsveç', lat: 59.8586, lng: 17.6389, aliases: ['uppsala'], summary: 'İsveç’in tarihî üniversite kenti Uppsala; İskandinavya’nın en büyük katedrali, kalesi ve Viking dönemi Gamla Uppsala höyükleriyle bilinir.', sources: ['VisitSweden — Uppsala'] },
  { id: 'kiruna', name: 'Kiruna', city: 'Kiruna', country: 'İsveç', lat: 67.8558, lng: 20.2253, aliases: ['kiruna', 'abisko', 'icehotel'], summary: 'İsveç Laponyası’ndaki Kiruna; kuzey ışıkları, Buz Otel (Icehotel), Abisko Milli Parkı ve Sami kültürüyle Arktik bir duraktır.', sources: ['VisitSweden — Kiruna & Swedish Lapland'] },
  { id: 'visby', name: 'Visby (Gotland)', city: 'Visby', country: 'İsveç', lat: 57.6348, lng: 18.2948, aliases: ['visby', 'gotland'], summary: 'Gotland adasındaki Visby; tümüyle korunmuş ortaçağ surları, kilise kalıntıları ve gül bahçeleriyle UNESCO korumalı bir Hansa kentidir.', sources: ['UNESCO World Heritage List — Hanseatic Town of Visby'] },
  // --- İskandinavya: Danimarka ---
  { id: 'kopenhag', name: 'Kopenhag', city: 'Kopenhag', country: 'Danimarka', lat: 55.6761, lng: 12.5683, aliases: ['kopenhag', 'copenhagen', 'kobenhavn', 'københavn'], summary: 'Danimarka başkenti Kopenhag; renkli Nyhavn kanalı, Küçük Deniz Kızı, Tivoli bahçeleri ve bisiklet-tasarım kültürüyle İskandinav yaşamının vitrinidir.', sources: ['VisitDenmark — Copenhagen'] },
  { id: 'aarhus', name: 'Aarhus', city: 'Aarhus', country: 'Danimarka', lat: 56.1629, lng: 10.2039, aliases: ['aarhus', 'århus'], summary: 'Danimarka’nın ikinci kenti Aarhus; gökkuşağı çatılı ARoS sanat müzesi, açık hava tarih müzesi Den Gamle By ve genç öğrenci havasıyla bilinir.', sources: ['VisitDenmark — Aarhus'] },
  { id: 'odense', name: 'Odense', city: 'Odense', country: 'Danimarka', lat: 55.4038, lng: 10.4024, aliases: ['odense'], summary: 'Masal yazarı H. C. Andersen’in doğduğu Odense; ev-müzesi, arnavut kaldırımlı eski şehri ve bahçeleriyle şirin bir Fyn adası kentidir.', sources: ['VisitDenmark — Odense'] },
  { id: 'skagen', name: 'Skagen', city: 'Skagen', country: 'Danimarka', lat: 57.7211, lng: 10.5883, aliases: ['skagen'], summary: 'Danimarka’nın en kuzey ucundaki Skagen; iki denizin (Skagerrak-Kattegat) buluştuğu Grenen kum dili, sarı evleri ve ressamlarıyla ünlüdür.', sources: ['VisitDenmark — Skagen'] },
  // --- İskandinavya: Finlandiya ---
  { id: 'helsinki', name: 'Helsinki', city: 'Helsinki', country: 'Finlandiya', lat: 60.1699, lng: 24.9384, aliases: ['helsinki'], summary: 'Finlandiya başkenti Helsinki; beyaz Senato Meydanı katedrali, kayaya oyulmuş Temppeliaukio Kilisesi, pazar meydanı ve tasarım semtiyle deniz kıyısı bir kenttir.', sources: ['MyHelsinki — Helsinki'] },
  { id: 'rovaniemi', name: 'Rovaniemi', city: 'Rovaniemi', country: 'Finlandiya', lat: 66.5039, lng: 25.7294, aliases: ['rovaniemi', 'lapland', 'laponya', 'noel baba koyu'], summary: 'Finlandiya Laponyası’nın başkenti Rovaniemi; kutup dairesindeki Noel Baba Köyü, kuzey ışıkları, ren geyiği ve husky safarileriyle kışın büyülüdür.', sources: ['VisitRovaniemi — Rovaniemi'] },
  { id: 'turku', name: 'Turku', city: 'Turku', country: 'Finlandiya', lat: 60.4518, lng: 22.2666, aliases: ['turku', 'åbo'], summary: 'Finlandiya’nın eski başkenti Turku; ortaçağ kalesi, katedrali, nehir kıyısı kafeleri ve binlerce adalı takımadaya açılan konumuyla bilinir.', sources: ['VisitTurku — Turku'] },
  { id: 'tampere', name: 'Tampere', city: 'Tampere', country: 'Finlandiya', lat: 61.4978, lng: 23.761, aliases: ['tampere'], summary: 'İki göl arasındaki sanayi-kültür kenti Tampere; kırmızı tuğla fabrikalarından dönüşen mekânları, sauna geleneği ve Moomin müzesiyle bilinir.', sources: ['VisitTampere — Tampere'] },
  // --- İskandinavya: İzlanda ---
  { id: 'reykjavik', name: 'Reykjavik', city: 'Reykjavik', country: 'İzlanda', lat: 64.1466, lng: -21.9426, aliases: ['reykjavik', 'reykjavík'], summary: 'Dünyanın en kuzey başkenti Reykjavik; Hallgrímskirkja kilisesi, Harpa konser salonu, renkli evleri ve Altın Çember ile Mavi Lagün’e açılan konumuyla bilinir.', sources: ['VisitReykjavik — Reykjavik'] },
  { id: 'vik', name: 'Vík', city: 'Vík', country: 'İzlanda', lat: 63.4194, lng: -19.006, aliases: ['vik', 'vík', 'reynisfjara'], summary: 'Güney İzlanda’daki Vík; siyah kumlu Reynisfjara plajı, bazalt sütunları, deniz kayalıkları ve yakın şelaleleriyle dramatik bir doğa durağıdır.', sources: ['Visit South Iceland — Vík'] },
  { id: 'akureyri', name: 'Akureyri', city: 'Akureyri', country: 'İzlanda', lat: 65.6885, lng: -18.1262, aliases: ['akureyri'], summary: 'Kuzey İzlanda’nın “başkenti” Akureyri; fiyort kıyısı konumu, botanik bahçesi ve yakın Goðafoss şelalesi ile Mývatn gölü doğasıyla bilinir.', sources: ['Visit Akureyri — Akureyri'] },
  // --- Japonya genişletme ---
  { id: 'hakone', name: 'Hakone', city: 'Hakone', country: 'Japonya', lat: 35.2325, lng: 139.1069, aliases: ['hakone'], summary: 'Tokyo’ya yakın dağ kaplıca kasabası Hakone; onsen’leri, Ashi Gölü’nden Fuji manzarası, korsan gemisi ve teleferiğiyle klasik bir kaçış noktasıdır.', sources: ['Japan.travel — Hakone'] },
  { id: 'nikko', name: 'Nikko', city: 'Nikko', country: 'Japonya', lat: 36.7199, lng: 139.6982, aliases: ['nikko', 'nikkō'], summary: 'Ormanlık dağlardaki Nikko; şogun Tokugawa’nın altın işlemeli Toshogu Tapınağı (UNESCO), şelaleleri ve gölleriyle görkemli bir manevi duraktır.', sources: ['UNESCO World Heritage List — Shrines and Temples of Nikko'] },
  { id: 'kanazawa', name: 'Kanazawa', city: 'Kanazawa', country: 'Japonya', lat: 36.5613, lng: 136.6562, aliases: ['kanazawa'], summary: 'Japon Denizi kıyısındaki Kanazawa; ülkenin en güzel bahçelerinden Kenroku-en, korunmuş samuray ve geyşa mahalleleri, altın varak sanatıyla bilinir.', sources: ['Japan.travel — Kanazawa'] },
  { id: 'takayama', name: 'Takayama', city: 'Takayama', country: 'Japonya', lat: 36.1461, lng: 137.2522, aliases: ['takayama', 'shirakawa-go', 'shirakawago'], summary: 'Japon Alpleri’ndeki Takayama; korunmuş Edo dönemi eski şehri, sabah pazarları ve yakınındaki dik çatılı Shirakawa-go köyüyle (UNESCO) ünlüdür.', sources: ['Japan.travel — Takayama', 'UNESCO — Shirakawa-go'] },
  { id: 'sapporo', name: 'Sapporo', city: 'Sapporo', country: 'Japonya', lat: 43.0618, lng: 141.3545, aliases: ['sapporo'], summary: 'Kuzey adası Hokkaido’nun başkenti Sapporo; kar festivali, biracılığı, ramen’i ve çevresindeki kayak merkezleri ile kış turizminin merkezidir.', sources: ['Japan.travel — Sapporo'] },
  { id: 'fukuoka', name: 'Fukuoka', city: 'Fukuoka', country: 'Japonya', lat: 33.5904, lng: 130.4017, aliases: ['fukuoka', 'hakata'], summary: 'Kyushu adasının kapısı Fukuoka; sokak yemeği tezgâhları (yatai), tonkotsu ramen’i, tapınakları ve sahil parklarıyla canlı bir liman kentidir.', sources: ['Japan.travel — Fukuoka'] },
  { id: 'kamakura', name: 'Kamakura', city: 'Kamakura', country: 'Japonya', lat: 35.3192, lng: 139.5466, aliases: ['kamakura'], summary: 'Tokyo’ya yakın sahil kenti Kamakura; devasa açık hava Büyük Buda (Daibutsu), tapınakları, bambu ormanı ve sörf plajlarıyla popüler bir gezidir.', sources: ['Japan.travel — Kamakura'] },
  { id: 'kobe', name: 'Kobe', city: 'Kobe', country: 'Japonya', lat: 34.6901, lng: 135.1955, aliases: ['kobe'], summary: 'Osaka körfezindeki liman kenti Kobe; dünyaca ünlü Kobe eti, Kitano yabancı konakları, liman manzarası ve dağ teleferiğiyle bilinir.', sources: ['Japan.travel — Kobe'] },
  { id: 'nagoya', name: 'Nagoya', city: 'Nagoya', country: 'Japonya', lat: 35.1815, lng: 136.9066, aliases: ['nagoya'], summary: 'Japonya’nın sanayi kalbi Nagoya; altın orkalı kalesi, Toyota müzeleri, Atsuta Tapınağı ve kendine özgü mutfağıyla (hitsumabushi) bir merkez kenttir.', sources: ['Japan.travel — Nagoya'] },
  { id: 'fuji', name: 'Fuji (Kawaguchiko)', city: 'Fujikawaguchiko', country: 'Japonya', lat: 35.5171, lng: 138.753, aliases: ['fuji', 'fuji dagi', 'mount fuji', 'kawaguchiko', 'fujiyama'], summary: 'Japonya’nın simgesi Fuji Dağı’nın (3.776 m) eteğindeki Beş Göl bölgesi (Kawaguchiko); göl yansımaları, pagoda manzaraları ve tırmanış rotalarıyla ünlüdür.', sources: ['UNESCO World Heritage List — Fujisan', 'Japan.travel — Mt. Fuji'] },
  // --- İspanya derinleştirme ---
  { id: 'bilbao', name: 'Bilbao', city: 'Bilbao', country: 'İspanya', lat: 43.263, lng: -2.935, aliases: ['bilbao'], summary: 'Bask ülkesinin Bilbao’su; Frank Gehry’nin titanyum Guggenheim Müzesi’yle kentsel dönüşümün simgesi, pintxos barları ve eski şehriyle bilinir.', sources: ['Spain.info — Bilbao'] },
  { id: 'sansebastian', name: 'San Sebastián', city: 'San Sebastián', country: 'İspanya', lat: 43.3183, lng: -1.9812, aliases: ['san sebastian', 'donostia'], summary: 'Bask sahilinin zarif kenti San Sebastián; kabuk biçimli La Concha plajı, dünyaca ünlü pintxos mutfağı ve belle époque dokusuyla bilinir.', sources: ['Spain.info — San Sebastián'] },
  { id: 'toledo', name: 'Toledo', city: 'Toledo', country: 'İspanya', lat: 39.8628, lng: -4.0273, aliases: ['toledo'], summary: 'Madrid’e yakın “üç kültür kenti” Toledo; nehir kıvrımındaki surlu tepesi, katedrali, El Greco eserleri ve kılıç işçiliğiyle bütünüyle UNESCO korumalıdır.', sources: ['UNESCO World Heritage List — Historic City of Toledo'] },
  { id: 'cordoba', name: 'Córdoba', city: 'Córdoba', country: 'İspanya', lat: 37.8882, lng: -4.7794, aliases: ['cordoba', 'córdoba', 'kordoba'], summary: 'Endülüs’ün Córdoba’sı; içinde katedral bulunan kemerli Mezquita (Ulu Cami-Katedral, UNESCO), çiçekli avluları ve Yahudi mahallesiyle çok kültürlü bir başkenttir.', sources: ['UNESCO World Heritage List — Historic Centre of Córdoba'] },
  { id: 'malaga', name: 'Málaga', city: 'Málaga', country: 'İspanya', lat: 36.7213, lng: -4.4214, aliases: ['malaga', 'málaga'], summary: 'Costa del Sol’un kapısı Málaga; Picasso’nun doğduğu kent olarak müzeleri, Mağribi Alcazaba kalesi, katedrali ve sahilleriyle canlanan bir Akdeniz kentidir.', sources: ['Spain.info — Málaga'] },
  { id: 'santiagocompostela', name: 'Santiago de Compostela', city: 'Santiago de Compostela', country: 'İspanya', lat: 42.8805, lng: -8.5457, aliases: ['santiago de compostela', 'compostela'], summary: 'Galiçya’nın Santiago de Compostela’sı; ünlü hac yolu Camino’nun bittiği görkemli katedrali ve granit eski şehriyle UNESCO korumalı manevi bir merkezdir.', sources: ['UNESCO World Heritage List — Santiago de Compostela (Old Town)'] },
  // --- Portekiz derinleştirme ---
  { id: 'sintra', name: 'Sintra', city: 'Sintra', country: 'Portekiz', lat: 38.8029, lng: -9.3817, aliases: ['sintra'], summary: 'Lizbon’a yakın masal kasabası Sintra; rengârenk Pena Sarayı, gizemli kuyulu Quinta da Regaleira ve Mağribi kalesiyle UNESCO korumalı bir kültürel manzaradır.', sources: ['UNESCO World Heritage List — Cultural Landscape of Sintra'] },
  { id: 'faro', name: 'Faro (Algarve)', city: 'Faro', country: 'Portekiz', lat: 37.0194, lng: -7.9304, aliases: ['faro', 'algarve'], summary: 'Portekiz’in güney sahili Algarve’nin kapısı Faro; altın kayalıklı koyları, Ria Formosa lagünü ve surlu eski şehriyle deniz tatilinin merkezidir.', sources: ['VisitPortugal — Algarve / Faro'] },
  { id: 'coimbra', name: 'Coimbra', city: 'Coimbra', country: 'Portekiz', lat: 40.2033, lng: -8.4103, aliases: ['coimbra'], summary: 'Mondego kıyısındaki Coimbra; Avrupa’nın en eski üniversitelerinden birinin barok kütüphanesi (Joanina, UNESCO) ve fado geleneğiyle köklü bir kenttir.', sources: ['UNESCO World Heritage List — University of Coimbra'] },
  { id: 'obidos', name: 'Óbidos', city: 'Óbidos', country: 'Portekiz', lat: 39.3606, lng: -9.1575, aliases: ['obidos', 'óbidos'], summary: 'Surlarla çevrili Óbidos; beyaz badanalı evleri, çiçekli sokakları, kalesi ve vişne likörü ginjinha’sıyla korunmuş bir ortaçağ kasabasıdır.', sources: ['VisitPortugal — Óbidos'] },
  // --- Birleşik Krallık derinleştirme ---
  { id: 'bath', name: 'Bath', city: 'Bath', country: 'Birleşik Krallık', lat: 51.3811, lng: -2.359, aliases: ['bath'], summary: 'İngiltere’nin Bath’i; Roma dönemi termal hamamları, bal rengi Georgian mimarisi (Royal Crescent) ve Jane Austen izleriyle bütünüyle UNESCO korumalıdır.', sources: ['UNESCO World Heritage List — City of Bath'] },
  { id: 'york', name: 'York', city: 'York', country: 'Birleşik Krallık', lat: 53.96, lng: -1.0873, aliases: ['york'], summary: 'Kuzey İngiltere’nin York’u; devasa gotik York Minster katedrali, ortaçağ surları ve dükkânlarla dolu dar Shambles sokağıyla tarihî bir kenttir.', sources: ['VisitBritain — York'] },
  { id: 'oxford', name: 'Oxford', city: 'Oxford', country: 'Birleşik Krallık', lat: 51.752, lng: -1.2577, aliases: ['oxford'], summary: 'İngilizce konuşan dünyanın en eski üniversitesi Oxford; taş kolejleri, kubbeli Radcliffe Camera’sı ve Harry Potter mekânlarıyla “rüya kuleleri kenti”dir.', sources: ['VisitBritain — Oxford'] },
  { id: 'cambridge', name: 'Cambridge', city: 'Cambridge', country: 'Birleşik Krallık', lat: 52.2053, lng: 0.1218, aliases: ['cambridge'], summary: 'İngiltere’nin Cambridge’i; nehir üzerinde punting yapılan kolejleri, King’s College Şapeli ve akademik geçmişiyle klasik bir üniversite kentidir.', sources: ['VisitBritain — Cambridge'] },
  { id: 'liverpool', name: 'Liverpool', city: 'Liverpool', country: 'Birleşik Krallık', lat: 53.4084, lng: -2.9916, aliases: ['liverpool'], summary: 'The Beatles’ın kenti Liverpool; tarihî Albert Dock rıhtımı, denizcilik müzeleri, iki katedrali ve futbol kültürüyle canlı bir liman kentidir.', sources: ['VisitBritain — Liverpool'] },
  // --- İrlanda ---
  { id: 'dublin', name: 'Dublin', city: 'Dublin', country: 'İrlanda', lat: 53.3498, lng: -6.2603, aliases: ['dublin'], summary: 'İrlanda başkenti Dublin; Trinity College ve Kells Kitabı, Temple Bar semti, tarihî pub kültürü ve Guinness Storehouse’uyla edebiyat-müzik dolu bir kenttir.', sources: ['Ireland.com — Dublin'] },
  { id: 'galway', name: 'Galway', city: 'Galway', country: 'İrlanda', lat: 53.2707, lng: -9.0568, aliases: ['galway'], summary: 'İrlanda’nın batı kıyısındaki Galway; renkli sokakları, canlı sokak müziği, Latin Mahallesi ve yakın Moher Uçurumları ile Connemara doğasına açılan kapıdır.', sources: ['Ireland.com — Galway'] },
  { id: 'cork', name: 'Cork', city: 'Cork', country: 'İrlanda', lat: 51.8985, lng: -8.4756, aliases: ['cork'], summary: 'İrlanda’nın güneyindeki Cork; nehir kollarına yayılan merkezi, English Market gıda çarşısı ve yakınındaki “gevezelik taşı” Blarney Kalesiyle bilinir.', sources: ['Ireland.com — Cork'] },
  // --- Hollanda derinleştirme ---
  { id: 'utrecht', name: 'Utrecht', city: 'Utrecht', country: 'Hollanda', lat: 52.0907, lng: 5.1214, aliases: ['utrecht'], summary: 'Amsterdam’a yakın Utrecht; su seviyesindeki kafeli kanal rıhtımları (wharf), tırmanılan Dom Kulesi ve Miffy (Nijntje) mirasıyla otantik bir Hollanda kentidir.', sources: ['Holland.com — Utrecht'] },
  { id: 'delft', name: 'Delft', city: 'Delft', country: 'Hollanda', lat: 52.0116, lng: 4.3571, aliases: ['delft'], summary: 'Ressam Vermeer’in ve mavi-beyaz Delft çinisinin kenti Delft; kanalları, tarihî meydanı ve kraliyet kiliseleriyle klasik bir Hollanda tablosudur.', sources: ['Holland.com — Delft'] },
  { id: 'lahey', name: 'Lahey (Den Haag)', city: 'Lahey', country: 'Hollanda', lat: 52.0705, lng: 4.3007, aliases: ['lahey', 'den haag', 'the hague', 'la haye'], summary: 'Hollanda’nın idari başkenti Lahey; Vermeer’in “İnci Küpeli Kız”ının bulunduğu Mauritshuis, parlamento (Binnenhof) ve Scheveningen sahiliyle bilinir.', sources: ['Holland.com — The Hague'] },
  { id: 'giethoorn', name: 'Giethoorn', city: 'Giethoorn', country: 'Hollanda', lat: 52.7386, lng: 6.0781, aliases: ['giethoorn'], summary: 'Yollar yerine kanalların olduğu “Hollanda Venedik’i” Giethoorn; kamış çatılı çiftlik evleri ve tahta köprüleri arasında sessiz tekne turlarıyla ünlüdür.', sources: ['Holland.com — Giethoorn'] },
  // --- Belçika derinleştirme ---
  { id: 'gent', name: 'Gent', city: 'Gent', country: 'Belçika', lat: 51.0543, lng: 3.7174, aliases: ['gent', 'ghent', 'gand'], summary: 'Belçika’nın Gent’i; ortaçağ Gravensteen kalesi, Van Eyck kardeşlerin “Gentse Altar”ı, kanal kıyısı lonca evleri ve canlı öğrenci hayatıyla bilinir.', sources: ['VisitFlanders — Ghent'] },
  { id: 'anvers', name: 'Anvers (Antwerpen)', city: 'Anvers', country: 'Belçika', lat: 51.2194, lng: 4.4025, aliases: ['anvers', 'antwerp', 'antwerpen'], summary: 'Belçika’nın liman ve elmas kenti Anvers; Rubens’in eserleriyle katedrali, görkemli tren garı, moda okulu ve Grote Markt lonca evleriyle bilinir.', sources: ['VisitFlanders — Antwerp'] },
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

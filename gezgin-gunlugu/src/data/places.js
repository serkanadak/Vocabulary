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
      'Işık Şehri Paris, Eyfel Kulesi’nden Louvre’a, Seine kıyısı bulvarlarından Montmartre’ın sanatçı sokaklarına uzanan sanatın, modanın ve romantizmin başkentidir. Notre-Dame, Champs-Élysées ve sayısız müzesiyle dünyanın en çok ziyaret edilen şehirlerinden biridir.',
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
      'Fransız Rivierası’nın (Côte d’Azur) incisi Nice, turkuaz koyları, Promenade des Anglais sahil yolu ve renkli Eski Şehir’iyle Akdeniz’in en şık tatil kentlerindendir. Yakınındaki Monako, Cannes ve Èze köyüne de kapı açar.',
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
      'İki nehrin buluştuğu Lyon, Rönesans dokulu Vieux Lyon’u, gizli geçitleri (traboules) ve Fourvière Bazilikası’yla UNESCO Dünya Mirası’dır. Fransa’nın gastronomi başkenti olarak da ün yapmıştır.',
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
      'Fransa’nın en eski ve en büyük liman kenti Marsilya, canlı Eski Liman’ı (Vieux-Port), tepedeki Notre-Dame de la Garde Bazilikası ve turkuaz Calanques koylarıyla Akdeniz ruhunu taşır.',
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
      'Dünyaca ünlü şarap bölgesinin merkezi Bordeaux, 18. yüzyıl taş cepheleri ve Place de la Bourse’un su aynasıyla UNESCO Dünya Mirası bir kenttir. Garonne kıyısı boyunca zarif bir mimari bütünlük sunar.',
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
      'Ebedî Şehir Roma, Kolezyum ve Forum Romanum’dan Vatikan ve Trevi Çeşmesi’ne uzanan üç bin yıllık bir açık hava müzesidir. Antik imparatorluk, Rönesans ve barok katmanları kentin her sokağında iç içedir.',
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
      'Kanallar üzerine kurulu benzersiz Venedik, San Marco Meydanı, Rialto Köprüsü ve gondollarıyla dünyanın en romantik şehirlerinden biridir. Tüm kent ve lagünü UNESCO Dünya Mirası Listesi’ndedir.',
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
      'Rönesans’ın doğduğu şehir Floransa; Duomo, Uffizi Galerisi, Ponte Vecchio ve Michelangelo’nun David’iyle bir sanat hazinesidir. Tarihî merkezi UNESCO Dünya Mirası Listesi’ndedir.',
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
      'İtalya’nın moda ve tasarım başkenti Milano, görkemli gotik Duomo’su, cam tavanlı Galleria Vittorio Emanuele II ve Leonardo’nun “Son Akşam Yemeği” freskiyle ünlüdür. Alışveriş ve opera (La Scala) merkezidir.',
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
      'Vezüv’ün gölgesindeki tutkulu Napoli, pizzanın doğduğu şehir; tarihî merkezi UNESCO Dünya Mirası’dır. Yakınındaki Pompeii, Amalfi Kıyısı ve Capri’ye açılan bir kapıdır.',
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
      'Almanya’nın başkenti Berlin, Brandenburg Kapısı, Berlin Duvarı kalıntıları (East Side Gallery), Müze Adası (UNESCO) ve dinamik sanat sahnesiyle tarih ile modernliği çarpıcı biçimde birleştirir.',
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
      'Bavyera’nın başkenti Münih, Marienplatz meydanı, tarihî bira bahçeleri ve dünyaca ünlü Oktoberfest’iyle tanınır. Alplerin eteğindeki konumu, Neuschwanstein Şatosu gibi masal yerlerine de kapı açar.',
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
      'Ren Nehri kıyısındaki Köln, iki kulesiyle göğe uzanan devasa gotik Katedrali (UNESCO) ile ünlüdür. Tarihî eski şehri, müzeleri ve karnavalıyla canlı bir kültür merkezidir.',
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
      'Almanya’nın büyük liman kenti Hamburg; tuğla depoların oluşturduğu Speicherstadt (UNESCO), modern Elbphilharmonie konser salonu ve canlı Reeperbahn’ıyla su üzerine kurulu bir metropoldür.',
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
      'Göl ve nehir kıyısındaki Zürih; şık Bahnhofstrasse, tarihî Old Town (Altstadt), Chagall vitraylı Fraumünster ve Alp manzaralarıyla İsviçre’nin canlı finans ve kültür merkezidir.',
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
      'Göl ve karlı dağlar arasındaki Luzern; ahşap Kapellbrücke köprüsü, Ağlayan Aslan anıtı ve Pilatus/Rigi dağ turlarıyla İsviçre’nin en şirin göl kentlerindendir.',
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
      'İki göl arasındaki Interlaken, Jungfrau bölgesinin kapısıdır; “Avrupa’nın çatısı” Jungfraujoch, Lauterbrunnen şelaleleri ve macera sporlarıyla Alpler’in kalbinde bir üstür.',
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

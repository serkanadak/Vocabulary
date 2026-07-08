// MEB güncel öğretim programından derlenen 6-7-8. sınıf konu ağacı (tohum veri).
// İngilizce ve Din Kültürü üniteleri bu araştırmada teyit edilemediği için boş
// bırakıldı — kullanıcı Müfredat ekranından kendi konularını ekleyebilir.

export const GRADES = [6, 7, 8];

export const SUBJECTS_BY_GRADE = {
  6: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Din Kültürü ve Ahlak Bilgisi'],
  7: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Din Kültürü ve Ahlak Bilgisi'],
  8: [
    'Türkçe',
    'Matematik',
    'Fen Bilimleri',
    'T.C. İnkılap Tarihi ve Atatürkçülük',
    'İngilizce',
    'Din Kültürü ve Ahlak Bilgisi',
  ],
};

const SEED_TOPICS = {
  6: {
    Türkçe: [
      'Sözcükte Anlam', 'Cümlede Anlam', 'Parçada Anlam', 'Yazım Kuralları',
      'Noktalama İşaretleri', 'Söz Sanatları / Şiir Bilgisi', 'Ek ve Kök',
      'Ses Olayları', 'Metin Türleri', 'Sözel Mantık / Görsel-Grafik Okuma',
    ],
    Matematik: [
      'Doğal Sayılarla İşlemler', 'Çarpanlar ve Katlar', 'Kesirlerle İşlemler',
      'Ondalık Gösterim', 'Oran', 'Veri Analizi', 'Cebirsel İfadeler',
      'Açılar', 'Alan Ölçme', 'Çember', 'Geometrik Cisimler',
    ],
    'Fen Bilimleri': [
      'Güneş Sistemi ve Tutulmalar', 'Kuvvet ve Hareket',
      'Vücudumuzdaki Sistemler (Üreme-Büyüme-Gelişme)',
      'Denetleyici ve Düzenleyici Sistemler',
      'Işık (Yansıma / Aynalar / Soğurulma)',
      'Madde ve Isı (Genleşme, Hâl Değişimi, Yoğunluk)',
    ],
    'Sosyal Bilgiler': [
      'Birlikte Yaşamak', 'Evimiz Dünya', 'Ortak Miraslarımız',
      'Yaşayan Demokrasimiz', 'Hayatımızdaki Ekonomi',
    ],
    İngilizce: [],
    'Din Kültürü ve Ahlak Bilgisi': [],
  },
  7: {
    Türkçe: [
      'Sözcükte Anlam', 'Cümlede Anlam', 'Paragrafta Anlam',
      'Fiiller (Kip-Kişi-Yapı)', 'Fiillerde Çatı', 'Cümlenin Öğeleri',
      'Cümle Türleri', 'Anlatım Bozuklukları', 'Yazım ve Noktalama',
      'Söz Sanatları', 'Metin Türleri',
    ],
    Matematik: [
      'Tam Sayılarla İşlemler', 'Rasyonel Sayılar', 'Cebirsel İfadeler',
      'Oran ve Orantı', 'Yüzdeler', 'Doğrular ve Açılar', 'Çokgenler',
      'Çember ve Daire', 'Veri Analizi',
    ],
    'Fen Bilimleri': [
      'Güneş Sistemi ve Ötesi', 'Hücre ve Bölünmeler', 'Kütle ve Enerji',
      'Saf Madde ve Karışımlar', 'Işığın Madde ile Etkileşimi',
      'Canlılarda Üreme, Büyüme, Gelişme', 'Elektrik Devreleri',
    ],
    'Sosyal Bilgiler': [
      'İletişim ve İnsan İlişkileri', 'Ülkemizde Nüfus',
      'Türk Tarihinde Yolculuk', 'Zaman İçinde Bilim',
      'Ekonomi ve Sosyal Hayat', 'Yaşayan Demokrasi', 'Ülkeler Arası Köprüler',
    ],
    İngilizce: [],
    'Din Kültürü ve Ahlak Bilgisi': [],
  },
  8: {
    Türkçe: ['Anlam Bilgisi', 'Dil Bilgisi', 'Metin Bilgisi'],
    Matematik: [
      'Tam Sayılar / Rasyonel Sayılar ve İşlemleri', 'Cebirsel İfadeler',
      'Eşitlik ve Denklem', 'Oran-Orantı', 'Yüzdeler', 'Doğrular ve Açılar',
      'Çokgenler', 'Çember ve Daire', 'Veri Analizi',
      'Cisimlerin Farklı Yönlerden Görünümü',
    ],
    'Fen Bilimleri': [
      'Mevsimler ve İklim', 'DNA ve Genetik Kod', 'Basınç',
      'Madde ve Endüstri', 'Basit Makineler',
      'Enerji Dönüşümleri ve Çevre Bilimi', 'Elektrik Yükleri ve Elektrik Enerjisi',
    ],
    'T.C. İnkılap Tarihi ve Atatürkçülük': [
      'Bir Kahraman Doğuyor',
      'Millî Uyanış: Bağımsızlık Yolunda Atılan Adımlar',
      'Millî Bir Destan: Ya İstiklal Ya Ölüm!',
      'Atatürkçülük ve Çağdaşlaşan Türkiye',
      'Demokratikleşme Çabaları',
      'Atatürk Dönemi Türk Dış Politikası',
      "Atatürk'ün Ölümü ve Sonrası",
    ],
    İngilizce: [],
    'Din Kültürü ve Ahlak Bilgisi': [],
  },
};

let seq = 0;
function nextId() {
  seq += 1;
  return `topic-${seq}`;
}

export function buildInitialCurriculum() {
  const topics = [];
  GRADES.forEach((grade) => {
    SUBJECTS_BY_GRADE[grade].forEach((subject) => {
      const titles = SEED_TOPICS[grade][subject] || [];
      titles.forEach((title) => {
        topics.push({ id: nextId(), gradeLevel: grade, subject, title, custom: false });
      });
    });
  });
  return topics;
}

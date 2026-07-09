# İbadetlerim 🕌✅

Sünni itikat (Hanefi fıkhı esaslı) ibadetlerin **farz / vacip / sünnet**
sınıflandırmasına göre günlük, haftalık ve yıllık takibini yapan bir
checklist uygulaması. İçerik temeli: [`../docs/ibadetler-farz-vacip-sunnet.md`](../docs/ibadetler-farz-vacip-sunnet.md).

Cross-platform: **Expo / React Native** → iOS, Android ve web.

---

## Özellikler

- **Bugün** sekmesi: günlük farz namazlar, vacip (vitir, gerektiğinde bayram
  namazı/kurban), sünnet-i müekkede namazlar tek listede; işaretledikçe
  kesintisiz seri (streak) ve günlük tamamlanma yüzdesi hesaplanır.
- **Kategoriler**: Namaz, Oruç, Zekât, Hac & Umre, Kurban başlıkları altında
  tüm ibadetlerin farz/vacip/sünnet etiketli tam listesi ve detay açıklaması
  (mezhep notlarıyla birlikte).
- **İstatistik**: seri, son 7/30 gün tamamlanma oranı, son 14 günün grafiği,
  "ömürde bir" (hac, umre) ve "bu yıl" (zekât, fitre vb.) ibadetlerin durumu.
- **Ayarlar**: cinsiyet (Cuma/bayram namazı hükmünü etkiler), nafile
  ibadetleri gösterme anahtarı, kurban yükümlülüğü anahtarı, Ramazan ve
  bayram tarihlerini elle girme (kamerî takvim yıldan yıla kaydığı için).
- Tüm veriler cihazda **AsyncStorage** ile kalıcı saklanır; ağ gerekmez.

## Kurulum ve çalıştırma

```bash
cd ibadet-takip
npm install
npm start          # Expo geliştirici aracı
npm run android
npm run ios
npm run web
npm run gen:assets # ikon / splash / favicon görsellerini üret
```

## Proje yapısı

```
App.js
app.json
src/
  data/ibadetler.js        # farz/vacip/sünnet ibadet veri modeli
  state/TrackerContext.js  # günlük/yıllık/ömürlük işaretleme + kalıcı saklama
  logic/schedule.js        # "bugün" listesini sıklık/gün/ayar bazlı üretir
  logic/stats.js           # seri ve tamamlanma istatistikleri
  logic/date.js            # yerel tarih yardımcıları
  components/common.js     # HukumBadge, CheckRow, Card, PrimaryButton
  screens/                 # Bugün, Kategoriler, İbadet Detayı, İstatistik, Ayarlar
  navigation/RootNavigator.js
scripts/gen-assets.js      # ikon/splash/favicon üretimi (harici bağımlılık yok)
```

## Fıkhi kapsam notu

Hüküm sınıflandırması Hanefi mezhebi esas alınarak yapılmıştır (Vacip,
yalnızca Hanefi fıkhında ayrı bir kategori olarak vardır). Diğer üç Sünni
mezhep arasındaki temel farklar `docs/ibadetler-farz-vacip-sunnet.md`
içindeki karşılaştırma tablosunda özetlenmiştir. Uygulama genel bir ilmihal
niteliğindedir, bağlayıcı fetva yerine geçmez.

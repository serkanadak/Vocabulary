# Kelime Haritası 📇🕸️

İşletme, ekonomi ve iletişim odaklı, **CEFR A1–C2** seviyelerinde **İngilizce kelime
öğrenme (flashcard)** uygulaması. Anlamlar hem **Türkçe** hem **İngilizce** verilir.
Günlük dilde kullanılan **deyim, argo ve yaygın iş ifadelerini** de kapsar.

Cross-platform: **Expo / React Native** ile geliştirildi → tek kod tabanından
**iOS (App Store)**, **Android (Google Play)** ve web.

---

## İstenen 8 özellik ve karşılığı

| # | İstek | Nerede |
|---|-------|--------|
| 1 | Veriler uygulamaya **gömülü** | `src/data/*` — çalışma zamanında ağ gerekmez |
| 2 | Türkçe anlam, eş/zıt anlam, her anlama örnek cümle | Kelime şeması: `src/data/schema.js` |
| 3 | Kelimeleri **pasif / aktif / bilmiyorum** olarak kategorize etme | `StatusPicker` + `src/state/ProgressContext.js` (kalıcı saklama) |
| 4 | Testler **bilinmeyen/pasif** kelimelere öncelik versin, aktif çok az çıksın | `src/logic/srs.js` (ağırlıklı seçim + Leitner) |
| 5 | Major mağazalara hazır, **cross-platform** | Expo / React Native (`app.json`) |
| 6 | İlişkili kelimeleri **harita/ağ** olarak gösterme | `src/logic/graph.js` + `src/screens/GraphScreen.js` (SVG) |
| 7 | Resmî sözlüklerde olmayan **deyim/argo/günlük ifade** havuzu | `src/data/idioms.js` |
| 8 | Kelimeleri **makale ve hikâye** içinde bağlamsal sunma | `src/data/stories.js` + `src/screens/ReaderScreen.js` |

---

## Kurulum ve çalıştırma

```bash
npm install
npm start          # Expo geliştirici aracı
npm run android    # Android emülatör/cihaz
npm run ios        # iOS simülatör (macOS)
npm run web        # Tarayıcı
```

> Expo SDK 51 kullanır. Telefonda **Expo Go** ile QR okutarak da çalıştırabilirsin.

---

## Kelime havuzu ve 10.000'e ölçekleme

Bugünkü depo **doğruluğu elle kontrol edilmiş (curated)** bir çekirdek setle gelir:
işletme/ekonomi/iletişim kelimeleri + deyim/argo + örnek hikâyeler. Her kayıtta
Türkçe & İngilizce anlam, eş/zıt anlamlılar ve örnek cümleler vardır.

**Neden tamamı elle yazılmadı?** 10.000 kelimenin tamamını *doğru* çeviri, eş/zıt
anlam ve örnek cümleyle elle üretmek tek seferde mümkün değildir; uydurma içerik bir
öğrenme uygulamasına zarar verir. Bunun yerine havuzu **güvenle ölçekleyen bir
içe-aktarma hattı** sağlanmıştır.

### Havuzu büyütmek

1. Sözlük/terim verini `data-source/` klasörüne **CSV** veya **JSON** olarak koy.
   Örnek: `data-source/words.sample.csv` (kolon başlıkları şablon niteliğindedir).
2. Üret:
   ```bash
   npm run build:data
   ```
3. Betik tüm kaynakları okur, şemaya çevirir, doğrular, curated kayıtlarla
   çakışanları eler ve sonucu `src/data/generated.js` içine **gömülü** olarak yazar.
   Uygulama bir sonraki açılışta yeni kelimeleri kullanır.

CSV kolonları:

```
headword,pos,level,domains,type,root,pronunciation,tr,en,exampleEn,exampleTr,synonyms,antonyms,collocations,related
```

- `domains`, `synonyms`, `antonyms`, `collocations`, `related`: `|` ile çoklu değer.
- Aynı `headword` birden çok satırda olursa anlamlar birleştirilir.
- `level` mutlaka `A1..C2` olmalı; eksik `tr`/`exampleEn` olan satır atlanır.

Böylece 10.000+ kelimeye, içeriğin kalitesini koruyarak ulaşırsın.

---

## Proje yapısı

```
App.js                      # kök bileşen
app.json                    # Expo / mağaza yapılandırması (iOS + Android)
src/
  data/
    schema.js               # veri şeması + doğrulama
    words.business.js       # curated: işletme
    words.economics.js      # curated: ekonomi
    words.communication.js  # curated: iletişim
    words.general.js        # curated: genel/sosyal (A1-A2)
    idioms.js               # deyim / argo / günlük ifade (Özellik 7)
    stories.js              # bağlamsal okuma içeriği (Özellik 8)
    generated.js            # içe aktarılan/üretilen havuz (build:data yazar)
    index.js                # birleştirme + sorgu API'si
  logic/
    srs.js                  # test önceliklendirme + Leitner (Özellik 4)
    graph.js                # ilişki ağı modeli (Özellik 6)
  state/
    ProgressContext.js      # kategoriler + istatistik (kalıcı, Özellik 3)
  components/common.js      # StatusPicker, rozetler
  screens/                  # Ana, Kartlar, Test, Ağ, Oku, Detay
  navigation/RootNavigator.js
scripts/build-dataset.js    # veri üretim hattı
data-source/                # CSV/JSON kaynakları (10k'ya ölçekleme)
```

---

## Mağazaya yayın notları

- `app.json` içinde `ios.bundleIdentifier` ve `android.package` ayarlı.
- Yayın için EAS kullanılır:
  ```bash
  npm install -g eas-cli
  eas build --platform all       # iOS + Android derleme
  eas submit                     # mağazalara gönderim
  ```
- Yayından önce gerçek `assets/icon.png`, `splash.png` ve mağaza görselleri eklenmeli;
  şu an varsayılan Expo görselleri kullanılır.

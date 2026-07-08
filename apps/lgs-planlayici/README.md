# LGS Planlayıcı 🎯

6, 7 ve 8. sınıf öğrencileri için günlük–haftalık–aylık–yıllık hedef planlama,
çalışma takibi ve soyut ödül sistemi (puan/seviye/rozet/seri) içeren uygulama.

Bu, kök dizindeki **Kelime Haritası** uygulamasından tamamen ayrı, bağımsız bir
Expo projesidir — yalnızca aynı git deposunu paylaşır, kod/bağımlılık paylaşımı
yoktur.

**Tek tablette kişisel/aile kullanımı için tasarlanmıştır — mağazaya (App
Store/Play Store) yayınlanması hedeflenmemektedir.** Bu yüzden hesap/giriş
sistemi ve sunucu yoktur; tüm veri cihazda (AsyncStorage) saklanır.

## Kurulum ve çalıştırma

```bash
cd apps/lgs-planlayici
npm install
npm start          # Expo geliştirici aracı
npm run android
npm run web
```

## Özellikler

- **Hedef hiyerarşisi**: yıllık hedef → aylık hedefler → haftalık planlar → günlük görevler
- **Müfredat ağacı**: MEB'den derlenen 6-7-8. sınıf konu listesi (Müfredat sekmesi) —
  serbestçe eklenebilir, düzenlenebilir, silinebilir
- **Odak zamanlayıcı**: 25 dakikalık Pomodoro sayacı
- **Deneme sınavı takibi**: ders bazlı net girişi ve geçmiş sonuç listesi
- **Soyut ödül sistemi**: görev başına puan, seviye, günlük seri, rozetler — nakit/eşya karşılığı yoktur
- **Veli modu**: aynı cihazda PIN korumalı, salt okunur ilerleme özeti

## Proje yapısı

```
App.js
src/
  theme.js                 # renk tokenleri
  data/curriculum.js        # 6-7-8. sınıf konu ağacı (tohum veri)
  data/rewards.js           # puan/seviye/rozet tanımları
  state/PlannerContext.js   # tüm uygulama durumu + AsyncStorage kalıcılığı
  logic/streak.js           # günlük seri hesaplama
  logic/pin.js              # veli modu PIN karma/doğrulama
  logic/usePomodoro.js      # odak zamanlayıcı hook'u
  components/               # Card, PromptModal, ChoiceModal, ortak UI
  navigation/RootNavigator.js
  screens/                  # Bugün, Hedefler, Ay/Hafta detay, Müfredat, Denemeler, Ödüller, Veli
```

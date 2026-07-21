# Mekân (attraction) açıklama zenginleştirme

Amaç: `attractions.js` içindeki her mekânın (şehir içi tarihi/turistik yer) `desc`
alanını birkaç kelimelik ifadeden 2 cümlelik zengin tarihi/kültürel özete çıkarmak.
Hedef: ~150–300 karakter; ne olduğu + tarihi/kültürel önemi + dikkat çeken bir ayrıntı.

Kapsam: 341 şehir anahtarı, toplam 1.661 mekân. Şehir bloğu bazında batch:
düzenle → `node --check` → commit → PR → merge → deploy → sıradaki.

İşaretleme: [x] tamamlandı. (Kaldığın yeri veriden de anlayabilirsin: desc uzunluğu
kısa kalan şehirler henüz işlenmemiştir.)

## Türkiye
- [x] Batch T1: istanbul, edirne, izmir, bursa, canakkale, antalya, ankara, konya, trabzon, gaziantep
- [ ] Batch T2: mugla, aydin, nevsehir + diğer yüksek cazibe iller
- [ ] Batch T3+: kalan tüm iller (il başına ~5 mekân)

## Avrupa
- [ ] İtalya, Almanya, Fransa/İsviçre, İspanya/Portekiz, Yunanistan/Balkan,
      Hırvatistan/Slovenya, BK/İrlanda/Benelüks, İskandinavya, Orta Avrupa

## Dünya
- [ ] Asya, Orta Doğu/Orta Asya, Amerika, Afrika, Okyanusya

Not: Bu çok büyük bir içerik görevi; batch batch ilerler ve birden çok oturuma yayılır.

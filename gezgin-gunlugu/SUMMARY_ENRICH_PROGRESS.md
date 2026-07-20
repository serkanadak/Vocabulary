# Özet (summary) Zenginleştirme Planı

Amaç: Keşif günlüğündeki her mekânın `places.js` içindeki `summary` alanını
(turistik + tarihi özet) zengin, iki paragraflı biçime çıkarmak — İstanbul/Edirne
kalitesinde. Avrupa'dan başla, sonra tüm dünya. Her batch: özetleri genişlet →
doğrula (node --check) → commit → PR → merge → deploy → sıradaki. Bitince zamanlayıcıyı durdur.

Hedef stil: 2 paragraf, ~400-600 karakter; ilk paragraf tarihi/kültürel bağlam,
ikinci paragraf gezilecek yerler/atmosfer. `\n\n` ile ayır. id/name/coords/aliases/sources DOKUNMA.

İşaretleme: [x] tamamlandı, [ ] bekliyor.

## AVRUPA

- [ ] IT1 — İtalya A: Roma, Venedik, Floransa, Milano, Napoli, Trieste, Treviso, Pisa, Bari, Sirmione, Verona, Padova
- [ ] IT2 — İtalya B: Vicenza, Bologna, Bergamo, Como, Bolzano, Trento, Siena, San Gimignano, Lucca, Cinque Terre, Rimini
- [ ] DE1 — Almanya: Regensburg, Nürnberg, Würzburg, Rothenburg, Füssen, Heidelberg, Dresden, Leipzig, Baden-Baden, Freiburg (+ Münih/Berlin kontrol)
- [ ] FR1 — Fransa + İsviçre: Strasbourg, Colmar, Dijon, Annecy, Avignon, Aix-en-Provence, Bern, Cenevre, Lausanne, Montreux, Lugano
- [ ] ES1 — İspanya + Portekiz: Bilbao, San Sebastián, Toledo, Córdoba, Málaga, Santiago, Sevilla, Granada + Sintra, Faro, Coimbra, Óbidos, Porto, Lizbon
- [ ] GR1 — Yunanistan + Balkan: Meteora, Delphi, Nafplio, Ioannina, Selanik + Bitola, Ohrid, Tiran, Berat, İşkodra, Lesh, Kavala, İgumenitsa
- [ ] HR1 — Hırvatistan + Slovenya + Avusturya/Slovakya: Split, Šibenik, Trogir, Opatija, Pula, Rovinj, Plitvice + Ljubljana, Bled, Maribor, Piran, Postojna + Graz/Bratislava kontrol
- [ ] UK1 — BK + İrlanda + Hollanda + Belçika: Bath, York, Oxford, Cambridge, Liverpool + Dublin, Galway, Cork + Utrecht, Delft, Lahey, Giethoorn, Rotterdam + Gent, Anvers, Brugge
- [ ] SC1 — İskandinavya A: Norveç (Oslo, Bergen, Tromsø, Stavanger, Ålesund, Geiranger, Lofoten) + İzlanda (Reykjavik, Vík, Akureyri)
- [ ] SC2 — İskandinavya B: İsveç (Stockholm, Göteborg, Malmö, Uppsala, Kiruna, Visby) + Danimarka (Kopenhag, Aarhus, Odense, Skagen) + Finlandiya (Helsinki, Rovaniemi, Turku, Tampere)
- [ ] CE1 — Orta Avrupa: Macaristan (Budapeşte, Győr, Eger, Pécs, Szentendre, Balaton) + Çekya (Brno, Český Krumlov) + Polonya (Krakow, Varşova)

## DÜNYA (Avrupa sonrası)

- [ ] TR1..TRn — Türkiye 81 il (84 thin) — batchler halinde
- [ ] AS1 — Asya (Japonya 15, Çin, Hindistan, GD Asya, Orta Asya)
- [ ] ME1 — Orta Doğu & Kafkas (İran, Ürdün, BAE, Özbekistan)
- [ ] AM1 — Amerika (ABD, Kanada, Latin Amerika)
- [ ] AF1 — Afrika (Mısır, Fas, Tunus, G.Afrika, Doğu Afrika)
- [ ] OC1 — Okyanusya (Avustralya, Yeni Zelanda, Endonezya)

Not: "kontrol" = zaten yeterince zengin olabilir, kontrol edip gerekiyorsa genişlet.

// Bağlamsal okuma içeriği (Özellik 8): kısa makale ve hikâyeler.
// `vocab` dizisi, metinde geçen ve uygulamada vurgulanacak kelime id'lerini
// içerir. Okuyucu ekranı bu kelimeleri tıklanabilir hale getirir.

export default [
  {
    id: 's_startup_pitch',
    title: 'The Pitch',
    titleTr: 'Sunum',
    level: 'B2',
    domains: ['business', 'communication'],
    vocab: ['w_entrepreneur', 'w_pitch', 'w_venture', 'w_capital', 'i_no_brainer', 'w_revenue'],
    paragraphs: [
      {
        en: 'Maya was a first-time entrepreneur with a small startup and a big idea. She needed capital, so she prepared a pitch for a group of investors.',
        tr: 'Maya, küçük bir girişimi ve büyük bir fikri olan ilk kez girişimcilik yapan biriydi. Sermayeye ihtiyacı vardı, bu yüzden bir grup yatırımcı için bir sunum hazırladı.',
      },
      {
        en: 'She explained how the venture would earn revenue within a year. "At this valuation," one investor said, "backing you is a no-brainer."',
        tr: '“Girişimin bir yıl içinde nasıl gelir elde edeceğini anlattı. Bir yatırımcı, “Bu değerlemeyle sana yatırım yapmak hiç düşünülmeyecek kadar kolay,” dedi.',
      },
    ],
  },
  {
    id: 's_inflation_letter',
    title: 'A Letter About Prices',
    titleTr: 'Fiyatlar Üzerine Bir Mektup',
    level: 'B1',
    domains: ['economics', 'communication'],
    vocab: ['w_inflation', 'w_interest', 'w_economy', 'w_recession', 'w_market'],
    paragraphs: [
      {
        en: 'Dear reader, this year inflation rose sharply and the economy slowed. To protect the market, the central bank raised the interest rate.',
        tr: 'Sevgili okuyucu, bu yıl enflasyon hızla yükseldi ve ekonomi yavaşladı. Piyasayı korumak için merkez bankası faiz oranını artırdı.',
      },
      {
        en: 'Many feared a recession, but spending stayed strong, and prices slowly stabilized.',
        tr: 'Birçok kişi bir durgunluktan korktu, ama harcamalar güçlü kaldı ve fiyatlar yavaşça istikrara kavuştu.',
      },
    ],
  },
  {
    id: 's_team_meeting',
    title: 'On the Same Page',
    titleTr: 'Aynı Sayfada',
    level: 'B2',
    domains: ['communication', 'business'],
    vocab: ['w_meeting', 'i_on_the_same_page', 'w_feedback', 'w_consensus', 'i_circle_back', 'w_delegate'],
    paragraphs: [
      {
        en: 'Before the meeting, the manager wanted everyone on the same page. She asked for honest feedback and listened carefully.',
        tr: 'Toplantıdan önce yönetici herkesin aynı görüşte olmasını istedi. Dürüst geri bildirim istedi ve dikkatle dinledi.',
      },
      {
        en: 'When they reached a consensus, she delegated the tasks and promised to circle back on the budget next week.',
        tr: 'Fikir birliğine vardıklarında görevleri paylaştırdı ve gelecek hafta bütçe konusuna geri dönmeye söz verdi.',
      },
    ],
  },
];

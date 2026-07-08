// Ders bazlı deneme net trendini hesaplar — Veli ve Denemeler ekranlarında ortak kullanılır.
export function buildSubjectTrends(examResults, subjects) {
  const sortedExams = [...examResults].sort((a, b) => (a.date < b.date ? -1 : 1));
  return subjects
    .map((subject) => ({
      subject,
      points: sortedExams
        .filter((e) => e.nets && e.nets[subject] != null)
        .map((e) => ({ date: e.date, net: e.nets[subject] })),
    }))
    .filter((t) => t.points.length > 0 && t.points.some((p) => p.net > 0));
}

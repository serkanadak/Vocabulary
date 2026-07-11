// Coğrafi hesaplar: iki koordinat arası kuş uçuşu mesafe (haversine) ve
// araç bazlı yol mesafesi/süresi.
import { getVehicle } from '../data/vehicles';

const EARTH_R = 6371; // km

const toRad = (deg) => (deg * Math.PI) / 180;

export function hasCoords(p) {
  return p && typeof p.lat === 'number' && typeof p.lng === 'number' && !Number.isNaN(p.lat) && !Number.isNaN(p.lng);
}

// İki nokta arası kuş uçuşu mesafe (km). Koordinat yoksa null.
export function haversineKm(a, b) {
  if (!hasCoords(a) || !hasCoords(b)) return null;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_R * Math.asin(Math.min(1, Math.sqrt(h)));
}

// Saati "3 sa 20 dk" gibi biçimler. 1 saatin altını dk, çok kısaysa "<1 dk".
export function formatDuration(hours) {
  if (hours == null || !isFinite(hours)) return '—';
  const totalMin = Math.round(hours * 60);
  if (totalMin < 1) return '<1 dk';
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m} dk`;
  if (m === 0) return `${h} sa`;
  return `${h} sa ${m} dk`;
}

export function formatKm(km) {
  if (km == null || !isFinite(km)) return '—';
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

// Bir durak dizisi (koordinatlı) ve araç için bacak bacak mesafe/süre + toplamlar.
// stops: [{ id, name, lat, lng }]
export function computeRoute(stops, vehicleId) {
  const vehicle = getVehicle(vehicleId);
  const legs = [];
  let totalKm = 0;
  let totalHours = 0;
  let unknownLegs = 0;

  for (let i = 0; i < stops.length - 1; i++) {
    const from = stops[i];
    const to = stops[i + 1];
    const straight = haversineKm(from, to);
    if (straight == null) {
      legs.push({ from, to, km: null, hours: null });
      unknownLegs += 1;
      continue;
    }
    const km = straight * vehicle.detour;
    const hours = km / vehicle.speed;
    totalKm += km;
    totalHours += hours;
    legs.push({ from, to, km, hours });
  }

  return {
    vehicle,
    legs,
    totalKm,
    totalHours,
    unknownLegs,
    hasAny: legs.some((l) => l.km != null),
  };
}

// Seyahat araçları — ortalama seyir hızı (km/sa) ve "detour" (dolambaç) çarpanı.
// Haversine düz kuş uçuşu mesafe verir; kara/ray araçlarında gerçek yol daha uzundur,
// bu yüzden mesafeyi detour çarpanıyla düzeltiriz. Uçakta great-circle ~ gerçek rota (1.0).
//
// Karavanlar: normal arabaya (85 km/sa) göre %15 daha yavaş öngörülür → 85 × 0.85 ≈ 72 km/sa.
// Çekme karavan ayrıca en fazla 90 km/sa ile sınırlıdır (maxSpeed); rota süresi hesabında
// etkin hız = min(speed, maxSpeed) kullanılır.
export const VEHICLES = [
  { id: 'plane', label: 'Uçak', icon: '✈️', speed: 750, detour: 1.0 },
  { id: 'car', label: 'Araba', icon: '🚗', speed: 85, detour: 1.3 },
  { id: 'motokaravan', label: 'Motokaravan', icon: '🚐', speed: 72, detour: 1.3 },
  { id: 'cekme_karavan', label: 'Çekme Karavan', icon: '🚙', speed: 72, detour: 1.3, maxSpeed: 90 },
  { id: 'bus', label: 'Otobüs', icon: '🚌', speed: 70, detour: 1.3 },
  { id: 'train', label: 'Tren', icon: '🚆', speed: 110, detour: 1.2 },
  { id: 'motorbike', label: 'Motosiklet', icon: '🏍️', speed: 80, detour: 1.3 },
  { id: 'bike', label: 'Bisiklet', icon: '🚲', speed: 16, detour: 1.25 },
  { id: 'walk', label: 'Yürüyüş', icon: '🚶', speed: 4.5, detour: 1.25 },
];

// Bir aracın rota planında kullanılacak etkin seyir hızı (varsa maxSpeed tavanı uygulanır).
export function effectiveSpeed(vehicle) {
  if (!vehicle) return 0;
  return vehicle.maxSpeed ? Math.min(vehicle.speed, vehicle.maxSpeed) : vehicle.speed;
}

export const DEFAULT_VEHICLE = 'car';

// Kişinin yurt dışına kendi kullandığı araçla çıktığı vasıtalar. Yeşil kart
// (zorunlu yurt dışı trafik sigortası) ve kasko yurt dışı kapsam genişletme
// yalnızca bu araçlar için gerekir (uçak/tren/otobüs yolcusu vb. için değil).
export const OWN_VEHICLE_IDS = ['car', 'motokaravan', 'cekme_karavan', 'motorbike'];

export function isOwnVehicle(id) {
  return OWN_VEHICLE_IDS.includes(id);
}

export function getVehicle(id) {
  return VEHICLES.find((v) => v.id === id) || VEHICLES.find((v) => v.id === DEFAULT_VEHICLE);
}

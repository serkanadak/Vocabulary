// Veli modu PIN'i için basit yerel karma. Güvenlik değil, tesadüfi görüntülemeyi
// engellemek amaçlıdır — veri zaten yalnızca cihazda saklanır.

export function hashPin(pin) {
  let hash = 0;
  const str = `lgs-planlayici:${pin}`;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) % 1000000007;
  }
  return String(hash);
}

export function verifyPin(pin, hash) {
  return hashPin(pin) === hash;
}

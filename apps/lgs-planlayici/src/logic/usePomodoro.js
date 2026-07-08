import { useEffect, useRef, useState } from 'react';

const DEFAULT_MINUTES = 25;

export function usePomodoro(minutes = DEFAULT_MINUTES) {
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // Seçilen görev (dolayısıyla süresi) değiştiğinde zamanlayıcıyı sıfırla.
  useEffect(() => {
    setRunning(false);
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start = () => secondsLeft > 0 && setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setSecondsLeft(minutes * 60);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return { secondsLeft, running, start, pause, reset, label: `${mm}:${ss}`, done: secondsLeft === 0 };
}

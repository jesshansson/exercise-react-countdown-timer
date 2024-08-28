import { useState, useEffect, useRef } from "react";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(10); //Återstående sekunder
  const [isActive, setIsActive] = useState<boolean>(false); //Om timern är igång
  const timerRef = useRef<number | null>(null); // Referens för timer-id

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            //När räkningen når 0
            clearInterval(timerRef.current!); // Stoppa timern
            timerRef.current = null;
            setIsActive(false); // Säkerställ att timern stannar och att användaren inte kan starta den igen utan att återställa först
            return 0; // Sätt timeLeft till 0
          }
          return prevTimeLeft - 1; // Minska timeLeft med 1 varje sekund
        });
      }, 1000);
    }
    return () => {
      //Cleanup-funktion, intervallet rensas för att förhindra att timern fortsätter köra efter att isActive ändras
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]); //useEffect dependency - useEffect kommer köras när komponenten först renderas samt varje gång isActive ändras (från true till false eller tvärtom).

  const startTimer = () => {
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(10);
  };

  return (
    <div className="counter-container">
      <h1>Hur många armhävningar klarar du?</h1>
      {timeLeft === 0 ? (
        <h2>Bra jobbat!</h2>
      ) : (
        <h2 className="time-left">{timeLeft} sekunder kvar</h2>
      )}
      <button onClick={startTimer}>Starta</button>
      <button onClick={pauseTimer}>Pausa</button>
      <button onClick={resetTimer}>Återställ</button>
    </div>
  );
}

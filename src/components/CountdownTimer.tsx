import { useState, useEffect, useRef } from "react";

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(100); //Återstående sekunder
  const [isActive, setIsActive] = useState<boolean>(false); //Om timern är igång
  const timerRef = useRef<number | null>(null); // Referens för timer-id

  useEffect(() => {
    if (isActive) {
      // Om isActive är true, startar vi ett nytt intervall med setInterval. Det betyder att vi varje sekund minskar timeLeft med 1.
      timerRef.current = setInterval(() => {
        // sparar timer-id (ett unikt identifieringsnummer som setInterval returnerar) i timerRef så att vi senare kan rensa (stoppa) detta intervall om det behövs.
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1); // Minska timeLeft med 1 varje sekund
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null; //det finns inte någon aktiv timer längre
    }

    return () => {
      //Cleanup-funktion, intervallet rensas för att förhindra att timern fortsätter löra efter att isActive ändras
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive]); //useEffect dependency - useEffect kommer köras När komponenten först renderas samt varje gång isActive ändras (från true till false eller tvärtom).

  const startTimer = () => {
    setIsActive(true);
    console.log(timeLeft);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(100); //Återställ till ursprungligt
  };

  return (
    <div>
      <h1>Nedräkningstimer</h1>

      <h2>{timeLeft} sekunder kvar</h2>
      <button onClick={startTimer}>Starta</button>
      <button onClick={pauseTimer}>Pausa</button>
      <button onClick={resetTimer}>Återställ</button>
    </div>
  );
}

// useRef - för att skapa en referens som inte orsakar en omrendering av komponenten när den ändras: Här för att hålla reda på timer-id (den returnerade referensen från setInterval).
// useEffect körs varje gång komponenten renderas om, och när något i dess beroendelista (i det här fallet isActive) ändras.

// Om isActive är true, startar vi en timer som minskar timeLeft varje sekund. 
// Om isActive är false eller om komponenten avmonteras, rensas timern för att förhindra att den fortsätter att köra i bakgrunden. timerRef lagrar id
// från setInterval så att vi kan stoppa timern när vi vill.

//"current" - egenskap där du kan lagra ett värde som du vill behålla mellan renderingar av din komponent.

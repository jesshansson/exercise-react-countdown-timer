import { useState, useEffect, useRef, ReactElement } from "react";

export function CountdownTimer(): ReactElement {
  const [timeLeft, setTimeLeft] = useState<number>(60); //Återstående sekunder
  const [isActive, setIsActive] = useState<boolean>(false); //Om timern är igång
  const [inputTime, setInputTime] = useState<string>(""); //Lagrar värdet som användaren skriver in i inputfälte
  const [feedback, setFeedback] = useState<string>("");
  const timerRef = useRef<number | null>(null); // Referens för timer-id

  useEffect(() => {
    if (isActive === true) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft <= 1) {
            //När räkningen når 0
            setFeedback("Bra jobbat!");
            clearInterval(timerRef.current!); // Stoppar intervallet (timern). "!" innebär att timerRef.current inte är null vid den tidpunkten (TypeScript behöver ej varna för fel).
            timerRef.current = null;
            setIsActive(false); // Säkerställ att timern stannar och att användaren inte kan starta den igen utan att återställa först
            return 0; // Sätt timeLeft till 0, för att säkerställa att timeLeft aldrig blir negativt.
          }
          return prevTimeLeft - 1; // Minska timeLeft med 1 varje sekund. prevTimeLeft representerar det senaste värdet av timeLeft innan det uppdateras.
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
    setTimeLeft(60);
    setFeedback("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTime(e.target.value); // Uppdatera inputTime när användaren trycker på knappen
  };

  //Funktion som körs när användaren klickar på "Sätt tid"
  const setTimer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Förhindra formuläret från att skicka och ladda om sidan
    const time = parseInt(inputTime, 10); // Konvertera inputvärdet till ett nummer, heltal (från en sträng)
    if (time > 0) {
      setTimeLeft(time); // Sätt timeLeft till användarens angivna tid
      setIsActive(false); // Timern är pausad när ny tid sätts
    }
  };

  return (
    <div className="counter-container">
      <h1>Hur många armhävningar klarar du på 1 minut?</h1>
      {timeLeft === 0 ? (
        <h2> {feedback}</h2>
      ) : (
        <h2 className="time-left">{timeLeft} sekunder kvar</h2>
      )}
      <div className="buttons">
        <button onClick={startTimer}>Starta</button>
        <button onClick={pauseTimer}>Pausa</button>
        <button onClick={resetTimer}>Återställ</button>
      </div>
      <form onSubmit={setTimer} className="set-time">
        <p>Testa med en egen tid!</p>
        <input
          type="number"
          value={inputTime}
          onChange={handleInputChange}
          placeholder="Ange tid i sekunder"
        />
        <button type="submit"> Sätt tid </button>
      </form>
    </div>
  );
}

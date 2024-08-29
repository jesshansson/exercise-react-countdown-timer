## Nedräkningstimer med React

Se sidan live här : https://the-react-countdown.netlify.app/

### Mål

Att skapa en nedräkningstimer i React. Timern startar från ett givet antal sekunder och räknar ner varje sekund. React-hooks som `useEffect` och `useRef` används för att hantera timer-logiken.

### Arbetsgång

**Skapa en React-komponent:**
`CountdownTimer`. Denna komponent ska visa hur många sekunder som är kvar på timern.

**Lägg till state:**
Använd `useState` för att skapa två tillstånd:

- `timeLeft`: för att hålla reda på antalet sekunder som är kvar.
- `isActive`: för att hålla reda på om timern är aktiv eller inte.

**Använd `useRef`:**
Skapa en referens med `useRef` för att hålla referensen till timern. Denna referens behövs för att kunna starta och stoppa timern.

**Implementera `useEffect`:**
Använd `useEffect` för att starta timern när `isActive` är `true`, och uppdatera `timeLeft` varje sekund. När `timeLeft` når 0, ska timern stoppas automatiskt.

**Lägg till knappar:**
Lägg till tre knappar:

- **Starta:** Startar timern.
- **Pausa:** Pausar timern.
- **Återställ:** Återställer timern till 60 sekunder.

### Extra funktioner

Utöka funktionaliteten med följande:

1. **Anpassad starttid:** Lägg till en inmatningsruta där användaren kan ange en anpassad starttid för timern.
2. **Meddelande vid slutet:** Visa ett meddelande när timern når 0.

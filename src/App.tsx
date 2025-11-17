import { useState, useRef, useEffect } from "react";
import HomeScreen from "./components/HomeScreen";
import GameHeader from "./components/GameHeader";
import GameBoard from "./components/GameBoard";
import WinModal from "./components/WinModal";
import SettingsModal from "./components/SettingsModal";
import ConfettiCanvas from "./components/ConfettiCanvas";
import type { ThemeKey } from "./types";

function App() {
  const [screen, setScreen] = useState<"home" | "game">("home");
  const [showWinModal, setShowWinModal] = useState(false);
  const confettiRef = useRef<HTMLCanvasElement | null>(null);

  const [theme, setTheme] = useState<ThemeKey>("animals");
  const [grid, setGrid] = useState(4);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [movesLeft, setMovesLeft] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (showConfetti && confettiRef.current) {
      confettiRef.current.dispatchEvent(new CustomEvent("celebrate"));
    }
  }, [showConfetti]);

  function startGame() {
    setTimeLeft(null);
    setMovesLeft(null);
    setStreak(0);
    setElapsedTime(0);
    setScreen("game");
  }

  function resetGame() {
    setElapsedTime(0);
    setStreak(0);
    setResetKey(prev => prev + 1);
  }

  function winGame() {
    // Show confetti immediately
    setShowConfetti(true);
    // Show win modal after 2 seconds
    setTimeout(() => {
      setShowWinModal(true);
      setShowConfetti(false);
    }, 2000);
  }

  function replay() {
    setShowWinModal(false);
    setShowConfetti(false);
    setElapsedTime(0);
    setStreak(0);
    setResetKey(prev => prev + 1);
  }

  function goHome() {
    setShowWinModal(false);
    setShowConfetti(false);
    setScreen("home");
  }

  return (
    <>
      {screen === "home" && (
        <>
          <HomeScreen
            theme={theme}
            setTheme={setTheme}
            grid={grid}
            setGrid={setGrid}
            onStart={startGame}
            onOpenSettings={() => setShowSettings(true)}
          />

          {showSettings && (
            <SettingsModal onClose={() => setShowSettings(false)} />
          )}
        </>
      )}

      {screen === "game" && (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-pink-50 p-4">
          <GameHeader
            timeLeft={elapsedTime}
            streak={streak}
            movesLeft={movesLeft}
            onReset={resetGame}
          />

          <div className="bg-white/80 backdrop-blur-xl border border-orange-200 shadow-2xl rounded-3xl w-[500px] h-[500px] p-8 flex items-center justify-center">
            <GameBoard
              key={resetKey}
              grid={grid}
              theme={theme}
              mode="casual"
              running={true}
              onWin={winGame}
              setTimeLeftCallback={setElapsedTime}
              setMovesLeftCallback={setMovesLeft}
              setStreakCallback={setStreak}
            />
          </div>

          {showWinModal && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <WinModal onReplay={replay} onHome={goHome} />
            </div>
          )}
        </div>
      )}
      
      {/* Global Confetti Canvas */}
      <ConfettiCanvas refCallback={(el) => (confettiRef.current = el)} />
    </>
  );
}

export default App;

import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import GameHeader from "./components/GameHeader";
import GameBoard from "./components/GameBoard";
import WinModal from "./components/WinModal";
import SettingsModal from "./components/SettingsModal";
import type { ThemeKey } from "./types";

function App() {
  const [screen, setScreen] = useState<"home" | "game" | "win">("home");

  const [theme, setTheme] = useState<ThemeKey>("animals");
  const [grid, setGrid] = useState(4);

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [movesLeft, setMovesLeft] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);

  const [showSettings, setShowSettings] = useState(false);

  function startGame() {
    setTimeLeft(null);
    setMovesLeft(null);
    setStreak(0);
    setScreen("game");
  }

  function resetGame() {
    startGame();
  }

  function winGame() {
    setScreen("win");
  }

  function replay() {
    startGame(); // same theme + grid size
  }

  function goHome() {
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
            timeLeft={timeLeft}
            streak={streak}
            movesLeft={movesLeft}
            onReset={resetGame}
          />

          <div className="bg-white/80 backdrop-blur-xl border border-orange-200 shadow-2xl rounded-3xl w-[500px] h-[500px] p-8 flex items-center justify-center">
            <GameBoard
              grid={grid}
              theme={theme}
              mode="casual"
              running={true}
              onWin={winGame}
              setTimeLeftCallback={setTimeLeft}
              setMovesLeftCallback={setMovesLeft}
              setStreakCallback={setStreak}
            />
          </div>
        </div>
      )}

      {screen === "win" && (
        <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-pink-50">
          <WinModal onReplay={replay} onHome={goHome} />
        </div>
      )}
    </>
  );
}

export default App;

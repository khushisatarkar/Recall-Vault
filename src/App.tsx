import React, { useCallback, useState } from "react";
import Header from "./components/Header";
import ThemeSelector from "./components/ThemeSelector";
import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";
import type { Mode } from "./types";

export default function App() {
  const [theme, setTheme] = useState<"animals" | "flags" | "icons">("animals");
  const [grid, setGrid] = useState(4);
  const [mode, setMode] = useState<Mode>("casual");
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [movesLeft, setMovesLeft] = useState<number | null>(null);

  const handleStart = useCallback(() => {
    setRunning(true);
    setStreak(0);
  }, []);

  const handleReset = useCallback(() => {
    // simply toggle running off then on to force reset of board (handled by GameBoard effect on grid/theme/mode)
    setRunning(false);
    setTimeout(() => setRunning(true), 50);
  }, []);

  const handleWin = (stats: { timeTaken: number; moves: number }) => {
    setRunning(false);
    alert(`You won! Time: ${stats.timeTaken}s, Moves: ${stats.moves}`);
  };

  const handleLose = () => {
    setRunning(false);
    alert("You lost! Try again.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-10">
      <Header />
      <ThemeSelector
        theme={theme}
        setTheme={setTheme}
        grid={grid}
        setGrid={setGrid}
      />
      <Controls
        mode={mode}
        setMode={setMode}
        onStart={handleStart}
        onReset={handleReset}
        timeLeft={timeLeft}
        streak={streak}
        movesLeft={movesLeft}
        running={running}
      />
      <GameBoard
        grid={grid}
        theme={theme}
        mode={mode}
        running={running}
        onWin={handleWin}
        onLose={handleLose}
        setTimeLeftCallback={(t) => setTimeLeft(t ?? null)}
        setStreakCallback={(s) => setStreak(s)}
        setMovesLeftCallback={(m) => setMovesLeft(m ?? null)}
      />
      <footer className="max-w-4xl mx-auto text-center mt-8 text-xs text-gray-400">
        Recall Vault · Khushi
      </footer>
    </div>
  );
}

import { Settings, ChevronLeft, ChevronRight } from "lucide-react";
import type { ThemeKey } from "../types";

type Props = {
  theme: ThemeKey;
  setTheme: (v: ThemeKey) => void;
  grid: number;
  setGrid: (v: number) => void;
  onStart: () => void;
  onOpenSettings: () => void;
};

const themes: ThemeKey[] = ["animals", "fruits", "numbers", "emoji"];
const themeLabels = {
  animals: "Animals",
  fruits: "Fruits", 
  numbers: "Numbers",
  emoji: "Emoji"
};

export default function HomeScreen({
  theme,
  setTheme,
  grid,
  setGrid,
  onStart,
  onOpenSettings,
}: Props) {
  const currentThemeIndex = themes.indexOf(theme);
  
  const nextTheme = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };
  
  const prevTheme = () => {
    const prevIndex = (currentThemeIndex - 1 + themes.length) % themes.length;
    setTheme(themes[prevIndex]);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-50 to-pink-50 p-4">
      <div className="bg-white/80 backdrop-blur-xl border border-orange-200 shadow-2xl rounded-3xl w-[500px] h-[500px] p-8 flex flex-col justify-center gap-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-orange-800 tracking-wide">
            Recall Vault
          </h1>

          <button
            onClick={onOpenSettings}
            className="text-orange-700 hover:text-orange-900 transition"
          >
            <Settings size={28} />
          </button>
        </div>

        {/* Center Options */}
        <div className="flex flex-col items-center gap-8">
          {/* Theme Select */}
          <div className="w-full">
            <label className="text-orange-800 text-lg mb-4 block font-medium text-center">
              Select Theme:
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevTheme}
                className="p-2 rounded-full bg-orange-200 hover:bg-orange-300 text-orange-800 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="bg-orange-100 px-6 py-3 rounded-xl border-2 border-orange-200 min-w-[140px] text-center">
                <span className="text-orange-800 font-semibold text-lg">
                  {themeLabels[theme]}
                </span>
              </div>
              <button
                onClick={nextTheme}
                className="p-2 rounded-full bg-orange-200 hover:bg-orange-300 text-orange-800 transition"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Grid Size Select */}
          <div className="w-full">
            <label className="text-orange-800 text-lg mb-4 block font-medium text-center">
              Select Grid Size:
            </label>

            <div className="grid grid-cols-3 gap-3 w-full">
              <button
                className={`p-3 rounded-xl border-2 transition font-medium
                ${
                  grid === 4
                    ? "bg-orange-300 border-orange-400 text-orange-900"
                    : "bg-orange-100 border-orange-200 text-orange-700 hover:bg-orange-200"
                }`}
                onClick={() => setGrid(4)}
              >
                Easy
              </button>

              <button
                className={`p-3 rounded-xl border-2 transition font-medium
                ${
                  grid === 6
                    ? "bg-orange-300 border-orange-400 text-orange-900"
                    : "bg-orange-100 border-orange-200 text-orange-700 hover:bg-orange-200"
                }`}
                onClick={() => setGrid(6)}
              >
                Medium
              </button>

              <button
                className={`p-3 rounded-xl border-2 transition font-medium
                ${
                  grid === 8
                    ? "bg-orange-300 border-orange-400 text-orange-900"
                    : "bg-orange-100 border-orange-200 text-orange-700 hover:bg-orange-200"
                }`}
                onClick={() => setGrid(8)}
              >
                Hard
              </button>
            </div>
          </div>

          {/* Start Button */}
          <button
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-12 rounded-2xl shadow-lg shadow-orange-300/50 transition-all text-lg"
            onClick={onStart}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

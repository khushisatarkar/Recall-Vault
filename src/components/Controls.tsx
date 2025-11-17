import React from "react";
import type { Mode } from "../types";

interface Props {
  mode: Mode;
  setMode: (m: Mode) => void;
  onStart: () => void;
  onReset: () => void;
  timeLeft: number | null;
  streak: number;
  movesLeft: number | null;
  running: boolean;
}

export default function Controls({
  mode,
  setMode,
  onStart,
  onReset,
  timeLeft,
  streak,
  movesLeft,
  running,
}: Props) {
  return (
    <div className="w-full flex flex-col items-center gap-4 py-4">
      {/* Mode Selector */}
      <div className="flex items-center gap-2">
        <label className="text-white text-sm">Mode:</label>
        <select
          value={mode}
          disabled={running}
          onChange={(e) => setMode(e.target.value as Mode)}
          className={`px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 
          shadow-inner transition-all ${
            running ? "opacity-40 cursor-not-allowed" : "hover:border-gray-500"
          }`}
        >
          <option value="easy">Easy (4×4)</option>
          <option value="medium">Medium (6×6)</option>
          <option value="hard">Hard (8×8)</option>
        </select>
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-white mt-2">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-300">Time Left</span>
          <span className="text-lg font-semibold">{timeLeft ?? "-"}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-300">Streak</span>
          <span className="text-lg font-semibold">{streak}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-300">Moves</span>
          <span className="text-lg font-semibold">{movesLeft ?? "-"}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        {/* Start Button */}
        <button
          onClick={onStart}
          disabled={running}
          className={`px-6 py-2 rounded-xl text-black font-semibold bg-green-400 
          shadow-md shadow-green-700/30 transition-transform 
          ${running ? "opacity-40 cursor-not-allowed" : "hover:scale-105"}`}
        >
          Start
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="px-6 py-2 rounded-xl font-semibold bg-red-400 text-black 
          shadow-md shadow-red-700/30 hover:scale-105 transition-transform"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

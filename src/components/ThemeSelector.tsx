import React from "react";
import type { ThemeKey } from "../types";

interface Props {
  theme: ThemeKey;
  setTheme: (t: ThemeKey) => void;
  grid: number;
  setGrid: (n: number) => void;
}

export default function ThemeSelector({
  theme,
  setTheme,
  grid,
  setGrid,
}: Props) {
  return (
    <div className="bg-white rounded-soft p-4 shadow-soft-glow max-w-4xl mx-auto mb-4">
      <div className="flex gap-4 flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-3 items-center">
          <label className="text-sm font-medium text-gray-700">Theme</label>
          <div className="flex gap-2">
            {(["animals", "flags", "icons"] as ThemeKey[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 rounded-md text-sm ${
                  theme === t
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <label className="text-sm font-medium text-gray-700">Grid</label>
          {[4, 6, 8].map((n) => (
            <button
              key={n}
              onClick={() => setGrid(n)}
              className={`px-3 py-1 rounded-md text-sm ${
                grid === n
                  ? "bg-accent text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {n}×{n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

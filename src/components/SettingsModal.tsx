import { X, Volume2, VolumeX, Trophy } from "lucide-react";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function SettingsModal({ onClose }: Props) {
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white/90 border border-orange-200 rounded-3xl p-8 w-[400px] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-orange-800 text-2xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="text-orange-700 hover:text-orange-900 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Sound Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsMuted(false)}
              className={`p-4 rounded-xl border-2 transition-all ${
                !isMuted
                  ? "bg-orange-300 border-orange-400 text-orange-900"
                  : "bg-orange-100 border-orange-200 text-orange-700 hover:bg-orange-200"
              }`}
            >
              <Volume2 size={24} />
            </button>
            <button
              onClick={() => setIsMuted(true)}
              className={`p-4 rounded-xl border-2 transition-all ${
                isMuted
                  ? "bg-orange-300 border-orange-400 text-orange-900"
                  : "bg-orange-100 border-orange-200 text-orange-700 hover:bg-orange-200"
              }`}
            >
              <VolumeX size={24} />
            </button>
          </div>

          {/* High Score Button and Dark Mode Toggle */}
          <div className="flex items-center justify-center gap-4">
            <button className="bg-orange-100 hover:bg-orange-200 border-2 border-orange-200 rounded-xl p-4 text-orange-800 transition-all">
              <Trophy size={24} />
            </button>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative w-14 h-8 rounded-full border-2 transition-all duration-300 ${
                isDarkMode
                  ? "bg-orange-400 border-orange-500"
                  : "bg-orange-100 border-orange-200"
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

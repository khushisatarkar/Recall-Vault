import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function SettingsModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-[320px] shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-purple-300"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-4 text-white">
          <div className="bg-white/10 p-3 rounded-xl border border-white/20">
            <p className="font-medium opacity-80">🔊 Sound Effects</p>
            <p className="text-sm opacity-60">Enable / Disable game SFX</p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/20">
            <p className="font-medium opacity-80">🏆 High Scores</p>
            <p className="text-sm opacity-60">View best time & streak</p>
          </div>

          <div className="bg-white/10 p-3 rounded-xl border border-white/20">
            <p className="font-medium opacity-80">🌓 Theme Mode</p>
            <p className="text-sm opacity-60">Toggle Light / Dark UI</p>
          </div>
        </div>
      </div>
    </div>
  );
}

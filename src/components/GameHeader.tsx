type Props = {
  timeLeft: number | null;
  streak: number;
  movesLeft: number | null;
  onReset: () => void;
};

export default function GameHeader({
  timeLeft,
  streak,
  movesLeft,
  onReset,
}: Props) {
  return (
    <div className="w-full max-w-[500px] flex justify-between items-center px-4 py-3 mb-4">
      <div className="flex gap-6 text-lg font-semibold text-orange-800">
        <div>⏳ {timeLeft ?? "-"}</div>
        <div>🔥 {streak}</div>
        <div>🎯 {movesLeft ?? "-"}</div>
      </div>

      <button
        className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-medium transition-all"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

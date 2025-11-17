type Props = {
  onReplay: () => void;
  onHome: () => void;
};

export default function WinModal({ onReplay, onHome }: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-orange-200 shadow-2xl rounded-3xl w-[400px] p-8 flex flex-col gap-6 text-center">
      <h2 className="text-3xl font-bold text-orange-800">You Won! 🎉</h2>

      <button
        className="bg-orange-400 hover:bg-orange-500 text-white py-3 px-6 rounded-xl font-medium transition-all"
        onClick={onReplay}
      >
        Replay
      </button>

      <button
        className="bg-orange-100 hover:bg-orange-200 text-orange-800 py-3 px-6 rounded-xl font-medium border-2 border-orange-200 transition-all"
        onClick={onHome}
      >
        Home
      </button>
    </div>
  );
}

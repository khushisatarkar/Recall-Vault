import React, { useEffect, useMemo, useRef, useState } from "react";
import type { CardItem, Mode, ThemeKey } from "../types";
import { buildDeck, getPairsCount } from "../utils/game";
import Card from "./Card";
import ConfettiCanvas from "./ConfettiCanvas";

interface Props {
  grid: number;
  theme: ThemeKey;
  mode: Mode;
  running: boolean;
  onWin?: (stats: { timeTaken: number; moves: number }) => void;
  onLose?: () => void;
  setTimeLeftCallback?: (t: number | null) => void;
  setStreakCallback?: (s: number) => void;
  setMovesLeftCallback?: (m: number | null) => void;
}

export default function GameBoard({
  grid,
  theme,
  mode,
  running,
  onWin,
  onLose,
  setTimeLeftCallback,
  setStreakCallback,
  setMovesLeftCallback,
}: Props) {
  const [cards, setCards] = useState<CardItem[]>(() => buildDeck(grid, theme));
  const [first, setFirst] = useState<CardItem | null>(null);
  const [second, setSecond] = useState<CardItem | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [movesLeft, setMovesLeft] = useState<number | null>(null);
  const [won, setWon] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const confettiRef = useRef<HTMLCanvasElement | null>(null);

  // rebuild deck when grid/theme change or on reset
  useEffect(() => {
    setCards(buildDeck(grid, theme));
    setFirst(null);
    setSecond(null);
    setDisabled(false);
    setMoves(0);
    setStreak(0);
    setWon(false);
    if (mode === "timed") {
      // time scale: grid 4 -> 60s, 6 -> 120s, 8 -> 240s (example)
      const base = grid === 4 ? 60 : grid === 6 ? 120 : 240;
      setTimeLeft(base);
      setMovesLeft(null);
    } else if (mode === "challenge") {
      // limited moves roughly pairs * 3
      const movesAllowed = getPairsCount(grid) * 3;
      setMovesLeft(movesAllowed);
      setTimeLeft(null);
    } else {
      setTimeLeft(null);
      setMovesLeft(null);
    }
  }, [grid, theme, mode]);

  // run timer if timed mode & running
  useEffect(() => {
    if (mode !== "timed") {
      if (setTimeLeftCallback) setTimeLeftCallback(null);
      return;
    }
    if (!running || timeLeft == null) return;
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev == null) return null;
        if (prev <= 1) {
          clearInterval(t);
          if (!won) onLose?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    if (setTimeLeftCallback) setTimeLeftCallback(timeLeft);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, mode, timeLeft]);

  useEffect(() => {
    if (setTimeLeftCallback) setTimeLeftCallback(timeLeft);
  }, [timeLeft, setTimeLeftCallback]);

  useEffect(() => {
    if (setStreakCallback) setStreakCallback(streak);
  }, [streak, setStreakCallback]);

  useEffect(() => {
    if (setMovesLeftCallback) setMovesLeftCallback(movesLeft);
  }, [movesLeft, setMovesLeftCallback]);

  // when card clicked
  function handleFlip(card: CardItem) {
    if (disabled || card.revealed || card.matched || !running) return;
    const updated = cards.map((c) =>
      c.id === card.id ? { ...c, revealed: true } : c
    );
    setCards(updated);

    if (!first) {
      setFirst({ ...card, revealed: true });
      return;
    }
    if (!second) {
      setSecond({ ...card, revealed: true });
      setDisabled(true);
      setMoves((prev) => prev + 1);
      // reduce movesLeft for challenge mode
      if (mode === "challenge" && movesLeft != null) {
        setMovesLeft((prev) => (prev != null ? prev - 1 : prev));
      }
      setTimeout(() => {
        const f = updated.find((c) => c.id === first.id)!;
        const s = updated.find((c) => c.id === card.id)!;
        if (f.value === s.value) {
          // match
          setCards((prev) =>
            prev.map((c) =>
              c.value === f.value ? { ...c, matched: true, revealed: true } : c
            )
          );
          setFirst(null);
          setSecond(null);
          setDisabled(false);
          setStreak((prev) => prev + 1);
        } else {
          // not match
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === card.id
                ? { ...c, revealed: false }
                : c
            )
          );
          setFirst(null);
          setSecond(null);
          setDisabled(false);
          setStreak(0);
        }
      }, 700);
    }
  }

  // check win on matched count
  useEffect(() => {
    const matchedCount = cards.filter((c) => c.matched).length;
    if (matchedCount === cards.length && cards.length > 0) {
      setWon(true);
      const timeTaken = startTimeRef.current
        ? Math.floor((Date.now() - startTimeRef.current) / 1000)
        : 0;
      onWin?.({ timeTaken, moves });
      // fire confetti
      setTimeout(() => {
        if (confettiRef.current) {
          // call confetti function on canvas element by dispatching custom event
          confettiRef.current.dispatchEvent(new CustomEvent("celebrate"));
        }
      }, 300);
    }
  }, [cards, onWin, moves]);

  // start timer on game start
  useEffect(() => {
    if (running) startTimeRef.current = Date.now();
    else startTimeRef.current = null;
  }, [running]);

  // when movesLeft reach 0 in challenge mode -> lose
  useEffect(() => {
    if (mode === "challenge" && movesLeft != null && movesLeft <= 0) {
      onLose?.();
    }
  }, [movesLeft, mode, onLose]);

  // expose reset function via parent? handled in App

  // layout grid style
  const gridStyle = useMemo(() => {
    return { gridTemplateColumns: `repeat(${grid}, minmax(0,1fr))` };
  }, [grid]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white p-6 rounded-soft shadow-soft-glow">
        <div className="grid gap-3" style={{ minHeight: "360px" }}>
          <div className="grid" style={gridStyle}>
            {cards.map((c) => (
              <div key={c.id} className="p-2">
                <div className={`rounded-soft ${c.matched ? "matched" : ""}`}>
                  <Card
                    card={c}
                    onClick={() => handleFlip(c)}
                    disabled={disabled}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <div>
            Moves: <span className="font-medium">{moves}</span>
          </div>
        </div>
      </div>

      {/* Confetti Canvas overlay */}
      <ConfettiCanvas refCallback={(el) => (confettiRef.current = el)} />
    </div>
  );
}

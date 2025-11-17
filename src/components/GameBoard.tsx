import React, { useEffect, useMemo, useRef, useState } from "react";
import type { CardItem, Mode, ThemeKey } from "../types";
import { buildDeck, getPairsCount } from "../utils/game";
import Card from "./Card";

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
  const [elapsedTime, setElapsedTime] = useState(0);
  const [movesLeft, setMovesLeft] = useState<number | null>(null);
  const [won, setWon] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  // rebuild deck when grid/theme change or on reset
  useEffect(() => {
    setCards(buildDeck(grid, theme));
    setFirst(null);
    setSecond(null);
    setDisabled(false);
    setMoves(0);
    setStreak(0);
    setWon(false);
    setElapsedTime(0);
    if (mode === "challenge") {
      // limited moves roughly pairs * 3
      const movesAllowed = getPairsCount(grid) * 3;
      setMovesLeft(movesAllowed);
    } else {
      setMovesLeft(null);
    }
  }, [grid, theme, mode]);

  // run elapsed timer when running
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (setTimeLeftCallback) setTimeLeftCallback(elapsedTime);
  }, [elapsedTime, setTimeLeftCallback]);

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
    const cardSize = grid === 4 ? '80px' : grid === 6 ? '60px' : '45px';
    return { 
      gridTemplateColumns: `repeat(${grid}, ${cardSize})`,
      gridTemplateRows: `repeat(${grid}, ${cardSize})`,
      gap: '8px'
    };
  }, [grid]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="grid" style={gridStyle}>
          {cards.map((c) => (
            <Card
              key={c.id}
              card={c}
              onClick={() => handleFlip(c)}
              disabled={disabled}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-orange-700 text-center">
        <div>
          Moves: <span className="font-medium">{moves}</span>
        </div>
      </div>
    </div>
  );
}

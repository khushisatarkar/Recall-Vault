import type { CardItem, ThemeKey } from "../types";

const THEMES: Record<ThemeKey, string[]> = {
  animals: [
    "🐶",
    "🐱",
    "🐭",
    "🐹",
    "🐰",
    "🦊",
    "🐻",
    "🐼",
    "🐨",
    "🐯",
    "🦁",
    "🐮",
    "🐷",
    "🐸",
    "🐵",
    "🦄",
    "🐙",
    "🐢",
    "🦋",
    "🐝",
    "🐬",
    "🦈",
    "🦕",
    "🐔",
    "🦉",
    "🐧",
    "🐴",
    "🐗",
    "🐺",
    "🦝",
    "🦓",
    "🐞",
  ],
  flags: [
    "🇮🇳",
    "🇺🇸",
    "🇬🇧",
    "🇨🇦",
    "🇩🇪",
    "🇫🇷",
    "🇯🇵",
    "🇰🇷",
    "🇨🇳",
    "🇧🇷",
    "🇦🇺",
    "🇮🇩",
    "🇳🇱",
    "🇮🇹",
    "🇪🇸",
    "🇷🇺",
    "🇲🇽",
    "🇿🇦",
    "🇸🇬",
    "🇹🇭",
    "🇳🇿",
    "🇨🇴",
    "🇦🇷",
    "🇹🇷",
    "🇸🇦",
    "🇮🇱",
    "🇹🇼",
    "🇧🇪",
    "🇨🇭",
    "🇸🇪",
    "🇳🇴",
    "🇵🇭",
  ],
  icons: [
    "⭐",
    "🔥",
    "⚡",
    "💎",
    "🎵",
    "🎯",
    "🎲",
    "🔔",
    "🔒",
    "🧩",
    "🎮",
    "📌",
    "🔭",
    "🧭",
    "🎁",
    "🛡️",
    "⚓",
    "🚀",
    "🔑",
    "🧨",
    "🧪",
    "📷",
    "🖌️",
    "📚",
    "🕹️",
    "⌛",
    "🧭",
    "🧰",
    "🔋",
    "⚙️",
    "🧱",
  ],
};

export function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function getPairsCount(grid: number) {
  return (grid * grid) / 2;
}

export function buildDeck(grid: number, theme: ThemeKey): CardItem[] {
  const pairs = getPairsCount(grid);
  const pool = THEMES[theme].slice(0, pairs);
  if (pool.length < pairs) {
    // fallback: repeat emojis if not enough (shouldn't happen with provided themes)
    while (pool.length < pairs) pool.push(...THEMES[theme]);
    pool.length = pairs;
  }
  const cards: CardItem[] = shuffle(
    pool.flatMap((v) => [
      {
        id: `${v}-${Math.random().toString(36).slice(2)}`,
        value: v,
        revealed: false,
        matched: false,
      },
      {
        id: `${v}-${Math.random().toString(36).slice(2)}`,
        value: v,
        revealed: false,
        matched: false,
      },
    ])
  );
  return cards;
}

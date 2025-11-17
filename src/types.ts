export type Mode = "timed" | "streak" | "challenge" | "casual";
export type ThemeKey = "animals" | "fruits" | "numbers" | "emoji";

export interface CardItem {
  id: string; // unique id per card instance
  value: string; // emoji or symbol (pair key)
  revealed: boolean;
  matched: boolean;
}

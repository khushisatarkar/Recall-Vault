export type Mode = "timed" | "streak" | "challenge" | "casual";
export type ThemeKey = "animals" | "flags" | "icons";

export interface CardItem {
  id: string; // unique id per card instance
  value: string; // emoji or symbol (pair key)
  revealed: boolean;
  matched: boolean;
}

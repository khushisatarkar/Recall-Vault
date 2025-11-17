import React from "react";
import type { CardItem } from "../types";
import { motion } from "framer-motion";

interface Props {
  card: CardItem;
  onClick: () => void;
  disabled: boolean;
}

export default function Card({ card, onClick, disabled }: Props) {
  return (
    <motion.div
      className={`w-full aspect-square bg-white rounded-xl border-2 border-orange-200 shadow-lg flex items-center justify-center cursor-pointer transition-all hover:shadow-xl ${
        card.matched ? "bg-green-100 border-green-300" : ""
      }`}
      onClick={() => !disabled && onClick()}
      animate={{ scale: card.matched ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="text-2xl md:text-3xl select-none">
        {card.revealed || card.matched ? card.value : "❓"}
      </div>
    </motion.div>
  );
}

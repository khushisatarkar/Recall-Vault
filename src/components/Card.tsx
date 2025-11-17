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
    <div className="card-3d" onClick={() => !disabled && onClick()}>
      <motion.div
        className={`card-inner relative w-full h-0 pb-[100%] rounded-soft`}
        style={{ position: "relative" }}
        animate={{ scale: card.matched ? 1.02 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div
          className={`card-face card-front absolute bg-white shadow-md rounded-soft border border-gray-100 flex items-center justify-center`}
        >
          {/* front - back of card (hidden when not flipped) */}
          <div className={`text-3xl select-none`}>❓</div>
        </div>

        <div
          className={`card-face card-back absolute bg-white shadow-md rounded-soft matched:${
            card.matched ? "matched" : ""
          } flex items-center justify-center`}
        >
          <div className="text-4xl">{card.value}</div>
        </div>

        {/* apply flip class via inline style */}
        <style>{`
          .card-inner { transform-style: preserve-3d; }
          .card-inner > .card-front { transform: rotateY(0deg); }
          .card-inner > .card-back { transform: rotateY(180deg); }
          .card-inner { transition: transform 0.6s cubic-bezier(.2,.8,.2,1); }
        `}</style>

        {/* conditional class to flip */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform:
              card.revealed || card.matched
                ? "rotateY(180deg)"
                : "rotateY(0deg)",
          }}
        >
          {/* duplicate faces inside to ensure 3D flip works */}
          <div className="card-face card-front absolute bg-white shadow-md rounded-soft border border-gray-100 flex items-center justify-center">
            <div className="text-3xl select-none">❓</div>
          </div>
          <div className="card-face card-back absolute bg-white shadow-md rounded-soft flex items-center justify-center">
            <div className="text-4xl">{card.value}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

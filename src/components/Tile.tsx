import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TileProps {
  value: number;
  isNew?: boolean;
  hasMoved?: boolean;
  position: {
    row: number;
    col: number;
  };
}

const colors: Record<number, string> = {
  2: 'bg-[#eee4da] text-[#776e65]',
  4: 'bg-[#ede0c8] text-[#776e65]',
  8: 'bg-[#f2b179] text-white',
  16: 'bg-[#f59563] text-white',
  32: 'bg-[#f67c5f] text-white',
  64: 'bg-[#f65e3b] text-white',
  128: 'bg-[#edcf72] text-white',
  256: 'bg-[#edcc61] text-white',
  512: 'bg-[#edc850] text-white',
  1024: 'bg-[#edc53f] text-white',
  2048: 'bg-[#edc22e] text-white'
};

const getFontSize = (value: number): string => {
  if (value < 100) return 'text-4xl';
  if (value < 1000) return 'text-3xl';
  return 'text-2xl';
};

export const Tile: React.FC<TileProps> = ({ value, isNew, hasMoved, position }) => {
  const colorClass = colors[value] || 'bg-[#3c3a32] text-white';
  const fontSize = getFontSize(value);

  return (
    <AnimatePresence>
      <motion.div
        key={`${position.row}-${position.col}-${value}`}
        initial={isNew ? { scale: 0 } : { scale: 1 }}
        animate={{ 
          scale: 1,
          gridColumn: position.col + 1,
          gridRow: position.row + 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 500,
            damping: 30,
          },
          layout: {
            type: "spring",
            stiffness: 500,
            damping: 50,
          }
        }}
        layout
        style={{
          gridColumn: position.col + 1,
          gridRow: position.row + 1,
        }}
        className={`${colorClass} rounded-lg flex items-center justify-center font-bold ${fontSize} w-full h-full aspect-square`}
      >
        <motion.span
          initial={isNew ? { scale: 0 } : { scale: 1 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          {value}
        </motion.span>
      </motion.div>
    </AnimatePresence>
  );
};
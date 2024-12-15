import React from 'react';
import { WINNING_VALUE } from '../utils/gameLogic';

interface HeaderProps {
  score: number;
  bestScore: number;
}

export const Header: React.FC<HeaderProps> = ({ score, bestScore }) => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-4xl font-bold text-[#776e65]">2048</h1>
      <p className="text-sm text-[#776e65]">Join the tiles, get to {WINNING_VALUE}!</p>
    </div>
    <div className="flex gap-2">
      <div className="bg-[#bbada0] rounded p-2 text-white">
        <div className="text-xs">SCORE</div>
        <div className="font-bold">{score}</div>
      </div>
      <div className="bg-[#bbada0] rounded p-2 text-white">
        <div className="text-xs">BEST</div>
        <div className="font-bold">{bestScore}</div>
      </div>
    </div>
  </div>
);
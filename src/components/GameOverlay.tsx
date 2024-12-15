import React from 'react';

interface GameOverlayProps {
  isVisible: boolean;
  won: boolean;
  onReset: () => void;
}

export const GameOverlay: React.FC<GameOverlayProps> = ({ isVisible, won, onReset }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#776e65] mb-4">
          {won ? 'You Won!' : 'Game Over!'}
        </h2>
        <button
          onClick={onReset}
          className="bg-[#8f7a66] text-white px-4 py-2 rounded font-bold hover:bg-[#7f6a56] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
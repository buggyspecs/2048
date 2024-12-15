import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ControlsProps {
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onReset }) => (
  <div className="flex justify-between items-center">
    <button
      onClick={onReset}
      className="flex items-center gap-2 bg-[#8f7a66] text-white px-4 py-2 rounded font-bold hover:bg-[#7f6a56] transition-colors"
    >
      <RotateCcw className="w-4 h-4" />
      New Game
    </button>
    <div className="text-sm text-[#776e65]">
      <p>⬆️ ⬇️ ➡️ ⬅️ or swipe to move</p>
    </div>
  </div>
);
import React, { useState, useCallback, useEffect } from 'react';
import { Grid } from './components/Grid';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { GameOverlay } from './components/GameOverlay';
import { Direction, Grid as GridType } from './types/game';
import { createEmptyGrid, addRandomTile, moveGrid, isGameOver, hasWon } from './utils/gameLogic';
import { useSwipe } from './hooks/useSwipe';
import { useSound } from './hooks/useSound';

function App() {
  const [grid, setGrid] = useState<GridType>(() => addRandomTile(addRandomTile(createEmptyGrid())));
  const [previousGrid, setPreviousGrid] = useState<GridType | null>(null);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const { playMergeSound, playMoveSound } = useSound();

  const handleMove = useCallback((direction: Direction) => {
    if (gameOver) return;

    setPreviousGrid(grid);
    const { grid: newGrid, score: moveScore, merged } = moveGrid(grid, direction);
    
    if (JSON.stringify(newGrid) !== JSON.stringify(grid)) {
      if (merged) {
        playMergeSound();
      } else {
        playMoveSound();
      }
      
      const gridWithNewTile = addRandomTile(newGrid);
      setGrid(gridWithNewTile);
      setScore(prev => {
        const newScore = prev + moveScore;
        if (newScore > bestScore) {
          setBestScore(newScore);
          localStorage.setItem('bestScore', newScore.toString());
        }
        return newScore;
      });

      if (hasWon(gridWithNewTile) && !won) {
        setWon(true);
      }

      if (isGameOver(gridWithNewTile)) {
        setGameOver(true);
      }
    }
  }, [grid, gameOver, won, bestScore, playMergeSound, playMoveSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          handleMove('up');
          break;
        case 'ArrowDown':
          handleMove('down');
          break;
        case 'ArrowLeft':
          handleMove('left');
          break;
        case 'ArrowRight':
          handleMove('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove]);

  useSwipe({ onSwipe: handleMove });

  const resetGame = () => {
    setGrid(addRandomTile(addRandomTile(createEmptyGrid())));
    setPreviousGrid(null);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8ef] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Header score={score} bestScore={bestScore} />
        <Controls onReset={resetGame} />
        <div className="relative">
          <Grid grid={grid} previousGrid={previousGrid} />
          <GameOverlay 
            isVisible={gameOver || won}
            won={won}
            onReset={resetGame}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
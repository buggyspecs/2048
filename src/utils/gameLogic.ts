import { Cell, Grid, Direction } from '../types/game';

export const GRID_SIZE = 4;
export const WINNING_VALUE = 2048;

export function createEmptyGrid(): Grid {
  return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
}

export function addRandomTile(grid: Grid): Grid {
  const emptyCells: [number, number][] = [];
  
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === null) {
        emptyCells.push([i, j]);
      }
    });
  });

  if (emptyCells.length === 0) return grid;

  const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newGrid = grid.map(row => [...row]);
  newGrid[row][col] = Math.random() < 0.9 ? 2 : 4;

  return newGrid;
}

export function moveGrid(grid: Grid, direction: Direction): { grid: Grid; score: number; merged: boolean } {
  let score = 0;
  let merged = false;
  const newGrid = grid.map(row => [...row]);

  const rotate = (grid: Grid): Grid => {
    const size = grid.length;
    const rotated = createEmptyGrid();
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        rotated[j][size - 1 - i] = grid[i][j];
      }
    }
    return rotated;
  };

  const moveLeft = (grid: Grid): { grid: Grid; score: number; merged: boolean } => {
    let score = 0;
    let merged = false;
    
    for (let i = 0; i < GRID_SIZE; i++) {
      let row = grid[i].filter(cell => cell !== null) as number[];
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          score += row[j];
          row.splice(j + 1, 1);
          merged = true;
        }
      }
      const newRow = [...row, ...Array(GRID_SIZE - row.length).fill(null)];
      grid[i] = newRow;
    }
    
    return { grid, score, merged };
  };

  let rotatedGrid = newGrid;
  
  // Rotate grid according to direction
  if (direction === 'up') {
    rotatedGrid = rotate(rotate(rotate(newGrid)));
  } else if (direction === 'right') {
    rotatedGrid = rotate(rotate(newGrid));
  } else if (direction === 'down') {
    rotatedGrid = rotate(newGrid);
  }

  const result = moveLeft(rotatedGrid);
  score = result.score;
  merged = result.merged;

  // Rotate back
  if (direction === 'up') {
    rotatedGrid = rotate(result.grid);
  } else if (direction === 'right') {
    rotatedGrid = rotate(rotate(result.grid));
  } else if (direction === 'down') {
    rotatedGrid = rotate(rotate(rotate(result.grid)));
  }

  return { grid: rotatedGrid, score, merged };
}

export function isGameOver(grid: Grid): boolean {
  // Check for empty cells
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (grid[i][j] === null) return false;
    }
  }

  // Check for possible merges
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      const current = grid[i][j];
      if (
        (i < GRID_SIZE - 1 && grid[i + 1][j] === current) ||
        (j < GRID_SIZE - 1 && grid[i][j + 1] === current)
      ) {
        return false;
      }
    }
  }

  return true;
}

export function hasWon(grid: Grid): boolean {
  return grid.some(row => row.some(cell => cell === WINNING_VALUE));
}
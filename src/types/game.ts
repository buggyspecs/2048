export type Cell = number | null;
export type Grid = Cell[][];
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameState {
  grid: Grid;
  score: number;
  bestScore: number;
  gameOver: boolean;
  won: boolean;
}
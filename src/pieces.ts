import colors from "tailwindcss/colors";
import { shuffle } from "./shuffle";

export type Coord = { x: number; y: number };

interface Piece {
  color: string;
  blocks: Coord[][];
}

export const pieceNames = ["i", "j", "l", "o", "s", "t", "z"] as const;

export const Pieces: { [k in typeof pieceNames[number]]: Piece } = {
  i: {
    color: colors.cyan[600],
    blocks: [
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: -2, y: 0 },
        { x: 1, y: 0 },
      ],
      [
        { x: 0, y: -1 },
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      [
        { x: 0, y: 1 },
        { x: -1, y: 1 },
        { x: -2, y: 1 },
        { x: 1, y: 1 },
      ],
      [
        { x: -1, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
        { x: -1, y: 2 },
      ],
    ],
  },
  j: {
    color: colors.blue[600],
    blocks: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: -1, y: -1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: -1 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
      ],
    ],
  },
  l: {
    color: colors.orange[500],
    blocks: [
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: -1, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: -1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: -1, y: -1 },
      ],
    ],
  },
  o: {
    color: colors.yellow[500],
    // Doesn't have a rotation lol
    blocks: [
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
        { x: 0, y: 1 },
      ],
    ],
  },
  s: {
    color: colors.green[500],
    blocks: [
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: 1 },
      ],
    ],
  },
  t: {
    color: colors.purple[500],
    blocks: [
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: 1, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
      ],
    ],
  },
  z: {
    color: colors.red[500],
    blocks: [
      [
        { x: 0, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
      ],
      [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: 0, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      [
        { x: 0, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: -1, y: 1 },
      ],
    ],
  },
};

export function createBag() {
  const bag = [...pieceNames];
  shuffle(bag);
  return bag;
}

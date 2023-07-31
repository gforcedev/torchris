import colors from "tailwindcss/colors";

// type Coord = { x: number; y: number };

// TODO: make Pieces satisfy piece

// interface Piece {
// color: string;
// blocks: Coord[];
// }

export const Pieces = {
  i: {
    color: colors.cyan[600],
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
  },
  j: {
    color: colors.blue[600],
    blocks: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: -1, y: -1 },
    ],
  },
  l: {
    color: colors.orange[500],
    blocks: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: -1 },
      { x: -1, y: 0 },
    ],
  },
  o: {
    color: colors.yellow[500],
    blocks: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ],
  },
  s: {
    color: colors.green[500],
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
    ],
  },
  t: {
    color: colors.purple[500],
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
    ],
  },
  z: {
    color: colors.red[500],
    blocks: [
      { x: 0, y: 0 },
      { x: -1, y: -1 },
      { x: 0, y: -1 },
      { x: 1, y: 0 },
    ],
  },
};

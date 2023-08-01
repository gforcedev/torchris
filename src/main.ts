import { Coord, createBag, Pieces } from "./pieces";
import colors from "tailwindcss/colors";
import "./style.css";

const c = document.getElementById("canvas") as HTMLCanvasElement;
var ctx = c.getContext("2d") as CanvasRenderingContext2D;

const torchCanvas = document.createElement("canvas");
torchCanvas.width = c.width;
torchCanvas.height = c.height;
const torchContext = torchCanvas.getContext("2d")!;

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 22;

const SPACE_HEIGHT = 20;
const BLOCK_HEIGHT = SPACE_HEIGHT - 2;
const BLOCK_DRAW_Y_OFFSET = SPACE_HEIGHT * 2 - BLOCK_HEIGHT / 4;

const TORCH_RADIUS = 100;

let dead = false;
let linesScored = 0;

const firstBag = createBag();
const state = {
  board: new Array(BOARD_HEIGHT)
    .fill("")
    .map(() => new Array(BOARD_WIDTH).fill("")),

  bag: firstBag,
  currPieceName: firstBag[firstBag.length - 1],
  currPiecePosition: { x: 5, y: 1 } as Coord,
  currPieceRotation: 0,
};

addPiece(state.bag.pop()!, state.board, 5, 1);

// document.addEventListener("keydown", update);
setInterval(update, 1000 / 10);
setInterval(drawFrame, 10);
document.addEventListener("keydown", (event) => {
  if (event.key === "a") {
    movePiece({ x: -1, y: 0 });
  } else if (event.key === "d") {
    movePiece({ x: 1, y: 0 });
  } else if (event.key === "ArrowLeft") {
    rotatePiece(-1);
  } else if (event.key === "ArrowRight") {
    rotatePiece(1);
  }
});

function update() {
  if (dead) {
    return;
  }

  const currOccupied = computeOccupied();

  if (checkIfCanDrop(currOccupied)) {
    movePiece({ x: 0, y: 1 });
    return;
  }

  for (let row = 0; row < state.board.length; row++) {
    if (state.board[row].findIndex((block) => block === "") === -1) {
      state.board = [
        new Array(BOARD_WIDTH).fill(""),
        ...state.board.slice(0, row),
        ...state.board.slice(row + 1),
      ];
      linesScored++;
    }
  }

  spawnNextPiece();
}

function drawFrame() {
  document.getElementById("score")!.innerHTML = linesScored.toString();

  ctx.clearRect(0, 0, c.width, c.height);
  // Background
  ctx.fillStyle = dead ? colors.red[800] : colors.gray[800];
  ctx.fillRect(0, 0, c.width, c.height);

  state.board.forEach((row, i) => {
    row.forEach((block, j) => {
      if (block === "") {
        ctx.fillStyle = colors.gray[700];
      } else {
        ctx.fillStyle = block;
      }

      ctx.fillRect(
        j * SPACE_HEIGHT + 1,
        i * SPACE_HEIGHT + 1 - BLOCK_DRAW_Y_OFFSET,
        // i * SPACE_HEIGHT + 1,
        BLOCK_HEIGHT,
        BLOCK_HEIGHT
      );
    });
  });

  if (dead) {
    return;
  }

  torchContext.clearRect(0, 0, c.width, c.height);
  const gradient = torchContext.createRadialGradient(
    state.currPiecePosition.x * SPACE_HEIGHT,
    state.currPiecePosition.y * SPACE_HEIGHT - BLOCK_DRAW_Y_OFFSET,
    0,
    state.currPiecePosition.x * SPACE_HEIGHT,
    state.currPiecePosition.y * SPACE_HEIGHT - BLOCK_DRAW_Y_OFFSET,
    TORCH_RADIUS
  );
  gradient.addColorStop(1, "rgba(0,0,0,0.05)");
  gradient.addColorStop(0, "rgba(0,0,0,1)");
  torchContext.fillStyle = gradient;
  torchContext.fillRect(0, 0, c.width, c.height);
  torchContext.fillStyle = "#000";
  torchContext.globalCompositeOperation = "xor";
  torchContext.fillRect(0, 0, c.width, c.height);

  ctx.drawImage(torchCanvas, 0, 0);
}

function computeOccupied() {
  return Pieces[state.currPieceName].blocks[state.currPieceRotation].map(
    (b) =>
      ({
        x: b.x + state.currPiecePosition.x,
        y: b.y + state.currPiecePosition.y,
      } as Coord)
  );
}

function addPiece(
  name: keyof typeof Pieces,
  board: string[][],
  x: number,
  y: number
) {
  for (let coord of Pieces[name].blocks[0]) {
    if (board[y + coord.y][x + coord.x] !== "") {
      dead = true;
    }

    board[y + coord.y][x + coord.x] = Pieces[name].color;
  }
}

function spawnNextPiece() {
  if (state.bag.length === 0) {
    state.bag = createBag();
  }

  // Keep typescript happy, error should never happen
  const pieceToAdd = state.bag.pop();
  if (typeof pieceToAdd === "undefined") {
    throw new Error("wut");
  }

  addPiece(pieceToAdd, state.board, 5, 1);
  state.currPiecePosition = { x: 5, y: 1 };
  state.currPieceRotation = 0;
  state.currPieceName = pieceToAdd;
}

function checkIfCanDrop(currOccupied: Coord[]) {
  for (let occupiedBlock of currOccupied) {
    const toCheck: Coord = { x: occupiedBlock.x, y: occupiedBlock.y + 1 };

    // If we're checking against another square we currently occupy, ignore
    if (
      currOccupied.find(
        (coord) => coord.x === toCheck.x && coord.y === toCheck.y
      )
    ) {
      continue;
    }

    if (
      toCheck.y === state.board.length ||
      state.board[toCheck.y][toCheck.x] !== ""
    ) {
      return false;
    }
  }
  return true;
}

function movePiece(direction: Coord) {
  const currOccupied = computeOccupied();

  for (let occupied of currOccupied) {
    // Abort if we'd hit an edge
    if (
      occupied.y + direction.y < 0 ||
      occupied.y + direction.y >= BOARD_HEIGHT ||
      occupied.x + direction.x < 0 ||
      occupied.x + direction.x >= BOARD_WIDTH
    ) {
      return;
    }

    // Abort if we'd hit another piece
    if (
      state.board[occupied.y + direction.y][occupied.x + direction.x] !== "" &&
      !currOccupied.find(
        (coord) =>
          coord.x === occupied.x + direction.x &&
          coord.y === occupied.y + direction.y
      )
    ) {
      return;
    }
  }

  for (let coord of currOccupied) {
    state.board[coord.y][coord.x] = "";
  }
  for (let coord of currOccupied) {
    state.board[coord.y + direction.y][coord.x + direction.x] =
      Pieces[state.currPieceName].color;
  }

  state.currPiecePosition = {
    x: state.currPiecePosition.x + direction.x,
    y: state.currPiecePosition.y + direction.y,
  };
}

/**
 * Assumes direction is 1 or -1
 */
function rotatePiece(direction: number) {
  const oldOccupied = computeOccupied();

  state.currPieceRotation =
    (state.currPieceRotation +
      direction +
      Pieces[state.currPieceName].blocks.length) %
    Pieces[state.currPieceName].blocks.length;

  let newOccupied = computeOccupied();

  // Check if we're rotating onto something else
  for (let newOccupiedCoord of newOccupied) {
    if (
      newOccupiedCoord.x >= BOARD_WIDTH ||
      newOccupiedCoord.x < 0 ||
      newOccupiedCoord.y >= BOARD_HEIGHT ||
      newOccupiedCoord.y < 0 ||
      (state.board[newOccupiedCoord.y][newOccupiedCoord.x] !== "" &&
        !newOccupied.find(
          (coord) =>
            coord.x === newOccupiedCoord.x && coord.y === newOccupiedCoord.y
        ))
    ) {
      // Reset and return
      state.currPieceRotation =
        (state.currPieceRotation -
          direction +
          Pieces[state.currPieceName].blocks.length) %
        Pieces[state.currPieceName].blocks.length;
      return;
    }
  }

  // If we're not, update everything
  for (let coord of oldOccupied) {
    state.board[coord.y][coord.x] = "";
  }

  for (let coord of newOccupied) {
    state.board[coord.y][coord.x] = Pieces[state.currPieceName].color;
  }
}

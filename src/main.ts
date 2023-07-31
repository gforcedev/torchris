import { Pieces } from "./pieces";
import colors from "tailwindcss/colors";
import "./style.css";

const c = document.getElementById("canvas") as HTMLCanvasElement;
var ctx = c.getContext("2d") as CanvasRenderingContext2D;

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 22;

const SPACE_HEIGHT = 20;
const BLOCK_HEIGHT = SPACE_HEIGHT - 2;
const BLOCK_DRAW_Y_OFFSET = SPACE_HEIGHT * 2 - BLOCK_HEIGHT / 4;

function addPiece(
  name: keyof typeof Pieces,
  board: string[][],
  x: number,
  y: number
) {
  for (let coord of Pieces[name].blocks) {
    board[y + coord.y][x + coord.x] = Pieces[name].color;
  }
}

let board = new Array(BOARD_HEIGHT)
  .fill("")
  .map(() => new Array(BOARD_WIDTH).fill(""));

addPiece("i", board, 4, 4);

function update() {
  // board = [board[board.length - 1], ...board.slice(0, -1)];
}

function drawFrame() {
  ctx.clearRect(0, 0, c.width, c.height);
  // Grey background
  ctx.fillStyle = colors.gray[800];
  ctx.fillRect(0, 0, c.width, c.height);

  board.forEach((row, i) => {
    row.forEach((block, j) => {
      if (block === "") {
        ctx.fillStyle = colors.gray[700];
      } else {
        ctx.fillStyle = block;
      }

      ctx.fillRect(
        j * SPACE_HEIGHT + 1,
        i * SPACE_HEIGHT + 1 - BLOCK_DRAW_Y_OFFSET,
        BLOCK_HEIGHT,
        BLOCK_HEIGHT
      );
    });
  });
}

setInterval(update, 1000 / 60);
setInterval(drawFrame, 10);

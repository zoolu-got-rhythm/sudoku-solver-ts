import { solvePropperSudoku } from "./sudokuSolver";

const puzzleInput: number[][] = [
  [9, 1, 5, -1, -1, 3, 4, -1, 6],
  [-1, -1, -1, 1, -1, 2, -1, 8, 9],
  [-1, 6, -1, -1, -1, 4, 7, -1, 3],

  [-1, -1, -1, 3, 1, -1, -1, 9, -1],
  [5, -1, 8, -1, 4, -1, -1, 3, 2],
  [3, 4, 1, 8, -1, -1, -1, 5, -1],

  [-1, -1, -1, 4, 9, 6, -1, -1, -1],
  [2, 7, -1, -1, -1, -1, 9, -1, -1],
  [4, -1, 9, -1, -1, 1, 3, -1, 5],
];

console.log("sudoku puzzle input");
const formattedPuzzleInputAsString = puzzleInput
  .map((row) => row.map((cell) => (cell === -1 ? " " : cell)).join(" "))
  .join("\n");
console.log(formattedPuzzleInputAsString);

console.log("\n");

const solvedSudoku = solvePropperSudoku(puzzleInput);
console.log("solved sudoku puzzle");
const formattedResultAsString = solvedSudoku
  ?.map((row) => row.join(" "))
  .join("\n");
console.log(formattedResultAsString);

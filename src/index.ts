export const checkRowIsValid = (yIndex: number, arr2d: number[][]) => {
  let foundNumbersInRow: number[] = [];
  for (let x = 0; x < 9; x++) {
    if (arr2d[yIndex][x] === -1) {
      continue;
    }

    if (foundNumbersInRow.includes(arr2d[yIndex][x])) {
      return false;
    }
    foundNumbersInRow.push(arr2d[yIndex][x]);
  }
  return true;
};

export const checkColumnIsValid = (xIndex: number, arr2d: number[][]) => {
  let foundNumbersInColumn: number[] = [];
  for (let y = 0; y < 9; y++) {
    if (arr2d[y][xIndex] === -1) {
      continue;
    }

    if (foundNumbersInColumn.includes(arr2d[y][xIndex])) {
      return false;
    }
    foundNumbersInColumn.push(arr2d[y][xIndex]);
  }
  return true;
};

export const check3by3BoxIsValid = (
  xIndex: number,
  yIndex: number,
  arr2d: number[][]
) => {
  let found: number[] = [];

  const checkRowWithin3by3blockIsValid = (xIndexOffset: number, y: number) => {
    let xIndexWithin3by3Box = xIndexOffset % 3;
    // console.log("Y", y);

    // console.log("found", found);

    if (xIndexWithin3by3Box === 0) {
      for (let x = 0; x < 3; x++) {
        if (arr2d[y][xIndexOffset + x] === -1) {
          continue;
        }

        if (found.includes(arr2d[y][xIndexOffset + x])) {
          return false;
        }

        found.push(arr2d[y][xIndexOffset + x]);
      }
    } else if (xIndexWithin3by3Box === 1) {
      for (let x = -1; x <= 1; x++) {
        if (arr2d[y][xIndexOffset + x] === -1) {
          continue;
        }

        if (found.includes(arr2d[y][xIndexOffset + x])) {
          return false;
        }
        found.push(arr2d[y][xIndexOffset + x]);
      }
    } else if (xIndexWithin3by3Box === 2) {
      for (let x = -2; x <= 0; x++) {
        if (arr2d[y][xIndexOffset + x] === -1) {
          continue;
        }

        if (found.includes(arr2d[y][xIndexOffset + x])) {
          return false;
        }
        found.push(arr2d[y][xIndexOffset + x]);
      }
    }
    return true;
  };

  let yIndexWithin3by3Box = yIndex % 3;

  if (yIndexWithin3by3Box === 0) {
    for (let y = 0; y < 3; y++) {
      if (!checkRowWithin3by3blockIsValid(xIndex, yIndex + y)) return false;
    }
  } else if (yIndexWithin3by3Box === 1) {
    for (let y = -1; y <= 1; y++) {
      if (!checkRowWithin3by3blockIsValid(xIndex, yIndex + y)) return false;
    }
  } else if (yIndexWithin3by3Box === 2) {
    for (let y = -2; y <= 0; y++) {
      if (!checkRowWithin3by3blockIsValid(xIndex, yIndex + y)) return false;
    }
  }

  return true;
};

// debug this function
const numberAtPosXYIsLegal = (
  xIndex: number,
  yIndex: number,
  arr2d: number[][]
) => {
  // console.log("running check");
  return (
    checkRowIsValid(yIndex, arr2d) &&
    checkColumnIsValid(xIndex, arr2d) &&
    check3by3BoxIsValid(xIndex, yIndex, arr2d)
  );
};

// @ts-ignore
const solvePropperSudoku = (
  x: number,
  y: number,
  arr2d: number[][]
): number[][] | undefined => {

  // if location is a clue
  if (arr2d[y][x] !== -1) {

    if (y === 8 && x === 8) {
      // end condition
      return arr2d;
    }
    return solvePropperSudoku(x == 8 ? 0 : x + 1, x == 8 ? y + 1 : y, arr2d);
  
  // if location has no clue/number in it
  } else {
    for (let i = 1; i <= 9; i++) {
      let arr2dcopy = Array.from(arr2d, (arr) => arr.slice());

      arr2dcopy[y][x] = i;
      let result: number[][] | undefined = undefined;

      if (numberAtPosXYIsLegal(x, y, arr2dcopy)) {

        if (y === 8 && x === 8) {
          // end condition
          return arr2dcopy;
        }
        result = solvePropperSudoku(
          x == 8 ? 0 : x + 1,
          x == 8 ? y + 1 : y,
          arr2dcopy
        );

    
      }

      // console.log("result", result);

      if (result) {
        // return result;
        return result;
      } 
      // if number in position isn't legal continue to next number for this slot -
      // or if next slot didn't find any number that worked for it

    }
  }

  // if this is reached backtrack will happen, as value of a function that has no return value is defaulted to undefined
};

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

const solvedSudoku = solvePropperSudoku(0, 0, puzzleInput);
console.log("final result", solvedSudoku);

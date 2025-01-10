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
  
  const numberAtPosXYIsLegal = (
    xIndex: number,
    yIndex: number,
    arr2d: number[][]
  ) => {
    return (
      checkRowIsValid(yIndex, arr2d) &&
      checkColumnIsValid(xIndex, arr2d) &&
      check3by3BoxIsValid(xIndex, yIndex, arr2d)
    );
  };
  
  const solveProperSudokuRecursive = (
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
      return solveProperSudokuRecursive(
        x == 8 ? 0 : x + 1,
        x == 8 ? y + 1 : y,
        arr2d
      );
  
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
          result = solveProperSudokuRecursive(
            x == 8 ? 0 : x + 1,
            x == 8 ? y + 1 : y,
            arr2dcopy
          );
        }
  
        if (result) {
          return result;
        }
        // if number in position isn't legal continue to next number for this slot -
        // or if next slot didn't find any number that worked for it
      }
    }
    // if this is reached backtrack will happen, as value of a function that has no return value is defaulted to undefined -
    // so undefined is 'returned' here implicitly
  };
  
  
  /**
   * Solves a proper sudoku puzzle (9x9 with a minimum of 17 clues) with a recursive backtracking algorithm
   * @param puzzleInput - a 9x9 2d array of numbers where -1 represents an empty cell
   * @returns a 9x9 2d array of numbers representing the solved sudoku puzzle
   */
  export const solveProperSudoku = (puzzleInput: number[][]): number[][] => {
    return solveProperSudokuRecursive(0, 0, puzzleInput) as number[][];
  };
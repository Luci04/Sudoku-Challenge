import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DigitBox from './DigitBox';
import NumberCell from './NumberCell';

const SudokuBox = () => {
  const [selectedNum, setSelectedNum] = useState(null);

  const [errorRows, setErrorRows] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  });

  const [errorCols, setErrorCols] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  });

  const [errorMatrix, setErrorMatrix] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  });

  const [board, setBoard] = useState([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);

  const [matrixNumber, setMatrixNumber] = useState([
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
  ]);

  const [solidBoard, setSolidBoard] = useState([
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
  ]);

  useEffect(() => {
    const tempSolid = [];
    const tempError = [];

    for (let i = 0; i < board.length; i++) {
      tempSolid[i] = [];
      tempError[i] = [];
      for (let j = 0; j < board[i].length; j++) {
        tempSolid[i][j] = board[i][j] !== 0;
      }
    }

    setSolidBoard(tempSolid);
  }, []);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Edit', 'Erase', 'Back'];

  // function generateBoard() {
  //   // generate Sudoku board using an algorithm or library
  // }

  function RowError(currBoard, value, row, col) {
    const countMap = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };

    let hasError = false;

    for (let i = 0; i < 9; i++) {
      countMap[`${currBoard[row][i]}`]++;
    }

    for (let i = 1; i <= 9; i++) {
      if (countMap[i] > 1) {
        hasError = true;
        break;
      }
    }

    if (hasError) {
      const tempRowError = {...errorRows};
      tempRowError[row] = 1;
      console.log('Rows', tempRowError);
      setErrorRows(tempRowError);
    } else {
      const tempRowError = {...errorRows};
      tempRowError[row] = 0;
      console.log('Rows', tempRowError);
      setErrorRows(tempRowError);
    }
  }

  function ColError(currBoard, value, row, col) {
    const countMap = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };

    let hasError = false;

    for (let i = 0; i < 9; i++) {
      countMap[`${currBoard[i][col]}`]++;
    }

    for (let i = 1; i <= 9; i++) {
      if (countMap[i] > 1) {
        hasError = true;
        break;
      }
    }

    if (hasError) {
      const tempColError = {...errorCols};
      tempColError[col] = 1;
      console.log('Cols', tempColError);
      setErrorCols(tempColError);
    } else {
      const tempColError = {...errorCols};
      tempColError[col] = 0;
      console.log('Cols', tempColError);
      setErrorCols(tempColError);
    }
  }

  function findMatrix(row, col) {
    // Calculate the row and column indices of the top-left cell of the matrix
    let matrixRow = Math.floor(row / 3) * 3;
    let matrixCol = Math.floor(col / 3) * 3;

    // Calculate the index of the matrix based on the top-left cell's row and column indices
    let matrixIndex = (matrixRow / 3) * 3 + matrixCol / 3;

    return matrixIndex;
  }

  function MatrixError(currBoard, value, row, col) {
    const countMap = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };

    let hasError = false;

    let startRow = row - (row % 3);
    let startCol = col - (col % 3);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        countMap[currBoard[i + startRow][j + startCol]]++;
      }
    }

    for (let i = 1; i <= 9; i++) {
      if (countMap[i] > 1) {
        hasError = true;
        break;
      }
    }

    if (hasError) {
      const tempMatrixError = {...errorMatrix};
      const MatrixNumber = findMatrix(row, col);
      tempMatrixError[MatrixNumber] = 1;
      setErrorMatrix(tempMatrixError);
    } else {
      const tempMatrixError = {...errorMatrix};
      const MatrixNumber = findMatrix(row, col);
      tempMatrixError[MatrixNumber] = 0;
      setErrorMatrix(tempMatrixError);
    }
  }

  function findError(currBoard, value, row, col) {
    RowError(currBoard, value, row, col);
    ColError(currBoard, value, row, col);
    MatrixError(currBoard, value, row, col);

    console.log(errorMatrix) << '\n';
  }

  function handleCellPress(row, col, back, edit) {
    if (solidBoard[row][col]) {
      return;
    }

    const currBoard = [...board];

    if (selectedNum === 'Erase') {
      currBoard[row][col] = 0;
      setBoard(currBoard);
    } else {
      currBoard[row][col] = selectedNum;
      setBoard(currBoard);
    }

    findError(currBoard, selectedNum, row, col);
  }

  return (
    <View style={styles.container}>
      {board.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((value, colIndex) => (
            <DigitBox
              handleCellPress={handleCellPress}
              isActive={selectedNum === value}
              key={`${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
              solid={solidBoard[rowIndex][colIndex]}
              isError={
                errorRows[rowIndex] >= 1 ||
                errorCols[colIndex] >= 1 ||
                errorMatrix[matrixNumber[rowIndex][colIndex]] >= 1
              }
              value={value}
            />
          ))}
        </View>
      ))}
      <View style={styles.digitBoxContainer}>
        {numbers.map((num, index) => (
          <NumberCell
            setSelectedNum={setSelectedNum}
            key={index}
            value={num}
            isActive={selectedNum === num}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  digitBoxContainer: {
    flex: 1,
    width: 360,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SudokuBox;

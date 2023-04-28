import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Modal, Button, Pressable} from 'react-native';
import DigitBox from './DigitBox';
import NumberCell from './NumberCell';
import CompletedModal from './CompletedModal';
import {solveSudoku} from './importantFunctions';
// import TimeClock from './Timer';
import NumberPad from './NumberPad';
import {useSelector, useDispatch} from 'react-redux';

const SudokuBox = () => {
  const dispatch = useDispatch();

  //Have Won Or not
  const [haveWon, setHaveWon] = useState(true);

  //Selected Number from Numpad
  // const [selectedNum, handleSelectedNum] = useState(null);

  const {selectedNum} = useSelector(state => state.sudokuReducer);

  const handleSelectedNum = num => {
    dispatch({type: 'SET_NUM', payload: num});
  };

  //Remaining Digits to Fill
  const [remainDigits, setRemainDigits] = useState({
    1: 9,
    2: 9,
    3: 9,
    4: 9,
    5: 9,
    6: 9,
    7: 9,
    8: 9,
    9: 9,
  });

  //Error in Rows
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

  //Error in Cols
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

  //Error in Matrix
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

  //Sudoku Problem Board
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

  //Each Digit Matrix Number
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

  //All Solid Digits That Never Changes
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
    const tempRemainDigits = {...remainDigits};

    for (let i = 0; i < board.length; i++) {
      tempSolid[i] = [];
      for (let j = 0; j < board[i].length; j++) {
        tempSolid[i][j] = board[i][j] !== 0;
        tempRemainDigits[board[i][j]]--;
      }
    }
    setRemainDigits(tempRemainDigits);
    setSolidBoard(tempSolid);
  }, []);

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'Edit', 'Erase', 'Back'];

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
      countMap[currBoard[row][i]]++;
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
      setErrorRows(tempRowError);
      return true;
    } else {
      const tempRowError = {...errorRows};
      tempRowError[row] = 0;
      setErrorRows(tempRowError);
      return false;
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
      countMap[currBoard[i][col]]++;
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
      setErrorCols(tempColError);
      return true;
    } else {
      const tempColError = {...errorCols};
      tempColError[col] = 0;
      setErrorCols(tempColError);
      return false;
    }
  }

  useEffect(() => {
    setBoard;
  }, [board]);

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

    const tempMatrixError = {...errorMatrix};

    if (hasError) {
      const MatrixNumber = findMatrix(row, col);
      tempMatrixError[MatrixNumber] = 1;
      setErrorMatrix(tempMatrixError);
      console.log(tempMatrixError);
      return true;
    } else {
      const MatrixNumber = findMatrix(row, col);
      tempMatrixError[MatrixNumber] = 0;
      setErrorMatrix(tempMatrixError);
      return false;
    }
  }

  function findError(currBoard, value, row, col) {
    let count = 0;
    count += 1 && RowError(currBoard, value, row, col);
    count += 1 && ColError(currBoard, value, row, col);
    count += 1 && MatrixError(currBoard, value, row, col);

    return count == 3;
  }

  function handleCellPress(row, col, back, edit) {
    if (solidBoard[row][col]) {
      return;
    }

    const currBoard = [...board];
    const currRemainDigits = {...remainDigits};

    if (selectedNum === 'Erase') {
      currRemainDigits[currBoard[row][col]]++;
      currBoard[row][col] = 0;
    } else if (selectedNum === null && currBoard[row][col]) {
      currRemainDigits[currBoard[row][col]]++;
      currBoard[row][col] = 0;
    } else if (selectedNum !== null && currBoard[row][col]) {
      currRemainDigits[selectedNum]--;
      currRemainDigits[currBoard[row][col]]++;
      currBoard[row][col] = selectedNum;
    } else {
      if (selectedNum === null) {
        return;
      }

      currBoard[row][col] = selectedNum;
      currRemainDigits[selectedNum]--;

      if (currRemainDigits[selectedNum] == 0) {
        handleSelectedNum(null);
      }
    }

    setBoard(currBoard);
    setRemainDigits(currRemainDigits);
    if (!findError(currBoard, selectedNum, row, col)) {
      let sum = 0;

      for (let i = 1; i <= 9; i++) {
        sum += currRemainDigits[i];
      }

      if (sum == 0) {
        setHaveWon(true);
      }
    }
  }

  useEffect(() => {}, [selectedNum, dispatch]);

  return (
    <View style={styles.container}>
      {/* <TimeClock /> */}
      <CompletedModal setHaveWon={setHaveWon} won={haveWon} />
      <View>
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
      </View>

      <NumberPad remainDigits={remainDigits} />

      {/* <View style={{backgroundColor: 'green'}}>
        <Pressable
          onPress={() => {
            solveSudoku([...board], setBoard);
          }}>
          <Text style={{color: 'white', padding: 50}}>Solve it</Text>
        </Pressable>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  digitBoxContainer: {
    width: 360,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default SudokuBox;

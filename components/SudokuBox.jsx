import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Modal, Button, Pressable} from 'react-native';
import DigitBox from './DigitBox';
import NumberCell from './NumberCell';
import CompletedModal from './CompletedModal';
import {solveSudoku} from './importantFunctions';
// import TimeClock from './Timer';
import NumberPad from './NumberPad';
import {useSelector, useDispatch} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import TimeClock from './Timer';

const SudokuBox = () => {
  const dispatch = useDispatch();
  //Time Controller
  const [startTime, setStartTime] = useState(false);

  //Have Won Or not
  const {hasWon} = useSelector(state => state.hasWonReducer);

  //Selected Number from Numpad
  // const [selectedNum, handleSelectedNum] = useState(null);

  const {selectedNum} = useSelector(state => state.sudokuReducer);

  const handleSelectedNum = num => {
    dispatch({type: 'SET_NUM', payload: num});
  };

  //Sudoku Problem Board
  const {board} = useSelector(state => state.boardReducer);

  //Remaining Digits to Fill
  const {remainDigits} = useSelector(state => state.remainReducer);

  //All Solid Digits That Never Changes
  const {solidBoard} = useSelector(state => state.solidReducer);

  //Each Digit Matrix Number
  const matrixNumber = [
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [0, 0, 0, 1, 1, 1, 2, 2, 2],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [3, 3, 3, 4, 4, 4, 5, 5, 5],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
    [6, 6, 6, 7, 7, 7, 8, 8, 8],
  ];

  //Error in Rows
  const {errorRows} = useSelector(state => state.errorRowReducer);

  //Error in Cols

  const {errorCols} = useSelector(state => state.errorColReducer);

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

  const handleNotification = item => {
    PushNotification.localNotification({
      channelId: 'test-Channel',
      title: 'You Won this Time !',
      message: `${item.name} ${item.message}`,
    });
  };

  useEffect(() => {
    const tempRemainDigits = {...remainDigits};

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        tempRemainDigits[board[i][j]]--;
      }
    }
    dispatch({type: 'SET_REMAIN', payload: tempRemainDigits});
  }, []);

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

    const tempRowError = {...errorRows};

    if (hasError) {
      tempRowError[row] = 1;
      dispatch({type: 'SET_ERROR_ROW', payload: {...tempRowError}});
      return true;
    } else {
      tempRowError[row] = 0;
      dispatch({type: 'SET_ERROR_ROW', payload: {...tempRowError}});
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

    const tempColError = {...errorCols};

    if (hasError) {
      tempColError[col] = 1;
      dispatch({type: 'SET_ERROR_COL', payload: tempColError});
      return true;
    } else {
      tempColError[col] = 0;
      dispatch({type: 'SET_ERROR_COL', payload: tempColError});
      return false;
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

    const tempMatrixError = {...errorMatrix};

    if (hasError) {
      const MatrixNumber = findMatrix(row, col);
      tempMatrixError[MatrixNumber] = 1;
      setErrorMatrix(tempMatrixError);

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

    return count === 3;
  }

  const handleCellPress = (row, col, back, edit) => {
    if (solidBoard[row][col] !== 0) {
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

    dispatch({type: 'SET_BOARD', payload: currBoard});
    dispatch({type: 'SET_REMAIN', payload: currRemainDigits});
    if (!findError(currBoard, selectedNum, row, col)) {
      let sum = 0;

      for (let i = 1; i <= 9; i++) {
        sum += currRemainDigits[i];
      }

      if (sum == 0) {
        dispatch({type: 'SET_HAS_WON', payload: true});
      }
    }
  };

  useEffect(() => {}, [errorRows, errorCols, dispatch]);

  const setHaveWon = data => {
    dispatch({type: 'SET_HAS_WON', payload: data});
  };

  return (
    <View style={styles.container}>
      <TimeClock startTime={startTime} />
      <CompletedModal
        handleNotification={handleNotification}
        setHaveWon={setHaveWon}
        won={hasWon}
      />
      <View>
        {board.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((value, colIndex) => (
              <DigitBox
                handleCellPress={handleCellPress}
                key={`${rowIndex}-${colIndex}`}
                rowIndex={rowIndex}
                colIndex={colIndex}
                solid={solidBoard[rowIndex][colIndex]}
                isError={
                  errorCols[colIndex] >= 1 ||
                  errorRows[rowIndex] >= 1 ||
                  errorMatrix[matrixNumber[rowIndex][colIndex]] >= 1
                }
                value={value}
              />
            ))}
          </View>
        ))}
      </View>

      {/* <View style={{backgroundColor: 'green'}}>
        <Pressable
          onPress={() => {
            solveSudoku([...board], setBoard);
          }}>
          <Text style={{color: 'white', padding: 50}}>Solve it</Text>
        </Pressable>
      </View> */}

      <NumberPad />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    gap: 20,
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

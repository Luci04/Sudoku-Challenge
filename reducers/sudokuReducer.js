
const initialState = {
    startTime: true,
    hasWon: false,
    selectedNum: null, board: [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    remainDigits: {
        1: 9,
        2: 9,
        3: 9,
        4: 9,
        5: 9,
        6: 9,
        7: 9,
        8: 9,
        9: 9,
    },
    solidBoard: [[5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]],

    errorRows: {
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
    },
    errorCols: {
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
    }
}


// const [remainDigits, setRemainDigits] = useState();


// const [errorCols, setErrorCols] = useState({
//     0: 0,
//     1: 0,
//     2: 0,
//     3: 0,
//     4: 0,
//     5: 0,
//     6: 0,
//     7: 0,
//     8: 0,
//     9: 0,
// });

// const [errorMatrix, setErrorMatrix] = useState({
//     0: 0,
//     1: 0,
//     2: 0,
//     3: 0,
//     4: 0,
//     5: 0,
//     6: 0,
//     7: 0,
//     8: 0,
//     9: 0,
// });

// const [board, setBoard] = useState([
//     [5, 3, 0, 0, 7, 0, 0, 0, 0],
//     [6, 0, 0, 1, 9, 5, 0, 0, 0],
//     [0, 9, 8, 0, 0, 0, 0, 6, 0],
//     [8, 0, 0, 0, 6, 0, 0, 0, 3],
//     [4, 0, 0, 8, 0, 3, 0, 0, 1],
//     [7, 0, 0, 0, 2, 0, 0, 0, 6],
//     [0, 6, 0, 0, 0, 0, 2, 8, 0],
//     [0, 0, 0, 4, 1, 9, 0, 0, 5],
//     [0, 0, 0, 0, 8, 0, 0, 7, 9],
// ]);

// const [matrixNumber, setMatrixNumber] = useState([
//     [0, 0, 0, 1, 1, 1, 2, 2, 2],
//     [0, 0, 0, 1, 1, 1, 2, 2, 2],
//     [0, 0, 0, 1, 1, 1, 2, 2, 2],
//     [3, 3, 3, 4, 4, 4, 5, 5, 5],
//     [3, 3, 3, 4, 4, 4, 5, 5, 5],
//     [3, 3, 3, 4, 4, 4, 5, 5, 5],
//     [6, 6, 6, 7, 7, 7, 8, 8, 8],
//     [6, 6, 6, 7, 7, 7, 8, 8, 8],
//     [6, 6, 6, 7, 7, 7, 8, 8, 8],
// ]);





export const sudokuReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_NUM":
            return { ...state, selectedNum: action.payload }

        default:
            return state
    }
}

export const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_START_TIME":
            return { ...state, startTime: action.payload }

        default:
            return state
    }
}


export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_BOARD":
            return { ...state, board: action.payload }

        default:
            return state
    }
}

export const remainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_REMAIN":
            return { ...state, remainDigits: action.payload }

        default:
            return state
    }
}

export const solidReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SOLID":
            return { ...state, solidBoard: action.payload }

        default:
            return state
    }
}

export const errorRowReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ERROR_ROW":
            return { ...state, errorRows: action.payload }
        default:
            return state
    }
}

export const errorColReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_ERROR_COL":
            return { ...state, errorCols: action.payload }
        default:
            return state
    }
}


export const hasWonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_HAS_WON":
            return { ...state, hasWon: action.payload }
        default:
            return state;
    }
}




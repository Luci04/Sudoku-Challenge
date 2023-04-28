export function solveSudoku(board, setBoard) {

    // Find the next empty cell on the board
    const findEmptyCell = () => {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    };

    // Check if a number is valid in a given cell
    const isValid = (row, col, num) => {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) {
                return false;
            }
        }
        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) {
                return false;
            }
        }
        // Check square
        const squareRow = Math.floor(row / 3) * 3;
        const squareCol = Math.floor(col / 3) * 3;
        for (let i = squareRow; i < squareRow + 3; i++) {
            for (let j = squareCol; j < squareCol + 3; j++) {
                if (board[i][j] === num) {
                    return false;
                }
            }
        }
        return true;
    };

    const solve = () => {
        const emptyCell = findEmptyCell();
        if (emptyCell === null) {
            setBoard(board);
            return true;
        }
        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (isValid(row, col, num)) {
                board[row][col] = num;
                if (solve()) {
                    // Puzzle has been solved
                    return true;
                }
                board[row][col] = 0;
            }
        }
        // Backtrack if no valid number was found
        return false;
    };

    // Start solving from the top-left cell
    return solve();
}


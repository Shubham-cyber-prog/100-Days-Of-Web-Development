const boardSize = 4;
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
let score = 0;

function init() {
    board = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
    score = 0;
    addRandomTile();
    addRandomTile();
    updateDisplay();
}

function addRandomTile() {
    let empty = [];
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (!board[i][j]) empty.push([i, j]);
        }
    }
    if (empty.length) {
        let [x, y] = empty[Math.floor(Math.random() * empty.length)];
        board[x][y] = 2;
    }
}

function updateDisplay() {
    document.getElementById('score').textContent = 'Score: ' + score;
    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            if (board[i][j]) {
                const tile = document.createElement('div');
                tile.className = 'tile tile-' + board[i][j];
                tile.textContent = board[i][j];
                cell.appendChild(tile);
            }
            boardEl.appendChild(cell);
        }
    }
}

function transpose(matrix) {
    return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

function moveLeft(row) {
    let newRow = row.filter(x => x !== null);
    for (let i = 0; i < newRow.length - 1; i++) {
        if (newRow[i] === newRow[i + 1]) {
            newRow[i] *= 2;
            score += newRow[i];
            newRow.splice(i + 1, 1);
        }
    }
    while (newRow.length < boardSize) newRow.push(null);
    return newRow;
}

function move(direction) {
    let moved = false;
    let originalBoard = JSON.stringify(board);
    if (direction === 'left') {
        for (let i = 0; i < boardSize; i++) {
            board[i] = moveLeft(board[i]);
        }
    } else if (direction === 'right') {
        for (let i = 0; i < boardSize; i++) {
            board[i] = moveLeft(board[i].reverse()).reverse();
        }
    } else if (direction === 'up') {
        board = transpose(board);
        for (let i = 0; i < boardSize; i++) {
            board[i] = moveLeft(board[i]);
        }
        board = transpose(board);
    } else if (direction === 'down') {
        board = transpose(board);
        for (let i = 0; i < boardSize; i++) {
            board[i] = moveLeft(board[i].reverse()).reverse();
        }
        board = transpose(board);
    }
    if (JSON.stringify(board) !== originalBoard) {
        moved = true;
        addRandomTile();
    }
    updateDisplay();
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') move('left');
    else if (e.key === 'ArrowRight') move('right');
    else if (e.key === 'ArrowUp') move('up');
    else if (e.key === 'ArrowDown') move('down');
});

// Swipe support
let startX, startY;
document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});
document.addEventListener('touchend', e => {
    if (!startX || !startY) return;
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    let diffX = endX - startX;
    let diffY = endY - startY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) move('right');
        else if (diffX < -50) move('left');
    } else {
        if (diffY > 50) move('down');
        else if (diffY < -50) move('up');
    }
    startX = startY = null;
});

document.getElementById('reset').addEventListener('click', init);

init();
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const linesElement = document.getElementById('lines');
const finalScoreElement = document.getElementById('finalScore');
const finalLevelElement = document.getElementById('finalLevel');
const finalLinesElement = document.getElementById('finalLines');
const gameOverElement = document.getElementById('gameOver');
const restartBtn = document.getElementById('restartBtn');
const playAgainBtn = document.getElementById('playAgainBtn');

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const COLORS = [
    '#000000', // empty
    '#FF0000', // I
    '#00FF00', // O
    '#0000FF', // T
    '#FFFF00', // S
    '#FF00FF', // Z
    '#00FFFF', // J
    '#FFA500'  // L
];

const SHAPES = [
    [],
    [
        [1, 1, 1, 1], // I
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [
        [1, 1], // O
        [1, 1]
    ],
    [
        [0, 1, 0], // T
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1], // S
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1, 0], // Z
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [1, 0, 0], // J
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1], // L
        [1, 1, 1],
        [0, 0, 0]
    ]
];

let board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
let currentPiece = null;
let score = 0;
let level = 1;
let lines = 0;
let dropTime = 0;
let dropInterval = 1000;
let gameRunning = true;
let lastTime = 0;

function createPiece(type) {
    return {
        type: type,
        shape: SHAPES[type],
        x: Math.floor(COLS / 2) - 1,
        y: 0,
        rotation: 0
    };
}

function rotate(piece) {
    const shape = piece.shape;
    const newShape = shape[0].map((_, index) => shape.map(row => row[index]).reverse());
    return {
        ...piece,
        shape: newShape
    };
}

function isValid(piece, board) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                const newX = piece.x + x;
                const newY = piece.y + y;
                if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && board[newY][newX])) {
                    return false;
                }
            }
        }
    }
    return true;
}

function placePiece(piece, board) {
    for (let y = 0; y < piece.shape.length; y++) {
        for (let x = 0; x < piece.shape[y].length; x++) {
            if (piece.shape[y][x]) {
                board[piece.y + y][piece.x + x] = piece.type;
            }
        }
    }
}

function clearLines(board) {
    let linesCleared = 0;
    for (let y = ROWS - 1; y >= 0; y--) {
        if (board[y].every(cell => cell !== 0)) {
            board.splice(y, 1);
            board.unshift(Array(COLS).fill(0));
            linesCleared++;
            y++; // check the same row again
        }
    }
    return linesCleared;
}

function updateScore(linesCleared) {
    const points = [0, 40, 100, 300, 1200];
    score += points[linesCleared] * level;
    lines += linesCleared;
    level = Math.floor(lines / 10) + 1;
    dropInterval = Math.max(50, 1000 - (level - 1) * 50);
    scoreElement.textContent = score;
    levelElement.textContent = level;
    linesElement.textContent = lines;
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw board
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            if (board[y][x]) {
                ctx.fillStyle = COLORS[board[y][x]];
                ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
    }

    // Draw current piece
    if (currentPiece) {
        ctx.fillStyle = COLORS[currentPiece.type];
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (currentPiece.shape[y][x]) {
                    ctx.fillRect((currentPiece.x + x) * BLOCK_SIZE, (currentPiece.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    ctx.strokeStyle = '#fff';
                    ctx.lineWidth = 1;
                    ctx.strokeRect((currentPiece.x + x) * BLOCK_SIZE, (currentPiece.y + y) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }
}

function drop() {
    const newPiece = {...currentPiece, y: currentPiece.y + 1};
    if (isValid(newPiece, board)) {
        currentPiece = newPiece;
    } else {
        placePiece(currentPiece, board);
        const linesCleared = clearLines(board);
        updateScore(linesCleared);
        currentPiece = createPiece(Math.floor(Math.random() * 7) + 1);
        if (!isValid(currentPiece, board)) {
            gameRunning = false;
            gameOver();
        }
    }
}

function move(dir) {
    const newPiece = {...currentPiece, x: currentPiece.x + dir};
    if (isValid(newPiece, board)) {
        currentPiece = newPiece;
    }
}

function rotatePiece() {
    const newPiece = rotate(currentPiece);
    if (isValid(newPiece, board)) {
        currentPiece = newPiece;
    }
}

function hardDrop() {
    while (isValid({...currentPiece, y: currentPiece.y + 1}, board)) {
        currentPiece.y++;
    }
    drop();
}

function gameLoop(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
    dropTime += deltaTime;

    if (dropTime > dropInterval) {
        drop();
        dropTime = 0;
    }

    draw();

    if (gameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

function handleKeyPress(event) {
    if (!gameRunning) return;

    switch (event.keyCode) {
        case 37: // left
            move(-1);
            break;
        case 39: // right
            move(1);
            break;
        case 40: // down
            drop();
            break;
        case 38: // up
            rotatePiece();
            break;
        case 32: // space
            event.preventDefault();
            hardDrop();
            break;
    }
}

function gameOver() {
    finalScoreElement.textContent = score;
    finalLevelElement.textContent = level;
    finalLinesElement.textContent = lines;
    gameOverElement.classList.remove('hidden');
}

function restartGame() {
    board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
    currentPiece = createPiece(Math.floor(Math.random() * 7) + 1);
    score = 0;
    level = 1;
    lines = 0;
    dropTime = 0;
    dropInterval = 1000;
    gameRunning = true;
    lastTime = 0;
    scoreElement.textContent = score;
    levelElement.textContent = level;
    linesElement.textContent = lines;
    gameOverElement.classList.add('hidden');
    gameLoop();
}

document.addEventListener('keydown', handleKeyPress);
restartBtn.addEventListener('click', restartGame);
playAgainBtn.addEventListener('click', restartGame);

// Initialize game
currentPiece = createPiece(Math.floor(Math.random() * 7) + 1);
gameLoop();
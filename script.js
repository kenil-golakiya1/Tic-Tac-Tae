// const board = document.getElementById('board');
const cells = document.querySelectorAll('.box');
const statusText = document.getElementById('status');
const resetGameBtn = document.getElementById('resetGame');
const newGameBtn = document.getElementById('newGame');
const winnerMessage = document.getElementById('winnerMessage');
const winnerText = document.getElementById('winnerText');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-cell-index');

    if (boardState[cellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            highlightWinnerCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        winnerText.textContent = `🎉 Player ${currentPlayer} Wins!`;
        winnerMessage.classList.remove('hide');
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusText.textContent = 'It\'s a draw!';
        winnerText.textContent = 'It\'s a Draw!';
        winnerMessage.classList.remove('hide');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function highlightWinnerCells(winningCells) {
    winningCells.forEach(index => {
        cells[index].style.backgroundColor = '#6A5ACD';
        cells[index].style.color = '#fff';
    });
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    winnerMessage.classList.add('hide');

    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '';
        cell.style.color = '';
    });
}

function newGame() {
    resetGame();
    statusText.textContent = `Start fresh! Player ${currentPlayer} begins.`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetGameBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', newGame);

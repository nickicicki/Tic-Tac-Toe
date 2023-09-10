const gridContainer = document.querySelector('.grid-container');
const showWinner = document.getElementById("displayWinner");

let count = 1;
let isTrue = true;
let isGameOver = false;

gridContainer.addEventListener('click', startGame);

const possibleWins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
]

const storeUserOneChoice = [];
const storeUserTwoChoice = [];

function startGame(event) {
    if (isGameOver) return; 
    const gridItem = event.target.closest('.grid-item');
    if (gridItem && !gridItem.hasAttribute('data-clicked')) {
        const dataOutput = parseInt(gridItem.getAttribute('data-output')); // Convert to number
        if (count % 2 !== 0) {
            storeUserOneChoice.push(dataOutput);
            gridItem.innerHTML = '❌';
            if (findWinner(storeUserOneChoice)) {
                showWinner.innerHTML = "Player 1 (❌) wins!";
                isGameOver = true; 
            }
        } else {
            storeUserTwoChoice.push(dataOutput);
            gridItem.innerHTML = '⭕';
            if (findWinner(storeUserTwoChoice)) {
                showWinner.innerHTML = "Player 2 (⭕) wins!";
                isGameOver = true; // Set the game as over
            }
        }
        count++;
        gridItem.setAttribute('data-clicked', 'true'); // Mark the div as clicked
    }
}

function findWinner(userChoice) {
    for (let i = 0; i < possibleWins.length; i++) {
        const winCombination = possibleWins[i];
        if (winCombination.every(choice => userChoice.includes(choice))) {
            return true;
        }
    }
    return false;
}
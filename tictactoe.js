// Elements and Variables declared
let cells = document.querySelectorAll('.cell');
let gameStatus = Array(cells.length);
gameStatus.fill(null);

let playerX = 'X';
let playerO = 'O';
let playerTurn = playerX;

let playerXTurn = document.getElementById('It is Player X Turn');
let playerOTurn = document.getElementById('It is Player O Turn');
let winAlert = document.getElementById('win-alert');
let declareWinner = document.getElementById('declareWinner');
let clear = document.getElementById('clear');
clear.addEventListener('click', clearGame);

let winCombos = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]
// Function to display which players turn it is
function displayTurn(int){
    return int % 2;
}
if (displayTurn(playerTurn)){
    playerOTurn.className = "visible";
} else {
    playerXTurn.className = "visible";
};

    // create the click function to add either an X or an O to the cell when clicked
cells.forEach((cell) => cell.addEventListener("click", cellClick));


// prevent clicking if the game is over and the win alert is showing
function cellClick(event) {
    if (winAlert.classList.contains("visible")) {
        return;
    }

    // starting with player X each player clicks on a cell and displays X or O
    const cell = event.target;
    const cellPosition = cell.dataset.index;

    let boardIndex = updateWinCombo(cellPosition);
    
    if (cell.innerText != "") {
        return;
    }
    displayTurn();
    
    if (playerTurn === playerX) {
        cell.innerText = playerX;
        playerOTurn.className = "visible";
        playerXTurn.className = "hidden";
        gameStatus[cellPosition] = playerX;
        playerTurn = playerO;
        
        winCombos[boardIndex[0]] [boardIndex[1]] = 'X';
        
    } else {
        cell.innerText = playerO;
        playerXTurn.className = "visible";
        playerOTurn.className = "hidden";
        gameStatus[cellPosition] = playerO;
        playerTurn = playerX;

        winCombos[boardIndex[0]] [boardIndex[1]] = 'O';
    }

    checkWinner();
}
function updateWinCombo(cellPosition){
    let findRow = 0;
    let findCol = 0;
    if(cellPosition > 5){
        findRow=2;
        findCol = cellPosition-6;
    } else if(cellPosition > 2){
        findRow=1;
        findCol=cellPosition-3;
    } else {
        findRow =0;
        findCol=cellPosition;
    }


    return [findRow,findCol];
}

// check if there are any winners by checking the rows first
function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (winCombos[i][0] === winCombos[i][1] && winCombos[i][0] === winCombos[i][2] && winCombos[i][0] !== '') {
            displayWinner(winCombos[i][0]);
            return;
        }
    }
    // check the columns
    for (let i = 0; i < 3; i++) {
    if (winCombos[0][i] === winCombos[1][i] && winCombos[0][i] === winCombos[2][i] && winCombos[0][i] !== '') {
        displayWinner(winCombos[0][i]);
        return;
        }
    }
    // check the diaganols
    if (winCombos[0][0] === winCombos[1][1] && winCombos[0][0] === winCombos[2][2] && winCombos[0][0] !== '') {
        displayWinner(winCombos[0][0]);
        return;
    
    } 

    if (winCombos[0][2] === winCombos[1][1] && winCombos[0][2] === winCombos[2][0] && winCombos[0][2] !== '') {
        displayWinner(winCombos[0][2]);
        return;
    }
    console.log(winCombos)
    // check if all cells are filled and no winner
    let numCells = 0;
        for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (winCombos[i][j] != ''){
            numCells++;
            }
        }
        if (numCells == 9) {
            displayWinner('Tie');
            return;
        }
    }
        
    }
// Display which player won or if it is a tie
    function displayWinner (winnerMessage){
        let message = "It's a Tie!"
        if (winnerMessage != null) {
            message = `Winner is ${winnerMessage}!`;
            console.log('if')
        }
        winAlert.className = "visible";
        declareWinner.innerText = message; 
        console.log("winAlert visible")
    }

    

// clear the game and restart
function clearGame() {
    winAlert.className = "hidden";
    gameStatus.fill(null);
    cells.forEach((cell) =>(cell.innerText = ''));
    gameStatus = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    playerTurn = playerX;
    winAlert.className = "hidden";
    location.reload();
    }



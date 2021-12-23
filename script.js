const cell = document.getElementsByClassName('cell');
const cellAll = document.querySelectorAll('.cell');
const board = document.querySelector('.board');
const restart = document.querySelector(".game-restart");
const status = document.querySelector('.status');

// Game status

let player = "X";
let playerWin = "X";
let stateD = [];
let stateW = ["", "", "", "", "", "", "", "", ""];
let active = true;


const playerTurn = () => `It's ${player}'s turn`;
const draw = () => `Draw!`;
const winResult = () => `Player ${playerWin} won!`;

status.innerHTML = playerTurn();

// Board - X and O

board.addEventListener('click', (item) => {
    if (active === true){
        if(item.target.firstChild.data ===" "){
            item.target.firstChild.data = player
            stateD.push(player);
            if(player === "X"){
                player = "O"
                playerWin ="X"
            } else if(player === "O"){
                player = "X"
                playerWin ="O"
            }
        }    
        const cellIndex = parseInt(
            item.target.getAttribute('data-cell-index')
        );      
        stateW[cellIndex] = player;
        status.innerHTML = playerTurn();
        result();
    }
});

// Restart Btn

restart.addEventListener('click', (i) => {
    for (var i = 0; i<9; i++){
        cellAll[i].innerText = " ";
    }
    player = "X";
    status.innerHTML = playerTurn();
    stateD =  [];
    stateW =  ["", "", "", "", "", "", "", "", ""];
    active = true;
});

// Winning & Draw

winList = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6], 
]

function result() {
    let won = false;
    for (let i = 0; i < 8; i++) {
        const winItem = winList[i];
        let a = stateW[winItem[0]];
        let b = stateW[winItem[1]];
        let c = stateW[winItem[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        } else if (a === b && b === c) {
            won = true;
            break
        }
    }

    if (won) {
        status.innerHTML = winResult();
        active = false;
        return;
        }

    if (stateD.length === 9) {
        status.innerHTML = draw();
        active = false;
        return;
    }
}
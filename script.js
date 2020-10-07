const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElemnts = document.querySelectorAll('[data-cell]')
let circleTurn
const board = document.getElementById('board');
const winningmsg = document.querySelector('[data-winning-msg]')
const WINNING_ARRAY = [
    [0, 1, 2],
    [3, 4, 5],                                                                          //Variables, constants
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const winningmsgelement = document.getElementById('winningmsg')
const restart = document.getElementById('restart');


startGame();

restart.addEventListener('click', startGame)


function startGame() {
    

    circleTurn = false;
    cellElemnts.forEach(cell => {
        cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)

        cell.addEventListener('click', handleClick, { once: true })
    });
    sethover();
    winningmsgelement.classList.remove('show')
    
}

function handleClick(e) {
    //mark
    //checkwin
    //checkdraw
    //switch

    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass)

    if (checkWin(currentClass)) {
        console.log('won')
        endGame(false);

    }else if(isDraw()){
        endGame(true);
    }
    else{
        swapTurns();
        sethover();
    }
    

    // swapTurns();
    // sethover();
   


}



function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}


function swapTurns() {
    circleTurn = !circleTurn;
}


function sethover() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);

    }
    else {
        board.classList.add(X_CLASS);
    }

}

function endGame(draw) {
    if(draw){
        winningmsg.innerText = "Its Draw!";

    }

    else{
        winningmsg.innerText = `${circleTurn ? "O -" : "X -"} WON!`
    }
    winningmsgelement.classList.add('show')
}


function isDraw(){
    return [...cellElemnts].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}


function checkWin(currentClass) {
    return WINNING_ARRAY.some(combination => {
        return combination.every(index => {
            return cellElemnts[index].classList.contains(currentClass)
        })
    })
}

var playGameForm;
var GameBoard = [' ',' ',' ',' ',' ',' ',' ',' ',' ']

function Player(name, symbol){
    this.name = name;
    this.symbol= symbol;
};


function openPopUp(){
    popup.classList.add('open-popup');
    document.getElementById('overlay').style.display = 'block';
}

function closePopUp(e){
    if (playGameForm.checkValidity()) {
        Player();
        popup.classList.remove('open-popup');
        document.getElementById('overlay').style.display = 'none';
    }
    document.forms[0].reset();
    e.preventDefault(); //prevents form submiting without info
}


var Players = [new Player('chelsea', 'x'), new Player('ryan', 'o')]
var currentPlayer = 0


function NextPlayer(){
    if (IsGameOver()){
        alert('Game Over! Restarting . . . ');
        setTimeout(function(){
            location.reload();
        }, 1000);
    }
    currentPlayer = (currentPlayer+1) % Players.length;
}


window.addEventListener('load', (event) => {
    
    playGameForm = document.getElementById('rules')
    board = document.getElementById('board');
    board.addEventListener('click', gameBoardOnClick);
    blocks = document.getElementsByClassName('block');
    for( i=0; i < GameBoard.length; i++){
        let symbol = GameBoard[i];
        let block = blocks.item(i);
        block.innerHTML = symbol;
        block.mapindex = i;
    }
    openPopUp();

});


function gameBoardOnClick(e){
    let symbol = Players[currentPlayer].symbol;
    let block = e.target.closest('.block');
    if (block.innerHTML == " "){
        block.innerHTML = symbol;
        let val = block.mapindex;
        console.log(val)
        GameBoard[val] = symbol; 
        NextPlayer();
    }
}


function IsGameOver(){
    if (GameBoard[0] != " " && GameBoard[0]==GameBoard[3] && GameBoard[3]==GameBoard[6]){
        return true;
    }
    else if (GameBoard[1] != " " && GameBoard[1]==GameBoard[4] && GameBoard[4]==GameBoard[7]){
        return true;
    }
    else if (GameBoard[2] != " " && GameBoard[2]==GameBoard[5] && GameBoard[5]==GameBoard[8]){
        return true;
    }
    else if (GameBoard[0] != " " && GameBoard[0]==GameBoard[1] && GameBoard[1]==GameBoard[2]){
        return true;
    }
    else if (GameBoard[3] != " " && GameBoard[3]==GameBoard[4] && GameBoard[4]==GameBoard[5]){
        return true;
    }
    else if (GameBoard[6] != " " && GameBoard[6]==GameBoard[7] && GameBoard[7]==GameBoard[8]){
        return true;
    }
    else if (GameBoard[0] != " " && GameBoard[0]==GameBoard[4] && GameBoard[4]==GameBoard[8]){
        return true;
    }
    else if (GameBoard[2] != " " && GameBoard[2]==GameBoard[4] && GameBoard[4]==GameBoard[6]){
        return true;
    }
    return false;
}



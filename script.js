
var playGameForm;
var GameBoard = [' ',' ',' ',' ',' ',' ',' ',' ',' ']


function Player(symbol){
    this.symbol= symbol;
};


var Players = []
var currentPlayer = 0

function clearGameBoard(){
    GameBoard = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
    blocks = document.getElementsByClassName('block');
    for( i=0; i < GameBoard.length; i++){
        let symbol = GameBoard[i];
        let block = blocks.item(i);
        block.innerHTML = symbol;
        block.mapindex = i;
    }
}

function recievePlayerInfo(){
    console.log('hello');
    let symbolCheck= document.getElementById('player1-X').checked;
    console.log(symbolCheck);
    if (symbolCheck == true ){
        symbol1 = 'x';
        symbol2 = 'o'
    }
    else {
        symbol1 = 'o';
        symbol2 = 'x';
    }

    Players = [new Player(symbol1), new Player(symbol2)]
    
}


function openPopUp(){
    document.forms[0].reset();
    popup.classList.add('open-popup');
    document.getElementById('overlay').style.display = 'block';
}

function closePopUp(e){
    if (playGameForm.checkValidity()) {
        Player();
        popup.classList.remove('open-popup');
        document.getElementById('overlay').style.display = 'none';
    }
    
    e.preventDefault(); //prevents form submiting without info
    clearGameBoard();
}


function NextPlayer(){
    if (IsGameOver()==true){
        alert('Game Over! Restarting . . . ');
        setTimeout(function(){
            location.reload();
        }, 1000);
    }
    currentPlayer = (currentPlayer+1) % Players.length;
}


window.addEventListener('load', (event) => {
    jQuery('.radio1').on('click',function(){

        // Get the element index , which one we click on
        var indx = jQuery(this).index('.radio1');
    
        // Trigger a click on the same index in the second radio set
    
        jQuery('.radio2')[(indx+1) % 2].click();
    })

    document.getElementById('submit-button').addEventListener('click', closePopUp);
    document.getElementById('submit-button').addEventListener('click', recievePlayerInfo);
    document.getElementById('play-button').addEventListener('click', openPopUp);

    playGameForm = document.getElementById('rules')
    board = document.getElementById('board');
    board.addEventListener('click', gameBoardOnClick);
    blocks = document.getElementsByClassName('block');
    for( i=0; i < GameBoard.length; i++){
        block.mapindex = i;
    }
    rules = document.getElementById('rules')
    rules.addEventListener('submit', function(e){
        e.preventDefault();
    })

});


function gameBoardOnClick(e){
    console.log(Players);
    let symbol = Players[currentPlayer].symbol;
    let block = e.target.closest('.block');
    if (block.innerHTML == " "){
        block.innerHTML = symbol;
        let val = block.mapindex;
        console.log(val)
        GameBoard[val] = symbol;
        console.log(GameBoard)
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
    for (i = 0; i < GameBoard.length; i++){
        if (GameBoard[i] == ' '){
            return false
        }
    }
    return true;
}



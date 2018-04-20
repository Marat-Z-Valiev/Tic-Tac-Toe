const selectX = $('#select-X');
const selectO = $('#select-O');
const resetButton = $('#reset');
const gameBoard = $('.game-board');
const cells = $('.board-cell');
const endGame = $('.end-game');
let human = '';
let ai = '';
let board = ["", "", "", "", "", "", "", "", ""];
let turns = 0;

$(function () {
    //Select symbol
    selectX.click(function () {
        selectX.fadeTo('slow', 0);
        selectO.fadeTo('slow', 0);
        resetButton.fadeTo('slow', 1);
        gameBoard.css('visibility', 'visible');
        human = 'X';
        ai = 'O';
    });

    selectO.click(function () {
        selectX.fadeTo('slow', 0);
        selectO.fadeTo('slow', 0);
        resetButton.fadeTo('slow', 1);
        gameBoard.css('visibility', 'visible');
        human = 'O';
        ai = 'X';
    });
    //Make a turn 
    cells.on('click', function () {
        if($(this).html() === ''){
            selection = parseInt($(this).attr('id'));
            move(board, selection);
            $(this).html(`<div class="content">${board[selection]}</div>`);
            status(board);
        }
    });
});
//Reset the game
function reset() {
    turns = 0;
    board = ["", "", "", "", "", "", "", "", ""];
    gameBoard.css('visibility', 'hidden');
    selectX.fadeTo('slow', 1);
    selectO.fadeTo('slow', 1);
    resetButton.fadeTo('slow', 0);
    endGame.hide();
    cells.html('');
    cells.css({'pointer-events':'auto', 'background':'none'});
}

resetButton.click(function () {
    reset();
});

function move(board, selection) {
    if (board[selection] == "") {
        turns++;
        board[selection] = human;
    }
}

function status(board) {
    //Your turn
    if (win(board, human)) {
        cells.css('pointer-events','none');
        setTimeout(function () {
            $(".win").show();
        }, 600);
        return;
    } 
    else if (turns == 9) {
        draw();
    } 
    else {
        // Computer's turn
        turns++;
        strategy();
        empty = [];
        board[bestMove] = ai;
        let coMove = "#" + bestMove;
        setTimeout(function () {
            $(coMove).html(`<div class="content">${ai}</div>`);
        }, 700);
        if (win(board, ai)) { // If computer wins
            cells.css('pointer-events','none');
            setTimeout(function () {
                $(".lose").show();
            }, 800);
            return;
        } 
        else if (turns == 9) {
            cells.css('pointer-events','none');
            setTimeout(function () {
                $(".draw").show();
            }, 800);
        } 
        else {
            // INDICATE THAT IT'S THE HUMAN'S TURN
            console.log("Your turn!");
        }
    }
}

function draw() {
    $(".draw").show();
    setTimeout(function () {
    }, 3000);
    return;
}

/* COMPUTER LOGIC */
let empty = [];
let bestMove = "";

function strategy() {
    for (let i = 0; i < board.length; i++) {
        (board[i] === "") ? empty.push(i): empty;
    }
    if (checkWin(empty) === true) {
        return bestMove;
    } 
    else if (checkLose(empty) === true) {
        return bestMove;
    } 
    else if (board[4] === "") {
        return bestMove = 4;
    } 
    else if (board[0] === "") {
        return bestMove = 0;
    } 
    else if (board[2] === "") {
        return bestMove = 2;
    }
    else if (board[6] === "") {
        return bestMove = 6;
    } 
    else if (board[8] === "") {
        return bestMove = 8;
    } 
    else {
        return bestMove = empty[0];
    }
}

function checkWin(empty) {
    for (let i = 0; i < empty.length; i++) {
        board[empty[i]] = ai;
        if (win(board, ai)) {
            bestMove = empty[i];
            board[empty[i]] = "";
            return true;
        }
        board[empty[i]] = "";
        // console.log('board win '+ board);
    }
}

function checkLose(empty) {
    for (let i = 0; i < empty.length; i++) {
        board[empty[i]] = human;
        if (win(board, human)) {
            bestMove = empty[i];
            board[empty[i]] = "";
            return true;
        }
        board[empty[i]] = "";
    }
}

function win(board, player) {
    if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)) {
        return true;
    }
}
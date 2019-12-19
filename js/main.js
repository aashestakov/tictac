var player;
var PENDING = 'PENDING';
var PLAYER_ONE_MOVE = 'PLAYER_ONE_MOVE';
var PLAYER_TWO_MOVE = 'PLAYER_TWO_MOVE';
var END_GAME = 'END_GAME';

var gameStates = [PENDING, PLAYER_ONE_MOVE, PLAYER_TWO_MOVE, END_GAME];
var possibleSigns = ['X', 'O'];

var stateGame = 'PENDING';
var winningStates = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [3,5,7],
    [1,5,9],
];

var boardStatePlain = [0,1,2,3,4,5,6,7,8];


var determineCurrentSign = function() {
    if(stateGame == PLAYER_ONE_MOVE) {
        return possibleSigns[0];
    } else if(stateGame == PLAYER_TWO_MOVE) {
        return possibleSigns[1];
    }
};

var ifCellOccupied = function(cellValue) {
    return possibleSigns.indexOf(cellValue) >= 0;
}


$(document).ready(function() {
    $('.board__cell').on('click', function (event) {
        if(stateGame == END_GAME) return false;

        var target = event.currentTarget;
        var sign = determineCurrentSign();
        var cellIndex = parseInt($(target).data('index')) - 1;

        if(ifCellOccupied(boardStatePlain[cellIndex])) return false;

        boardStatePlain[cellIndex] = sign;
        $(target).html(sign);

        if(stateGame == PLAYER_ONE_MOVE) {
            switchGameState(PLAYER_TWO_MOVE);
        } else if(stateGame == PLAYER_TWO_MOVE) {
            switchGameState(PLAYER_ONE_MOVE);
        }

        setTimeout(function() {
            var isWinningState = determineWinnigState(boardStatePlain);
            if (isWinningState) {
                alert(sign + ' IS THE WINNER!');
                stateGame = END_GAME;
            }
        }, 100);
    });

    $('#startGame').on('click', function(event) {
        stateGame = PLAYER_ONE_MOVE;
        $('.board').css('display', 'block');
        $(this).remove();
        $('#restartGame').css('display', 'block');
    });

    $('#restartGame').on('click', function(event) {
        stateGame = PLAYER_ONE_MOVE;
        boardStatePlain = [0,1,2,3,4,5,6,7,8];
        $('.board').css('display', 'block');
        $('.board__cell').html('');
    });
});
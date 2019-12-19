var CELLS_IN_ROW = 3;

var switchGameState = function(newGameState) {
    stateGame = newGameState;
};

Array.prototype.isAllSame = function(element) {
    var allTheSame = true;
    var previous;

    this.forEach(function(element) {
        if(previous != undefined && element != previous) {
            allTheSame = false;
        }
        previous = element;
    });

    return allTheSame;
};


/** bool **/
var determineWinnigState = function (boardState) {
  var isWinnigState = false;

    winningStates.forEach(function(winingPattern) {
        //console.log(winingPattern);

        var symbols = [];

        winingPattern.forEach(function(winingCellIndex) {
            winingCellIndex = winingCellIndex -1;
            var sign = boardState[winingCellIndex];

            if(sign != undefined && possibleSigns.indexOf(sign) != -1) {
                symbols.push(boardState[winingCellIndex]);
            }
        });

        if(symbols.length == CELLS_IN_ROW) {
            var isAllSame = symbols.isAllSame();
            if(isAllSame) isWinnigState = true;
        }
    });

  return isWinnigState;
};
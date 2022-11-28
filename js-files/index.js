// Method for defining gameBoard object
const gameBoard = (() => {
  // Set array size
  const arrSize = 3;
  const gameArrayStart = 0;
  const gameArrayEnd = 2;

  // Create initial game array
  // First array row
  const gameArray = new Array(arrSize);
  for (let i = 0; i < arrSize; i++) {
    gameArray[i] = new Array(arrSize);
  }
  // Sub array elements
  for (let i = 0; i < arrSize; i++) {
    for (let j = 0; j < arrSize; j++) {
      gameArray[i][j] = (i * 3) + j;
    }
  }

  // Make the following functions/objects public access
  return {gameArray, gameArrayStart, gameArrayEnd};
})();




// Method for defining gameController object
const gameController = (() => {
  const mark = (symbol, x, y) => {
    gameBoard.gameArray[x][y] = symbol;
    console.log(checkRow(symbol, x, y));
  };
  const hello = () => console.log('hello');
  const checkRow = (symbol, x, y) => {
    if (y == gameBoard.gameArrayStart) {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x][y + 1]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x][y + 2])) {
        return true;
      }
    }
    else if (y == gameBoard.gameArrayEnd) {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x][y - 1]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x][y - 2])) {
        return true;
      }
    }
    else {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x][y - 1]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x][y + 1])) {
        return true;
      }
    }
    return false;
  };
  return {mark, hello, checkRow};
})();




// Player factory function
const Player = (name, symbol) => {
  const {mark} = gameController;
  return {name, symbol, mark};
}



function checkDiagonal () {

}

function checkRows () {
  
}

function checkColumns () {
  
}

function checkWin () {
  (checkDiagonal || checkRows || checkColumns) ? true : false;
}
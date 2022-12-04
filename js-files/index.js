// Method for defining gameBoard object
const gameBoard = (() => {
  // Set array size
  const arrSize = 3;
  const gameArrayStart = 0;
  const gameArrayEnd = 2;

  // Select canvas for board display
  const boardDisplay = document.querySelector("#board-display");

  // Create initial game array
  // First array row
  const gameArray = new Array(arrSize);
  for (let i = 0; i < arrSize; i++) {
    gameArray[i] = new Array(arrSize);
  }
  // Sub array elements
  for (let i = 0; i < arrSize; i++) {
    for (let j = 0; j < arrSize; j++) {
      gameArray[i][j] = "";
    }
  }
  

  const generate = () => {
    for (let i = 0; i < arrSize; i++) {
      for (let j = 0; j < arrSize; j++) {
        const box = document.createElement("div");
        box.classList.add("box");
        boardDisplay.append(box);
      }
    }
  }

  // Make the following functions/objects public access
  return {gameArray, gameArrayStart, gameArrayEnd, boardDisplay, generate};
})();




// Method for defining gameController object
const gameController = (() => {
  // Mark the array corresponding to the tic tac toe board with symbol and check for player win
  const mark = (symbol, x, y) => {
    if (markPresent(x, y)) {
      return;
    }
    gameBoard.gameArray[x][y] = symbol;
    
    if (checkWin(x, y)) {
      console.log("Win!");
    }
  };




  // Check if spot on gameArray has already been marked
  const markPresent = (x, y) => {
    if (gameBoard.gameArray[x][y] != "") {
      return true;
    }
    else {
      return false;
    }
  }



  // Check if there is a row win
  const checkRow = (x, y) => {
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




  // Check if there is a column win
  const checkCol = (x, y) => {
    if (x == gameBoard.gameArrayStart) {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x + 1][y]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x + 2][y])) {
        return true;
      }
    }
    else if (x == gameBoard.gameArrayEnd) {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x - 1][y]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x - 2][y])) {
        return true;
      }
    }
    else {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x - 1][y]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x + 1][y])) {
        return true;
      }
    }
    return false;
  };




  // Check if there is a diagonal win
  const checkDiag = (x, y) => {
    if (x == gameBoard.gameArrayStart && y == gameBoard.gameArrayStart) {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x + 1][y + 1]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x + 2][y + 2])) {
        return true;
      }
    }
    else if (x == gameBoard.gameArrayStart && y == gameBoard.gameArrayEnd) {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x + 1][y - 1]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x + 2][y - 2])) {
        return true;
      }
    }
    else if (x == gameBoard.gameArrayEnd && y == gameBoard.gameArrayStart) {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x - 1][y + 1]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x - 2][y + 2])) {
        return true;
      }
    }
    else if (x == gameBoard.gameArrayEnd && y == gameBoard.gameArrayEnd) {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x - 1][y - 1]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x - 2][y - 2])) {
        return true;
      }
    }
    else if ((x == gameBoard.gameArrayStart + 1) && (y == gameBoard.gameArrayStart + 1)) {
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x + 1][y + 1]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x - 1][y - 1])) {
        return true;
      }
      if ((gameBoard.gameArray[x][y] == gameBoard.gameArray[x + 1][y - 1]) && (gameBoard.gameArray[x][y] == gameBoard.gameArray[x - 1][y + 1])) {
        return true;
      }
    }
    return false;
  }




  // Check if a player has won
  const checkWin = (x, y) => {
    if (checkRow(x, y) || checkCol(x, y) || checkDiag(x, y)) {
      return true;
    }
    return false;
  };
  return {mark};
})();




// Player factory function
const Player = (name, symbol) => {
  const {mark} = gameController.mark;
  return {name, symbol, mark};
}




// Symbol Selection controls
const selectionControls = (() => {
  // Select all possible symbols
  const symbols = document.querySelectorAll("input[type='radio']");

  // Make sure both players can't have same symbol
  const deselectOtherSymbol = (e) => {
    console.log(e.target);
    for (let i = 0; i < symbols.length; i++) {
      if (e.target.value == symbols[i].value && e.target.id != symbols[i].id) {
        symbols[i].checked = false;
      }
    }
  }

  // Add event listeners to all symbol selection options
  for (let i = 0; i < symbols.length; i++) {
    symbols[i].addEventListener("click", deselectOtherSymbol)
  }
  return {symbols};
})();



gameBoard.generate();

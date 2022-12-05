// Method for defining gameBoard object
const gameBoard = (() => {
  // Set array size
  const arrSize = 3;
  const gameArrayStart = 0;
  const gameArrayEnd = 2;
  let player1;
  let player2;
  let player1Turn = true;

  // Select canvas for board display
  const boardDisplay = document.querySelector("#board-display");

  // Create initial game array
  const gameArray = new Array(arrSize);
  for (let i = 0; i < arrSize; i++) {
    gameArray[i] = new Array(arrSize);
  }
  for (let i = 0; i < arrSize; i++) {
    for (let j = 0; j < arrSize; j++) {
      gameArray[i][j] = "";
    }
  }
  
  // Proxy function for gameController.mark
  const addMark = (e) => {
    if (e.target.textContent == "") {
      if (player1Turn) {
        gameController.mark(gameBoard.player1.symbol, parseInt(e.target.dataset.yCoord), parseInt(e.target.dataset.xCoord));
        player1Turn = false;
        e.target.textContent = gameBoard.player1.symbol;
      }
      else {
        gameController.mark(gameBoard.player2.symbol, parseInt(e.target.dataset.yCoord), parseInt(e.target.dataset.xCoord));
        player1Turn = true;
        e.target.textContent = gameBoard.player2.symbol;
      }
      console.log(gameArray);
    }
   }
  
  // Generate board from array;
  const generate = () => {
    for (let i = 0; i < arrSize; i++) {
      for (let j = 0; j < arrSize; j++) {
        const box = document.createElement("div");
        box.classList.add("box");
        boardDisplay.append(box);
        box.dataset.xCoord = j;
        box.dataset.yCoord = i;
        box.addEventListener("click", addMark);
      }
    }
  }


  const playAgain = () => {
    selectionControls.container.style.display = "none";
    selectionControls.form.style.display = "flex";
    resetGameArray();
    resetBoardDisplay();
  }

  const resetGameArray = () => {
    for (let i = 0; i < arrSize; i++) {
      for (let j = 0; j < arrSize; j++) {
        gameArray[i][j] = "";
      }
    }
  }

  const resetBoardDisplay = () => {
    const boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].textContent = "";
    }
  }

  const playAgainButton = document.querySelector("#play-again");
  playAgainButton.addEventListener("click", playAgain);

  // Make the following functions/objects public access
  return {player1, player2, gameArray, gameArrayStart, gameArrayEnd, boardDisplay, generate};
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
  const form = document.querySelector("form");
  const container = document.querySelector("#board-container");

  // Make sure both players can't have same symbol
  const deselectOtherSymbol = (e) => {
    for (let i = 0; i < symbols.length; i++) {
      if (e.target.value == symbols[i].value && e.target.id != symbols[i].id) {
        symbols[i].checked = false;
      }
    }
  }
  

  // Use user input from form to display blank 3x3 tic tac toe board
  const initializeBoard = (e) => {
    e.preventDefault();
    container.style.display = "flex";
    createPlayerObjects();
    form.reset();
    form.style.display = "none";
  }

  // Use Player factory function to create player object in gameBoard object
  const createPlayerObjects = () => {
    const player1Name = document.querySelector("#player1").value;
    const player2Name = document.querySelector("#player2").value;
    const player1Mark = document.querySelector("input[name='mark-player1']:checked").value
    const player2Mark = document.querySelector("input[name='mark-player2']:checked").value
    gameBoard.player1 = Player(player1Name, player1Mark);
    gameBoard.player2 = Player(player2Name, player2Mark);
  }


  // Add event listeners to all symbol selection options
  for (let i = 0; i < symbols.length; i++) {
    symbols[i].addEventListener("click", deselectOtherSymbol);
  }

  form.addEventListener("submit", initializeBoard);


  return {form, container, symbols};
})();



gameBoard.generate();

// const markPlayer1 = document.querySelector("input[name='mark-player1']:checked").value;
// const markPlayer2 = document.querySelector("input[name='mark-player2']:checked").value;
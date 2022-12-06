// Method for defining gameBoard object
const gameBoard = (() => {
  // Set array size, start, end
  const arrSize = 3;
  const gameArrayStart = 0;
  const gameArrayEnd = 2;
  // Set maximum number of marks, initialize counter for marks
  let numberOfMarks = 0;
  const maxMarks = arrSize * arrSize;
  // Create variables for players
  let player1;
  let player2;
  let player1Turn = true;
  // Select canvas for board display
  const boardDisplay = document.querySelector("#board-display");
  // Create variable for blank victory message
  const victoryMessage = document.querySelector("#victory-message");
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

  // Adds mark based on whose turn it is
  const addMark = (e) => {
    if (e.target.textContent == "") {
      (gameBoard.player1Turn) ? markWithPlayerSymbol(e, "player1") : markWithPlayerSymbol(e, "player2");
    }
  }
   
  // Start new game
  const playAgain = () => {
    displayController.setFormDisplay("none", "flex");
    displayController.setBoxes();
    displayController.setBoardDisplay("grid", "none");
    setGameArray();
    gameBoard.numberOfMarks = 0;
    gameBoard.player1Turn = true;
  }
  // Add Play Again button and attach event listener to fire playAgain function
  const playAgainButton = document.querySelector("#play-again");
  playAgainButton.addEventListener("click", playAgain);

  // Proxy function for gameController.mark
  const markWithPlayerSymbol = (e, player) => {
    gameController.mark(gameBoard[player].symbol, parseInt(e.target.dataset.yCoord), parseInt(e.target.dataset.xCoord));
    gameBoard.player1Turn = !gameBoard.player1Turn;
    e.target.textContent = gameBoard[player].symbol;
  }

  // Reset game array data
  const setGameArray = () => {
    for (let i = 0; i < arrSize; i++) {
      for (let j = 0; j < arrSize; j++) {
        gameArray[i][j] = "";
      }
    }
  }

  // Make the following functions/objects public access
  return {player1, player2, player1Turn, numberOfMarks, maxMarks, victoryMessage, gameArray, gameArrayStart, gameArrayEnd, boardDisplay, addMark, generate};
})();








// Method for defining object that controls displays
const displayController = (() => {
  // Set visibility for player info form
  const setFormDisplay = (containerDisplayVisibility, formDisplayVisibility) => {
    selectionControls.container.style.display = containerDisplayVisibility;
    selectionControls.form.style.display = formDisplayVisibility;
  }

  // Set visibility for tic tac toe board
  const setBoardDisplay = (boardDisplayVisibility, victoryMessageVisibility) => {
    gameBoard.boardDisplay.style.display = boardDisplayVisibility;
    gameBoard.victoryMessage.style.display = victoryMessageVisibility;
  }

  // Set contents of tic tac toe quadrants
  const setBoxes = () => {
    const boxes = document.querySelectorAll(".box");
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].textContent = "";
    }
  }

  return {setFormDisplay, setBoardDisplay, setBoxes}
})();








// Method for defining gameController object
const gameController = (() => {
  // Mark the array corresponding to the tic tac toe board with symbol and check for player win
  const mark = (symbol, x, y) => {
    // Check if mark is already there
    if (markPresent(x, y)) {
      return;
    }
    else {
      gameBoard.numberOfMarks++;
      gameBoard.gameArray[x][y] = symbol;
    }
    
    // Check if mark results in a win, tie or nothing
    if (checkWin(x, y)) {
      displayController.setBoardDisplay("none", "flex");
      showWinner();
    }
    else if (gameBoard.numberOfMarks >= gameBoard.maxMarks) {
      displayController.setBoardDisplay("none", "flex");
      gameBoard.victoryMessage.textContent = `Tie!`;
    }
  };

  // Check if a player has won
  const checkWin = (x, y) => {
    if (checkRow(x, y) || checkCol(x, y) || checkDiag(x, y)) {
      return true;
    }
    return false;
  };

  // Check if spot on gameArray has already been marked
  const markPresent = (x, y) => {
    (gameBoard.gameArray[x][y] != "") ? true : false;
  }

  // Change victory message based on who won
  const showWinner = () => {
    (gameBoard.player1Turn) ? gameBoard.victoryMessage.textContent = `${gameBoard.player1.name} wins!`: gameBoard.victoryMessage.textContent = `${gameBoard.player2.name} wins!`;
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
    displayController.setFormDisplay("flex", "none");
    createPlayerObjects();
    form.reset();
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
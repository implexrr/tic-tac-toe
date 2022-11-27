// Method for defining gameBoard object
const gameBoard = (() => {
  // Set array size
  const arrSize = 3;

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
  return {gameArray};
})();




// Method for defining gameController object
const gameController = (() => {
  const mark = (symbol, x, y) => {gameBoard.gameArray[x][y] = symbol};
  const hello = () => console.log('hello');
  return {mark, hello};
})();




const Player = (name, symbol) => {
  const {mark} = gameController;
  return {name, symbol, mark};
}
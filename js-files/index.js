const gameBoard = (() => {
  // Set array size
  const arrSize = 3;

  // Create initial game array
  let gameArray = new Array(arrSize);
  for (let i = 0; i < arrSize; i++) {
    gameArray[i] = new Array(arrSize);
  }
  
  for (let i = 0; i < arrSize; i++) {
    for (let j = 0; j < arrSize; j++) {
      gameArray[i][j] = (i * 3) + j;
    }
  }
  return {gameArray};
})();




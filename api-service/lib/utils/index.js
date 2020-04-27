// check if three values form trio
const isTrio = (a, b, c) => {
  if(a === 1 && b === 1 && c === 1) return true;
  if(a === 2 && b === 2 && c === 2) return true;
}

// check game.
// 0 - draw
// 1 - player 1 wins
// 2 - player 2 wins
// false - the game is not yet completed
const checkGame = (grid) => {
  // horizontal
  if(isTrio(grid[0], grid[1], grid[2])) return grid[0];
  if(isTrio(grid[3], grid[4], grid[5])) return grid[3];
  if(isTrio(grid[6], grid[7], grid[8])) return grid[6];

  // vertical
  if(isTrio(grid[0], grid[3], grid[6])) return grid[0];
  if(isTrio(grid[1], grid[4], grid[7])) return grid[1];
  if(isTrio(grid[2], grid[5], grid[8])) return grid[2];

  // diagonal
  if(isTrio(grid[0], grid[4], grid[8])) return grid[0];
  if(isTrio(grid[2], grid[4], grid[6])) return grid[2];

  if(grid.filter(g => g === 0).length === 0) return 0;

  return false;
}

// check if game is completed by grid
const isGameCompleted = (grid) => {
  if(checkGame(grid) === false) return false;
  return true;
}

// check if game is won
const isGameWon = (grid) => {
  return [1,2].includes(checkGame(grid));
}

// check if game is draw
const isGameDraw = (grid) => {
  return checkGame(grid) === 0;
}

// get last player
const getLastPlayer = (grid) => {
  if(grid.filter(g => g === 0).length % 2 === 0) return 2;
  return 1;
}

// get next player
const getNextPlayer = (grid) => {
  if(grid.filter(g => g === 0).length % 2 === 0) return 1;
  return 2;
}

// get winning tiles
const getWinningTiles = (grid) => {
  // horizontal
  if(isTrio(grid[0], grid[1], grid[2])) return [0,1,2];
  if(isTrio(grid[3], grid[4], grid[5])) return [3,4,5];
  if(isTrio(grid[6], grid[7], grid[8])) return [6,7,8];

  // vertical
  if(isTrio(grid[0], grid[3], grid[6])) return [0,3,6];
  if(isTrio(grid[1], grid[4], grid[7])) return [1,4,7];
  if(isTrio(grid[2], grid[5], grid[8])) return [2,5,8];

  // diagonal
  if(isTrio(grid[0], grid[4], grid[8])) return [0,4,8];
  if(isTrio(grid[2], grid[4], grid[6])) return [2,4,6];

  return [-1,-1,-1];
}

// i to tiles
const iToTiles = (i) => {
  return [parseInt(i/3)+1, i%3+1];
}

module.exports.isTrio = isTrio;
module.exports.checkGame = checkGame;
module.exports.isGameCompleted = isGameCompleted;
module.exports.isGameWon = isGameWon;
module.exports.isGameDraw = isGameDraw;
module.exports.getLastPlayer = getLastPlayer;
module.exports.getNextPlayer = getNextPlayer;
module.exports.getWinningTiles = getWinningTiles;
module.exports.iToTiles = iToTiles;

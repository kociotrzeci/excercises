function Ship(length) {
  return {
    length: length,
    hits: 0,
    hit() {
      if (this.isSunk()) {
        return "you monster, it is a warcrime";
      }
      this.hits++;
    },
    isSunk() {
      return this.hits === this.length;
    },
  };
}

function Gameboard() {
  const boardSize = 10;
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    board.push(new Array(boardSize).fill({ canBePlaced: true }));
  }
  function addShipToBoard(row, column, size, orientation) {
    const ship = Ship(size);
    if (checkPlaceValidity(row, column, size, orientation) === false) {
      return false;
    }
    if (orientation === "vertical") {
      for (let i = 0; i < size; i++) {
        board[row][column + i] = ship;
        forbidPlaces(row, column + i);
      }
    } else {
      for (let i = 0; i < size; i++) {
        board[row + i][column] = ship;
        forbidPlaces(row + 1, column);
      }
    }
  }
  function forbidPlaces(x, y) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (checkBounds(x + i, y + j)) {
          if (board[x + i][y + j].canBePlaced === true) {
            board[x + i][y + j] = { canBePlaced: false };
          }
        }
      }
    }
  }

  function checkPlaceValidity(row, column, size, orientation) {
    if (orientation === "horizontal") {
      for (let i = 0; i < size; i++) {
        if (!checkBounds(row, column + i)) return false;
        if (board[row][column + i].canBePlaced === false) return false;
      }
    }
    if (orientation === "vertical") {
      for (let i = 0; i < size; i++) {
        if (!checkBounds(row + i, column)) return false;
        if (board[row + i][column].canBePlaced === false) return false;
      }
    }
    return true;
  }
  function checkBounds(x, y) {
    return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
  }

  return {
    board,
    addShipToBoard,
  };
}

const gameboard = Gameboard();
gameboard.addShipToBoard(5, 5, 3, "horizontal");
console.log(gameboard.board);

module.exports = { Ship, Gameboard };

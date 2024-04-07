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
    board.push([]);
  }
  function addShipToBoard(row, column, size, orientation) {
    const ship = Ship(size);
    if (orientation === "horizontal") {
      for (let i = 0; i < size; i++) {
        board[row][column + i] = ship;
      }
    } else {
      for (let i = 0; i < size; i++) {
        board[row + i][column] = ship;
      }
    }
  }
  return {
    board,
    addShipToBoard,
  };
}
Gameboard();
module.exports = { Ship, Gameboard };

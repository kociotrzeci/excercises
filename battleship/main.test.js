const { Ship, Gameboard } = require("./main");

let gameboard;
beforeEach(() => {
  gameboard = Gameboard();
});
test("Ship getting hit", () => {
  const ship = Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test("Ship sunking", () => {
  const ship = Ship(2);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test("Add ship horizontally", () => {
  gameboard.addShipToBoard(3, 3, 2, "horizontal");
  expect(gameboard.board[1][3]).toStrictEqual({ canBePlaced: true });
  expect(gameboard.board[2][3]).toStrictEqual({ canBePlaced: false });
  expect(gameboard.board[3][3].hits).toBe(0);
  expect(gameboard.board[4][3].hits).toBe(0);
  expect(gameboard.board[5][3]).toStrictEqual({ canBePlaced: false });
  expect(gameboard.board[6][3]).toStrictEqual({ canBePlaced: true });
});

test("Add ship vertically", () => {
  gameboard.addShipToBoard(5, 5, 3, "vertical");
  gameboard.board[5][5].hit();
  expect(gameboard.board[5][3]).toStrictEqual({ canBePlaced: true });
  expect(gameboard.board[5][4]).toStrictEqual({ canBePlaced: false });
  expect(gameboard.board[5][5].hits).toBe(1);
  expect(gameboard.board[5][6].hits).toBe(1);
  expect(gameboard.board[5][7].hits).toBe(1);
  expect(gameboard.board[5][8]).toStrictEqual({ canBePlaced: false });
  expect(gameboard.board[5][9]).toStrictEqual({ canBePlaced: true });
});

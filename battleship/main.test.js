const { Ship, Gameboard } = require("./main");

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

test("Add ship to board", () => {
  const gameboard = Gameboard();
  gameboard.addShipToBoard(5, 5, 3, "horizontal");
  gameboard.board[5][5].hit();
  expect(gameboard.board[5][5].hits).toBe(1);
  expect(gameboard.board[5][6].hits).toBe(1);
  expect(gameboard.board[5][7].hits).toBe(1);
  expect(gameboard.board[5][8]).toBeUndefined();
});

function field(place) {
  const travels = [];

  function addTravel(place) {
    travels.push(place);
  }
  return {
    place,
    addTravel,
    travels,
  };
}

function board() {
  const moveMatrix = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
  ];

  const fields = [];
  for (let column = 0; column < 8; column++) {
    fields[column] = [];
    for (let row = 0; row < 8; row++) {
      fields[column][row] = field([column, row]);
    }
  }
  for (let column = 0; column < 8; column++) {
    for (let row = 0; row < 8; row++) {
      moveMatrix.forEach(([x, y]) => {
        if (column + x >= 0 && column + x < 8 && row + y >= 0 && row + y < 8) {
          fields[column][row].addTravel(fields[column + x][row + y]);
        }
      });
    }
  }
  return fields;
}

function knightTour(startField, endField) {
  x1 = startField[0];
  y1 = startField[1];
  x2 = endField[0];
  const chessboard = board();
  const queue = [];
  chessboard[x1][y2].travels.forEach((field) => {
    queue.push(field);
  });
  console.log(queue);
}

knightTour([1, 5], [8, 3]);

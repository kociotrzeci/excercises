function field(place) {
  const travels = [];
  let visited = false;
  function addTravel(place) {
    travels.push(place);
  }
  function getTravels() {
    return travels;
  }
  return {
    place,
    addTravel,
    getTravels,
    visited,
  };
}

function Board() {
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

function knightTour(startField, endField, maxSteps = 1000, step) {
  if (x1 === endField[0] && y1 === endField[1]) {
    console.log("znalazłem");
    return 1;
  }
  const queue = [];
  queue.push(startField);
  const board = Board();
}

knightTour([1, 5], [2, 3]);

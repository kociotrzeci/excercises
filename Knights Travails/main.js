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
    travels,
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

function knightTour(startField, endField) {
  const board = Board();
  const queue = [board[startField[0]][startField[1]]];
  queue[0].path = queue[0].place;
  let found = false;
  let currentField = null;
  while (queue.length > 0 && found === false) {
    currentField = queue.shift();
    currentField.visited = true;
    currentField.travels.forEach((field) => {
      if (!field.visited) {
        field.path = `${currentField.path} => ${field.place}`;
        if (field.place[0] === endField[0] && field.place[1] === endField[1]) {
          found = field.path;
          return;
        }
        queue.push(field);
      }
    });
  }
  return found;
}

console.log(knightTour([1, 5], [7, 3]));

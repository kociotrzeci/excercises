function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function reverseString(string) {
  let tempString = "";
  for (let i = string.length; i > 0; i--) {
    tempString += string[i - 1];
  }
  return tempString;
}

let calculator = {};
calculator.add = function (a, b) {
  return a + b;
};
calculator.subtract = function (a, b) {
  return a - b;
};
calculator.multiply = function (a, b) {
  return a * b;
};
calculator.divide = function (a, b) {
  return a / b;
};

function cesarCipher(string, key) {
  let tempString = "";
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (
      (char.charCodeAt(0) >= 97 && char.charCodeAt(0) <= 122) ||
      (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90)
    ) {
      char = char.charCodeAt(0) + key;
      tempString += String.fromCharCode(char);
    } else {
      tempString += char;
    }
  }
  return tempString;
}

function analyzeArray(array) {
  let object = {};
  object.average = array.reduce((a, b) => a + b, 0) / array.length;
  object.min = Math.min(...array);
  object.max = Math.max(...array);
  object.length = array.length;
  return object;
}

module.exports = {
  capitalize,
  reverseString,
  calculator,
  cesarCipher,
  analyzeArray,
};

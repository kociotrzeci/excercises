const {
  capitalize,
  reverseString,
  calculator,
  cesarCipher,
  analyzeArray,
} = require("./main");

test("Capitalize a string", () => {
  expect(capitalize("hello")).toBe("Hello");
});

test("Reverse a string", () => {
  expect(reverseString("hello")).toBe("olleh");
});

test("Add two numbers", () => {
  expect(calculator.add(1, 2)).toBe(3);
});

test("Subtract two numbers", () => {
  expect(calculator.subtract(2, 1)).toBe(1);
});

test("Multiply two numbers", () => {
  expect(calculator.multiply(2, 3)).toBe(6);
});

test("Divide two numbers", () => {
  expect(calculator.divide(6, 3)).toBe(2);
});

test("Caesar cipher encodes a string with a key", () => {
  expect(cesarCipher("hello", 1)).toBe("ifmmp");
});

test("Caesar cipher check for other than chars", () => {
  expect(cesarCipher("123", 1)).toBe("123");
});

test("Caesar cipher check for Big Letters", () => {
  expect(cesarCipher("hellO", 1)).toBe("ifmmP");
});

test("Analyze array", () => {
  expect(analyzeArray([1, 8, 3, 4, 2, 6])).toEqual({
    average: 4,
    min: 1,
    max: 8,
    length: 6,
  });
});

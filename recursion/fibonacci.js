function fibonacci(n) {
  if (n === 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  let array = [0, 1];
  for (let i = 2; i < n; i++) {
    array.push(array[i - 1] + array[i - 2]);
  }
  return array;
}

function fibonacciRecursive(n) {
  if (n === 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const returnedOne = fibonacciRecursive(n - 1);
  const previous = returnedOne[n - 2];
  const previousSecond = returnedOne[n - 3];
  returnedOne.push(previous + previousSecond);
  return returnedOne;
}

console.log(fibonacciRecursive(10));
console.log(fibonacci(10));

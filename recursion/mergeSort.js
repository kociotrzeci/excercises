const dataSet = [
  22, 54, 7, 13, 98, 31, 42, 10, 87, 3, 66, 29, 5, 77, 91, 16, 8, 45, 62, 19,
  72, 37, 25, 81, 49,
];

function mergeSort(data) {
  if (data.length <= 1) return data;

  const middle = Math.floor(data.length / 2);
  const left = data.slice(0, middle);
  const right = data.slice(middle);
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  let merged = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < sortedLeft.length && rightIndex < sortedRight.length) {
    if (sortedLeft[leftIndex] < sortedRight[rightIndex]) {
      merged.push(sortedLeft[leftIndex]);
      leftIndex++;
    } else {
      merged.push(sortedRight[rightIndex]);
      rightIndex++;
    }
  }

  // Add remaining elements from left and right arrays
  merged = merged
    .concat(sortedLeft.slice(leftIndex))
    .concat(sortedRight.slice(rightIndex));

  return merged;
}

console.log(mergeSort(dataSet));

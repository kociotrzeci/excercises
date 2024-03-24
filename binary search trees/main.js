function Node() {
  let data = null;
  let left = null;
  let right = null;
  return { data, left, right };
}
function Tree(array) {
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  const root = buildTree(array);
  prettyPrint(root);
  function buildTree(array, isLeft = true, doIsort = true) {
    if (array.length === 0) return null;
    if (doIsort) {
      array.sort((a, b) => a - b);
      array = Array.from(new Set(array));
    }
    const middleItarator = (array.length / 2) | 0;
    const topElement = Node();
    topElement.data = array[middleItarator];
    topElement.left = buildTree(array.slice(0, middleItarator), true, false);
    topElement.right = buildTree(array.slice(middleItarator + 1), false, false);
    return topElement;
  }
  return { root };
}

let tree = Tree(testArray(10));
const array = [0, 5, 9, 92, 2, 100, 10];
function testArray(size = 100) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 10 * size));
  }
  return array;
}

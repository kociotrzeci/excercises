function Node(value = null) {
  let data = value;
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
  function insert(value, node = root) {
    if (value > node.data) {
      if (node.right === null) {
        node.right = Node(value);
        console.log(`inserted ${value}`);
        return 1;
      }
      insert(value, node.right);
    }
    if (value < node.data) {
      if (node.left === null) {
        node.left = Node(value);
        console.log(`inserted ${value}`);
        return 1;
      }
      insert(value, node.left);
    }
    if (node.data === value) return 0;
  }
  function deleteItem(value, node = root) {
    if (value > node.data) {
      const mode = deleteItem(value, node.right);
      if (mode === 1) node.left = null;
      if (mode === 3) {
        node.right = node.right.left;
      }
      if (mode === 4) node.right = node.right.right;
      return 0;
    }
    if (value < node.data) {
      const mode = deleteItem(value, node.left);
      if (mode === 1) node.left = null;
      if (mode === 3) {
        node.left = node.left.left;
      }
      if (mode === 4) node.left = node.left.right;
      return 0;
    }
    if (node.data === value) {
      if (node.left === null && node.right === null) {
        return 1;
      }
      if (node.left != null && node.right != null) {
        let tempNode = node.right;
        while (tempNode.left != null) {
          tempNode = tempNode.left;
        }
        deleteItem(tempNode.data);
        node.data = tempNode.data;
        return 2;
      }
      if (node.left != null && node.right === null) {
        return 3;
      }
      if (node.right != null && node.left === null) {
        node = node.right;
        return 4;
      }
    }
  }
  function addTestNodes(size = 1) {
    for (let i = 0; i < size; i++) {
      insert(Math.floor(Math.random() * 100));
    }
  }
  function find(value, node = root) {
    if (value > node.data && node.right) return find(value, node.right);
    else if (value < node.data && node.left) return find(value, node.left);
    else if (node.data === value) return node;
    else return "no data";
  }
  function levelOrder(callback = null) {
    const queue = [];
  }

  const root = buildTree(array);
  prettyPrint(root);
  return { root, insert, prettyPrint, addTestNodes, insert, deleteItem, find };
}

let tree = Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
tree.prettyPrint(tree.root);
tree.prettyPrint(tree.root);
console.log(tree.find(11));
function testArray(size = 100) {
  let array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 10 * size));
  }
  return array;
}

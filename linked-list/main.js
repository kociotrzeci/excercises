console.log("Linked List Test");

class linkedList {
  constructor() {
    let firstNode = null;
    let lastNode = null;
  }
  append(value) {
    if (!firstNode) {
      firstNode = new Node(value);
      lastNode = firstNode;
      return;
    } else {
      lastNode.next = new Node(value);
      lastNode = lastNode.next;
    }
  }
  print() {
    console.log("Printing linked list: ");
    p;
  }
}
function Node(value) {
  this.value = value;
  this.next = null;
  this.addNextNode = function (value) {
    this.next = new Node(value);
  };
  this.print = function () {
    console.log(this.value);
    if (this.next === null) {
      console.log("null");
      return;
    } else this.next.print();
  };
  return this;
}

let node = new Node("first");
node.addNextNode("second");
node.print();

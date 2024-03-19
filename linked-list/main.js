console.log("Linked List Test");

function Node(value) {
  this.value = value;
  this.next = null;
  this.addNextNode = function (value) {
    this.next = Node(value);
  };
  this.returnString = function () {
    let string = `(${this.value}) -> `;
    if (this.next === null) {
      return string + " null";
    } else return string + this.next.returnString();
  };
  return {
    value: this.value,
    next: this.next,
    addNextNode: this.addNextNode,
    returnString: this.returnString,
  };
}
class linkedList {
  constructor() {
    this.firstNode = null;
    this.lastNode = null;
  }
  append(value) {
    if (this.firstNode === null) {
      this.firstNode = Node(value);
      this.lastNode = this.firstNode;
      return;
    } else {
      this.lastNode.next = Node(value);
      this.lastNode = this.lastNode.next;
    }
  }
  prepend(value) {
    if (this.firstNode === null) {
      this.firstNode = Node(value);
      this.lastNode = this.firstNode;
      return;
    } else {
      let tempNode = this.firstNode;
      this.firstNode = Node(value);
      this.firstNode.next = tempNode;
    }
  }
  size() {
    let count = 0;
    let current = this.firstNode;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
  head() {
    return this.firstNode;
  }
  tail() {
    return this.lastNode;
  }
  at(index) {
    if (index >= this.size() || index < 0) return null;
    let count = 0;
    let node = this.firstNode;
    while (node) {
      if (count === index) {
        return node;
      }
      count++;
      node = node.next;
    }
  }
  pop() {
    if (this.firstNode === null) return;

    this.at(this.size() - 2).next = null;
    this.LastNode = this.at(this.size() - 2);
  }
  print() {
    console.log("Printing linked list: " + this.firstNode.returnString());
  }
  contains(value) {
    let current = this.firstNode;
    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  find(value) {
    let current = this.firstNode;
    let i = 0;
    while (current) {
      if (current.value === value) {
        return i;
      }
      i++;
      current = current.next;
    }
    return null;
  }
}

const list = new linkedList();
list.append("first");
list.append("second");
list.append("third");
list.append("fourth");
list.prepend("zeroth");
list.print();
console.log(`size of list: ${list.size()}`);
console.log(`head of list: ${list.head().value}`);
console.log(`tail of list: ${list.tail().value}`);
console.log(list.at(2).value);
list.pop();
list.print();
console.log(`size of list: ${list.size()}`);
console.log(`head of list: ${list.head().value}`);
console.log(`tail of list: ${list.tail().value}`);
console.log(list.contains("fourth"));
console.log(list.find("third"));

class LinkedList {
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
  remove(value) {
    let findIndex = this.find(value);
    let previous = this.at(findIndex - 1);
    let current = this.at(findIndex);
    previous.next = current.next;
  }
}
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
class HashMap {
  constructor() {
    const LOAD_FACTOR = 0.75;
    this.capacity = 16;
    this.map = new Array(this.capacity);
    for (let i = 0; i < this.capacity; i++) {
      this.map[i] = new LinkedList();
    }
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 17;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode % this.capacity;
  }
  set(key, value) {
    let index = this.hash(key);
    this.map[index].append([key, value]);
    console.log(
      `added ${this.map[index].lastNode.value[0]} ${this.map[index].lastNode.value[1]} to bucket ${index}`
    );
  }
  has(key) {
    let index = this.hash(key);
    for (let i = 0; i < this.map[index].size(); i++) {
      if (this.map[index].at(i).value[0] === key) return true;
    }
    return false;
  }
  get(key) {
    let index = this.hash(key);
    for (let i = 0; i < this.map[index].size(); i++) {
      if (this.map[index].at(i).value[0] === key)
        return this.map[index].at(i).value[1];
    }
    return false;
  }
  entries() {
    let result = [];
    for (let i = 0; i < this.capacity; i++) {
      let currentBucket = this.map[i];
      for (let j = 0; j < currentBucket.size(); j++) {
        result.push([
          currentBucket.at(j).value[0],
          currentBucket.at(j).value[0],
        ]);
      }
    }
    return result;
  }
  remove(key) {
    let index = this.hash(key);
  }
}

const hashMap = new HashMap();
hashMap.set("Bob", "Marley");
hashMap.set("oBb", "Marley");
hashMap.set("Henryk", "Sienkiewicz");
hashMap.set("Alexander", "Dumas");
hashMap.set("Name", "Jose");
let array = hashMap.entries();
console.log(array);
console.log(hashMap.get("Bob"));
console.log(hashMap.has("Henryk"));

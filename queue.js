export default class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  toArray() {
    let arr = [];
    let currentNode = this.head;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return arr;
  }

  // Tilføj node til enden af køen
  enqueue(value) {
    let newNode = { value: value, next: null };
    if (this.tail === null) {
      this.tail = this.head = newNode; // Hvis tom = head og tail = newNode
    } else {
      this.tail.next = newNode; // Tilføjer newNode til slutningen på listen
      this.tail = newNode; // Opdaterer newNode til at være den nye tail
    }
    this.size++;
  }

  // Fjerner og returnerer det element, der er længst i queuen
  dequeue() {
    if (this.head === null) return null;
    let value = this.head.value;
    this.head = this.head.next;
    if (this.head === null) this.tail = null;
    this.size--;
    return value;
  }

  // Returnerer det forreste element i køen
  peek() {
    if (this.head === null) return null;
    return this.head.value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

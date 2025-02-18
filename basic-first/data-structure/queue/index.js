const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

const iter = input.shift();

class Queue {
  constructor() {
    this.storage = {};
    this.start = 0;
    this.rear = 0;
  }

  size() {
    if (this.storage[this.rear] === undefined) {
      return 0;
    } else {
      return this.rear - this.start + 1;
    }
  }

  enqueue(value) {
    if (this.size() === 0) {
      this.storage[0] = value;
    } else {
      this.rear++;
      this.storage[this.rear] = value;
    }
  }

  dequeue() {
    let temp;

    if (this.start === this.rear) {
      temp = this.storage[this.start] ?? -1;
      delete this.storage[this.start];
      this.start = 0;
      this.rear = 0;
    } else {
      temp = this.storage[this.start] ?? -1;
      delete this.storage[this.start];
      this.start++;
    }

    return temp;
  }

  front() {
    return this.storage[this.start] ?? -1;
  }

  back() {
    return this.storage[this.rear] ?? -1;
  }

  empty() {
    return this.size() ? 0 : 1;
  }
}

const queue = new Queue();
const answer = [];

for (let i = 0; i < iter; i++) {
  const [command, value] = input[i].split(' ');

  if (command === 'push') {
    queue.enqueue(value);
  } else if (command === 'pop') {
    answer.push(queue.dequeue());
  } else if (command === 'size') {
    answer.push(queue.size());
  } else if (command === 'empty') {
    answer.push(queue.empty());
  } else if (command === 'front') {
    answer.push(queue.front());
  } else if (command === 'back') {
    answer.push(queue.back());
  }
}

console.log(answer.join('\n'));

const stack = [];
const answer2 = [];

for (let i = 0; i < iter; i++) {
  const [command, value] = input[i].split(' ');

  if (command === 'push') {
    stack.push(value);
  } else if (command === 'pop') {
    answer2.push(stack.length ? stack.shift() : -1);
  } else if (command === 'size') {
    answer2.push(stack.length);
  } else if (command === 'empty') {
    answer2.push(stack.length ? 0 : 1);
  } else if (command === 'front') {
    answer2.push(stack.length ? stack.at(0) : -1);
  } else if (command === 'back') {
    answer2.push(stack.length ? stack.at(-1) : -1);
  }
}

console.log(answer2.join('\n'));

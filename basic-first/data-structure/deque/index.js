const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const iter = Number(input.shift());

const answer = [];
const deque = [];

for (let i = 0; i < iter; i++) {
  const [cmd, value] = input[i].split(' ');

  if (cmd === 'push_front') {
    deque.unshift(value);
  } else if (cmd === 'push_back') {
    deque.push(value);
  } else if (cmd === 'pop_front') {
    if (deque.length) {
      answer.push(deque.shift());
    } else {
      answer.push(-1);
    }
  } else if (cmd === 'pop_back') {
    if (deque.length) {
      answer.push(deque.pop());
    } else {
      answer.push(-1);
    }
  } else if (cmd === 'size') {
    answer.push(deque.length);
  } else if (cmd === 'empty') {
    answer.push(deque.length ? 0 : 1);
  } else if (cmd === 'front') {
    if (deque.length) {
      answer.push(deque[0]);
    } else {
      answer.push(-1);
    }
  } else if (cmd === 'back') {
    if (deque.length) {
      answer.push(deque[deque.length - 1]);
    } else {
      answer.push(-1);
    }
  }
}

console.log(answer.join('\n'));

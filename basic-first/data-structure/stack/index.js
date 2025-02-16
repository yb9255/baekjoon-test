const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

const [commandCount, ...commands] = input;
const stack = [];

const commandMap = {
  push(value) {
    stack.push(value);
  },
  pop() {
    const pop = stack.pop();

    if (pop) {
      answer += `${pop}\n`;
    } else {
      answer += '-1\n';
    }
  },
  top() {
    const top = stack[stack.length - 1];

    if (top) {
      answer += `${top}\n`;
    } else {
      answer += `-1\n`;
    }
  },
  size() {
    answer += `${stack.length}\n`;
  },
  empty() {
    answer += stack.length ? '0\n' : '1\n';
  },
};

let answer = '';

for (const commandString of commands) {
  const [command, value] = commandString.split(' ');
  commandMap[command](value);
}

console.log(answer.trim());

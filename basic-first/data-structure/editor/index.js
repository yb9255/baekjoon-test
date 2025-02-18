const fs = require('fs');
const input = fs.readFileSync('./input3.txt').toString().trim().split('\n');

const lStack = input.shift().split('');
const iter = Number(input.shift());
const rStack = [];

let answer = '';

for (let i = 0; i < iter; i++) {
  const [command, value] = input[i].split(' ');

  if (command === 'L' && lStack.length) {
    rStack.push(lStack.pop());
  } else if (command === 'D' && rStack.length) {
    lStack.push(rStack.pop());
  } else if (command === 'B') {
    lStack.pop();
  } else if (command === 'P') {
    lStack.push(value);
  }
}

answer = lStack.join('') + rStack.reverse().join('');

console.log(answer);

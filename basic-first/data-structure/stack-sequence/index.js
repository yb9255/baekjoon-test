const fs = require('fs');
const input = fs.readFileSync('./input2.txt').toString().trim().split('\n');

const [iter, ...numbers] = input;

let answer = [];
let stackNum = 1;
const stack = [];

for (let i = 0; i < iter; i++) {
  const num = +numbers[i];

  while (stackNum <= num) {
    stack.push(stackNum);
    answer.push('+');
    stackNum++;
  }

  const lastNumInStack = stack.pop();
  answer.push('-');

  if (lastNumInStack !== num) {
    answer = ['NO'];
    break;
  }
}

console.log(answer.join('\n'));

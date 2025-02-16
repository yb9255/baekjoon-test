const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().split('\n');

const [count, ...parenthesisList] = input;

let answer = '';

for (let i = 0; i < count; i++) {
  const parenthesis = parenthesisList[i];
  const stack = [];

  for (let j = 0; j < parenthesis.length; j++) {
    const bracket = parenthesis[j];

    if (bracket === '(') {
      stack.push(bracket);
    } else {
      if (!stack.length) {
        answer += 'NO\n';
        break;
      }

      if (stack.pop() !== '(') {
        answer += 'NO\n';
        break;
      }
    }

    if (j === parenthesis.length - 1) {
      if (!stack.length) {
        answer += 'YES\n';
      } else {
        answer += 'NO\n';
      }
    }
  }
}

console.log(answer.trim());

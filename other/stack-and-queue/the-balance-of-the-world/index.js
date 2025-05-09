const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const answer = [];
const brackets = ['(', ')', '[', ']'];

const map = {
  ')': '(',
  ']': '[',
};

for (let i = 0; i < input.length; i++) {
  const sentence = input[i];
  if (sentence === '.') break;

  const stack = [];
  let status = 'yes';

  if (!sentence.endsWith('.')) {
    answer.push('no');
    continue;
  }

  const bracketList = sentence
    .split('')
    .filter((str) => brackets.includes(str));

  for (const bracket of bracketList) {
    if (!map[bracket]) {
      stack.push(bracket);
    } else {
      if (stack[stack.length - 1] !== map[bracket]) {
        status = 'no';
        break;
      } else {
        stack.pop();
      }
    }
  }

  if (stack.length !== 0) {
    status = 'no';
  }

  answer.push(status);
}

console.log(answer.join('\n'));

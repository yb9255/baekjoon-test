/** https://www.acmicpc.net/problem/4949 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const result = [];

const map = {
  ')': '(',
  ']': '[',
};

for (let i = 0; i < input.length; i++) {
  const sentence = input[i];
  if (sentence === '.') break;

  if (!sentence.endsWith('.')) {
    result.push('no');
    continue;
  }

  const stack = [];
  let status = 'yes';

  const brackets = sentence
    .split('')
    .filter(
      (char) => char === '(' || char === ')' || char === '[' || char === ']'
    );

  for (const bracket of brackets) {
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

  if (stack.length) status = 'no';

  result.push(status);
}

console.log(result.join('\n'));

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. N과 M(5) 풀이에서 visited만 표시하지 않도록 수정
 */

numbers.sort((a, b) => a - b);
const answer = [];

const getSequence = (depth, stack) => {
  if (depth === M) {
    answer.push(stack.join(' '));
    return;
  }

  for (let i = 0; i < N; i++) {
    stack.push(numbers[i]);
    getSequence(depth + 1, stack);
    stack.pop();
  }
};

getSequence(0, []);
console.log(answer.join('\n'));

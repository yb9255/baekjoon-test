/** https://www.acmicpc.net/problem/15657 */

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/**
 * Pseudo Code
 * 1. N-and-M-6번 풀이에서, startIndex + 1이 아니라 startIndex부터 순회하도록 풀이
 */

numbers.sort((a, b) => a - b);
const answer = [];

const getSequence = (depth, stack, startIndex) => {
  if (depth === M) {
    answer.push(stack.join(' '));
    return;
  }

  for (let i = startIndex; i < N; i++) {
    stack.push(numbers[i]);
    getSequence(depth + 1, stack, i);
    stack.pop();
  }
};

for (let i = 0; i < N; i++) {
  getSequence(1, [numbers[i]], i);
}

console.log(answer.join('\n'));

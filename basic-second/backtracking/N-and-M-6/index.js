/** https://www.acmicpc.net/problem/15655 */

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/**
 * Pseudo Code
 * 1. N-and-M-5번 풀이에서, 나보다 더 큰 값 == 나보다 뒤의 인덱스에 있는 값
 * 임을 활용해서 내부 for문의 범위를 제한시켜서 해결
 */

numbers.sort((a, b) => a - b);
const answer = [];

const getSequence = (depth, stack, startIndex) => {
  if (depth === M) {
    answer.push(stack.join(' '));
    return;
  }

  for (let i = startIndex + 1; i < N; i++) {
    stack.push(numbers[i]);
    getSequence(depth + 1, stack, i);
    stack.pop();
  }
};

for (let i = 0; i < N; i++) {
  getSequence(1, [numbers[i]], i);
}

console.log(answer.join('\n'));

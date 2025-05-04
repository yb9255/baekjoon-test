const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

numbers.sort((a, b) => a - b);

/**
 * Pseudo Code
 * 1. N-and-M 9번 풀이에서 visited를 제거
 */

const answer = [];

const getSequence = (depth, stack) => {
  if (depth === M) {
    answer.push(stack.join(' '));
    return;
  }

  let prev = -1;

  for (let i = 0; i < N; i++) {
    if (numbers[i] !== prev) {
      stack.push(numbers[i]);
      getSequence(depth + 1, stack);
      stack.pop();
      prev = numbers[i];
    }
  }
};

getSequence(0, []);

console.log(answer.join('\n'));

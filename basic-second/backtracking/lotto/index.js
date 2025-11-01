/** https://www.acmicpc.net/problem/6603 */

const cases = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. 조합은 이미 구한 값을 startIndex로 등록하여 startIndex 이후부터 순회를 돌도록 하여 구할 수 있음.
 * 2. N과 M(10) 참조
 */

const MAX_DEPTH = 6;
const answer = [];

const getCombs = (startIndex, numbers, depth, stack) => {
  if (depth === MAX_DEPTH) {
    answer.push(stack.join(' '));
    return;
  }

  for (let i = startIndex; i < numbers.length; i++) {
    stack.push(numbers[i]);
    getCombs(i + 1, numbers, depth + 1, stack);
    stack.pop();
  }
};

for (let i = 0; i < cases.length; i++) {
  const [N, ...numbers] = cases[i];
  if (N === 0) break;
  getCombs(0, numbers, 0, []);
  answer.push('');
}

console.log(answer.join('\n').trim());

/** https://www.acmicpc.net/problem/2559 */

const [[N, K], sequence] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 순서쌍의 곱의 합(sum-of-products-of-ordered-pairs)과 풀이가 같으나,
 * 답이 음수가 될 수도 있으므로 result를 -Infinity로 설정하고 제출해야 함.
 */

let len = 0;
let left = 0;
let curSum = 0;
let result = -Infinity;

for (let i = 0; i < N; i++) {
  curSum += sequence[i];
  len++;

  if (len > K) {
    curSum -= sequence[left++];
    len--;
  }

  if (len === K) {
    result = Math.max(result, curSum);
  }
}

console.log(result);

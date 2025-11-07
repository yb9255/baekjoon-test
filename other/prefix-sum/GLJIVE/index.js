/** https://www.acmicpc.net/problem/2851 */

const nums = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

let sum = 0;
let result = 0;

for (const num of nums) {
  sum += num;

  const curDiff = Math.abs(100 - sum);
  const bestDiff = Math.abs(100 - result);

  if (curDiff <= bestDiff) {
    result = Math.max(result, sum);
  }
}

console.log(result);

/** https://www.acmicpc.net/problem/2435 */

const [[N, K], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let curSum = 0;

for (let i = 0; i < K; i++) {
  curSum += nums[i];
}

let maxSum = curSum;

for (let i = K; i < N; i++) {
  curSum = curSum - nums[i - K] + nums[i];
  maxSum = Math.max(maxSum, curSum);
}

console.log(maxSum);

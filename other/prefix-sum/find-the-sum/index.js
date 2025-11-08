/** https://www.acmicpc.net/problem/11441 */

const lines = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. dp[i] = 0부터 dp[i]까지의 합
 * 2. nums를 순회하면서 dp[i]까지의 합을 구한다.
 *
 * 3. 0 <= i <= j <= N에서 i ~ j사이의 부분합을 구하려면, dp[j]까지의 합에서 i이전의 값,
 * 즉 dp[i - 1]의 값을 구하면 된다 (i가 0일 경우는 바로 dp[j]를 구하면 됨)
 *
 * 4. 문제에 주어진 좌표별로 부분한 값을 구해서 로그
 */

let line = 0;

const N = +lines[line++];
const nums = lines[line++].split(' ').map(Number);
const M = +lines[line++];

const dp = [];
dp[0] = nums[0];

for (let i = 0; i < N - 1; i++) {
  dp[i + 1] = dp[i] + nums[i + 1];
}

const result = [];

for (let i = 0; i < M; i++) {
  const raw = lines[line++].split(' ');
  const start = +raw[0] - 1;
  const end = +raw[1] - 1;

  const sum = start === 0 ? dp[end] : dp[end] - dp[start - 1];

  result.push(sum);
}

console.log(result.join('\n'));

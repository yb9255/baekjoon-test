const input = require('fs').readFileSync('input.txt').toString().split('\n');

const iter = +input.shift();
const sequence = input[0].split(' ').map(Number);

/** 점화식
 * 1. dp[n] = 이전 부분 수열의 최대 합에 sequence[n]을 더했을 때 최대값
 * 2. dp[n]을 구할 때 다음과 같은 분기가 있다.
 * 2-1. dp[n - m] (0 <= m < n)이 sequence[n]보다 작다면 dp[n] = dp[n - m] + sequence[n]
 * 2-2. dp[n - m]에 해당하는 모든 값이 sequence[n]보다 크다면 dp[n] = sequence[n]
 */

const dp = [sequence[0]];

for (let i = 1; i < iter; i++) {
  dp[i] = sequence[i];

  for (let j = 0; j < i; j++) {
    if (sequence[j] >= sequence[i]) continue;
    dp[i] = Math.max(dp[j] + sequence[i], dp[i]);
  }
}

console.log(Math.max(...dp));

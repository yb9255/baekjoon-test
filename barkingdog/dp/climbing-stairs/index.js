const [N, ...stairs] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** Pseudo Code
 * 1. 점화식:
 * 1-1. dp에 기록되는 값은 i번째 계단을 올랐을 때 최대값
 * 1-2. 4 이상일때 dp[i]는 dp[i - 2] (두 계단 이전 최대값에서 두 계단에 위치)
 * 혹은 dp[i - 3] + stairs[i - 1] (세 계단 이전 최대값에서 두 계단을 뛰어서 이전 계단에 위치)
 * 1-3. 1-2의 두 케이스 중 stairs[i]를 더했을 때 더 큰 값이 dp[i]
 *
 * 2. dp[N] 로그.
 */

const dp = [];

dp[0] = stairs[0];
dp[1] = stairs[0] + stairs[1];
dp[2] = Math.max(stairs[0] + stairs[2], stairs[1] + stairs[2]);

for (let i = 3; i < N; i++) {
  dp[i] = Math.max(dp[i - 2], dp[i - 3] + stairs[i - 1]) + stairs[i];
}

console.log(dp[N - 1]);

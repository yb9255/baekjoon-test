/** https://www.acmicpc.net/problem/15990 */

const [T, ...nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const MOD = 1_000_000_009;

/** Pseudo Code
 * 1. 마지막에 1을 더하는 경우는 현재 수보다 1 작고, 2 또는 3으로 끝나는 경우임
 * 2. 마지막에 2를 더하는 경우는 현재 수보다 2 작고, 1 또는 3으로 끝나는 경우임
 * 3. 마지막에 3을 더하는 경우는 현재 수보다 3 작고, 1 또는 2로 끝나는 경우임
 * 4.
 * 4-1. 마지막에 1을 더하는 경우의 수 = dp[n - 1][2] + dp[n - 1][3]
 * 4-2. 마지막에 2를 더하는 경우의 수 = dp[n - 2][1] + dp[n - 2][3]
 * 4-3. 마지막에 3을 더하는 경우의 수 = dp[n - 3][1] + dp[n - 3][2]
 * 5. 점화식
 * dp[n] =
  dp[n - 1][2] +
  dp[n - 1][3] +
  dp[n - 2][1] +
  dp[n - 2][3] +
  dp[n - 3][1] +
  dp[n - 3][2];
 */

const dp = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [1, 1, 1],
];

const answer = [];

for (let t = 0; t < T; t++) {
  const num = nums[t];

  for (let i = dp.length; i <= num; i++) {
    dp[i] = [];
    dp[i][0] = (dp[i - 1][1] + dp[i - 1][2]) % MOD;
    dp[i][1] = (dp[i - 2][0] + dp[i - 2][2]) % MOD;
    dp[i][2] = (dp[i - 3][0] + dp[i - 3][1]) % MOD;
  }

  answer.push((dp[num][0] + dp[num][1] + dp[num][2]) % MOD);
}

console.log(answer.join('\n'));

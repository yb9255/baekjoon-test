const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const MOD = 1_000_000_009;

const iter = input.shift();

/** 점화식
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
  [0, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 1, 1],
];

const answer = [];

for (let i = 0; i < iter; i++) {
  const number = input[i];

  for (let j = dp.length; j <= number; j++) {
    dp[j] = [];
    dp[j][1] = (dp[j - 1][2] + dp[j - 1][3]) % MOD;
    dp[j][2] = (dp[j - 2][1] + dp[j - 2][3]) % MOD;
    dp[j][3] = (dp[j - 3][1] + dp[j - 3][2]) % MOD;
  }

  answer.push((dp[number][1] + dp[number][2] + dp[number][3]) % MOD);
}

console.log(answer.join('\n'));

/** https://www.acmicpc.net/problem/15988 */

const [N, ...nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** 점화식
 * 마지막에 1을 더하면 n - 1의 조합 개수에 1을 더한 것
 * 마지막에 2를 더하면 n - 2의 조합 개수에 2를 더한 것
 * 마지막에 3을 더하면 n - 3의 조합 개수에 3을 더한것
 * dp[n] = dp[n - 1] + dp[n - 2] + dp[n - 3]
 */

const dp = [0, 1, 2, 4, 7];
const answer = [];
const MOD = 1_000_000_009;

for (let i = 0; i < N; i++) {
  const num = nums[i];

  if (num < dp.length) {
    answer.push(dp[num]);
    continue;
  }

  for (let j = dp.length; j <= num; j++) {
    dp[j] = (dp[j - 1] + dp[j - 2] + dp[j - 3]) % MOD;
  }

  answer.push(dp[num]);
}

console.log(answer.join('\n'));

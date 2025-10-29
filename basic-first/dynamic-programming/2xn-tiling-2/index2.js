/** https://www.acmicpc.net/problem/11727 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** dp 배열을 사용한 풀이 */

const MOD = 10_007;
const dp = [0, 1, 3];

for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 2] * 2 + dp[i - 1]) % MOD;
}

console.log(dp[N]);

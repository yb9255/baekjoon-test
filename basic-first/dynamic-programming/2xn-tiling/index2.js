/** https://www.acmicpc.net/problem/11726 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim();

/** dp 배열 사용한 풀이 */

const MOD = 10_007;
const dp = [0, 1, 2];

for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 2] + dp[i - 1]) % MOD;
}

console.log(dp[N]);

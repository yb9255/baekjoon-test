/** https://www.acmicpc.net/problem/2748 */
// dp로 푸는 피보나치 수

const N = BigInt(
  require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
    .toString()
    .trim()
);

const dp = [0n, 1n, 1n];

for (let i = 3; i <= N; i++) {
  dp[i] = dp[i - 2] + dp[i - 1];
}

console.log(dp[N].toString());

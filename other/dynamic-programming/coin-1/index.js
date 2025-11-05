/** https://www.acmicpc.net/problem/2293 */

const [nums, ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * Pseudo Code
 * 1. dp[i] = i를 만들기 위해 조합 수
 * 2. dp[i]에 동전 j를 포함하려면 dp[i - j]의 개수를 dp[j]에 더해야 함
 * 3. coin ~ K 까지를 루프돌면서 (j) dp[j]에 dp[j - coin]을 더함.
 *
 *
 * 아래 풀이는 Node.js에서는 메모리 초과로 통과 안됨
 */

const [N, K] = nums.split(' ').map(Number);
const coins = input.map(Number);

const dp = Array(K + 1).fill(0);
dp[0] = 1;

for (let i = 0; i < N; i++) {
  const coin = coins[i];

  for (let j = coin; j <= K; j++) {
    dp[j] += dp[j - coin];
  }
}

console.log(dp[K]);

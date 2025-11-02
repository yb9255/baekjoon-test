/** https://www.acmicpc.net/problem/2294 */

const [nums, ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. dp[i] = 숫자 i를 만들기 위한 동전 조합의 최소 개수
 * 2. dp[0]을 0으로 지정한다.
 * 3. 만약 dp[i - x]에 값이 있다면, dp[i - x] + 1은 잠재직인 dp[i]의 값이 될 수 있다.
 *
 * 4. 그래서 현재 동전을 순회하면서, (i)
 * 현재 동전의 값(coins[i])부터 최대값까지 내부에서 다시 순회하며(j)
 * 값 j가 현재 dp[j]와 dp[j - coin] + 1의 값중 뭐가 더 작은지 비교해 나간다.
 *
 * 5. 만약 이 순회가 끝났는데 dp[K]가 업데이트가 되지 않았다면 -1을 로그, 그렇지 않다면 dp[K]를 로그
 */

const [N, K] = nums.split(' ').map(Number);
const coins = input.map(Number);

const dp = Array(K + 1).fill(Infinity);
dp[0] = 0;

for (let i = 0; i < N; i++) {
  const coin = coins[i];

  for (let j = coin; j <= K; j++) {
    if (dp[j - coin] !== Infinity) {
      dp[j] = Math.min(dp[j], dp[j - coin] + 1);
    }
  }
}

console.log(dp[K] === Infinity ? -1 : dp[K]);

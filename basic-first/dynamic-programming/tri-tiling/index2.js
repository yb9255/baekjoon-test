/** https://www.acmicpc.net/problem/2133 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * O(n) 풀이법
 *
 * dp[n] = 3 x n 보드의 타일링 전체 개수
 * accSum = dp[0] + dp[2] + ... + dp[n - 2] 까지의 누적합
 *
 * 점화식:
 * dp[n] = dp[n - 2] * 3 + accSum * 2
 * accSum은 dp[0]부터 dp[n - 2]까지의 누적합
 *
 * 즉, 원래 점화식의 dp[n - 2] * 3 + (dp[0] + dp[2] + ... + dp[n - 4]) * 2 를
 * accSum 변수로 누적해서 O(n)으로 계산하는 방식
 */

if (N % 2 !== 0) {
  console.log(0);
  return;
}

const dp = [];
dp[0] = 1;
dp[2] = 3;

let accSum = dp[0];

for (let i = 4; i <= N; i += 2) {
  dp[i] = dp[i - 2] * 3 + accSum * 2;
  accSum += dp[i - 2];
}

console.log(dp[N]);

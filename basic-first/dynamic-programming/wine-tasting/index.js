/** https://www.acmicpc.net/problem/2156 */

const [n, ...wines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/**
 * 점화식
 * 1. dp[n]은 포도주가 n줄까지 까지 있을 때 최대한 많이 마실 수 있는 포도주 양이다.
 *
 * 2. n번째 포도주를 마시려면 아래 두 가지 케이스로 나뉜다.
 * 2-1. n - 1번째 포도주를 마시려면 n - 3까지 마시고 n - 1, n을 연달아 마신다.
 * 2-2. n - 1번째 포도주를 마시지 않으려면 n - 2까지 마시고 n을 마신다.
 *
 * 3. n번째 포도주를 마시지 않는 경우 최대값은 dp[n - 1]이 된다.
 *
 * dp[n] = Math.max(dp[n - 1], dp[n - 2] + wines[n], dp[n - 3] + wines[n - 1] + wines[n])
 */

const dp = new Array(n).fill(0);

if (n === 0) {
  console.log(wines[0]);
} else if (n === 1) {
  console.log(wines[0] + wines[1]);
} else {
  dp[0] = wines[0];
  dp[1] = wines[0] + wines[1];
  dp[2] = Math.max(dp[1], dp[0] + wines[2], wines[1] + wines[2]);

  for (let i = 3; i < n; i++) {
    dp[i] = Math.max(
      dp[i - 1],
      dp[i - 2] + wines[i],
      dp[i - 3] + wines[i - 1] + wines[i],
    );
  }

  console.log(dp[dp.length - 1]);
}

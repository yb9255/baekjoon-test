/** https://www.acmicpc.net/problem/1699 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo Code
 * Dynamic Programming
 * 1. 0부터 n까지를 indices로 가지는 dp 배열을 생성한다.
 * 이 배열은 최소항 제곱수의 합 케이스에 최소항 갯수를 카운트한다.
 * 기본값은 Infinity이며 0은 제곱수의 합이 없으므로 0으로 시작
 *
 * 2. 1부터 n까지 값을 순회한다. (인자 i)
 * 3. 각 i 차례마다 1부터 Math.sqrt(i)까지 값을 순회한다. (인자 j)
 *
 * 4. i의 제곱수의 합의 항을 나열할 때,
 * 각 i에 대해 j²(1², 2², ..., Math.sqrt(i)²) 중 하나를 마지막으로 더해야 함.
 * 즉, dp[i - j^2]의 최소항 개수 목록 (dp[i - 1^2], dp[i - 2^2],... dp[i -  Math.sqrt(i)²])
 * 중 가장 작은 값에 1을 더하는게 dp[i]의 최소항 개수가 됨.
 *
 * 5. dp[n]을 리턴함.
 */

const dp = Array.from({ length: N + 1 }, () => Infinity);
dp[0] = 0;

for (let i = 1; i <= N; i++) {
  for (let j = 1; j * j <= i; j++) {
    dp[i] = Math.min(dp[i], dp[i - j ** 2] + 1);
  }
}

console.log(dp[N]);

/** https://www.acmicpc.net/problem/9095 */

const [N, ...nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** Pseudo Code
 * 1. n의 더하기 조합이 마지막에 1을 더했다면 n - 1까지 만들고 마지막에 1을 더한 것
 * 2. n의 더하기 조합이 마지막에 2를 더했다면 n - 2까지 만들고 마지막에 2를 더한 것
 * 3. n의 더하기 조합이 마지막에 3을 더했다면 n - 3까지 만들고 마지막에 3을 더한 것
 * 4. 즉, f(n - 1) + f(n - 2) + f(n - 3) == f(n)이 성립함.
 */

/** bottom-up 풀이 (1부터 타겟 값까지 점화식으로 구해가는 풀이) */

const dp = [0, 1, 2, 4, 7];
const result = [];

for (let i = 0; i < N; i++) {
  const num = nums[i];

  if (dp[num]) {
    result.push(dp[num]);
    continue;
  }

  for (let i = 5; i <= num; i++) {
    dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
  }

  result.push(dp[num]);
}

console.log(result.join('\n'));

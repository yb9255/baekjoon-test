/** https://www.acmicpc.net/problem/11722 */

const [[N], sequence] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * 1. dp[i] = i를 끝으로 하는 가장 긴 감소하는 부분수열 길이
 * 2. 각 숫자마다 숫자 인덱스의 이전 숫자들을 순회하면서 현재 숫자보다 큰 숫자의 최대길이 부분수열과 현재 길이를
 * 비교하며 갱신
 */

const dp = Array(N + 1).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (sequence[j] <= sequence[i]) continue;
    dp[i] = Math.max(dp[i], dp[j] + 1);
  }
}

console.log(Math.max(...dp));

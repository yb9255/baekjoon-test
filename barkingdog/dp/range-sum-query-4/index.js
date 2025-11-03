/** https://www.acmicpc.net/problem/11659 */

const [[N, M], nums, ...ranges] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 점화식: dp[n]까지는 현재부터 n까지의 합을 기록함
 *
 * 2. end 인덱스까지의 총합에서 start - 1 인덱스의 총합을 빼면 원하는 구간의 총합을
 * 구할 수 있음.
 */

const dp = [0];
const answer = [];

for (let i = 0; i < N; i++) {
  dp[i + 1] = dp[i] + nums[i];
}

for (let i = 0; i < M; i++) {
  const [start, end] = ranges[i];
  answer.push(dp[end] - dp[start - 1]);
}

console.log(answer.join('\n'));

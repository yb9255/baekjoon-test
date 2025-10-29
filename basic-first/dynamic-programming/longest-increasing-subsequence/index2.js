/** https://www.acmicpc.net/problem/11053 */

/** Pseudo Code (BarkingDog)
 * 1) 입력 파싱: N, 배열 sequence
 * 2) dp[i] = i를 끝으로 하는 LIS 길이 (초기값 1)
 * 3) i를 0..N-1 순회, j를 0..i-1 순회
 *    - sequence[j] < sequence[i]면 dp[i] = max(dp[i], dp[j] + 1)
 *    - 현재 숫자보다 이전 숫자 중에 더 작은 숫자가 있을 경우, 이전 숫자를 끝으로 하는 길이에 + 1을 한게
 *      최대 길이가 될 수 있음.
 * 4) dp의 최댓값 출력
 */

const [[N], sequence] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const dp = new Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (sequence[j] < sequence[i]) {
      if (dp[i] < dp[j] + 1) {
        dp[i] = dp[j] + 1;
      }
    }
  }
}

console.log(dp.reduce((acc, cur) => Math.max(acc, cur), -Infinity));

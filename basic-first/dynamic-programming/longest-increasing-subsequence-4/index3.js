/** https://www.acmicpc.net/problem/14002 */

const [[N], sequence] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. dp 배열: dp[i] = i번째 숫자를 끝으로 하는 LIS 길이
 * 2. prev 배열: 각 dp 상태에서 직전 index 기록 (경로 복원용)
 *
 * 3. 이중 for문으로 dp 갱신 (sequence[j] < sequence[i] && dp[i] < dp[j] + 1)
 * 3-1. 이전 숫자가 현재 숫자보다 작다면, 이전 숫자를 이어서 부분수열을 만들 수 있으므로
 * sequence[j] < sequence[i] 케이스에만 dp 업데이트를 시도
 * 3-2. 이전 숫자로 끝나는 부분수열 길이에 1을 더한게 현재 숫자로 끝나는 부분수열보다 긴 경우에만
 * 현재 숫자로 끝나는 부분수열의 최대 길이이므로 그 케이스에만 dp 업데이트를 시드
 * 3-3. 3-1 / 3-2의 케이스에 부합하면, dp[i]를 업데이트 하고 j를 이전 값의 index로 등록
 *
 * 4. dp에서 가장 큰 값을 찾고 그 값의 인덱스부터 이전 인덱스를 prev 배열로 백트래킹하면서 결과 부분수열 배열에 넣음.
 * 5. 역추적한 결과 부분수열 배열을 reverse로 출력
 */

const dp = new Array(N).fill(1);
const prev = new Array(N).fill(-1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (sequence[j] < sequence[i] && dp[i] < dp[j] + 1) {
      dp[i] = dp[j] + 1;
      prev[i] = j;
    }
  }
}

const lisLastIdx = dp.reduce(
  (acc, _, idx) => (dp[acc] > dp[idx] ? acc : idx),
  0
);

const result = [];

let curLisIdx = lisLastIdx;

while (curLisIdx !== -1) {
  result.push(sequence[curLisIdx]);
  curLisIdx = prev[curLisIdx];
}

result.reverse();

console.log(result.length);
console.log(result.join(' '));

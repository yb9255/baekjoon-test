/** https://www.acmicpc.net/problem/2167 */

const lines = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 처음 prefixSum를 그릴 때 각 좌표까지의 누적합을 prefixSum에 표시한다.
 * prefixSum[y][x]의 누적값은 (1, 1) ~ (y, x)까지의 누적값을 의미하며
 * 현재 값 + 위쪽 누적합 + 왼쪽 누적합 - 왼쪽과 위쪽이 중첩되는 좌측 대각선을 뺀 값이 누적값이 됨
 *
 * 2. (y1, x1) ~ (y2, x2)까지의 누적합을 구하려면
 * (1, 1) ~ (y2, x2)의 누적합에서 (1, 1) ~ (y1 - 1, x1 - 1)의 누적합을 제거하면 됨.
 * 이 때 위쪽 누적합과 왼쪽 누적합을 빼면 중첩되는 좌측 대각선 누적합에 두번 빼지므로 다시 더해주면 됨
 *
 * 3. 결과를 로그
 */

let line = 0;

const [N, M] = lines[line++].split(' ').map(Number);
const prefixSum = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));

for (let y = 1; y <= N; y++) {
  const row = lines[line++].split(' ').map(Number);

  for (let x = 1; x <= M; x++) {
    const curValue = row[x - 1];
    const topSum = prefixSum[y - 1][x];
    const leftSum = prefixSum[y][x - 1];
    const topLeftSum = prefixSum[y - 1][x - 1];

    prefixSum[y][x] = curValue + topSum + leftSum - topLeftSum;
  }
}

const K = +lines[line++];
const result = [];

for (let i = 0; i < K; i++) {
  const [y1, x1, y2, x2] = lines[line++].split(' ').map(Number);

  const curSum = prefixSum[y2][x2];
  const topSum = prefixSum[y1 - 1][x2];
  const leftSum = prefixSum[y2][x1 - 1];
  const leftTopSum = prefixSum[y1 - 1][x1 - 1];

  result.push(curSum - topSum - leftSum + leftTopSum);
}

console.log(result.join('\n'));

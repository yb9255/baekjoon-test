/** https://www.acmicpc.net/problem/10025 */

const [[N, K], ...ices] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. board에 대응하는 좌표에 얼음을 배치
 * 2. board를 순회하면서 각 board[i]를 board[0]부터 board[i]까지 더한 누적값 board로 변환
 * 3. i ~ j까지의 부분합은 board[j] - board[i - 1]이 됨. 해당 값을 구해서 최대값을 찾음
 * 4. 찾은 최대값을 로그
 */

const board = Array(1_000_001).fill(0);

for (let i = 0; i < N; i++) {
  const [weight, location] = ices[i];
  board[location] = weight;
}

for (let i = 0; i < board.length - 1; i++) {
  board[i + 1] = board[i] + board[i + 1];
}

let result = -Infinity;

for (let i = 0; i < board.length; i++) {
  const left = Math.max(0, i - K);
  const right = Math.min(board.length - 1, i + K);
  const sum = left > 0 ? board[right] - board[left - 1] : board[right];

  result = Math.max(result, sum);
}

console.log(result);

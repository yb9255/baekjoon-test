/** https://www.acmicpc.net/problem/7576 */

const [[M, N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/**
 * Pseudo Code
 *
 * 1. 값의 익은 정도를 체크하는 ripeningBoard을 만든 다음 좌표에 0을 기록한다.
 *
 * 2. 토마토 배열 보드(board)를 순회하면서 토마토가 익었으면 board의 좌표를 queue에 넣고,
 * 비어있다면 무시, 익지 않았다면 ripeningBoard에서 해당 좌표값을 -1로 변경한다.
 *
 * 3. 큐를 순회하면서 해당 좌표 상하좌우의 ripeningBoard가 익지 않았다면,
 * 현재 좌표의 ripeningBoard 값 + 1을 기록한다.
 *
 * 4. 큐 순회가 끝난 후 ripeningBoard를 순회하면서 -1이 남아있다면 익을 수 없는 토마토가
 * 있었다는 의미이므로 -1을 리턴하고, -1이 없다면 ripeningBoard의 최대값을 리턴한다.
 *
 * 5. shift를 쓰면 시간초과가 발생해서 front 변수를 사용
 */

const ripeningBoard = Array.from({ length: N }, () => Array(M).fill(0));
const queue = [];
let front = 0;

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === 1) {
      queue.push([y, x]);
    } else if (board[y][x] === 0) {
      ripeningBoard[y][x] = -1;
    }
  }
}

while (front < queue.length) {
  const [y, x] = queue[front++];

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || nx < 0) continue;
    if (ny >= N || nx >= M) continue;
    if (ripeningBoard[ny][nx] !== -1) continue;

    ripeningBoard[ny][nx] = ripeningBoard[y][x] + 1;
    queue.push([ny, nx]);
  }
}

let max = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (ripeningBoard[y][x] === -1) {
      console.log(-1);
      process.exit(0);
    }

    max = Math.max(max, ripeningBoard[y][x]);
  }
}

console.log(max);

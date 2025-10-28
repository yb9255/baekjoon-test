/** https://www.acmicpc.net/problem/1012 */

const [[T], ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** 방문 map을 쓰지 않고 board로만 처리 */

let line = 0;
const result = [];

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let t = 0; t < T; t++) {
  const [M, N, K] = input[line++];
  const board = Array.from({ length: N }, () => Array(M).fill(-1));
  let count = 0;

  for (let k = 0; k < K; k++) {
    const [x, y] = input[line++];
    board[y][x] = 1;
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] === 1) {
        count++;
        board[y][x] = 2;

        const queue = [[y, x]];
        let front = 0;

        while (front < queue.length) {
          const [cy, cx] = queue[front++];

          for (let dir = 0; dir < 4; dir++) {
            const ny = cy + dy[dir];
            const nx = cx + dx[dir];

            if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
            if (board[ny][nx] !== 1) continue;

            board[ny][nx] = 2;
            queue.push([ny, nx]);
          }
        }
      }
    }
  }

  result.push(count);
}

console.log(result.join('\n'));

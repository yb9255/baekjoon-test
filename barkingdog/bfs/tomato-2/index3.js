/** https://www.acmicpc.net/problem/7569 */

const [[M, N, H], ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. board 하나에 숫자로 visited를 처리하도록 구현
 */

const board = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(-1))
);

const dy = [-1, 0, 1, 0, 0, 0];
const dx = [0, 1, 0, -1, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];

let line = 0;

const queue = [];
let front = 0;
let maxDays = 0;
let unripeTomato = 0;

for (let z = 0; z < H; z++) {
  for (let y = 0; y < N; y++) {
    const row = input[line++];
    board[z][y] = row;

    for (let x = 0; x < M; x++) {
      if (board[z][y][x] === 0) {
        unripeTomato++;
      }

      if (board[z][y][x] === 1) {
        queue.push([z, y, x]);
      }
    }
  }
}

while (front < queue.length) {
  const [curZ, curY, curX] = queue[front++];
  maxDays = Math.max(board[curZ][curY][curX] - 1, maxDays);

  for (let dir = 0; dir < 6; dir++) {
    const nz = curZ + dz[dir];
    const ny = curY + dy[dir];
    const nx = curX + dx[dir];

    if (ny < 0 || nx < 0 || nz < 0 || nz >= H || ny >= N || nx >= M) continue;
    if (board[nz][ny][nx] !== 0) continue;

    board[nz][ny][nx] = board[curZ][curY][curX] + 1;
    unripeTomato--;
    queue.push([nz, ny, nx]);
  }
}

console.log(unripeTomato > 0 ? -1 : maxDays);

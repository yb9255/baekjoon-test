/** https://www.acmicpc.net/problem/4179 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** front 사용하는 풀이 추가 */

const [R, C] = input[0].split(' ').map(Number);
const board = input.slice(1).map((line) => line.split(''));

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const jDistance = Array.from({ length: R }, () => Array(C).fill(-1));
const jQueue = [];
let jFront = 0;

const fireDistance = Array.from({ length: R }, () => Array(C).fill(-1));
const fireQueue = [];
let fireFront = 0;

for (let y = 0; y < R; y++) {
  for (let x = 0; x < C; x++) {
    if (board[y][x] === 'F') {
      fireDistance[y][x] = 0;
      fireQueue.push([y, x]);
    }

    if (board[y][x] === 'J') {
      jDistance[y][x] = 0;
      jQueue.push([y, x]);
    }
  }
}

while (fireFront < fireQueue.length) {
  const [cy, cx] = fireQueue[fireFront++];

  for (let dir = 0; dir < 4; dir++) {
    const ny = cy + dy[dir];
    const nx = cx + dx[dir];

    if (ny < 0 || nx < 0 || ny >= R || nx >= C) continue;
    if (board[ny][nx] === '#') continue;
    if (fireDistance[ny][nx] !== -1) continue;

    fireDistance[ny][nx] = fireDistance[cy][cx] + 1;
    fireQueue.push([ny, nx]);
  }
}

while (jFront < jQueue.length) {
  const [cy, cx] = jQueue[jFront++];

  for (let dir = 0; dir < 4; dir++) {
    const ny = cy + dy[dir];
    const nx = cx + dx[dir];

    if (ny < 0 || nx < 0 || ny >= R || nx >= C) {
      console.log(jDistance[cy][cx] + 1);
      process.exit();
    }

    if (jDistance[ny][nx] !== -1) continue;
    if (board[ny][nx] === '#') continue;

    if (
      fireDistance[ny][nx] !== -1 &&
      fireDistance[ny][nx] <= jDistance[cy][cx] + 1
    ) {
      continue;
    }

    jDistance[ny][nx] = jDistance[cy][cx] + 1;
    jQueue.push([ny, nx]);
  }
}

console.log('IMPOSSIBLE');

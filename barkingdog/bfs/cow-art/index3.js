/** https://www.acmicpc.net/problem/10026 */

const [first, ...lines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** board를 바로 visited로 사용하는 풀이 */

const N = +first;
const board = lines.map((line) => line.split(''));
const colorBlindedBoard = Array.from({ length: N }, () => Array(N).fill('R'));

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 'B') {
      colorBlindedBoard[y][x] = 'B';
    }
  }
}

let count = 0;
let colorBlindedCount = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 'v') continue;

    count++;

    const queue = [[y, x]];
    let front = 0;
    const color = board[y][x];
    board[y][x] = 'v';

    while (front < queue.length) {
      const [cy, cx] = queue[front++];

      for (let dir = 0; dir < 4; dir++) {
        const ny = cy + dy[dir];
        const nx = cx + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
        if (board[ny][nx] === 'v') continue;
        if (board[ny][nx] !== color) continue;

        board[ny][nx] = 'v';
        queue.push([ny, nx]);
      }
    }
  }
}

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (colorBlindedBoard[y][x] === 'v') continue;

    colorBlindedCount++;

    const queue = [[y, x]];
    let front = 0;
    const color = colorBlindedBoard[y][x];
    colorBlindedBoard[y][x] = 'v';

    while (front < queue.length) {
      const [cy, cx] = queue[front++];

      for (let dir = 0; dir < 4; dir++) {
        const ny = cy + dy[dir];
        const nx = cx + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
        if (colorBlindedBoard[ny][nx] === 'v') continue;
        if (colorBlindedBoard[ny][nx] !== color) continue;

        colorBlindedBoard[ny][nx] = 'v';
        queue.push([ny, nx]);
      }
    }
  }
}

console.log(`${count} ${colorBlindedCount}`);

/** https://www.acmicpc.net/problem/2583 */

const [[N, M, K], ...coords] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** visited 배열 생성하지 않는 버전 */

const board = Array.from({ length: N }, () => Array(M).fill(-1));
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let k = 0; k < K; k++) {
  const [x1, y1, x2, y2] = coords[k];

  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      board[y][x] = 1;
    }
  }
}

let count = 0;
const areas = [];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === 1) {
      continue;
    }

    count++;

    let curArea = 1;
    const queue = [[y, x]];
    let front = 0;
    board[y][x] = 1;

    while (front < queue.length) {
      const [cy, cx] = queue[front++];

      for (let dir = 0; dir < 4; dir++) {
        const ny = cy + dy[dir];
        const nx = cx + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
        if (board[ny][nx] === 1) continue;

        curArea++;
        board[ny][nx] = 1;
        queue.push([ny, nx]);
      }
    }

    areas.push(curArea);
  }
}

console.log(count);
console.log(areas.sort((a, b) => a - b).join(' '));

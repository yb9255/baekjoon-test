/** https://www.acmicpc.net/problem/1926 */

const [[N, M], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** shift를 사용하지 않는 버전 */

let count = 0;
let maxArea = 0;

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const mark = 2;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] !== 1) continue;

    count++;

    const queue = [[y, x]];
    let front = 0;
    let area = 1;

    board[y][x] = mark;

    while (front < queue.length) {
      const [cy, cx] = queue[front++];

      for (let dir = 0; dir < 4; dir++) {
        const ny = cy + dy[dir];
        const nx = cx + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
        if (board[ny][nx] !== 1) continue;
        board[ny][nx] = mark;
        area++;
        queue.push([ny, nx]);
      }
    }

    maxArea = Math.max(area, maxArea);
  }
}

console.log(count);
console.log(maxArea);

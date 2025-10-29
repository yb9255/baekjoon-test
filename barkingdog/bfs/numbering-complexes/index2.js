/** https://www.acmicpc.net/problem/2667 */

let [N, ...lines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** visited 배열을 사용하지 않는 버전 추가 */

N = +N;
const board = lines.map((line) => line.split('').map(Number));

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const result = [];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] !== 1) continue;

    let area = 1;

    const queue = [[y, x]];
    let front = 0;
    board[y][x] = 2;

    while (front < queue.length) {
      const [cy, cx] = queue[front++];

      for (let dir = 0; dir < 4; dir++) {
        const ny = cy + dy[dir];
        const nx = cx + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
        if (board[ny][nx] !== 1) continue;

        area++;
        board[ny][nx] = 2;
        queue.push([ny, nx]);
      }
    }

    result.push(area);
  }
}

console.log(result.length);
console.log(result.sort((a, b) => a - b).join('\n'));

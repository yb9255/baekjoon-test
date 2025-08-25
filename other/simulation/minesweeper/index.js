/** https://www.acmicpc.net/problem/1996 */

const lines = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const N = +lines[0];
const board = lines.slice(1).map((line) => line.split(''));

const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
const dx = [0, 1, 1, 1, 0, -1, -1, -1];

const answer = Array.from({ length: N }, () => Array(N).fill(0));

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] !== '.') {
      for (let dir = 0; dir < 8; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
        if (answer[ny][nx] === 'M') continue;

        if (board[ny][nx] === '.') {
          const next = answer[ny][nx] + +board[y][x];
          answer[ny][nx] = next >= 10 ? 'M' : next;
        }
      }
    }
  }
}

console.log(
  answer
    .map((line, y) =>
      line
        .map((char, x) => {
          if (board[y][x] !== '.') return '*';
          else return char.toString();
        })
        .join('')
    )
    .join('\n')
);

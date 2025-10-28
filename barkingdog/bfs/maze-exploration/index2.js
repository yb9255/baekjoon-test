/** https://www.acmicpc.net/problem/2178 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** visited 배열을 만드는 대신 mark 추가 */

const [N, M] = input.shift().split(' ');
const board = input.map((str) => str.split('').map(Number));
const mark = 2;

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const queue = [[0, 0, 1]];
board[0][0] = mark;
let front = 0;

while (front < queue.length) {
  const [y, x, move] = queue[front++];

  if (y === N - 1 && x === M - 1) {
    console.log(move);
    break;
  }

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
    if (board[ny][nx] !== 1) continue;
    board[ny][nx] = mark;

    queue.push([ny, nx, move + 1]);
  }
}

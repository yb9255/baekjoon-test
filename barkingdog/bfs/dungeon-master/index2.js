/** https://www.acmicpc.net/problem/6593 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

/** distance 배열을 제거하고 board에 직접 기록한 풀이 */

let line = 0;
const dz = [0, 0, 0, 0, -1, 1];
const dy = [-1, 1, 0, 0, 0, 0];
const dx = [0, 0, -1, 1, 0, 0];

const result = [];

while (true) {
  const [L, R, C] = input[line++].split(' ').map(Number);
  if (L === 0 && R === 0 && C === 0) break;

  const board = [];
  const queue = [];
  let front = 0;

  for (let z = 0; z < L; z++) {
    const floor = [];

    for (let y = 0; y < R; y++) {
      floor.push(input[line++].split(''));

      for (let x = 0; x < C; x++) {
        if (floor[y][x] === 'S') {
          queue.push([z, y, x, false]);
          floor[y][x] = 0;
        }
      }
    }

    board.push(floor);
  }

  let escaped = false;

  while (front < queue.length) {
    const [cz, cy, cx, isEnd] = queue[front++];

    if (isEnd) {
      result.push(`Escaped in ${board[cz][cy][cx]} minute(s).`);
      escaped = true;
      break;
    }

    for (let dir = 0; dir < 6; dir++) {
      const nz = cz + dz[dir];
      const ny = cy + dy[dir];
      const nx = cx + dx[dir];

      if (nz < 0 || ny < 0 || nx < 0 || nz >= L || ny >= R || nx >= C) continue;
      if (board[nz][ny][nx] !== '.' && board[nz][ny][nx] !== 'E') continue;

      const sign = board[nz][ny][nx];
      board[nz][ny][nx] = board[cz][cy][cx] + 1;
      queue.push([nz, ny, nx, sign === 'E']);
    }
  }

  if (!escaped) {
    result.push('Trapped!');
  }
}

console.log(result.join('\n'));

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

/** Pseudo Code
 * 1. 각 층을 기록한 3차원 배열 board와 시작점부터 특정 좌표까지 이동 거리를 나타내는 3차원 배열 distance 구현
 * 방문하지 않은 지점을 -1로 표시
 * 2. 시작 지점을 찾아서 distance를 0으로 바꾸고 queue에 시작 지점의 좌표를 넣음
 * 3. 3차월 배열을 queue를 활용해 bfs로 순회하면서 nz, ny, nx에 거리를 1 늘려줌.
 * 4. 이동 중 목표 좌표에 도착하면 result에 distance 거리를 담은 문자열로 바꾸고 answer에 push
 * 5. bfs가 끝날때까지 목표 좌표에 도착하지 못했다면 Trapped!를 정답 배열에 push
 */

let line = 0;
const answer = [];

const dz = [0, 0, 0, 0, -1, 1];
const dy = [-1, 1, 0, 0, 0, 0];
const dx = [0, 0, -1, 1, 0, 0];

while (true) {
  const [L, R, C] = input[line++].split(' ').map(Number);
  if (L === 0 && R === 0 && C === 0) break;

  const board = [];

  for (let z = 0; z < L; z++) {
    const row = [];

    for (let y = 0; y < R; y++) {
      row.push(input[line++]);
    }

    board.push(row);
  }

  const distance = Array.from({ length: L }, () =>
    Array.from({ length: R }, () => Array(C).fill(-1)),
  );

  const queue = [];
  let front = 0;
  let result = 'Trapped!';

  for (let z = 0; z < L; z++) {
    for (let y = 0; y < R; y++) {
      for (let x = 0; x < C; x++) {
        if (board[z][y][x] === 'S') {
          distance[z][y][x] = 0;
          queue.push([z, y, x]);
          break;
        }
      }
    }
  }

  while (front < queue.length) {
    const [z, y, x] = queue[front++];

    if (board[z][y][x] === 'E') {
      result = `Escaped in ${distance[z][y][x]} minute(s).`;
      break;
    }

    for (let dir = 0; dir < 6; dir++) {
      const nz = z + dz[dir];
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (nz < 0 || ny < 0 || nx < 0 || nz >= L || ny >= R || nx >= C) continue;
      if (board[nz][ny][nx] === '#') continue;
      if (distance[nz][ny][nx] !== -1) continue;

      distance[nz][ny][nx] = distance[z][y][x] + 1;
      queue.push([nz, ny, nx]);
    }
  }

  answer.push(result);
}

console.log(answer.join('\n'));

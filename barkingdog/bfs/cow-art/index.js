/** https://www.acmicpc.net/problem/10026 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const N = +input.shift();

/**
 * Pseudo Code
 * 1. 적록색약용 map과 일반 map을 만든다.
 * 2. 적록색약 visited와 일반 visited 이차원 배열을 만든다.
 * 3. 적록색약 queue와 일반 queue를 만들고  각각 모든 좌표를 순회하며 bfs를 실행한다.
 *
 * 4. 적록색약 bfs에서는 맨 처음에 우선 count를 올리고, R,G는 상하좌우에 R,G를 만나면 queue에 값을 넣고 visited를 기록,
 * B는 같은 상하좌우에 같은 B를 만나면 queue에 값을 후 bfs를 반복한다.
 * visited가 기록된 좌표는 계속 진행하지 않는다.
 *
 * 5. 일반 bfs는 맨 처음에 우선 count를 올리고 서로 값이 같은 경우에만 bfs를 진행한다. visited가 기록된 좌표에서는 계속 진행하지 않는다.
 * 6. 최종적으로 적록색약 count와 일반 count를 리턴한다.
 */

const defaultVisited = Array.from({ length: N }, () => Array(N).fill(false));

const colorBlindedVisited = Array.from({ length: N }, () =>
  Array(N).fill(false)
);

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

let defaultCount = 0;
let colorBlindedCount = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (defaultVisited[y][x]) continue;

    const queue = [[y, x]];
    defaultCount++;

    while (queue.length) {
      const [y, x] = queue.shift();

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;
        if (defaultVisited[ny][nx]) continue;
        if (input[ny][nx] !== input[y][x]) continue;

        defaultVisited[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }
  }
}

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (colorBlindedVisited[y][x]) continue;

    const queue = [[y, x]];
    colorBlindedCount++;

    while (queue.length) {
      const [y, x] = queue.shift();

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;
        if (colorBlindedVisited[ny][nx]) continue;

        if (input[y][x] === 'R') {
          if (input[ny][nx] === 'B') continue;
        } else if (input[y][x] === 'G') {
          if (input[ny][nx] === 'B') continue;
        } else {
          if (input[ny][nx] !== 'B') continue;
        }

        colorBlindedVisited[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }
  }
}

console.log(`${defaultCount} ${colorBlindedCount}`);

const [[N, M], ...coords] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code (barkingdog)
 * 기존 풀이에 switchMap과 visited을 분리
 */

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const lightMap = Array.from({ length: N }, () => Array(N).fill(false));
const visited = Array.from({ length: N }, () => Array(N).fill(false));

const switchMap = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [])
);

for (let i = 0; i < M; i++) {
  const [curY, curX, switchY, switchX] = coords[i];
  switchMap[curY - 1][curX - 1].push([switchY - 1, switchX - 1]);
}

const queue = [[0, 0]];
visited[0][0] = true;
lightMap[0][0] = true;

let front = 0;

const checkIsOutOfBoundary = (y, x) => y < 0 || y >= N || x < 0 || x >= N;

const checkIsConnected = (y, x) => {
  let isConnected = false;

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (checkIsOutOfBoundary(ny, nx)) continue;
    if (!visited[ny][nx]) continue;

    isConnected = true;
  }

  return isConnected;
};

while (front < queue.length) {
  const [y, x] = queue[front++];

  for (let i = 0; i < switchMap[y][x].length; i++) {
    const [switchY, switchX] = switchMap[y][x][i];
    if (visited[switchY][switchX]) continue;

    lightMap[switchY][switchX] = true;

    if (checkIsConnected(switchY, switchX)) {
      visited[switchY][switchX] = true;
      queue.push([switchY, switchX]);
    }
  }

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (checkIsOutOfBoundary(ny, nx)) continue;
    if (!lightMap[ny][nx]) continue;
    if (visited[ny][nx]) continue;

    visited[ny][nx] = true;
    queue.push([ny, nx]);
  }
}

let answer = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (lightMap[y][x]) answer++;
  }
}

console.log(answer);

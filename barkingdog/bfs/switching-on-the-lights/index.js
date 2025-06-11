const [[N, M], ...coords] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. switchMap에 각 좌표별로 불을 킬 수 있는 좌표값을 저장
 * 2. lightMap에 좌표별로 불이 켜짐 여부와 방문 여부를 저장
 * 3. 0,0부터 bfs 순회 시작
 *
 * 4. switchMap[y][x]를 루프로 돌면서 불을 킬 수 있는 방에 불을 킨 뒤
 * 불을 킨 곳이 인접한 좌표에 방문기록이 있다면 지금 즉시 방문할 수 있는 곳이므로,
 * switchY와 switchX를 queue에 넣는다.
 *
 * 5. 4 이후에 상하좌우에서 불이 켜진 곳을 방문하고 방문 기록을 체크한다.
 * 6. lightMap에서 불이 켜진 곳을 카운트를 세서 리턴한다.
 */

const switchMap = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [])
);

const lightMap = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [false, false])
);

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const queue = [];
let front = 0;

for (let i = 0; i < M; i++) {
  const [curY, curX, ny, nx] = coords[i];
  switchMap[curY - 1][curX - 1].push([ny - 1, nx - 1]);
}

queue.push([0, 0]);
lightMap[0][0] = [true, true];

while (front < queue.length) {
  const [y, x] = queue[front++];

  for (const [switchY, switchX] of switchMap[y][x]) {
    if (!lightMap[switchY][switchX][0]) {
      lightMap[switchY][switchX][0] = true;

      for (let dir = 0; dir < 4; dir++) {
        const ny = switchY + dy[dir];
        const nx = switchX + dx[dir];
        if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;
        if (lightMap[ny][nx][1]) {
          lightMap[switchY][switchX][1] = true;
          queue.push([switchY, switchX]);
          break;
        }
      }
    }
  }

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];
    if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;
    if (!lightMap[ny][nx][0]) continue;
    if (lightMap[ny][nx][1]) continue;

    lightMap[ny][nx][1] = true;
    queue.push([ny, nx]);
  }
}

let result = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (lightMap[y][x][0]) result++;
  }
}

console.log(result);

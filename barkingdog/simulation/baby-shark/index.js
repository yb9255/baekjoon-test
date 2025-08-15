/** https://www.acmicpc.net/problem/16236 */

const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input6.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 현재 상어 크기, 물고기 먹은 횟수, 이동 시간, 상어 좌표를 변수로 기록한다.
 *
 * 2. 상어 위치 좌표를 기점으로 bfs를 시작하면서 가장 가까이 있는 먹을 수 있는 물고기를 찾는다.
 * 이 때 최소 거리 변수를 Infinity로 초기화하고 시작하며, 방문을 기록하는 배열도 만든다.
 * 2-1. 이미 방문했거나, 좌표를 벗어났거나 좌표 물고기가 현재 상어 사이즈보다 큰 경우 건너뛴다
 * 2-2. 2-1에 해당하지 않으면 방문 거리를 기록하고 queue에 좌표를 넣는다.
 * 2-3. 2-2 좌표 중 다음 조건에 해당하면 minDistance(목적지 거리)와 목적지 좌표를 갱신한다.
 * 2-3-1. 좌표에 현재 상어 크기보다 작은 물고기가 있다. (같으면 지나친다.)
 * 2-3-2. 좌표까지의 거리가 현재 minDistance보다 작다.
 * 2-3-3. 좌표까지의 거리가 현재 minDistance보다 같지만, y축이 더 가까운 경우
 * 2-3-4. 좌표까지의 거리가 현재 minDistance와 같고 y축도 같지만, x축이 더 가까운 경우
 *
 * 3. 2에서 구한 목적지 거리만큼 이동 시간에 더하고, 2에서 구한 목적지 좌표로 현재 상어 좌표를 갱신한다.
 * 4. 물고기 먹은 횟수를 1 늘리고, 만약 횟수가 현재 상어 크기와 같다면 상어크기를 1 늘린다.
 * 5. 3~4를 목적지 좌표가 Infinity일떄까지 반복한다.
 *
 * 6. 총 걸린 이동시간을 로그한다.
 */

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

let sharkSize = 2;
let time = 0;
let eatenCount = 0;

let sharkY = 0;
let sharkX = 0;

findShark: for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 9) {
      sharkY = y;
      sharkX = x;
      board[y][x] = 0;
      break findShark;
    }
  }
}

const eatFish = (startY, startX) => {
  const distance = Array.from({ length: N }, () => Array(N).fill(-1));
  const queue = [[startY, startX]];
  let front = 0;

  distance[startY][startX] = 0;

  let minDistance = Infinity;
  let targetY = -1;
  let targetX = -1;

  while (front < queue.length) {
    const [y, x] = queue[front++];
    if (distance[y][x] > minDistance) break;

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
      if (distance[ny][nx] !== -1) continue;
      if (board[ny][nx] > sharkSize) continue;

      distance[ny][nx] = distance[y][x] + 1;
      queue.push([ny, nx]);

      if (board[ny][nx] === 0) continue;
      if (board[ny][nx] === sharkSize) continue;
      if (distance[ny][nx] > minDistance) continue;

      if (distance[ny][nx] === minDistance) {
        if (ny > targetY) continue;
        if (ny === targetY && nx >= targetX) continue;
      }

      minDistance = distance[ny][nx];
      targetY = ny;
      targetX = nx;
    }
  }

  return [minDistance, targetY, targetX];
};

while (true) {
  const [distance, targetY, targetX] = eatFish(sharkY, sharkX);
  if (distance === Infinity) break;

  board[targetY][targetX] = 0;

  time += distance;
  eatenCount++;
  sharkY = targetY;
  sharkX = targetX;

  if (eatenCount === sharkSize) {
    eatenCount = 0;
    sharkSize++;
  }
}

console.log(time);

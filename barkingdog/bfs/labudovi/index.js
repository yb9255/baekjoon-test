const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1).map((str) => str.split(''));

/** Pseudo Code
 * 1. 백조의 위치를 미리 찾는다.
 * 2. 물이 있는 좌표를 waterQueue에 담는다.
 * 3. 백조의 위치를 담은 swanQueue를 생성하고, 백조 하나의 위치를 넣는다.
 * 4. 백조끼리 연결될 수 있을 때까지 반복하는 while문 (A)를 시작한다.
 *
 * 5. A 내에서 swanQueue BFS를 시작하며 도달 가능한 곳까지 탐색한다. 방문한 곳은 visited로 기록한다.
 * 5-1. 탐색 가능한 영역은 swanQueue에 넣으면서 탐색을 계속 확장한다.
 * 5-2. 탐색 과정에 백조를 만났다면 탐색을 중단하고 걸린 시간을 리턴한다.
 * 5-3. 탐색 과정에 얼음을 만나면 nextSwanQueue에 담아서 탐색을 확장하지 않고 다음 A의 순회때 탐색할 곳임을 표시한다.
 *
 * 6. 백조가 서로 만나지 못하면 waterQueue를 사용해서 물을 넓히는 작업을 수행한다.
 * 6-1. waterQueue에서 값을 꺼내 bfs를 탐색한다. 얼음을 만나면 board에 물로 표시하고
 * nextWaterQueue에 담는다.
 *
 * 7. swanQueue bfs와 waterQueue bfs가 끝날때까지 백조가 만나지 않았다면,
 * swanQueue를 nextSwanQueue로, waterQueue를 nextWaterQueue로 업데이트 하고 걸린 날짜를 1 올린다.
 *
 * 8. 5-2가 될때까지 작업을 반복한다.
 */

const checkIsOutOfBoundary = (y, x) => y < 0 || x < 0 || y >= N || x >= M;
const swanStart = [];

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

let swanQueue = [];
let swanFront = 0;

let waterQueue = [];
let waterFront = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === 'L') {
      swanStart.push([y, x]);
    }

    if (board[y][x] === '.' || board[y][x] === 'L') {
      waterQueue.push([y, x]);
    }
  }
}

const visited = Array.from({ length: N }, () => Array(M).fill(false));
swanQueue.push(swanStart[0]);
visited[swanStart[0][0]][swanStart[0][1]] = true;

let day = 0;

while (true) {
  let isFound = false;
  const nextSwanQueue = [];

  while (swanFront < swanQueue.length) {
    const [y, x] = swanQueue[swanFront++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (checkIsOutOfBoundary(ny, nx)) continue;
      if (visited[ny][nx]) continue;

      visited[ny][nx] = true;

      if (board[ny][nx] === '.') {
        swanQueue.push([ny, nx]);
      } else if (board[ny][nx] === 'X') {
        nextSwanQueue.push([ny, nx]);
      } else if (board[ny][nx] === 'L') {
        isFound = true;
        break;
      }
    }

    if (isFound) break;
  }

  if (isFound) {
    console.log(day);
    break;
  }

  const nextWaterQueue = [];

  while (waterFront < waterQueue.length) {
    const [y, x] = waterQueue[waterFront++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (checkIsOutOfBoundary(ny, nx)) continue;

      if (board[ny][nx] === 'X') {
        board[ny][nx] = '.';
        nextWaterQueue.push([ny, nx]);
      }
    }
  }

  swanQueue = nextSwanQueue;
  swanFront = 0;
  waterQueue = nextWaterQueue;
  waterFront = 0;
  day++;
}

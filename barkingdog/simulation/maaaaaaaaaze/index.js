const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input5.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code
 * 1. maze의 floor를 회전시키는 rotateFloor 함수를 생성한다.
 * 2. floor를 rotate한 다음 다음 index로 넘어가는 함수 findShortestDistance 함수를 만든다.
 *
 * 3. findShortestDistance 함수의 index가 5가 되면, 현재 돌린 floor 조합으로 동서남북상하로 탐색하면서
 * 이동거리를 탐색하는 findPath 함수를 실행한다. 이 때, 출구가 0이면 해당 실행은 건너뛴다.
 * 3-1. 예시를 보았을 때 최단거리는 12이므로, 최단거리가 12일때도 실행을 건너뛴다.
 * 3-2. 이때, 매번 visited 배열을 새로 만드는 것은 메모리를 많이 잡아먹으므로, 방문 기록을 true/false가
 * 아닌 현재 bfs 함수가 실행된 횟수 index로 변경해서 하나의 배열만 쓰는 timestamp 기법을 적용한다.
 *
 * 4. findPath 함수를 실행 후 결과값을 shortestDistance와 비교하여, 더 작은 값으로 리셋한다.
 * 5. 1~4의 과정을 층을 조합할 수 있는 모든 순열마다 실행한다.
 */

const maze = [];
let curMaze;

for (let i = 0; i < input.length; i += 5) {
  const floor = [
    input[i],
    input[i + 1],
    input[i + 2],
    input[i + 3],
    input[i + 4],
  ];

  maze.push(floor);
}

const floorPermutations = [];
const visited = Array(5).fill(false);

const getFloorPermutations = (stack) => {
  if (stack.length === 5) {
    floorPermutations.push(stack);
    return;
  }

  for (let i = 0; i < 5; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    getFloorPermutations([...stack, i]);
    visited[i] = false;
  }
};

getFloorPermutations([]);

const rotateFloor = (idx) => {
  const newFloor = Array.from({ length: 5 }, () => Array(5).fill(0));

  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      newFloor[x][5 - 1 - y] = curMaze[idx][y][x];
    }
  }

  curMaze[idx] = newFloor;
};

const resetRotateFloor = (idx) => {
  const newFloor = Array.from({ length: 5 }, () => Array(5).fill(0));

  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
      newFloor[5 - 1 - x][y] = curMaze[idx][y][x];
    }
  }

  curMaze[idx] = newFloor;
};

const dy = [-1, 1, 0, 0, 0, 0];
const dx = [0, 0, -1, 1, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];

let shortestDistance = Infinity;

const mazeVisited = Array.from({ length: 5 }, () =>
  Array.from({ length: 5 }, () => Array(5).fill(0))
);

let mazeVisitedMask = 1;

const findPath = () => {
  mazeVisitedMask++;

  const queue = [[0, 0, 0, 0]];
  let front = 0;

  mazeVisited[0][0][0] = mazeVisitedMask;

  while (front < queue.length) {
    const [y, x, z, distance] = queue[front++];

    if (y === 4 && x === 4 && z === 4) {
      shortestDistance = Math.min(shortestDistance, distance);
      break;
    }

    for (let dir = 0; dir < 6; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];
      const nz = z + dz[dir];

      if (ny < 0 || nx < 0 || nz < 0 || ny >= 5 || nx >= 5 || nz >= 5) continue;
      if (mazeVisited[nz][ny][nx] === mazeVisitedMask) continue;
      if (curMaze[nz][ny][nx] === 0) continue;

      mazeVisited[nz][ny][nx] = mazeVisitedMask;
      queue.push([ny, nx, nz, distance + 1]);
    }
  }
};

const findShortestDistance = (idx) => {
  if (shortestDistance === 12) return;

  if (idx === 5) {
    if (curMaze[0][0][0] === 0 || curMaze[4][4][4] === 0) return;
    findPath();
    return;
  }

  for (let dir = 0; dir < 4; dir++) {
    for (let i = 0; i < dir; i++) rotateFloor(idx);
    findShortestDistance(idx + 1);
    for (let i = 0; i < dir; i++) resetRotateFloor(idx);
  }
};

for (let i = 0; i < 120; i++) {
  curMaze = floorPermutations[i].map((idx) => maze[idx]);
  findShortestDistance(0);
}

console.log(shortestDistance === Infinity ? -1 : shortestDistance);

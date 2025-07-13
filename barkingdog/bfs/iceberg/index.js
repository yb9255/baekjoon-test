const [[N, M], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. board를 2차원 배열로 파싱
 * 2. 매일 반복:
 *  1. 빙산 덩어리 개수를 BFS/DFS로 구함
 *    - 빙산이 있는 영역 전체를 카운트(totalIcebergCoordsCount)하고 빙산 영역 시작 지점을 찾음.
 *    - 이 후 특정 빙산 영역 지점을 시작으로 잡고 bfs로 순회하면서 상하좌우가 빙산 영역
 *      인지 체크하고 그렇다면 빙산 영역을 카운트하는 변수를 구함 (connectedIcebergCoordsCount)
 *    - 만약 빙산이 한덩어리라면 totalIcebergCoordsCount === connectedIcebergCoordsCount일 것임.
 *    - 만약 빙산이 두 덩어리 이상이라면, 상하좌우만 탐색해서는 빙산 영역 전체에 도달하지 못하므로
 *      totalIcebergCoordsCount !== connectedIcebergCoordsCount가 됨
 *    - 이를 기반으로 빙산 덩어리 개수가 1개 이상이면 지금까지 증가된 year를 리턴함.
 *  2. 덩어리가 1개면 하루 지나도록 모든 빙산 녹임
 *    - 인접한 바닷물(0)에 따라 높이 감소
 * 3. 계속 반복하며 year 증가
 */

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const visited = Array.from({ length: N }, () => Array(M).fill(0));
let visitedStamp = 0;

const isOOB = (y, x) => y < 0 || x < 0 || y >= N || x >= M;

const melt = () => {
  const meltMap = Array.from({ length: N }, () => Array(M).fill(0));

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] > 0) {
        for (let dir = 0; dir < 4; dir++) {
          const ny = y + dy[dir];
          const nx = x + dx[dir];

          if (isOOB(ny, nx)) continue;

          if (board[ny][nx] === 0) {
            meltMap[y][x]++;
          }
        }
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] > 0) {
        board[y][x] = Math.max(0, board[y][x] - meltMap[y][x]);
      }
    }
  }
};

const checkIcebergSplit = () => {
  let totalIcebergCoordsCount = 0;
  let connectedIcebergCoordsCount = 0;

  let startY = -1;
  let startX = -1;

  visitedStamp++;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] > 0) {
        startY = y;
        startX = x;
        totalIcebergCoordsCount++;
      }
    }
  }

  if (totalIcebergCoordsCount === 0) {
    console.log(0);
    process.exit();
  }

  const queue = [[startY, startX]];
  let front = 0;

  visited[startY][startX] = visitedStamp;
  connectedIcebergCoordsCount++;

  while (front < queue.length) {
    const [y, x] = queue[front++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (isOOB(ny, nx)) continue;
      if (visited[ny][nx] === visitedStamp) continue;
      if (board[ny][nx] === 0) continue;

      connectedIcebergCoordsCount++;
      visited[ny][nx] = visitedStamp;
      queue.push([ny, nx]);
    }
  }

  return totalIcebergCoordsCount !== connectedIcebergCoordsCount;
};

let year = 0;

while (true) {
  year++;
  melt();

  if (checkIcebergSplit()) {
    console.log(year);
    break;
  }
}

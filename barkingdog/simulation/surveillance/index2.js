const [[N, M], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 기존 풀이와 거의 비슷하나, 보드를 매번 새로 만들지 않고 하나의 보드를 사용한다는 차이가 있음
 * 2. cctv 전체를 순회하는 재귀함수를 돌림
 * 3. 처음에는 상하좌우 로테이션을 변경하는 for문 루프 (rotation)을 돈다.
 * 4. rotation을 현재 cctv의 direction에 더하고 4로 나눠서 cctv가 볼 수 있는 현재 방향 개수를 구하고,
 * 숫자 1을 빼서 이곳이 감시가 가능한 곳임을 체크한다.
 * 5. 이 후 idx를 1 늘려서 재귀를 돌려 cctv 전체의 감시영역을 체크할때까지 반복한다.
 * 6. 재귀가 한번 끝나면, 숫자를 빼서 감시중이라고 체크한 곳에 다시 숫자를 더해 감시 체크를 해제하고 다른
 * rotation시 재귀를 볼 수 있도록 전환한다.
 */

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

let minBlindSpots = Infinity;
const cctvList = [];

const directionCases = Array.from({ length: 6 }, () => []);

directionCases[1] = [0];
directionCases[2] = [0, 2];
directionCases[3] = [0, 1];
directionCases[4] = [0, 1, 2];
directionCases[5] = [0, 1, 2, 3];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] > 0 && board[y][x] < 6) {
      cctvList.push([y, x]);
    }
  }
}

const isOutOfBoundary = (y, x) => y < 0 || y >= N || x < 0 || x >= M;

const watch = (y, x, dir) => {
  let ny = y + dy[dir];
  let nx = x + dx[dir];

  while (!isOutOfBoundary(ny, nx)) {
    if (board[ny][nx] === 6) break;
    if (board[ny][nx] <= 0) {
      board[ny][nx]--;
    }

    ny += dy[dir];
    nx += dx[dir];
  }
};

const unwatch = (y, x, dir) => {
  let ny = y + dy[dir];
  let nx = x + dx[dir];

  while (!isOutOfBoundary(ny, nx)) {
    if (board[ny][nx] === 6) break;
    if (board[ny][nx] <= 0) {
      board[ny][nx]++;
    }

    ny += dy[dir];
    nx += dx[dir];
  }
};

const checkBlindSpot = (idx) => {
  if (idx === cctvList.length) {
    let curBlindSpots = 0;

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (board[y][x] === 0) {
          curBlindSpots++;
        }
      }
    }

    minBlindSpots = Math.min(minBlindSpots, curBlindSpots);
    return;
  }

  const [y, x] = cctvList[idx];
  const cctvType = board[y][x];
  const directions = directionCases[cctvType];

  for (let rotation = 0; rotation < 4; rotation++) {
    for (let dir = 0; dir < directions.length; dir++) {
      const baseDirection = directions[dir];
      const curDirection = (baseDirection + rotation) % 4;

      watch(y, x, curDirection);
    }

    checkBlindSpot(idx + 1);

    for (let dir = 0; dir < directions.length; dir++) {
      const baseDirection = directions[dir];
      const curDirection = (baseDirection + rotation) % 4;

      unwatch(y, x, curDirection);
    }
  }
};

checkBlindSpot(0);
console.log(minBlindSpots);

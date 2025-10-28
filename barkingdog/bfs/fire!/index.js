/** https://www.acmicpc.net/problem/4179 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [R, C] = input.shift().split(' ').map(Number);
const board = input.map((str) => str.trim());

/**
 * Pseudo Code
 * 1. -1로 시작하는 불의 이동거리를 기록하는 fireDistance와 지훈의 이동거리를 기록하는 jDistance 2차원 배열을 두개 만든다.
 * 2. 불의 이동을 기록하는 fireQueue와 지훈의 이동을 기록하는 jQueue 두개를 생성한다.
 *
 * 3. fireQueue를 BFS로 돌리면서 불이 전파되는데 걸리는 시간을 기록한다.
 * 시작지점에서 0초 -> 1초 -> 2초 이런 형태로 증가되도록 기록해야 하므로, fireDistance[y][x]는 fireDistance[이전 y][이전 x] + 1이 된다.
 *
 * 4. jQueue를 BFS로 돌리면서 지훈이 이동하는데 걸린 시간을 기록한다.
 * 시작지점에서 0초 -> 1초 -> 2초 이런 형태로 증가되도록 기록해야 하므로, jDistance[y][x]는 jDistance[이전 y][이전 x] + 1이 된다.
 *
 * 5. 3과 4의 다른점은 4에서는 fireDistance보다 지훈이 해당 좌표에 느리게 도착하면 갈 수 없는 영역이므로 기록을 건너뛰어야 한다는 점이다.
 * 즉, fireDistance[다음 y][다음 x]가 -1 이상이여서 불이 이미 붙었다고 표시될 때, fireDistance[다음 y][다음 x]가 jDistance[y][x] + 1
 * 보다 작거나 같을 경우 갈 수 없는 영역이라고 표시하는 것이다.
 *
 * 6. jQueue BFS 과정에서 좌표를 이탈하면 탈출에 성공한 것이므로 현재까지 이동한 거리에 숫자 1을 더해서 값을 리턴하고 코드를 종료한다.
 *
 * 7. 5 과정에서 불에게 둘러쌓여서 좌표를 이탈하지 못하고 BFS가 종료되면 좌표를 이탈하지 못했다는 의미이므로 IMPOSSIBLE을 리턴한다.
 */

const fireDistance = Array.from({ length: R }, () => Array(C).fill(-1));
const jDistance = Array.from({ length: R }, () => Array(C).fill(-1));

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const fireQueue = [];
const jQueue = [];

for (let y = 0; y < R; y++) {
  for (let x = 0; x < C; x++) {
    if (board[y][x] === 'F') {
      fireQueue.push([y, x]);
      fireDistance[y][x] = 0;
    }

    if (board[y][x] === 'J') {
      jQueue.push([y, x]);
      jDistance[y][x] = 0;
    }
  }
}

while (fireQueue.length) {
  const [y, x] = fireQueue.shift();

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || nx < 0) continue;
    if (ny >= R || nx >= C) continue;
    if (fireDistance[ny][nx] >= 0) continue;
    if (board[ny][nx] === '#') continue;

    fireDistance[ny][nx] = fireDistance[y][x] + 1;
    fireQueue.push([ny, nx]);
  }
}

while (jQueue.length) {
  const [y, x] = jQueue.shift();

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || nx < 0 || ny >= R || nx >= C) {
      console.log(jDistance[y][x] + 1);
      process.exit();
    }

    if (jDistance[ny][nx] >= 0) continue;
    if (board[ny][nx] === '#') continue;

    if (
      fireDistance[ny][nx] !== -1 &&
      fireDistance[ny][nx] <= jDistance[y][x] + 1
    ) {
      continue;
    }

    jDistance[ny][nx] = jDistance[y][x] + 1;
    jQueue.push([ny, nx]);
  }
}

console.log('IMPOSSIBLE');

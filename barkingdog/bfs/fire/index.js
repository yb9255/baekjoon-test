const [N, ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 각 죄표를 순회하면서 불이 있는 곳을 기록하는 보드를 생성
 * 2. 각 좌표를 생성하면서 상근이 있는 곳을 기록하는 보드를 생성
 *
 * 3. 불이 있는 개수만큼 보드를 순회하며 불이 도달하는데 걸리는 최소 시간을
 * 기록하는 보드를 만들고 순회를 돈다.
 *
 * 4. 상근의 이동거리를 계산하며, 이동하는 좌표가 불보다 상근이 먼저 도착할 수 있으면 이동,
 * 그렇지 않으면 이동하지 않는 bfs 순회를 돈다. 좌표를 벗어나면 이동 거리를 정답 배열에 push
 * 하고 순회를 종료한다.
 *
 * 5. 상근의 bfs가 끝났음에도 탈출하지 못했다면, IMPOSSIBLE을 push하고 순회를 종료한다.
 */

let line = 0;

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const answer = [];

for (let i = 0; i < N; i++) {
  const [M, N] = input[line++].split(' ').map(Number);
  const board = [];

  for (let i = 0; i < N; i++) {
    board.push(input[line++]);
  }

  const fireDistance = Array.from({ length: N }, () => Array(M).fill(-1));
  const sDistance = Array.from({ length: N }, () => Array(M).fill(-1));

  const fireQueue = [];
  const sQueue = [];

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] === '*') {
        fireDistance[y][x] = 0;
        fireQueue.push([y, x]);
      }

      if (board[y][x] === '@') {
        sDistance[y][x] = 0;
        sQueue.push([y, x]);
      }
    }
  }

  let fireFront = 0;
  let sFront = 0;

  while (fireFront < fireQueue.length) {
    const [y, x] = fireQueue[fireFront++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      if (board[ny][nx] === '#') continue;

      if (fireDistance[ny][nx] === -1) {
        fireDistance[ny][nx] = fireDistance[y][x] + 1;
        fireQueue.push([ny, nx]);
      }
    }
  }

  let result = 'IMPOSSIBLE';
  let escaped = false;

  while (sFront < sQueue.length && !escaped) {
    const [y, x] = sQueue[sFront++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= M) {
        result = sDistance[y][x] + 1;
        escaped = true;
        break;
      }

      if (
        fireDistance[ny][nx] !== -1 &&
        fireDistance[ny][nx] <= sDistance[y][x] + 1
      ) {
        continue;
      }

      if (sDistance[ny][nx] !== -1) continue;
      if (board[ny][nx] === '#') continue;

      sDistance[ny][nx] = sDistance[y][x] + 1;
      sQueue.push([ny, nx]);
    }
  }

  answer.push(result);
}

console.log(answer.join('\n'));

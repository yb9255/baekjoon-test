const [[K], [M, N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. queue에 시작좌표와 horseMove를 몇번 사용했는지, 그리고 이동거리 정보를 담는다.
 * 2. bfs로 이동을 시작한다. 이미 이동한 지역은 distance에 기록하면서 이동 거리를 기록한다.
 * 이때 distance는 말로 이동하는 거리도 포함하는 3차원 배열인데, 세번째 배열 인덱스에는 해당 좌표에
 * 말로 이동을 몇번 사용해서 도달했는지 기록하는 역할을 한다.
 * e.g.) distance[3][4][2]가 true이면 말로 이동을 2번 해서 해당 좌표에 도달했다는 의미.
 * 3. 도착점에 도달하면, distance의 이동 거리를 리턴한다. 없으면 -1을 리턴한다.
 */

const isInBoard = (y, x) => y >= 0 && x >= 0 && y < N && x < M;

const monkeyDy = [-1, 1, 0, 0];
const monkeyDx = [0, 0, -1, 1];
const horseDy = [-2, -1, -2, -1, 1, 2, 1, 2];
const horseDx = [-1, -2, 1, 2, -2, -1, 2, 1];

const visited = Array.from({ length: K + 1 }, () =>
  Array.from({ length: N }, () => Array(M).fill(false))
);

const queue = [[0, 0, 0, 0]];
visited[0][0][0] = true;
let front = 0;

while (front < queue.length) {
  const [y, x, k, dist] = queue[front++];

  if (y === N - 1 && x === M - 1) {
    console.log(dist);
    process.exit();
  }

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + monkeyDy[dir];
    const nx = x + monkeyDx[dir];

    if (!isInBoard(ny, nx)) continue;
    if (visited[k][ny][nx]) continue;
    if (board[ny][nx] === 1) continue;

    visited[k][ny][nx] = true;
    queue.push([ny, nx, k, dist + 1]);
  }

  if (k < K) {
    for (let dir = 0; dir < 8; dir++) {
      const ny = y + horseDy[dir];
      const nx = x + horseDx[dir];

      if (!isInBoard(ny, nx)) continue;
      if (visited[k + 1][ny][nx]) continue;
      if (board[ny][nx] === 1) continue;

      visited[k + 1][ny][nx] = true;
      queue.push([ny, nx, k + 1, dist + 1]);
    }
  }
}

console.log(-1);

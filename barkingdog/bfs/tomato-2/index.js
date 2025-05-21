const [[M, N, H], ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. 2차원으로 펼쳐진 값을 3차원으로 정렬한 board를 만든다.
 * 2. 3차원으로 익은 정도를 기록하는 3차원 배열 distance를 만든다.
 *
 * 3. z - y - x순으로 3중배열을 돌며 y에서 board의 열을 업데이트 하고,
 * x에서 distance를 구한 뒤 이미 익은 토마토의 좌표를 queue에 넣는다.
 *
 * 4. queue를 순회하면서 z,y,x 값을 확인하면서 탐색 후, 상하좌우위아래층으로
 * 이동하면서 queue에 값을 넣어 bfs로 좌표를 탐색해나간다.
 * 만약 이미 익은 토마토거나 벽일 경우 탐색하지 않는다.
 *
 * 5. queue가 완료되었을 때, distance를 순회하면서 board의 같은 좌표가
 * 벽이 아닌데 익지 않은 토마토가 있을 경우 -1을 리턴하고, 아닌 경우 distance
 * 전체에서 제일 큰 값을 리턴한다.
 */

const board = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(0))
);
const distance = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(-1))
);

const dy = [-1, 1, 0, 0, 0, 0];
const dx = [0, 0, -1, 1, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];

const queue = [];
let floorIdx = 0;

for (let z = 0; z < H; z++) {
  for (let y = 0; y < N; y++) {
    const row = input[floorIdx++];
    board[z][y] = row;

    for (let x = 0; x < M; x++) {
      if (row[x] === 1) {
        distance[z][y][x] = 0;
        queue.push([z, y, x]);
      }
    }
  }
}

let front = 0;

while (front < queue.length) {
  const [z, y, x] = queue[front++];

  for (let dir = 0; dir < 6; dir++) {
    const nz = z + dz[dir];
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (nz < 0 || ny < 0 || nx < 0) continue;
    if (nz >= H || ny >= N || nx >= M) continue;
    if (distance[nz][ny][nx] >= 0) continue;
    if (board[nz][ny][nx] !== 0) continue;

    distance[nz][ny][nx] = distance[z][y][x] + 1;
    queue.push([nz, ny, nx]);
  }
}

let answer = 0;

for (let z = 0; z < H; z++) {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[z][y][x] === 0 && distance[z][y][x] === -1) {
        console.log(-1);
        process.exit();
      }

      answer = Math.max(answer, distance[z][y][x]);
    }
  }
}

console.log(answer);

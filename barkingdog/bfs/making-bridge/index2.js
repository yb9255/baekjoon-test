const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code - Multi-Source BFS (O(N^2))
 *
 * 1. 우선 첫 bfs를 순회하면서 연결된 섬 영역을 구분하여 board에 기록한다. 이 때 visited된 곳은 다시 기록하지 않는다.
 * 2. 그 다음 다시 board를 순회하며 섬 영역인 곳의 distance를 0으로 기록하고, 두번째 BFS에 사용될 queue에 섬 영역 좌표를 push한다.
 * 3. 두번째 bfs를 시작한다. 인접한 좌표가 지금 섬의 좌표와 같거나 좌표를 벗어나면 순회를 건너뛴다.
 *
 * 4. 인접한 좌표가 바다이면, 현재 좌표는 바다와 인접한 좌표이다. 바다에 다리를 올렸다는 의미로 인접한 좌표의 값을 현재 섬 인덱스로 기록하고,
 * 인접 좌표의 distance를 현재 distance에 1을 더하는 식으로 구현한다.
 *
 * 5. 인접한 좌표가 바다가 아닌데 현재 좌표의 섬 인덱스와도 다르다면, 뻗어나간 다리 좌표가 다른 섬에 도달했다는 의미가 된다.
 * answer = Math.min(answer, <현재 섬으로부터 기록된 distance + 반대편 섬으로부터 뻗어나온 distance>)로 업데이트 한다.
 *
 * 6. answer를 리턴한다.
 */

const dy = [1, -1, 0, 0];
const dx = [0, 0, 1, -1];

const visited = Array.from({ length: N }, () => Array(N).fill(false));
const distance = Array.from({ length: N }, () => Array(N).fill(-1));

const isOutOfBoundary = (y, x) => y < 0 || y >= N || x < 0 || x >= N;

let islandIdx = 1;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 0) continue;
    if (visited[y][x]) continue;

    const queue = [[y, x]];
    visited[y][x] = true;
    let front = 0;

    while (front < queue.length) {
      const [y, x] = queue[front++];
      board[y][x] = islandIdx;

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (isOutOfBoundary(ny, nx)) continue;
        if (visited[ny][nx]) continue;
        if (board[ny][nx] === 0) continue;

        visited[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }

    islandIdx++;
  }
}

const queue = [];
let front = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] !== 0) {
      distance[y][x] = 0;
      queue.push([y, x]);
    }
  }
}

let answer = Infinity;

while (front < queue.length) {
  const [y, x] = queue[front++];

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (isOutOfBoundary(ny, nx)) continue;
    if (board[y][x] === board[ny][nx]) continue;

    if (board[ny][nx] !== 0 && board[y][x] !== board[ny][nx]) {
      answer = Math.min(answer, distance[y][x] + distance[ny][nx]);
    } else if (board[ny][nx] === 0) {
      board[ny][nx] = board[y][x];
      distance[ny][nx] = distance[y][x] + 1;
      queue.push([ny, nx]);
    }
  }
}

console.log(answer);

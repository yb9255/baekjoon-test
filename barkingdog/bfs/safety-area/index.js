/** https://www.acmicpc.net/problem/2468 */

const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code (BFS)
 * 1. 최소높이와 최대높이를 구한다.
 * 2. 최소높이 - 1 (아예 안잠기는 경우) < i < 최대높이를 순회하면서 나눠지는 구역의 개수를 bfs로 추적한다.
 * 3. 방문 내역이 있을 경우 방문하지 않는 visited를 기록하면서 구역을 나눈다.
 * 4. 각 순회가 끝날때마다 이전 구역 개수와 지금 구역 개수 중 더 넓은 값으로 정답 값을 업데이트 한다.
 * 5. 정답을 리턴한다.
 */

let minHeight = Infinity;
let maxHeight = -Infinity;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    minHeight = Math.min(minHeight, board[y][x]);
    maxHeight = Math.max(maxHeight, board[y][x]);
  }
}

let answer = 0;
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let i = minHeight - 1; i < maxHeight; i++) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  let count = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (board[y][x] <= i) continue;
      if (visited[y][x]) continue;

      const queue = [[y, x]];
      visited[y][x] = true;
      let front = 0;

      count++;

      while (front < queue.length) {
        const [y, x] = queue[front++];

        for (let dir = 0; dir < 4; dir++) {
          const ny = y + dy[dir];
          const nx = x + dx[dir];

          if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
          if (board[ny][nx] <= i) continue;
          if (visited[ny][nx]) continue;

          visited[ny][nx] = true;
          queue.push([ny, nx]);
        }
      }
    }
  }

  answer = Math.max(answer, count);
}

console.log(answer);

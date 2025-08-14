/** https://www.acmicpc.net/problem/16234 */

const [[N, L, R], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input5.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 이동을 기록하는 moved와 방문을 기록하는 visited 배열로 만든다.
 * 2. board 전체를 순회하면서 각 좌표마다 상하좌우를 탐색하는 bfs를 시작한다.
 * 3. 방문한 곳으로 기록되었으면 방문을 건너뛴다.
 * 4. 지금 좌표와 다음 좌표의 차이가 L 미만 혹은 R 초과인 경우 건너뛴다.
 *
 * 5. 방문이 가능한 경우 연합 국가로 확인하고 unionCell과 bfs queue에 좌표를 push한다.
 * 이 때, 다음 이동 cell의 값을 sum에 누적한다.
 *
 * 6. bfs가 끝난 이후 unionCell이 2개 이상이면 국가 연합이 있으므로 moved를 true로 한 뒤,
 * 모든 union cell의 값을 Math.floor(sum / unionCells.length)로 변경한다.
 *
 * 7. days를 늘려준다.
 * 8. moved가 false일때까지 1~7의 과정을 반복하고 days를 로그한다.
 */

let days = 0;

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

while (true) {
  let moved = false;
  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (visited[y][x]) continue;

      const queue = [[y, x]];
      let front = 0;
      visited[y][x] = true;

      const unionCells = [[y, x]];
      let sum = board[y][x];

      while (front < queue.length) {
        const [y, x] = queue[front++];

        for (let dir = 0; dir < 4; dir++) {
          const ny = y + dy[dir];
          const nx = x + dx[dir];

          if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
          if (visited[ny][nx]) continue;

          const diff = Math.abs(board[y][x] - board[ny][nx]);
          if (diff < L) continue;
          if (diff > R) continue;

          visited[ny][nx] = true;
          sum += board[ny][nx];
          queue.push([ny, nx]);
          unionCells.push([ny, nx]);
        }
      }

      if (unionCells.length > 1) {
        moved = true;
        const average = Math.floor(sum / unionCells.length);
        unionCells.forEach(([y, x]) => (board[y][x] = average));
      }
    }
  }

  if (!moved) break;
  days++;
}

console.log(days);

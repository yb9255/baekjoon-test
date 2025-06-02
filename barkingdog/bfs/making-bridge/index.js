const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code (O(n^4))
 * 1. 보드 전체를 bfs로 순회하면서 연결된 섬끼리 번호를 붙여준다.
 *
 * 2. 보드 전체를 순회하면서 섬 영역이면 다시 bfs로 순회한다., 섬인 현재 좌표부터 다른 섬의 좌표까지 최단 거리를 구한 다음,
 * 현재까지 기록된 최단 좌표와 비교하여 더 적은 시간이 걸렸으면 값을 갱신한다. (이미 좌표가 구해진 경우, 방문한 것으로 간주한다.)
 * bfs를 모든 섬 좌표마다 하기 때문에 최악의 경우 O(N^4)가 발생한다.
 *
 * 3. 정답을 리턴한다.
 *
 * 4. 이 풀이는 C++이나 파이썬으로는 통과가 되나, node.js의 경우 O(n^4)가 발생하는 풀이의 경우 메모리 초과가 발생한다.
 *
 * 예시
 *
 * 1 1 1 1 1 1 1 1 1 1 1 ... 1 1
 * 1 0 1 0 1 0 1 0 1 0 1 ... 0 1
 * 1 0 1 0 1 0 1 0 1 0 1 ... 0 1
 * .
 * .
 * .
 * 1 0 1 0 1 0 1 0 1 0 1 ... 0 1
 * 0 0 0 0 0 0 0 0 0 0 0 ... 0 0
 * .
 * .
 * .
 * 0 0 0 0 0 0 0 0 0 0 0 ... 0 0
 * 1 0 1 0 1 0 1 0 1 0 1 ... 0 1
 * .
 * .
 * .
 * 1 0 1 0 1 0 1 0 1 0 1 ... 0 1
 * 1 1 1 1 1 1 1 1 1 1 1 ... 1 1
 */

const dy = [1, -1, 0, 0];
const dx = [0, 0, -1, 1];

const visited = Array.from({ length: N }, () => Array(N).fill(false));

let islandIdx = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] !== 0 && !visited[y][x]) {
      islandIdx++;

      const queue = [[y, x]];
      visited[y][x] = true;
      board[y][x] = islandIdx;

      let front = 0;

      while (front < queue.length) {
        const [y, x] = queue[front++];

        for (let dir = 0; dir < 4; dir++) {
          const ny = y + dy[dir];
          const nx = x + dx[dir];

          if (ny >= N || nx >= N || ny < 0 || nx < 0) continue;
          if (board[ny][nx] === 0) continue;
          if (visited[ny][nx]) continue;

          board[ny][nx] = islandIdx;
          visited[ny][nx] = true;
          queue.push([ny, nx]);
        }
      }
    }
  }
}

let answer = Infinity;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 0) continue;

    const distance = Array.from({ length: N }, () => Array(N).fill(-1));
    const curIsland = board[y][x];

    const queue = [[y, x]];
    let front = 0;
    distance[y][x] = 0;

    outer: while (front < queue.length) {
      const [y, x] = queue[front++];

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
        if (distance[ny][nx] >= 0 && board[ny][nx] === curIsland) continue;

        if (board[ny][nx] !== 0 && board[ny][nx] !== curIsland) {
          answer = Math.min(answer, distance[y][x]);
          break outer;
        }

        distance[ny][nx] = distance[y][x] + 1;
        queue.push([ny, nx]);
      }
    }
  }
}

console.log(answer);

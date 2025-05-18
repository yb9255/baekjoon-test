const [[N, M], ...map] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. 맵 전체를 순회하면서 숫자 1이 있는지 확인한다.
 * 2. 만약 숫자 1이 있어도 방문 기록이 있다면 건너뛴다.
 * 3. 숫자 1이 있고 방문기록이 없다면, count를 우선 1 올려준다.
 * 4. 현재 좌표를 queue에 넣고, 상하좌우 좌표를 queue에 넣으면서 숫자 1이 있는지 파악한다.
 * 5. 숫자 1이 있다면 현재 그림의 area값을 늘리고 상하좌우 좌표를 방문했다고 기록한다.
 * 6. bfs 큐 탐색이 끝났다면, maxArea 값과 area를 비교하고 area가 더 크다면 maxArea = area로
 * 값을 갱신한다.
 */

let count = 0;
let maxArea = 0;

const visited = Array.from({ length: N }, () => Array(M).fill(false));
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (map[y][x] === 0 || visited[y][x]) continue;

    count++;
    visited[y][x] = true;

    let area = 0;
    const queue = [[y, x]];

    while (queue.length) {
      const [curY, curX] = queue.shift();
      area++;

      for (let dir = 0; dir < 4; dir++) {
        const ny = curY + dy[dir];
        const nx = curX + dx[dir];

        if (ny < 0 || nx < 0) continue;
        if (ny >= N || nx >= M) continue;
        if (visited[ny][nx]) continue;
        if (map[ny][nx] === 0) continue;

        visited[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }

    maxArea = Math.max(maxArea, area);
  }
}

console.log(count);
console.log(maxArea);

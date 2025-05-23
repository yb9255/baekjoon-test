const [N, ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * Pseudo Code
 * 1. board와 visited를 만든다.
 * 2. 좌표 전체를 순회하며, 주소 단지가 아닌 좌표와 이미 방문한 좌표는 건너뛴다.
 * 3. 건너뛰지 않는 좌표의 경우 count를 1 올려주고 queue에 현재 좌표를 넣고, 현재 좌표부터 상하좌우로 뻗어나가는 bfs를 실행하며
 * 한번 bfs가 실행될때마다 영역 크기를 늘린다.
 * 4. sum을 areas에 push하고, count, areas를 양식에 맞게 리턴한다.
 */

const visited = Array.from({ length: N }, () => Array(N).fill(false));

let count = 0;
const areas = [];

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === '0') continue;
    if (visited[y][x]) continue;

    const queue = [[y, x]];
    visited[y][x] = true;
    let sum = 1;
    let front = 0;

    count++;

    while (front < queue.length) {
      const [y, x] = queue[front++];

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
        if (board[ny][nx] === '0') continue;
        if (visited[ny][nx]) continue;

        visited[ny][nx] = true;
        sum++;
        queue.push([ny, nx]);
      }
    }

    areas.push(sum);
  }
}

console.log(count);
console.log(areas.sort((a, b) => a - b).join('\n'));

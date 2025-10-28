/** https://www.acmicpc.net/problem/2583 */

const [[N, M, K], ...coords] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/**
 * Pseudo Code
 *
 * 1. board를 M행 × N열의 2차원 배열로 생성한다. (M: 세로 길이, N: 가로 길이)
 *    - 입력 좌표계는 왼쪽 아래가 (0,0)인 구조이기 때문
 *
 * 2. visited[M][N] 배열을 생성하여 방문 여부를 기록한다.
 * 3. board 전체를 순회하면서 아직 방문하지 않았고 값이 0인 위치에서 BFS를 시작한다.
 * 4. BFS를 통해 연결된 0 영역의 크기를 계산한다.
 * 5. 각 영역의 넓이를 배열에 저장하고, 영역 개수를 sum으로 센다.
 * 6. 최종적으로 구현 영역을 areas에 push한다.
 */

const board = Array.from({ length: N }, () => Array(M).fill(0));
const visited = Array.from({ length: N }, () => Array(M).fill(false));

for (let i = 0; i < K; i++) {
  const [x1, y1, x2, y2] = coords[i];

  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      board[y][x] = 1;
    }
  }
}

const areas = [];
let count = 0;

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === 1) continue;
    if (visited[y][x]) continue;

    const queue = [[y, x]];
    visited[y][x] = true;
    count++;

    let front = 0;
    let sum = 1;

    while (front < queue.length) {
      const [y, x] = queue[front++];

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
        if (visited[ny][nx]) continue;
        if (board[ny][nx] === 1) continue;

        visited[ny][nx] = true;
        sum++;
        queue.push([ny, nx]);
      }
    }

    areas.push(sum);
  }
}

console.log(count);
console.log(areas.sort((a, b) => a - b).join(' '));

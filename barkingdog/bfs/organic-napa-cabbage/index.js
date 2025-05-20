const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. cabbage 위치를 담은 Map을 만들고 값을 순회하면서 배추가 있는 곳은 0, 없는 곳은 1로 기록한다.
 * 2. 각 위치 방문 여부를 기록하는 배열을 이차원 배열 visited를 만든다.
 * 3. 좌표 목록 전체를 순회하면서 만약 해당 좌표에 방문기록이 없다면 count를 올리고 bfs를 돌고,
 * 있다면 건너뛴다.
 * 4. 계산한 count를 정답 배열에 넣는다.
 */

const N = +input.shift();
const answer = [];
let line = 0;

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let i = 0; i < N; i++) {
  const [M, N, K] = input[line++].split(' ').map(Number);

  const cabbageMap = Array.from({ length: N }, () => Array(M).fill(0));
  const cabbageCoordsList = [];
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let count = 0;

  for (let j = 0; j < K; j++) {
    const [x, y] = input[line++].split(' ').map(Number);
    cabbageMap[y][x] = 1;
    cabbageCoordsList.push([y, x]);
  }

  for (let k = 0; k < K; k++) {
    const [startY, startX] = cabbageCoordsList[k];
    if (visited[startY][startX]) continue;

    visited[startY][startX] = true;
    const queue = [[startY, startX]];
    count++;

    while (queue.length) {
      const [y, x] = queue.shift();

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (ny < 0 || ny >= N || nx < 0 || nx >= M) continue;
        if (visited[ny][nx]) continue;
        if (!cabbageMap[ny][nx]) continue;

        visited[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }
  }

  answer.push(count);
}

console.log(answer.join('\n'));

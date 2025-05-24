const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code (DFS)
 * 1. 최소 높이, 최대 높이를 구한다.
 * 2. 최소 높이 - 1 ~ 최대높이까지 순회하면서 DFS를 시작한다.
 * DFS는 현재 높이만큼 비가 내렸을 때 잠기지 않는 영역이 얼마나 되는지 기록하는 함수로,
 * 잠기지 않는 지역을 방문하면 count를 올리고 상하좌우 지역을 재귀로 방문,
 * 잠기지 않은 지역을 방문했다고 기록한다.
 * 3. DFS가 끝났을 때 count를 answer와 비교하고 더 크면 answer를 갱신한다.
 */

let minHeight = Infinity;
let maxHeight = -Infinity;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    minHeight = Math.min(minHeight, board[y][x]);
    maxHeight = Math.max(maxHeight, board[y][x]);
  }
}

const dfs = (y, x, height, visited) => {
  if (y < 0 || x < 0 || y >= N || x >= N) return;
  if (board[y][x] <= height) return;
  if (visited[y][x]) return;

  visited[y][x] = true;

  dfs(y - 1, x, height, visited);
  dfs(y + 1, x, height, visited);
  dfs(y, x + 1, height, visited);
  dfs(y, x - 1, height, visited);
};

let answer = 0;

for (let i = minHeight - 1; i < maxHeight; i++) {
  let count = 0;
  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (!visited[y][x] && board[y][x] > i) {
        count++;
        dfs(y, x, i, visited);
      }
    }
  }

  answer = Math.max(answer, count);
}

console.log(answer);

/** https://www.acmicpc.net/problem/10971 */

const [[N], ...travelCostMap] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/**
 * Pseudo Code
 * 1. 순회를 모든 곳에서 하는게 아니라 dfs 내부에서 처리하도록 함
 * 2. 0에서 시작하는 모든 지점을 다 순회하면 결국 이동 가격의 합은 동일해지므로,
 * 굳이 모든 도시에서 dfs를 트리거해서 시작할 필요는 없다.
 */

const visited = Array(N).fill(false);
let result = Infinity;

const dfs = (depth, start, now, cost) => {
  if (cost >= result) return;

  if (depth === N) {
    if (travelCostMap[now][start] === 0) return;

    result = Math.min(result, cost + travelCostMap[now][start]);
    return;
  }

  for (let next = 0; next < N; next++) {
    if (visited[next]) continue;
    if (travelCostMap[now][next] === 0) continue;

    visited[next] = true;
    dfs(depth + 1, start, next, cost + travelCostMap[now][next]);
    visited[next] = false;
  }
};

visited[0] = true;
dfs(1, 0, 0, 0);

console.log(result);

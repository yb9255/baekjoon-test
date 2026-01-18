/** https://www.acmicpc.net/problem/1707 */

const [[K], ...rest] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. graph에 기록한 edge를 따라 각 node를 시작점으로 순회한다.
 * 2. 만약 방문 기록이 있다면 순회를 건너뛴다.
 *
 * 3. 방문 기록이 없다면, 우선 방문 배열에 0으로 현재 node를 기록하고 bfs(혹은 dfs)로
 * 노드를 엣지를 따라 순회한다.
 *
 * 4. 이분 그래프는 엣지로 연결된 노드끼리 색이 달라야 하므로, 방문하지 않은 노드의 방문 배열에
 * 1로 방문을 기록해서 다른 색의 노드임을 표시한다.
 *
 * 5. 만약 방문기록이 있는 노드인데 현재 노드와 색이 같다면 이분 그래프가 성립하지 않는다. NO를 로그한다.
 * 6. 모든 순회가 끝날때까지 같은 색의 노드가 발견되지 않았다면 YES를 로그한다.
 */

let line = 0;
const result = [];

outer: for (let k = 0; k < K; k++) {
  const [V, E] = rest[line++];
  const graph = Array.from({ length: V + 1 }, () => []);
  const visited = Array(V + 1).fill(-1);

  for (let i = 0; i < E; i++) {
    const [node1, node2] = rest[line++];
    graph[node1].push(node2);
    graph[node2].push(node1);
  }

  for (let i = 1; i <= V; i++) {
    if (visited[i] !== -1) continue;

    const queue = [i];
    visited[i] = 0;
    let front = 0;

    while (front < queue.length) {
      const cur = queue[front++];
      const nextColor = 1 - visited[cur];

      for (const next of graph[cur]) {
        if (visited[next] === -1) {
          visited[next] = nextColor;
          queue.push(next);
          continue;
        }

        if (visited[next] === visited[cur]) {
          console.log('NO');
          continue outer;
        }
      }
    }
  }

  console.log('YES');
}

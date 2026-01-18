/** https://www.acmicpc.net/problem/13023 */

const [[N, M], ...edges] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code
 *
 * 1. key에 node, value에 node와 엣지로 연결된 다른 node 배열을 가진 graph 생성
 * 2. 방문 기록 배열을 생성한다.
 * 3. found 변수를 만든다. 5개 연결된 노드를 찾으면 1, 아니면 0이고 시작값은 0이다.
 * 4. dfs로 depth, cur 시그니처를 받으면서 순회한다. cur는 현재 방문한 노드이다.
 * 5. found가 이미 1인 경우에는 dfs를 리턴한다.
 * 6. depth가 4, 즉 현재 방문한 node가 5개가 되는데 성공하면 연결을 찾은 것이니 found를 1로 변환하고 dfs를 종료한다.
 * 7. graph[cur]에 있는 노드를 방문하며 depth를 늘려나간다. cur는 연결된 노드가 된다. 방문시 방문 배열에 체크해서 중복 방문을 방지한다.
 * 8. 7의 과정에서 found가 발견되면 얼리 리턴한다.
 * 9. 0부터 N - 1까지 순회하면서 각각을 시작지점으로 dfs를 실행한다.
 * 10. found를 로그한다.
 */

const graph = [];

for (let i = 0; i < M; i++) {
  const [node1, node2] = edges[i];
  if (!graph[node1]) graph[node1] = [];
  if (!graph[node2]) graph[node2] = [];

  graph[node1].push(node2);
  graph[node2].push(node1);
}

const visited = Array(N).fill(false);
let found = 0;

const dfs = (depth, cur) => {
  if (found) return;
  if (!graph[cur]) return;

  if (depth === 4) {
    found = 1;
    return;
  }

  for (const next of graph[cur]) {
    if (visited[next]) continue;
    visited[next] = true;
    dfs(depth + 1, next);
    visited[next] = false;
    if (found) return;
  }
};

for (let i = 0; i < N; i++) {
  visited[i] = true;
  dfs(0, i);
  visited[i] = false;

  if (found) break;
}

console.log(found);

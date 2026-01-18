/** https://www.acmicpc.net/problem/1260 */

const [[N, M, V], ...edges] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [node1, node2] = edges[i];

  graph[node1].push(node2);
  graph[node2].push(node1);
}

graph.forEach((node) => node.sort((a, b) => a - b));

const getDfs = () => {
  const visited = Array(N + 1).fill(false);
  const result = [];

  const dfs = (cur) => {
    for (const next of graph[cur]) {
      if (visited[next]) continue;
      visited[next] = true;
      result.push(next);
      dfs(next);
    }
  };

  visited[V] = true;
  result.push(V);
  dfs(V);

  return result.join(' ');
};

const getBfs = () => {
  const visited = Array(N + 1).fill(false);
  const result = [];

  const queue = [V];
  let front = 0;
  visited[V] = true;

  while (front < queue.length) {
    const cur = queue[front++];
    result.push(cur);

    for (const next of graph[cur]) {
      if (visited[next]) continue;
      visited[next] = true;
      queue.push(next);
    }
  }

  return result.join(' ');
};

console.log(getDfs());
console.log(getBfs());

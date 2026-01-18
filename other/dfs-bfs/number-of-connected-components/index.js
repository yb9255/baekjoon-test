/** https://www.acmicpc.net/problem/11724 */

const [[N, M], ...edges] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** BFS 풀이 */

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [node1, node2] = edges[i];
  graph[node1].push(node2);
  graph[node2].push(node1);
}

const visited = Array(N + 1).fill(false);
let count = 0;

for (let i = 1; i <= N; i++) {
  if (visited[i]) continue;
  count++;

  const queue = [i];
  let front = 0;
  visited[i] = true;

  while (front < queue.length) {
    const cur = queue[front++];

    for (const next of graph[cur]) {
      if (visited[next]) continue;

      visited[next] = true;
      queue.push(next);
    }
  }
}

console.log(count);

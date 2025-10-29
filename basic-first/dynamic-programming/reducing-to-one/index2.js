/** https://www.acmicpc.net/problem/1463 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim();

/**
 * Pseudo Code
 * BFS를 위한 큐 (FIFO 구조 사용)
 * 방문할 node의 순서를 queue에 기록하고, 먼저 들어온 노드를 탐색
 * queue에 현재 노드와 sibling 노드를 담아두고 전부 탐색
 * 방문한 node는 방문처리를 기록하고 다시 탐색하지 않음.
 * stack 기반이고 하나의 노드를 끝까지 파고드는 DFS와 반대 (FILO)
 */

const visited = new Set();
const queue = [[N, 0]];
let front = 0;

while (front < queue.length) {
  const [number, count] = queue[front++];

  if (number === 1) {
    console.log(count);
    process.exit();
  }

  if (visited[number]) continue;
  visited[number] = true;

  queue.push([number - 1, count + 1]);

  if (number % 2 === 0) {
    queue.push([number / 2, count + 1]);
  }

  if (number % 3 === 0) {
    queue.push([number / 3, count + 1]);
  }
}

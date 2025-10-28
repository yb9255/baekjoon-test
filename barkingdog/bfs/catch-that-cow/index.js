/** https://www.acmicpc.net/problem/1697 */

const [N, K] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code (BFS)
 * 1. [N, 이동횟수: 0]을 queue에 넣는다.
 * 2. BFS로 순회하면서 N + 1, N - 1, N * 2의 케이스와 이동횟수 + 1을 queue에 넣는다.
 * 3. K에 도달하면 이동횟수를 제출한다.
 * 4. shift로 처리하면 시간초과 이슈, front로 처리하면 메모리 이슈가 있음.
 * 5. front로 시간초과 이슈를 해결하고, visited로 이미 방문한 x는 방문하지 않고 건너뛰게 해서 메모리 이슈 해결
 */

const MAX = 100_000;

const queue = [[N, 0]];
let front = 0;

const visited = Array(MAX + 1).fill(false);
visited[N] = true;

while (front < queue.length) {
  const [x, count] = queue[front++];

  if (x === K) {
    console.log(count);
    break;
  }

  for (const next of [x + 1, x - 1, x * 2]) {
    if (next < 0 || next > MAX) continue;
    if (visited[next]) continue;

    visited[next] = true;
    queue.push([next, count + 1]);
  }
}

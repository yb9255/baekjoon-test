/** https://www.acmicpc.net/problem/1697 */

const [N, K] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const MAX = 100_001;

const queue = [N];
const visited = Array(MAX).fill(0);
let front = 0;

while (front < queue.length) {
  const position = queue[front++];

  if (position === K) {
    console.log(visited[position]);
    break;
  }

  for (const next of [position + 1, position - 1, position * 2]) {
    if (next < 0 || next >= MAX) continue;
    if (visited[next]) continue;

    visited[next] = visited[position] + 1;
    queue.push(next);
  }
}

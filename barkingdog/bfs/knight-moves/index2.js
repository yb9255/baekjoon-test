const [[T], ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. index.js 풀이에서 visited count를 저장하는 형태로 변환하여 메모리를 아낄 수 있음
 */

let idx = 0;

const dy = [-1, -2, -2, -1, 1, 2, 2, 1];
const dx = [-2, -1, 1, 2, -2, -1, 1, 2];
const answer = [];

for (let i = 0; i < T; i++) {
  const [N] = input[idx++];
  const [startY, startX] = input[idx++];
  const [targetY, targetX] = input[idx++];

  const distance = Array.from({ length: N }, () => Array(N).fill(0));

  const queue = [[startY, startX]];
  let front = 0;

  while (front < queue.length) {
    const [y, x] = queue[front++];

    if (y === targetY && x === targetX) {
      answer.push(distance[y][x]);
      break;
    }

    for (let dir = 0; dir < 8; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
      if (distance[ny][nx] > 0) continue;

      distance[ny][nx] = distance[y][x] + 1;
      queue.push([ny, nx]);
    }
  }
}

console.log(answer.join('\n'));

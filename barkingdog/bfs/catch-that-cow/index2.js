/** https://www.acmicpc.net/problem/1697 */

const [seekerPosition, hiderPosition] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/**
 * Pseudo Code
 * 1. nextQueue와 visited에 시간을 기록하는 방법으로 시간 단축
 */

const MAX = 100_001;

let queue = [seekerPosition];
const visited = Array(MAX).fill(-1);
visited[seekerPosition] = 0;

while (queue.length) {
  const nextQueue = [];

  for (const curPosition of queue) {
    if (curPosition === hiderPosition) {
      console.log(visited[curPosition]);
      process.exit();
    }

    for (const next of [curPosition + 1, curPosition - 1, 2 * curPosition]) {
      if (next < 0 || next >= MAX) continue;
      if (visited[next] !== -1) continue;

      visited[next] = visited[curPosition] + 1;
      nextQueue.push(next);
    }
  }

  queue = nextQueue;
}

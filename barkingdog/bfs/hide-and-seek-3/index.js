/** https://www.acmicpc.net/problem/13549 */

const [seekerPosition, hiderPosition] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/**
 * Pseudo Code
 *
 * 1. 이동 거리를 함께 기록하는 visited 배열을 생성한다.
 *
 * 2. 현재 포지션에서 2의 제곱에 해당하는 모든 포지션에 현재 이동시간을
 * 기록하고 queue에 넣는 함수 teleport를 만든다.
 *
 * 3. 현재 위치 2제곱을 하는 케이스를 계산하기 위해 시작 포지션의 visited를 1로 설정하고
 * queue에 시작 포지션을 넣고 teleport 함수를 적용한다.
 *
 * 4. bfs를 시작한다. <현재 위치 + 1>, <현재 위치 - 1> 케이스를 추적 후 이동 범위 내에 있으며,
 * 방문 했던 기록이 없다면 visited[다음 위치] = visited[현재 위치] + 1로 기록 후 queue에 push한다.
 *
 * 5. 최종적으로 hiderPosition과 seekerPosition이 같아지면, bfs를 종료하고 정답을 리턴한다.
 */

const LIMIT = 100_001;
const visited = Array(LIMIT).fill(0);
const queue = [seekerPosition];
let front = 0;

const teleport = (position) => {
  if (position === 0) return;

  let curPosition = position * 2;

  while (curPosition < LIMIT && visited[curPosition] === 0) {
    visited[curPosition] = visited[position];
    queue.push(curPosition);
    curPosition *= 2;
  }
};

visited[seekerPosition] = 1;
teleport(seekerPosition);

while (front < queue.length) {
  const position = queue[front++];

  if (position === hiderPosition) {
    console.log(visited[position] - 1);
    break;
  }

  for (const next of [position + 1, position - 1]) {
    if (next < 0 || next >= LIMIT) continue;
    if (visited[next] !== 0) continue;

    visited[next] = visited[position] + 1;
    queue.push(next);
    teleport(next);
  }
}

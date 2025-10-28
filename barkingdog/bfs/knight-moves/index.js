/** https://www.acmicpc.net/problem/7562 */

const [[T], ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. 나이트 이동 8칸을 기록하는 dy, dx 배열을 만든다.
 * 2. 시작 지점과 이동 거리를 queue에 담고 방문 기록을 기록하는 배열을 체크한다.
 * 3. queue를 bfs로 순회하면서 queue 제일 앞 시점에서 방문할 수 있는 8개의 이동 좌표를
 * 이동할 수 있는지 여부를 체크한다.
 * 4. 만약 다음 이동 좌표가 전체 좌표를 벗어나지 않았고 방문 기록이 없다면, 해당 좌표와
 * 이동 거리 + 1을 가진 배열을 queue에 담고 bfs로 순회한다.
 * 5. 타겟 좌표에 도달하면 count를 answer에 push한다.
 * 6. answer를 문자열로 변환해 리턴한다.
 */

let idx = 0;

const dy = [-1, -2, -2, -1, 1, 2, 2, 1];
const dx = [-2, -1, 1, 2, -2, -1, 1, 2];
const answer = [];

for (let i = 0; i < T; i++) {
  const [N] = input[idx++];
  const [startY, startX] = input[idx++];
  const [targetY, targetX] = input[idx++];

  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  visited[startY][startX] = true;

  const queue = [[startY, startX, 0]];
  let front = 0;

  while (front < queue.length) {
    const [y, x, count] = queue[front++];

    if (y === targetY && x === targetX) {
      answer.push(count);
      break;
    }

    for (let dir = 0; dir < 8; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
      if (visited[ny][nx]) continue;

      visited[ny][nx] = true;
      queue.push([ny, nx, count + 1]);
    }
  }
}

console.log(answer.join('\n'));

/** https://www.acmicpc.net/problem/2178 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input.shift().split(' ');
const map = input.map((str) => str.split('').map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(false));

/** Pseudo Code
 * 1. 0, 0에서 시작해서 N - 1, M - 1까지 이동해야 하며, 지나야 하는 칸수이므로
 * [0, 0] 도 count에 포함되어 count를 1로 시작한다.
 *
 * 2. 0, 0을 큐에서 꺼내 현재 이동한 카운트를 상하좌우 좌표 중 1인 곳을 visited로 기록하고 큐에
 * [다음 좌표, 이동 카운트 + 1]를 넣는다
 *
 * 3. 큐에서 아이템을 꺼냈을 때 N - 1, M - 1과 일치할 때 카운트를 콘솔에 찍는다.
 */

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const queue = [[0, 0, 1]];

while (queue.length) {
  const [curY, curX, count] = queue.shift();
  if (!map[curY][curX] || visited[curY][curX]) continue;

  visited[curY][curX] = true;

  if (curY === N - 1 && curX === M - 1) {
    console.log(count);
    break;
  }

  for (let dir = 0; dir < 4; dir++) {
    const ny = curY + dy[dir];
    const nx = curX + dx[dir];

    if (ny < 0 || nx < 0) continue;
    if (ny >= N || nx >= M) continue;
    if (visited[ny][nx]) continue;
    if (!map[ny][nx]) continue;

    queue.push([ny, nx, count + 1]);
  }
}

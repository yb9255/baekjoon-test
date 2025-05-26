const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code (BarkingDog 풀이)
 * 1. 벽을 한번 부수고 도달한 거리와 벽을 부수지 않고 도달한 거리를 기록하는 distance 배열을 만든다.
 * 이 때 기본값을 -1로 하여 방문하지 않은 케이스에는 도달하지 않도록 한다.
 *
 * 2. [0,0,0]<y, x, 부쉈는지 여부>을 queue에 넣고 좌표를 bfs로 순회하기 시작한다. 상하좌우중 갈 수 있는 곳을 queue에 넣고
 * 만약 벽이라면 벽을 부수지 않은 케이스의 순서에서만 다음 벽 좌표도 queue에 넣는다.
 *
 * 3. 좌표에 도달했으면 해당 좌표에 저장된 distance[y][x][broken]을 답으로 리턴한다.
 *
 * 4. bfs가 끝날때까지 좌표에 도달하지 못했다면 -1을 리턴한다.
 */

const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1);

const distance = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => [-1, -1]),
);

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const queue = [[0, 0, 0]];
distance[0][0][0] = 1;
let front = 0;

while (front < queue.length) {
  const [y, x, broken] = queue[front++];

  if (y === N - 1 && x === M - 1) {
    console.log(distance[y][x][broken]);
    process.exit();
  }

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;

    if (board[ny][nx] === '0' && distance[ny][nx][broken] === -1) {
      distance[ny][nx][broken] = distance[y][x][broken] + 1;
      queue.push([ny, nx, broken]);
    }

    if (board[ny][nx] === '1' && broken === 0 && distance[ny][nx][1] === -1) {
      distance[ny][nx][1] = distance[y][x][broken] + 1;
      queue.push([ny, nx, 1]);
    }
  }
}

console.log(-1);

const [[M, N, H], ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. 첫 풀이와 비슷하나, 거리를 전부 보관하지 않고
 * 최종적으로 익어야 하는 토마토 개수를 기록한 뒤, 토마토가 익을 때마다 개수를 담은
 * 변수의 값을 감소시킨다.
 *
 * 2. queue에 넣을때는 현재까지 익은 날짜를 계속 1씩 늘려서 보관한다.
 *
 * 3. 만약 익지 않은 토마토 변수가 0이 아니라면 -1, 0이라면
 * 마지막 큐에 누적되어 있던 익은 날짜를 리턴
 */

const board = Array.from({ length: H }, () =>
  Array.from({ length: N }, () => Array(M).fill(0))
);

const queue = [];
let rowIdx = 0;
let unripeTomato = 0;

for (let z = 0; z < H; z++) {
  for (let y = 0; y < N; y++) {
    board[z][y] = input[rowIdx++];

    for (let x = 0; x < M; x++) {
      if (board[z][y][x] === 0) unripeTomato++;
      if (board[z][y][x] === 1) queue.push([z, y, x, 0]);
    }
  }
}

let front = 0;
let answer = 0;

const dy = [-1, 1, 0, 0, 0, 0];
const dx = [0, 0, -1, 1, 0, 0];
const dz = [0, 0, 0, 0, -1, 1];

while (front < queue.length) {
  const [z, y, x, days] = queue[front++];

  for (let dir = 0; dir < 6; dir++) {
    const nz = z + dz[dir];
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (nz < 0 || ny < 0 || nx < 0) continue;
    if (nz >= H || ny >= N || nx >= M) continue;
    if (board[nz][ny][nx] !== 0) continue;

    board[nz][ny][nx] = 1;
    unripeTomato--;
    queue.push([nz, ny, nx, days + 1]);
  }

  answer = days;
}

console.log(unripeTomato ? -1 : answer);

/** https://www.acmicpc.net/problem/15685 */

const [[T], ...cases] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 드래곤 커브가 0일때는 dir가 [0], 1일때는 [0, 1], 2일 때는 [0, 1, 2, 1]..
 * n - 1 일때 dir를 거꾸로 순회하면서 각 dir를 90도 시계방향 회전 후 배열에 추가하면
 * n의 dir 인덱스가 됨.
 *
 * 2. 1을 사용해 각 좌표별로 해당 좌표부터 시작된 드래곤 커브 dir를 모두 구한 dirs 배열을 구함
 *
 * 3. dirs배열을 순회하면서 방문 좌표를 계속 갱신하며 미리 만들어놓은 최대크기 board에 방문 좌표에는
 * true를 기록함. 이 때 검사 시 x + 1, y + 1등도 포함되므로 크기를 최대크기 + 1인 101로 만들어야됨.
 *
 * 4. board를 순회하면서 현재 좌표 기준 x + 1, y + 1, x + 1 & y + 1이 true이면 네 점이 방문되었다고
 * 기록하여 count를 늘려줌
 *
 * 5. count 로그
 */

const dy = [0, -1, 0, 1];
const dx = [1, 0, -1, 0];

const N = 100;
const board = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));

for (let t = 0; t < T; t++) {
  const [x, y, d, g] = cases[t];
  const dirs = [d];

  let curY = y;
  let curX = x;

  board[y][x] = true;

  for (let gen = 0; gen < g; gen++) {
    for (let i = dirs.length - 1; i >= 0; i--) {
      dirs.push((dirs[i] + 1) % 4);
    }
  }

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    const ny = curY + dy[dir];
    const nx = curX + dx[dir];

    board[ny][nx] = true;

    curY = ny;
    curX = nx;
  }
}

let count = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (
      board[y][x] &&
      board[y + 1][x] &&
      board[y][x + 1] &&
      board[y + 1][x + 1]
    ) {
      count++;
    }
  }
}

console.log(count);

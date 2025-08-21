/** https://www.acmicpc.net/problem/17143 */

const [[R, C, N], ...sharkInfo] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 실제 상어 상태를 담는 board와, 이동 후 상태를 기록할 nextBoard를 준비한다.
 *
 * 2. 상어가 격자를 넘어 이동하는 경우는 왕복 이동이 된다.
 *    - 세로 이동 주기 = 2 * (R - 1)
 *    - 가로 이동 주기 = 2 * (C - 1)
 *    아무리 많은 이동을 해도 이 주기 (상하 혹은 좌우 왕복이동)으로 나눈 나머지가 위치가 된다.
 *    따라서 실제 이동 거리는 speed % 주기 로 줄일 수 있다.
 *
 * 3. moveOneShark 함수:
 *    - 상어의 방향이 0(위) 또는 1(아래)이면 speed % (2 * (R - 1)) 만큼 이동.
 *    - 방향이 2(오른쪽) 또는 3(왼쪽)이면 speed % (2 * (C - 1)) 만큼 이동.
 *
 * 4. 이동을 한 칸씩 진행하면서 좌표가 범위를 벗어나면 방향을 반대로 바꾼다.
 *    - 세로 이동: direction = 1(0 + 1) - direction -> direction이 0이면 1, 1이면 0
 *    - 가로 이동: direction = 5(2 + 3) - direction -> direction이 2면 3, 3이면 2
 *    이미 한 칸 벗어난 상태이므로, 반대 방향으로 2칸을 더해 위치를 보정한다.
 *
 * 5. while 루프를 통해 ny, nx를 계속 갱신하여 최종 좌표를 구한다.
 *    최종 좌표에 이미 상어가 있다면 크기를 비교해 큰 상어만 남긴다.
 *
 * 6. moveAllSharks 함수:
 *    - board에 있는 모든 상어를 moveOneShark로 이동시킨다.
 *    - 이동 결과를 nextBoard에 기록한 뒤 board로 반영하고, nextBoard는 초기화한다.
 *
 * 7. catchShark 함수:
 *    - 현재 낚시꾼 위치에서 가장 가까운 상어를 잡아 totalSize에 크기를 더한다.
 *    - 잡힌 상어는 보드에서 제거한다.
 *
 * 8. 낚시꾼을 왼쪽부터 오른쪽 끝까지 한 칸씩 이동시키며
 *    매 턴마다 catchShark → moveAllSharks 순으로 실행한다.
 *
 * 9. 최종적으로 totalSize를 출력한다.
 */

const dy = [-1, 1, 0, 0];
const dx = [0, 0, 1, -1];

let totalSize = 0;
let fisherPosition = -1;

const board = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => [])
);

const nextBoard = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => [])
);

for (let i = 0; i < N; i++) {
  const [y, x, speed, direction, size] = sharkInfo[i];
  board[y - 1][x - 1].push([speed, direction - 1, size]);
}

const moveOneShark = (y, x, speed, direction, size) => {
  let ny = y;
  let nx = x;

  if (direction === 0 || direction === 1) {
    let move = R === 1 ? 0 : speed % (2 * (R - 1));

    while (move--) {
      ny += dy[direction];

      if (ny < 0 || ny >= R) {
        direction = 1 - direction;
        ny += 2 * dy[direction];
      }
    }
  } else {
    let move = C === 1 ? 0 : speed % (2 * (C - 1));

    while (move--) {
      nx += dx[direction];

      if (nx < 0 || nx >= C) {
        direction = 5 - direction;
        nx += 2 * dx[direction];
      }
    }
  }

  const cell = nextBoard[ny][nx];

  if (cell.length === 0) {
    cell.push([speed, direction, size]);
  } else {
    if (cell[0][2] < size) {
      cell[0] = [speed, direction, size];
    }
  }
};

const moveAllSharks = () => {
  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (board[y][x].length) {
        const [speed, direction, size] = board[y][x][0];
        moveOneShark(y, x, speed, direction, size);
      }
    }
  }

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (nextBoard[y][x].length) {
        board[y][x] = nextBoard[y][x];
        nextBoard[y][x] = [];
      }
    }
  }
};

const catchShark = (fisherPosition) => {
  for (let r = 0; r < R; r++) {
    if (board[r][fisherPosition].length) {
      totalSize += board[r][fisherPosition][0][2];
      board[r][fisherPosition] = [];
      return;
    }
  }
};

while (++fisherPosition < C) {
  catchShark(fisherPosition);
  moveAllSharks();
}

console.log(totalSize);

/** https://www.acmicpc.net/problem/17144 */

const [[R, C, T], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input8.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 초가 지날때마다 먼지를 퍼뜨리는 spreadDust와 먼지 이동 함수 purifyAir 함수를 실행한다.
 * 2. spreadDust함수는 추가 dust와 남은 dust를 구하는 2개의 board를 가지고 있으며,
 * board 전체를 순회한다. 디음과 같이 구현된다.
 * 2-1. y, x 좌표에 먼지가 있으면, remainDustBoard에 기록한다.
 * 2-2. board 전체를 순회하면서 먼지가 있는 경우 상하좌우로 먼지를 퍼뜨린다. 만약 먼지양을 5등분 했을 때
 * 1보다 작다면 건너뛴다.
 * 2-3. 먼지양을 5로 나눠서 상하좌우에 퍼뜨리며 상하좌우 먼지를 addDustBoard에 기록한다. 상하좌우가
 * 공기청정기거나 좌표를 넘어가면 건너뛴다. 먼지를 addDustBoard에 기록할때다 먼지양의 1/5를 remainDustBoard에서 뺀다.
 * 2-4. addDustBoard와 remainDustBoard에 있는 먼지양을 합한게 board의 먼지양이므로 board에 먼지양을 새로 기록한다.
 *
 * 3. 시계방향/반시계방향 방향 테이블을 만들고, 그에 맞게 먼지의 위치를 이동시킨다.
 * 3-1. 현재 먼지, 현재 좌표, 현재 방향(direction)을 기록한다. 현재방향은 0,1,2,3으로 기록되어 있다.
 * 3-2. 먼지 이동 함수(purifyAir)를 실행한다. 이 때 newDust를 현재 좌표의 먼지값으로 설정하고, 현재 좌표의 먼지값 currentDust는
 * newDust의 초기화 값으로 사용해서 계속 이전 좌표의 먼지 = 현재 좌표의 새 먼지 상태로 유지한다.
 * 3-3. 이동할 다음 좌표를 구한다. 시계방향 회전 시 direction을 시계방향 테이블 (dy[direction], dx[direction])에 일치시키고,
 * 반시계방향으로 회전시 direction을 반시계방향 테이블(cdy[direction], cdx[direction])에 일치시킨다.
 * 3-4. 3-1~3-3을 while문으로 반복하면서 실행하다가 다음 좌표가 테이블을 벗어날 경우 direction 값을 1 업데이트 시켜서
 * 방향을 회전시킨다.
 * e.g.) 시계방향에서 dy[0], dx[0]은 동쪽, dy[1], dx[1]은 남쪽으로 가리킴. direction을 1 늘리면 좌표를 꺾는 효과가 남
 * 3-5. 방향을 회전시킨 다음 다음 좌표를 회전시킨 방향으로 업데이트하고 계속 먼지 이동을 진행한다.
 * 3-6. 다음 좌표가 -1이면 먼지가 공기 청정기로 빨려들어간 것이기 때문에 이동을 중지한다.
 *
 * 4. 현재 board에 구해진 먼지 합을 구하고 로그한다.
 */

const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

const cdy = [0, -1, 0, 1];
const cdx = [1, 0, -1, 0];

const machineY = [];

for (let y = 0; y < R; y++) {
  if (board[y][0] === -1) {
    machineY.push(y);
  }
}

const spreadDust = () => {
  const addDustBoard = Array.from({ length: R }, () => Array(C).fill(0));
  const remainDustBoard = Array.from({ length: R }, () => Array(C).fill(0));

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (board[y][x] <= 0) continue;

      remainDustBoard[y][x] = board[y][x];
      const spreadAmount = Math.floor(board[y][x] / 5);

      if (!spreadAmount) continue;

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];
        if (ny < 0 || nx < 0 || ny >= R || nx >= C) continue;
        if (board[ny][nx] === -1) continue;

        addDustBoard[ny][nx] += spreadAmount;
        remainDustBoard[y][x] -= spreadAmount;
      }
    }
  }

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (board[y][x] === -1) continue;
      board[y][x] = addDustBoard[y][x] + remainDustBoard[y][x];
    }
  }
};

const purifyAirClockwise = (y, x) => {
  let cy = y;
  let cx = x;
  let dir = 0;
  let newDust = 0;

  while (true) {
    if (board[cy][cx] === -1) break;
    [newDust, board[cy][cx]] = [board[cy][cx], newDust];

    let ny = cy + dy[dir];
    let nx = cx + dx[dir];

    if (ny < 0 || nx < 0 || ny >= R || nx >= C) {
      dir++;
      ny = cy + dy[dir];
      nx = cx + dx[dir];
    }

    cy = ny;
    cx = nx;
  }
};

const purifyAirCounterClockwise = (y, x) => {
  let cy = y;
  let cx = x;
  let dir = 0;
  let newDust = 0;

  while (true) {
    if (board[cy][cx] === -1) break;
    [newDust, board[cy][cx]] = [board[cy][cx], newDust];

    let ny = cy + cdy[dir];
    let nx = cx + cdx[dir];

    if (ny < 0 || nx < 0 || ny >= R || nx >= C) {
      dir++;
      ny = cy + cdy[dir];
      nx = cx + cdx[dir];
    }

    cy = ny;
    cx = nx;
  }
};

const purifyAir = () => {
  purifyAirClockwise(machineY[1], 1);
  purifyAirCounterClockwise(machineY[0], 1);
};

for (let t = 0; t < T; t++) {
  spreadDust();
  purifyAir();
}

let dustAmount = 0;

for (let y = 0; y < R; y++) {
  for (let x = 0; x < C; x++) {
    if (board[y][x] !== -1) dustAmount += board[y][x];
  }
}

console.log(dustAmount);

const [[N, M], [startY, startX, startDir], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 여러 루트중 최단거리 탐색이 아닌 상황에 맞게 한번씩 동작하기 때문에 while문으로 처리해야 함.
 * 2. 시계방향으로 이동하는 dy/dx direction 배열을 만든다.
 *
 * 3. 현재 좌표, 현재 로봇청소기의 시야 방향을 기록하는 curY, curX, curDir 변수를 만들고,
 * 시작 좌표, 시작 시야 방향으로 초기화한다.
 *
 * 4. 청소한 영역을 기록하는 cleaned 변수를 만든다.
 *
 * 5. 로봇 이동 loop를 돌기 시작하면서 현재 좌표가 청소가 가능하면 cleaned를 올려주고
 * 0을 -1로 바꿔서 "청소한 이동가능 영역"으로 표시한다.
 *
 * 6. 현재 좌표에서 바라보는 방향을 반시계로 도는 for문을 실행하며 청소가 불가능한 영역이면 건너뛰고,
 * 가능한 영역이면 그 영역을 다음 좌표로 기록하고 상위 while문 전체를 continue 처리한다.
 *
 * 7. 6에서 청소 가능 영역이 없었다면 후방으로 가는 좌표가 벽인지 체크한 후 벽이면 while문을 break,
 * 그렇지 않으면 뒤로 이동한다.
 *
 * 8. 루프가 끝났을 때 cleaned를 로그한다.
 */

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

let curY = startY;
let curX = startX;
let curDir = startDir;

let cleaned = 0;

robotMoveLoop: while (true) {
  if (board[curY][curX] === 0) {
    board[curY][curX] = -1;
    cleaned++;
  }

  for (let i = 0; i < 4; i++) {
    curDir = (curDir + 3) % 4;

    const ny = curY + dy[curDir];
    const nx = curX + dx[curDir];

    if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
    if (board[ny][nx] !== 0) continue;

    curY = ny;
    curX = nx;
    continue robotMoveLoop;
  }

  const backDir = (curDir + 2) % 4;
  const by = curY + dy[backDir];
  const bx = curX + dx[backDir];

  if (by < 0 || bx < 0 || by >= N || bx >= M) break;
  if (board[by][bx] === 1) break;

  curY = by;
  curX = bx;
}

console.log(cleaned);

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n');

let line = 0;

const N = +input[line++];
const K = +input[line++];

const PASSAGE = 0;
const APPLE = 1;
const SNAKE = 2;

const board = Array.from({ length: N }, () => Array(N).fill(PASSAGE));

for (let k = 0; k < K; k++) {
  const [appleY, appleX] = input[line++].split(' ').map(Number);
  board[appleY - 1][appleX - 1] = APPLE;
}

const L = +input[line++];
const commands = [];
let commandsFront = 0;

for (let l = 0; l < L; l++) {
  const [time, direction] = input[line++].split(' ');
  commands.push([+time, direction]);
}

/**
 * Pseudo Code
 * 1. 다음 이동 방향을 북,동,남,서를 0~3으로 지정해서 mod로 방향전환이 가능하도록 설정
 * 2. 현재 뱀 몸통의 좌표를 담은 snake 배열을 생성
 * 3. 현재 뱀의 진행방향을 담은 curDir 변수를 담고 동쪽 인덱스인 1로 초기화
 * 4. board에 시작 좌표를 2로 표시 (0 - 비었음, 1 - 사과, 2 - 뱀 몸통)
 * 5. while 루프 시작하면서 시간을 늘려줌. 현재 머리에 curDir 방향으로 좌표를 더한 ny, nx를 구함.
 * 6. 다음 머리 좌표가 될 ny / nx가 board를 넘어가면 break
 * 7. 다음 머리 좌표가 이미 뱀의 몸통(board[ny][nx] === 2)인 경우 break
 * 8. 다음 머리 좌표에 사과가 없다면 꼬리를 pop한 다음 꼬리 좌표의 값을 0으로 바꿈.
 * 9. 다음 머리 좌표를 snake에 unshift
 *
 * 10. 만약 현재 시간이 명령어 실행 시간과 일치하다면, 명령어에 따라 curDir를 시계방향 혹은 반시계방향으로 돌려
 * 머리의 방향을 바꿔줌.
 *
 * 11. 루프 종료 이후 time 로그
 */

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

let curDir = 1;
const snake = [[0, 0]];

board[0][0] = SNAKE;

let time = 0;

while (true) {
  time++;

  const [curHeadY, curHeadX] = snake[0];
  const [ny, nx] = [curHeadY + dy[curDir], curHeadX + dx[curDir]];

  if (ny < 0 || nx < 0 || ny >= N || nx >= N) break;
  if (board[ny][nx] === SNAKE) break;

  if (board[ny][nx] !== APPLE) {
    const [ty, tx] = snake.pop();
    board[ty][tx] = PASSAGE;
  }

  board[ny][nx] = SNAKE;
  snake.unshift([ny, nx]);

  if (commandsFront < commands.length) {
    const [commandTime, commandDirection] = commands[commandsFront];

    if (commandTime === time) {
      if (commandDirection === 'L') {
        curDir = (curDir + 3) % 4;
      } else {
        curDir = (curDir + 1) % 4;
      }

      commandsFront++;
    }
  }
}

console.log(time);

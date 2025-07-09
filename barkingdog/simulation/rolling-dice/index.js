const [[N, M, startY, startX, K], ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const commands = input.pop();
const board = input;

/**
 * Pseudo Code
 * 1. 한쪽으로 밀면 반대편 좌표가 탑으로 가고, 미는편 좌표가 바닥으로 가고, 바닥 좌표가 반대편 좌표로 감.
 * 2. 현재 주사위의 숫자를 기록하는 dice 배열을 만듬.
 *
 * 3. 굴렸을 때 방향과 바닥이 닿는 좌표를 인자로 받는 rollDice 함수 생성
 * 3-1. 바닥 숫자가 0이면 미는편 좌표를 바닥에 새긴 뒤, 1번에 맞춰서 dice를 변경해줌
 * 3-2. 바닥 숫자가 0이 아니라면 미는편에 바닥 숫자를 새긴 뒤, 1번에 맞춰서 dice를 변경해준 다음 바닥 숫자를 0으로 변경함.
 * 3-3. 모든 작업이 끝난 이후 위 주사위의 숫자를 정답 배열에 넣는다.
 *
 * 4. 시작 좌표를 curY, curX에 지정하고 명령어 목록을 좌표로 돈다.
 *
 * 5. 명령어별로 다음 좌표인 ny, nx를 구하고, ny, nx가 좌표를 벗어나면 다음 명령어로 건너뛰고
 * 벗어나지 않으면 rollDice(command, ny, nx)를 실행한 다음, curY와 curX를 ny, nx로 초기화한다.
 *
 * 6. 정답 배열을 문자열로 변경하여 리턴한다.
 */

const dice = [0, 0, 0, 0, 0, 0];
const answer = [];

const rollDice = (command, floorY, floorX) => {
  const floorNum = board[floorY][floorX];

  const [top, right, left, north, south, bottom] = dice;

  switch (command) {
    case 1:
      dice[0] = left;
      dice[1] = top;
      dice[2] = bottom;
      dice[5] = right;
      break;
    case 2:
      dice[0] = right;
      dice[1] = bottom;
      dice[2] = top;
      dice[5] = left;
      break;
    case 3:
      dice[0] = south;
      dice[3] = top;
      dice[4] = bottom;
      dice[5] = north;
      break;
    case 4:
      dice[0] = north;
      dice[3] = bottom;
      dice[4] = top;
      dice[5] = south;
      break;
  }

  if (floorNum === 0) {
    board[floorY][floorX] = dice[5];
  } else {
    dice[5] = board[floorY][floorX];
    board[floorY][floorX] = 0;
  }

  answer.push(dice[0]);
};

let curY = startY;
let curX = startX;

for (let i = 0; i < K; i++) {
  const direction = commands[i];
  let ny = curY;
  let nx = curX;

  switch (direction) {
    case 1:
      nx++;
      break;
    case 2:
      nx--;
      break;
    case 3:
      ny--;
      break;
    case 4:
      ny++;
      break;
  }

  if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;

  rollDice(direction, ny, nx);
  curY = ny;
  curX = nx;
}

console.log(answer.join('\n'));

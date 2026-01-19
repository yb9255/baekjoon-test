/** https://www.acmicpc.net/problem/16935 */

const [[, , R], ...rest] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 1번/2번 연산은 단순 상하반전, 좌우반전이므로 내장 메소드로 처리
 *
 * 2. 시계방향으로 회전하는 모습을 머릿속으로 상상해보면, y와 x가 뒤바뀌고 기존의 column이 row로 되면서
 * index가 반전이 일어남을 알 수 있음. temp 보드에 이를 반영해서 기록 후 시계회전 temp 보드를 리턴
 *
 * 3. 반시계방향으로 회전하는 모습을 머릿속으로 상상해보면, y와 x가 뒤바뀌고 기존의 row가 column이 되면서
 * index가 반전이 일어남을 알 수 있음. temp 보드에 이를 반영해서 기록 후 시계회전 temp 보드를 리턴
 *
 * 4. 5, 6번 연산의 경우 1/4만큼만 회전하면서 좌표에 대응하는 위치를 계산해서 옮긴다.
 * 예를 들어 1번 영역의 y, x에 대응하는 2번 영역은 y, x + colHalf, 3번 영역은 y + rowHalf, x 4번영역은 y + rowHalf, x + colHalf
 * 가 되는데, 1번 -> 4번이면 y,x -> y + rowHalf, x+ colHalf, 2번 -> 3번이면 y, x + colHalf -> y + rowHalf, x... 이렇게 이동
 *
 * 5. 3 ~ 4번 연산때문에 N과 M이 고정이 아니므로 3 ~ 6번 연산시 매번 n과 m을 직접 구해주어야 한다.
 *
 * 6. 연산 순서에 맞춰 연산을 순차적으로 실행한 다음 결과 보드를 로그한다.
 */

const ops = rest.pop();

const op1 = (board) => board.reverse();
const op2 = (board) => board.map((row) => row.reverse());

const op3 = (board) => {
  const n = board.length;
  const m = board[0].length;

  const temp = Array.from({ length: m }, () => Array(n).fill(0));

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      temp[x][n - 1 - y] = board[y][x];
    }
  }

  return temp;
};

const op4 = (board) => {
  const n = board.length;
  const m = board[0].length;

  const temp = Array.from({ length: m }, () => Array(n).fill(0));

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      temp[m - 1 - x][y] = board[y][x];
    }
  }

  return temp;
};

const op5 = (board) => {
  const n = board.length;
  const m = board[0].length;

  const halfN = n / 2;
  const halfM = m / 2;

  const temp = Array.from({ length: n }, () => Array(m).fill(0));

  for (let y = 0; y < halfN; y++) {
    for (let x = 0; x < halfM; x++) {
      temp[y][x + halfM] = board[y][x];
      temp[y + halfN][x + halfM] = board[y][x + halfM];
      temp[y + halfN][x] = board[y + halfN][x + halfM];
      temp[y][x] = board[y + halfN][x];
    }
  }

  return temp;
};

const op6 = (board) => {
  const n = board.length;
  const m = board[0].length;

  const halfN = n / 2;
  const halfM = m / 2;

  const temp = Array.from({ length: n }, () => Array(m).fill(0));

  for (let y = 0; y < halfN; y++) {
    for (let x = 0; x < halfM; x++) {
      temp[y + halfN][x] = board[y][x];
      temp[y + halfN][x + halfM] = board[y + halfN][x];
      temp[y][x + halfM] = board[y + halfN][x + halfM];
      temp[y][x] = board[y][x + halfM];
    }
  }

  return temp;
};

let result = rest;

for (let r = 0; r < R; r++) {
  const op = ops[r];

  switch (op) {
    case 1:
      result = op1(result);
      break;
    case 2:
      result = op2(result);
      break;
    case 3:
      result = op3(result);
      break;
    case 4:
      result = op4(result);
      break;
    case 5:
      result = op5(result);
      break;
    case 6:
      result = op6(result);
      break;
    default:
  }
}

console.log(result.map((line) => line.join(' ')).join('\n'));

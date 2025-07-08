const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 상하좌우 이동 방향은 보드를 회전시키는 형태로도 구현할 수 있다.
 * 여기는 모든 좌표를 일괄적으로 한쪽 방향으로 이동시켜야 하므로 보드를 회전하는게 유리하다
 * 예를 들어, 왼쪽으로 모두 옮겨야되는 경우 보드를 왼쪽으로 회전시킨다.
 *
 * 2. 현재 보드를 rotate하는 함수를 생성한다.
 *
 * 3. 보드 내  숫자를 move하는 함수를 생성한다.
 * 3-1. move는 dir를 인자로 받으며, dir 숫자만큼 board를 시계방향으로 회전시켜서 모든 좌표의
 * 상하좌우 이동을 컨트롤할 수 있도록 한다. move 함수는 항상 왼쪽으로 숫자를 밀거기 때문에
 * 오른쪽이나 아래, 위로 숫자를 밀고 싶다면 보드 전체를 회전시켜서 방향을 맞춰야 한다.
 * 3-2. 좌표 전체를 순회하며 새로운 행(newRow)을 생성하고 현재 행 중에 값이 있는 가장 마지막 idx를 기록하는 idx
 * 변수도 생성한다.
 * 3-3. 좌표를 순회하며 현재 좌표의 값이 0인 경우 continue한다.
 * 3-4. 현재 좌표가 값이 있는데 newRow[idx]에 값이 0인 경우, 현재 좌표의 값을 idx로 옮긴다.
 * idx는 값이 있는 가장 마지막 인덱스이므로 업데이트 되지 않는다.
 * 3-5. 현재 좌표가 값이 있으며 newRow[idx]에 있는 값이 현재 값과 일치하면, newRow[idx]에 있는
 * 값을 2배로 증가시키고, 한번 합쳐져서 값이 올라간 경우 또 합쳐지면 안되므로 idx를 증가시킨다.
 * 현재 좌표 값은 합쳐져서 사라지므로 newRow에 기록하지 않는다.
 * 3-6. 현재 좌표가 값이 있으며 newRow[idx]에 있는 값이 현재 값과 일치하지 않으면, idx를 1 늘려서
 * 값이 있는 마지막 인덱스를 업데이트 해준 뒤 값을 옮겨야 한다. newRow[++idx]에 현재 좌표의 값을 기록한다.
 *
 * 4. 0부터 1023까지 순회한다. (moveCase) moveCase를 4진법으로 바꾸면 00000부터 33333까지 구할 수 있는데
 * 이 값으로 상하좌우 순회 경우의 수를 모두 구한다.
 *
 * 5. 기존 board를 복사하여 curBoard 변수에 배치한다.
 *
 * 6. 0부터 4까지 순회하면서 5번 이동을 구현하는 루프를 생성한다. (rotateCount)
 * 한번 순회할때마다 현재 moveCase의 4 mod를 구해 dir로 설정하고, 해당 dir를 move 함수에 넣어
 * 실행해서 이동 경우의 수를 만든다.
 *
 * 7. 6을 통해서 5번 이동이 끝났으면, 현재 보드 전체를 순회하면서 answer 값을 업데이트한다.
 * 8. 1024까지 6~7을 반복하고 answer를 리턴한다.
 */

let curBoard;

const rotateBoard = () => {
  const rotatedBoard = Array.from({ length: N }, () => Array(N).fill(0));

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      rotatedBoard[x][N - 1 - y] = curBoard[y][x];
    }
  }

  curBoard = rotatedBoard;
};

const move = (dir) => {
  for (let i = 0; i < dir; i++) rotateBoard();

  for (let y = 0; y < N; y++) {
    const newRow = Array(N).fill(0);
    let idx = 0;

    for (let x = 0; x < N; x++) {
      const num = curBoard[y][x];
      if (num === 0) continue;

      if (newRow[idx] === 0) {
        newRow[idx] = num;
      } else if (newRow[idx] === num) {
        newRow[idx] *= 2;
        idx++;
      } else {
        newRow[++idx] = num;
      }
    }

    curBoard[y] = newRow;
  }
};

let answer = 0;

for (let moveCase = 0; moveCase < 1024; moveCase++) {
  curBoard = board.map((row) => row.slice());
  let remainingCase = moveCase;

  for (let rotateCount = 0; rotateCount < 5; rotateCount++) {
    const dir = remainingCase % 4;
    remainingCase = Math.floor(remainingCase / 4);
    move(dir);
  }

  curBoard.forEach((row) => {
    answer = Math.max(answer, ...row);
  });
}

console.log(answer);

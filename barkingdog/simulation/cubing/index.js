/** https://www.acmicpc.net/problem/5373 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

/** Pseudo Code
 * 1. [면][행][열]의 값을 가지는 cube 3차원 배열 생성
 * e.g.) cube[2][1][1]은 2번째 면의 (1, 1) 좌표의 색
 *
 * 2. 윗면은 0, 아랫면은 1, 앞면은 2, 뒷면은 3, 왼쪽 면은 4, 오른쪽 면은 5로 지정
 *
 * 3. 윗면은 흰색(w), 아랫면은 노란색(y), 앞면은 빨간색(r), 뒷면은 오렌지색(o),
 * 왼쪽 면은 초록색(g), 오른쪽 면은 파란색(b) 을 모든 좌표가 가지도록 기본 값으로 설정
 *
 * 4. 면을 회전하는 rotateFace 함수를 생성
 * 4-1. 시계방향 회전 [x][2 - y], 반시계방향 회전이면 [2-x][y]로 회전을 맞춤
 *
 * 5. 회전한 면과 인접한 줄을 회전하는 rotateAdjacentLines 함수를 생성
 * 5-1. 중간 줄을 회전시키는 케이스는 없으므로 계산에서 제외하고, 각 면만 시계방향 회전/반시계방향 회전을 일일히 구현하면 됨
 *
 * 6. 이 때, FRONT와 BACK은 해당 면을 정면으로 봤을 때 UP의 마지막 줄 (UP[2])와 마주한다고 가정한 좌표이다.
 * 6-1. 예를 들어 FRONT를 바라보고 있을 때 UP의 가장 먼 행부터 인덱스가 0, 1, 2이고 FRONT와 인접한 인덱스가 2라면
 * BACK을 바라보고 있을 때 가장 먼 UP 행은 FRONT 시점에서는 2가 되고 BACK과 인접하는 UP 인덱스는 0이 된다.
 * 6-2. 그러나 BACK의 좌표는 BACK을 기준으로 바라봤을 때 가장 먼 UP 인덱스를 0, 1, 2로 여기고 좌표가 기록되어 있다.
 * 즉 FRONT에서 UP 인덱스 0, 1, 2는 BACK에서는 2, 1, 0에 해당하고, UP의 2에 인접하는 인덱스를 맨 윗줄로 여긴다.
 * 6-3. 이를 요약하면 FRONT[0]이 회전하면서 움직일 때 이에 대응하는 BACK의 인덱스는 2가 된다.
 * 6-4. 또한 FRONT와 BACK은 마주보는 관계이므로 좌우 대칭이 발생한다. 따라서 FRONT[0][0]에 대응하는 BACK의 인덱스는 [2][2]가 되며,
 * 이를 치환하면 FRONT[0][i]는 BACK[2][2 - i]가 된다.
 * 6-5. UP과 DOWN 역시 같은 논리가 적용된다.
 *
 * 7. FRONT를 바라보는 기준으로 회전을 했기 때문에 LEFT, RIGHT를 돌리는 경우 경우 행끼리 변경되는 로직이 발생한다.
 *
 * 8. FRONT와 BACK을 회전하는 경우, LEFT으로 오른쪽 줄 2번째가 UP의 가장 아랫줄 0번째로 가는 등 인덱스가 복잡하게 꼬이므로
 * 주의가 필요
 *
 * 9. 이를 감안하여 시계방향, 반시계방향 회전을 커맨드에 맞게 실행한다.
 * 9-1. 문제의 계산 횟수를 감안하면 시계방향으로 3번 실행헤서 반시계방향을 만들어도 시간 복잡도에 문제가 없다.
 * 9-2. 시계방향 / 반시계방향 회전을 일일히 구현해야 하므로 시계 방향 3번이 오타 방지가 더 좋을 수 있음.
 *
 * 10. 정답 배열에 가장 윗면 세줄을 push
 */

let lineIndex = 0;

const UP = 0;
const DOWN = 1;
const FRONT = 2;
const BACK = 3;
const LEFT = 4;
const RIGHT = 5;

const faceColors = ['w', 'y', 'r', 'o', 'g', 'b'];
let cube;

const initCube = () => {
  cube = Array.from({ length: 6 }, (_, faceIdx) =>
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => faceColors[faceIdx])
    )
  );
};

const rotateFace = (faceIdx, isClockwise) => {
  const tempFace = Array.from({ length: 3 }, () => Array(3));

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (isClockwise) {
        tempFace[x][2 - y] = cube[faceIdx][y][x];
      } else {
        tempFace[2 - x][y] = cube[faceIdx][y][x];
      }
    }
  }

  cube[faceIdx] = tempFace;
};

const rotateAdjacentLines = (faceIdx, isClockwise) => {
  let rotateIndex = isClockwise ? 1 : 3;

  while (rotateIndex--) {
    if (faceIdx === UP) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[FRONT][0][i];
        cube[FRONT][0][i] = cube[RIGHT][0][i];
        cube[RIGHT][0][i] = cube[BACK][2][2 - i];
        cube[BACK][2][2 - i] = cube[LEFT][0][i];
        cube[LEFT][0][i] = temp;
      }
    } else if (faceIdx === DOWN) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[FRONT][2][i];
        cube[FRONT][2][i] = cube[LEFT][2][i];
        cube[LEFT][2][i] = cube[BACK][0][2 - i];
        cube[BACK][0][2 - i] = cube[RIGHT][2][i];
        cube[RIGHT][2][i] = temp;
      }
    } else if (faceIdx === LEFT) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][i][0];
        cube[UP][i][0] = cube[BACK][i][0];
        cube[BACK][i][0] = cube[DOWN][i][0];
        cube[DOWN][i][0] = cube[FRONT][i][0];
        cube[FRONT][i][0] = temp;
      }
    } else if (faceIdx === RIGHT) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][i][2];
        cube[UP][i][2] = cube[FRONT][i][2];
        cube[FRONT][i][2] = cube[DOWN][i][2];
        cube[DOWN][i][2] = cube[BACK][i][2];
        cube[BACK][i][2] = temp;
      }
    } else if (faceIdx === FRONT) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][2][i];
        cube[UP][2][i] = cube[LEFT][2 - i][2];
        cube[LEFT][2 - i][2] = cube[DOWN][0][2 - i];
        cube[DOWN][0][2 - i] = cube[RIGHT][i][0];
        cube[RIGHT][i][0] = temp;
      }
    } else if (faceIdx === BACK) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][0][i];
        cube[UP][0][i] = cube[RIGHT][i][2];
        cube[RIGHT][i][2] = cube[DOWN][2][2 - i];
        cube[DOWN][2][2 - i] = cube[LEFT][2 - i][0];
        cube[LEFT][2 - i][0] = temp;
      }
    }
  }
};

const rotateCube = (faceIdx, isClockwise) => {
  rotateFace(faceIdx, isClockwise);
  rotateAdjacentLines(faceIdx, isClockwise);
};

const T = +input[lineIndex++][0];
const answer = [];

for (let t = 0; t < T; t++) {
  initCube();

  const N = +input[lineIndex++][0];
  const commands = input[lineIndex++];

  for (let i = 0; i < N; i++) {
    const command = commands[i];
    const face = command[0];
    const isClockwise = command[1] === '+';

    if (face === 'F') {
      rotateCube(FRONT, isClockwise);
    } else if (face === 'B') {
      rotateCube(BACK, isClockwise);
    } else if (face === 'U') {
      rotateCube(UP, isClockwise);
    } else if (face === 'D') {
      rotateCube(DOWN, isClockwise);
    } else if (face === 'L') {
      rotateCube(LEFT, isClockwise);
    } else {
      rotateCube(RIGHT, isClockwise);
    }
  }

  for (let i = 0; i < 3; i++) {
    answer.push(cube[UP][i].join(''));
  }
}

console.log(answer.join('\n'));

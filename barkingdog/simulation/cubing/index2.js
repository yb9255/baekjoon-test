/** https://www.acmicpc.net/problem/5373 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

/** Pseudo Code
 1. 시계방향 / 반시계방향 모두 구현한 케이스
 */

let lineIndex = 0;

const UP = 0;
const DOWN = 1;
const FRONT = 2;
const BACK = 3;
const LEFT = 4;
const RIGHT = 5;

const colors = ['w', 'y', 'r', 'o', 'g', 'b'];
let cube;

function initCube() {
  cube = Array.from({ length: 6 }, (_, faceIndex) =>
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => colors[faceIndex])
    )
  );
}

const rotateFace = (face, isClockwise) => {
  const tempFace = Array.from({ length: 3 }, () => Array(3).fill(null));

  if (isClockwise) {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        tempFace[x][2 - y] = cube[face][y][x];
      }
    }
  } else {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        tempFace[2 - x][y] = cube[face][y][x];
      }
    }
  }

  cube[face] = tempFace;
};

const rotateAdjacentLines = (face, isClockwise) => {
  if (isClockwise) {
    if (face === FRONT) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][2][i];
        cube[UP][2][i] = cube[LEFT][2 - i][2];
        cube[LEFT][2 - i][2] = cube[DOWN][0][2 - i];
        cube[DOWN][0][2 - i] = cube[RIGHT][i][0];
        cube[RIGHT][i][0] = temp;
      }
    } else if (face === BACK) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][0][i];
        cube[UP][0][i] = cube[RIGHT][i][2];
        cube[RIGHT][i][2] = cube[DOWN][2][2 - i];
        cube[DOWN][2][2 - i] = cube[LEFT][2 - i][0];
        cube[LEFT][2 - i][0] = temp;
      }
    } else if (face === LEFT) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][i][0];
        cube[UP][i][0] = cube[BACK][i][0];
        cube[BACK][i][0] = cube[DOWN][i][0];
        cube[DOWN][i][0] = cube[FRONT][i][0];
        cube[FRONT][i][0] = temp;
      }
    } else if (face === RIGHT) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][i][2];
        cube[UP][i][2] = cube[FRONT][i][2];
        cube[FRONT][i][2] = cube[DOWN][i][2];
        cube[DOWN][i][2] = cube[BACK][i][2];
        cube[BACK][i][2] = temp;
      }
    } else if (face === UP) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[FRONT][0][i];
        cube[FRONT][0][i] = cube[RIGHT][0][i];
        cube[RIGHT][0][i] = cube[BACK][2][2 - i];
        cube[BACK][2][2 - i] = cube[LEFT][0][i];
        cube[LEFT][0][i] = temp;
      }
    } else {
      for (let i = 0; i < 3; i++) {
        const temp = cube[FRONT][2][i];
        cube[FRONT][2][i] = cube[LEFT][2][i];
        cube[LEFT][2][i] = cube[BACK][0][2 - i];
        cube[BACK][0][2 - i] = cube[RIGHT][2][i];
        cube[RIGHT][2][i] = temp;
      }
    }
  } else {
    if (face === FRONT) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][2][i];
        cube[UP][2][i] = cube[RIGHT][i][0];
        cube[RIGHT][i][0] = cube[DOWN][0][2 - i];
        cube[DOWN][0][2 - i] = cube[LEFT][2 - i][2];
        cube[LEFT][2 - i][2] = temp;
      }
    } else if (face === BACK) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][0][i];
        cube[UP][0][i] = cube[LEFT][2 - i][0];
        cube[LEFT][2 - i][0] = cube[DOWN][2][2 - i];
        cube[DOWN][2][2 - i] = cube[RIGHT][i][2];
        cube[RIGHT][i][2] = temp;
      }
    } else if (face === LEFT) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][i][0];
        cube[UP][i][0] = cube[FRONT][i][0];
        cube[FRONT][i][0] = cube[DOWN][i][0];
        cube[DOWN][i][0] = cube[BACK][i][0];
        cube[BACK][i][0] = temp;
      }
    } else if (face === RIGHT) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[UP][i][2];
        cube[UP][i][2] = cube[BACK][i][2];
        cube[BACK][i][2] = cube[DOWN][i][2];
        cube[DOWN][i][2] = cube[FRONT][i][2];
        cube[FRONT][i][2] = temp;
      }
    } else if (face === UP) {
      for (let i = 0; i < 3; i++) {
        const temp = cube[FRONT][0][i];
        cube[FRONT][0][i] = cube[LEFT][0][i];
        cube[LEFT][0][i] = cube[BACK][2][2 - i];
        cube[BACK][2][2 - i] = cube[RIGHT][0][i];
        cube[RIGHT][0][i] = temp;
      }
    } else {
      for (let i = 0; i < 3; i++) {
        const temp = cube[FRONT][2][i];
        cube[FRONT][2][i] = cube[RIGHT][2][i];
        cube[RIGHT][2][i] = cube[BACK][0][2 - i];
        cube[BACK][0][2 - i] = cube[LEFT][2][i];
        cube[LEFT][2][i] = temp;
      }
    }
  }
};

const rotateCube = (face, isClockwise) => {
  rotateFace(face, isClockwise);
  rotateAdjacentLines(face, isClockwise);
};

const T = +input[lineIndex++][0];
const answer = [];

for (let tc = 0; tc < T; tc++) {
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

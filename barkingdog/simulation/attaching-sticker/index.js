const [[N, M, K], ...papers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 각 모눈종이의 행렬길이와 모눈종이 전체를 저장하는 임시변수 rowSize, columnSize, paper를 만든다.
 * 2. 노트북 역할을 하는 2차원 배열 notebook를 만든다.
 *
 * 3. 모눈종이를 붙일 수 있는지 여부를 파악하는 isAttachable 함수를 만든다.
 * 3-1. 이 함수는 모눈종이 시작 지점인 y, x를 인자로 받으며 rowSize/columnSize를 for문으로 돈다.
 * 3-2. y, x 지점에서 모눈종이 영역만큼 순회하면서 이미 스티커가 붙여져 있는 경우 붙일 수 없다고 인지하고
 * false를 리턴, 그렇지 않다면 true를 리턴
 *
 * 4. 모눈종이를 노트북에 붙이는 attach 함수를 만든다.
 * 4-1. 인자로 모눈종이 시작 지점인 y, x를 인자로 받으며 notebook의 y, x부터 y + rowSize, x + columnSize만큼
 * 순회하면서 스티커 영역이면 스티커를 붙여준다.
 *
 * 5. 스티커를 붙일 수 없을 때 모는중이를 회전하는 rotatePaper 함수를 만든다.
 * 5-1. paper와 똑같은 size의 rotatedPaper 2차원 배열을 생성한다.
 * 5-2. 모눈종이를 실제로 뒤집어보면, 예를 들어 3x3을 뒤집어보면 A[3][2] -> B[0][3]과 같이 변경되는 것을 볼 수 있는데,
 * 규칙을 찾아보면 뒤집었을때 좌표는 A의 y는 B의 x로 가고, A의 x는 B의 y로 가는데 대칭하는 숫자로 간다.
 * (e.g. 4,3,2,1 수열 A에서 3의 대칭되는 수는 2, 4의 대칭되는 수는 1이 된다.)
 * 5-3. 역순으로 대칭되는 숫자를 구하려면, 전체 index(y축이면 rowSize)에서 내 index(y축이면 y좌표)를 빼면 된다.
 * 따라서 A[y][x]를 역순으로 만드는 방법은 A[x][rowSize - 1 - y].
 * 5-4. 5-3에 의거해 rotatedPaper[x][rowSize - 1 - y]에 paper[y][x]를 기록한다.
 * 5-5. rotatePaper로 paper를 바꾸고, rowSize와 colSize를 swap한다.
 *
 * 6. K만큼 순회하는 for문을 실행한다.
 * 7. 현재 차례인 모눈종이의 행과 열, 모눈종이를 rowSize, columnSize, paper에 담는다.
 *
 * 8. N에서 현재 모눈종이의 열을 뺀 만큼의 y, M에서 현재 모눈종이의 행만큼 뺀 x 만큼만 순회하면서
 * 모눈종이를 붙일 수 있는 가능한 최대의 영역을 순회한다.
 *
 * 9. 현재 순회하는 y,x좌표가 모눈종이를 붙일 수 있다고 판단하면, 모눈종이를 붙이고 루프를 종료한다.
 * 10. 모눈종이를 붙일 수 없다고 판단하면 rotate 함수를 실행해서 모눈종이를 회전한다.
 * 11. 10번까지 해서 최종적으로 notebook에 1이 표시된 개수를 리턴한다.
 */

let rowSize, columnSize, paper;
const notebook = Array.from({ length: N }, () => Array(M).fill(0));

const isAttachable = (y, x) => {
  for (let paperY = 0; paperY < rowSize; paperY++) {
    for (let paperX = 0; paperX < columnSize; paperX++) {
      if (
        notebook[y + paperY][x + paperX] === 1 &&
        paper[paperY][paperX] === 1
      ) {
        return false;
      }
    }
  }

  return true;
};

const attach = (y, x) => {
  for (let paperY = 0; paperY < rowSize; paperY++) {
    for (let paperX = 0; paperX < columnSize; paperX++) {
      if (paper[paperY][paperX] === 1) {
        notebook[y + paperY][x + paperX] = 1;
      }
    }
  }
};

const rotatePaper = () => {
  const rotatedPaper = Array.from({ length: columnSize }, () => Array(rowSize));

  for (let y = 0; y < rowSize; y++) {
    for (let x = 0; x < columnSize; x++) {
      rotatedPaper[x][rowSize - 1 - y] = paper[y][x];
    }
  }

  paper = rotatedPaper;
  [rowSize, columnSize] = [columnSize, rowSize];
};

let line = 0;

for (let i = 0; i < K; i++) {
  [rowSize, columnSize] = papers[line++];
  paper = papers.slice(line, line + rowSize);
  line += rowSize;

  outer: for (let rotateCount = 0; rotateCount < 4; rotateCount++) {
    for (let y = 0; y <= N - rowSize; y++) {
      for (let x = 0; x <= M - columnSize; x++) {
        if (isAttachable(y, x)) {
          attach(y, x);
          break outer;
        }
      }
    }

    rotatePaper();
  }
}

let answer = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    answer += notebook[y][x];
  }
}

console.log(answer);

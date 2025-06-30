const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code
 * 1. 비숍을 놓을 수 있는 백색 보드 좌표와 흑색 보드 좌표를 각각 0, 1번 인덱스 배열에 보관하는 diagonalBoard 배열을 생성한다.
 * 2. board위 특정 좌표가 1이라면, boardColor는 y+x/2의 나머지 0이 나오면 흰색, 1이 나오면 검은색이 되도록 한다.
 *
 * 3. y - x가 같은 모든 좌표는 같은 우하단 대각선에 있다는 의미이므로, 같은 대각선상을 공유하는 좌표로 볼 수 있따.
 * 따라서 diagonalBoard[<바닥 색상>][y - x]에 배열을 둔 뒤, 그 배열에 해당하는 모든 좌표를 배열에 넣는다.
 * 이 때, y - x는 음수가 될 수 있기 때문에 N - 1을 더해서 양수가 될 수 있도록 한다.
 *
 * 4. 해당 대각선을 점유하는 비숍이 있는지 여부를 기록하는 usedDiagonal 배열을 만든다.
 * 5. 백색 보드에서의 비숍이 놓일 수 있는 개수, 흑색 보드에 비숍이 놓일 수 있는 개수를 저장하는 정답 배열을 만든다.
 * 6. countBishop(<색상>, <현재 diagonalIdx>, <비숍 개수>) 함수를 실행한다.
 *
 * 7. countBishop 함수는 현재 diagonalBoard[색상][diagonalIdx]에 기록된 모든 좌표를 순회하면서,
 *    해당 좌표에 비숍을 놓을 수 있는지 확인한다.
 *
 *    비숍은 ↘(y - x), /(y + x) 방향으로 이동할 수 있기 때문에, 같은 / 방향 대각선(y + x)에 이미
 *    다른 비숍이 놓여 있다면 충돌이 발생한다. 따라서 usedDiagonalBoard[색상][y + x] 값이 true라면
 *    해당 좌표는 건너뛴다.
 *
 *    만약 충돌이 없다면, 해당 / 방향 대각선을 "사용 중"이라고 표시하기 위해
 *    usedDiagonalBoard[색상][y + x]를 true로 설정한 뒤,
 *    countBishop(색상, diagonalIdx + 1, bishopCount + 1)로 재귀 호출하여
 *    비숍을 놓은 경우의 수를 탐색한다.
 *
 *    이후 재귀가 끝나면 다른 탐색 경로에서 해당 대각선을 다시 사용할 수 있도록
 *    usedDiagonalBoard[색상][y + x]를 false로 되돌려 백트래킹을 수행한다.
 *
 *    또한 현재 diagonalIdx 대각선에서 아예 비숍을 놓지 않는 경우도 고려해야 하므로,
 *    별도로 countBishop(색상, diagonalIdx + 1, bishopCount)를 호출해
 *    "비숍을 놓지 않는 경우"의 경로도 탐색한다.
 *
 * 8. 이번 diagonalIndex에 bishop을 두지 않는 재귀의 경우의 수도 체크하기 위해, 좌표 순회를 하지 않고
 * countBishop(<색상>, index + 1, 비숍 개수) 재귀도 실행한다.
 *
 * 9. 백색 바닥인 케이스와 흑색 바닥인 케이스 모두 countBishop을 실행한 다음, 정답을 합쳐서 리턴한다.
 */

const diagonalBoard = Array.from({ length: 2 }, () =>
  Array.from({ length: 2 * N }, () => []),
);

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 1) {
      const boardColor = (y + x) % 2;
      const diagonalIndex = y - x + N - 1;
      diagonalBoard[boardColor][diagonalIndex].push([y, x]);
    }
  }
}

const usedDiagonalBoard = Array.from({ length: 2 }, () =>
  Array(2 * N).fill(false),
);

const answer = [0, 0];

const countBishop = (boardColor, diagonalIndex, bishopCount) => {
  if (diagonalIndex === 2 * N) {
    answer[boardColor] = Math.max(answer[boardColor], bishopCount);
    return;
  }

  for (const [y, x] of diagonalBoard[boardColor][diagonalIndex]) {
    const rightTopDiagonalIndex = y + x;
    if (usedDiagonalBoard[boardColor][rightTopDiagonalIndex]) continue;

    usedDiagonalBoard[boardColor][rightTopDiagonalIndex] = true;
    countBishop(boardColor, diagonalIndex + 1, bishopCount + 1);
    usedDiagonalBoard[boardColor][rightTopDiagonalIndex] = false;
  }

  countBishop(boardColor, diagonalIndex + 1, bishopCount);
};

countBishop(0, 0, 0);
countBishop(1, 0, 0);

console.log(answer[0] + answer[1]);

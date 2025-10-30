/** https://www.acmicpc.net/problem/2447 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo code
 * 1. 전체 좌표를 기록하는 board를 생성해둠. 기본적으로 빈 배열
 * 2. size가 1이면 그 좌표에 *을 표시함.
 * 3. size가 1 아래라면 3등분해서 재귀를 돌리되 가운데 좌표는 건너뜀.
 */

const board = Array.from({ length: N }, () => Array(N).fill(' '));

const printStar = (y, x, size) => {
  if (size === 1) {
    board[y][x] = '*';
    return;
  }

  const nextSize = size / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i === 1 && j === 1) continue;
      printStar(y + i * nextSize, x + j * nextSize, nextSize);
    }
  }
};

printStar(0, 0, N);

console.log(board.map((line) => line.join('')).join('\n'));

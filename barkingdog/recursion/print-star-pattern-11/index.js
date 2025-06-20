const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo Code
 * 1. y가 N, x가 2N의 길이를 가지는 board가 필요하다.
 * 2. base condition: size가 3일 시
 * 3. 함수 인자: y, x, size
 *
 * 4. 재귀
 * 4-1. y, x가 첫번째 별이면, y + 1/x - 1, y + 1/x + 1이 그 다음줄 별 2개이며,
 * y + 2/x 기준으로 좌우 별 두개씩 붙인게 3번째 줄이다.
 * 4-2. base condition을 충족시 4-1을 실행해서 좌표를 붙인다. 시작 좌표는 0 / N - 1이다.
 * 4-3. base 컨디션을 충족시키지 못했을 경우 size를 반으로 줄이고 재귀를 돌려야 하는데
 * 이 때 N / 2 삼각형을 현재 좌표 / 좌하 좌표 / 우하 좌표 세군데 붙여야 N 길이 시 삼각형이 됨을 유의한다.
 * 4-4 좌하좌표의 시작은 y + N/2와 x - N/2가 되며, 우하 좌표의 시작은 y + N/2와 x + N/2가 된다.
 * 각 좌표에 N /2 삼각형을 더해줄 수 있도록 재귀를 돌리면서 별을 좌표에 표시한다.
 *
 * 5. 좌표를 표시한 board를 연결해서 리턴한다.
 */

const board = Array.from({ length: N }, () => Array(2 * N).fill(' '));

const fractalStar = (y, x, size) => {
  if (size === 3) {
    board[y][x] = '*';
    board[y + 1][x - 1] = '*';
    board[y + 1][x + 1] = '*';

    for (let i = -2; i <= 2; i++) {
      board[y + 2][x + i] = '*';
    }

    return;
  }

  const nextSize = size / 2;

  fractalStar(y, x, nextSize);
  fractalStar(y + nextSize, x - nextSize, nextSize);
  fractalStar(y + nextSize, x + nextSize, nextSize);
};

fractalStar(0, N - 1, N);

console.log(board.map((line) => line.join('')).join('\n'));

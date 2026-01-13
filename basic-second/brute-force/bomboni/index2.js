/** https://www.acmicpc.net/problem/3085 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n');

/** 개선된 풀이법
 * 기존 풀이법은 checkMaxLength로 전체 순회를 한번 swap 할때마다 2번 하기 때문에 시간복잡도가 O(N^4)임
 * checkMaxLength를 할 때 전체를 순회하지 않고 현재 좌표 기준으로 접근할 수 있는 x, y축에 있는 값만 체크함
 * 예를 들어 4x4 타일에서 1x1 포지션에 있는 값은 E이며, E를 체크할때는 같은 row에서 접근할 수 있는 D,F,G의
 * 값을 체크한 다음, 같은 col에 있는 B, I, M의 값만 체크한다. 즉, 현재 포지션에서 접근 가능한 값만 체크한다.
 *
 * [A, B, C, D]
 * [D, E, F, G]
 * [H, I, J, K]
 * [L, M, N, O]
 */

const N = +input.shift();
const map = input.map((line) => line.split(''));

let maxCount = 0;

const swapRows = (y, x) => {
  [map[y][x], map[y + 1][x]] = [map[y + 1][x], map[y][x]];
};

const swapCols = (y, x) => {
  [map[y][x], map[y][x + 1]] = [map[y][x + 1], map[y][x]];
};

const count = (y, x) => {
  let rowCount = 1;
  let colCount = 1;

  for (let row = y - 1; row >= 0; row--) {
    if (map[row][x] === map[y][x]) rowCount++;
    else break;
  }

  for (let row = y + 1; row < N; row++) {
    if (map[row][x] === map[y][x]) rowCount++;
    else break;
  }

  for (let col = x - 1; col >= 0; col--) {
    if (map[y][col] === map[y][x]) colCount++;
    else break;
  }

  for (let col = x + 1; col < N; col++) {
    if (map[y][col] === map[y][x]) colCount++;
    else break;
  }

  return Math.max(rowCount, colCount);
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (y + 1 < N) {
      swapRows(y, x);
      maxCount = Math.max(maxCount, count(y, x), count(y + 1, x));
      swapRows(y, x);
    }

    if (x + 1 < N) {
      swapCols(y, x);
      maxCount = Math.max(maxCount, count(y, x), count(y, x + 1));
      swapCols(y, x);
    }
  }
}

console.log(maxCount);

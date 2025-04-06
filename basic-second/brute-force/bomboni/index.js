const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n');

const n = +input.shift();
const rows = input.map((str) => str.split(''));

/**
 * [
  [ 'Y', 'C', 'P', 'Z', 'Y' ],
  [ 'C', 'Y', 'Z', 'Z', 'P' ],
  [ 'C', 'C', 'P', 'P', 'P' ],
  [ 'Y', 'C', 'Y', 'Z', 'C' ],
  [ 'C', 'P', 'P', 'Z', 'Z' ]
  ]

  1. n * n 타일에서 rows[n][0]의 경우 rows[n + 1][0]과 rows[n][1]과 바꿔볼 수 있음.
  2. rows[n][m](0 < m < rows[n].length - 1)의 경우 rows[n][m - 1]은 이전 m - 1에서 계산할 대 바꿔봤으므로
  rows[n + 1][m]의 경우와 rows[n][m + 1] 끼리 바꿔볼 수 있음.
  3. rows[n][rows[n].length - 1]의 경우 바로 아래의 값만 바꿔야 함 (다음 column이 없으므로)
  4. 마지막 줄의 경우 다음줄이 없으므로, 바로 다음 column과 바꿔보기만 하면 된다.

  5. 각 row, column의 값을 바꿀 때마다, 가장 연속되는 문자열을 row와 column을 매트릭스를 전부 순회하면서 찾아보낟
  e.g.) rows[1][2]의 값을 다룰 때, rows[1][0 ~ rows.length - 1]의 값과 rows[1][rows[1] ~ rows[rows[1].length - 1]] 까지 값을
  전부 확인하고 가장 연속되는 문자열 길이를 maxCount에 저장한다.

 */

let maxCount = 1;

const checkMaxLength = (rows) => {
  let curMaxCount = 1;

  for (let row = 0; row < n; row++) {
    let colCount = 1;

    for (let col = 1; col < n; col++) {
      if (rows[row][col - 1] === rows[row][col]) {
        colCount++;
      } else {
        colCount = 1;
      }

      curMaxCount = Math.max(colCount, curMaxCount);
    }
  }

  for (let col = 0; col < n; col++) {
    let rowCount = 1;

    for (let row = 1; row < n; row++) {
      if (rows[row - 1][col] === rows[row][col]) {
        rowCount++;
      } else {
        rowCount = 1;
      }

      curMaxCount = Math.max(rowCount, curMaxCount);
    }
  }

  return curMaxCount;
};

const swapCol = ({ rows, row, col }) => {
  [rows[row][col], rows[row][col + 1]] = [rows[row][col + 1], rows[row][col]];
};

const swapRow = ({ rows, row, col }) => {
  [rows[row][col], rows[row + 1][col]] = [rows[row + 1][col], rows[row][col]];
};

for (let row = 0; row < n; row++) {
  for (let col = 0; col < n; col++) {
    if (row + 1 < n) {
      swapRow({ rows, row, col });
      maxCount = Math.max(maxCount, checkMaxLength(rows));
      swapRow({ rows, row, col });
    }
    if (col + 1 < n) {
      swapCol({ rows, row, col });
      maxCount = Math.max(maxCount, checkMaxLength(rows));
      swapCol({ rows, row, col });
    }
  }
}

console.log(maxCount);

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

maxCount = 1;

const getMaxCountFromPosition = ({ rows, row, col }) => {
  let rowCount = 1;
  let colCount = 1;

  for (let i = col - 1; i >= 0; i--) {
    if (rows[row][col] === rows[row][i]) colCount++;
    else break;
  }

  for (let i = col + 1; i < n; i++) {
    if (rows[row][col] === rows[row][i]) colCount++;
    else break;
  }

  for (let i = row - 1; i >= 0; i--) {
    if (rows[row][col] === rows[i][col]) rowCount++;
    else break;
  }

  for (let i = row + 1; i < n; i++) {
    if (rows[row][col] === rows[i][col]) rowCount++;
    else break;
  }

  return Math.max(rowCount, colCount);
};

for (let row = 0; row < n; row++) {
  for (let col = 0; col < n; col++) {
    if (row + 1 < n) {
      swapRow({ rows, row, col });

      maxCount = Math.max(
        maxCount,
        getMaxCountFromPosition({ rows, row, col }),
        getMaxCountFromPosition({ rows, row: row + 1, col }),
      );

      swapRow({ rows, row, col });
    }
    if (col + 1 < n) {
      swapCol({ rows, row, col });

      maxCount = Math.max(
        maxCount,
        getMaxCountFromPosition({ rows, row, col }),
        getMaxCountFromPosition({ rows, row, col: col + 1 }),
      );

      swapCol({ rows, row, col });
    }
  }
}

console.log(maxCount);

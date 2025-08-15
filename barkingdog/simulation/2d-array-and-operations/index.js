/** https://www.acmicpc.net/problem/17140 */

const [[r, c, k], ...rest] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input6.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 처음 100개를 제외한 나머지를 버린다고 했으므로, 여유롭게 101개짜리 board를 생성한다.
 *
 * 2. 열이 행보다 길 경우 행과 열을 뒤바꾸는 transpose 함수를 만든다.
 * 2-1. y를 바꿀 때 y,x를 갔다가 x,y로 갈 때 자기 자신을 바꾸지 않도록 x는 y + 1부터 시작한다.
 * e.g. 원본 좌표 (y,x):
 *      x=0 x=1 x=2 x=3
 * y=0   ↔   *   *   *
 * y=1       ↔   *   *
 * y=2           ↔   *
 * y=3               ↔
 *
 * 3. 빈도수 별로 sort하는 frequencySort 함수를 생성한다.
 * 3-1. 번도수를 기록하는 배열 frequency를 생성한 다음 각 숫자와 일치하는 frequency의 index에 빈도수를 기록
 * 3-2. 빈도수, 숫자를 기록하는 entries 함수를 생성한 다음, 빈도수가 다르다면 빈도수로, 그렇지 않다면 숫자로 sort하도록 실행한다.
 * 3-3. 새 행을 만들어나가는 반복문을 실행한다. frequencyEntries를 순회하면서 idx를 1씩 늘려주며
 * 해당 행에 숫자 - 빈도수 순으로 기록한다. 각 기록마다 idx가 100이 되면, 즉 행의 길이가 100이 되면 반복문을 즉시 break한다.
 * 3-4. idx가 현재 columnSize보다 커졌을 경우, curColumnSize를 idx로 갱신한다.
 * 3-5 idx < curColumnSize라면 row의 둘 사이 인덱스를 0으로 채운다.
 *
 * 4. board[r-1][c-1] !== k 이거나 시간이 100초를 넘기 전까지 루프를 돌린다.
 * 4-1. 만약 열이 행보다 크다면, transpose 함수를 실행한다.
 * 4-2. frequencySort로 행을 정렬한다.
 * 4-3. 열과 행을 뒤집었었다면, transpose 함수를 실행해서 다시 뒤집는다.
 * 4-4. time을 늘려준다.
 *
 * 5. time이 100초를 넘었다면 -1, 그렇지 않다면 time을 로그한다.
 */

const board = Array.from({ length: 101 }, () => Array(101).fill(0));
let curRowSize = 3;
let curColumnSize = 3;

for (let y = 0; y < 3; y++) {
  for (let x = 0; x < 3; x++) {
    board[y][x] = rest[y][x];
  }
}

const transpose = () => {
  const maxSize = Math.max(curRowSize, curColumnSize);

  for (let y = 0; y < maxSize; y++) {
    for (let x = y + 1; x < maxSize; x++) {
      [board[y][x], board[x][y]] = [board[x][y], board[y][x]];
    }
  }

  [curRowSize, curColumnSize] = [curColumnSize, curRowSize];
};

const frequencySort = (row) => {
  const frequencyMap = Array(101).fill(0);

  for (let x = 0; x < board[row].length; x++) {
    frequencyMap[board[row][x]]++;
  }

  const frequencyEntries = [];

  for (let num = 1; num <= 100; num++) {
    if (!frequencyMap[num]) continue;
    frequencyEntries.push([num, frequencyMap[num]]);
  }

  frequencyEntries.sort((a, b) => (a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]));

  let idx = 0;

  for (const [num, count] of frequencyEntries) {
    if (idx === 100) break;
    board[row][idx++] = num;
    if (idx === 100) break;
    board[row][idx++] = count;
  }

  curColumnSize = Math.max(curColumnSize, idx);

  for (let x = idx; x < curColumnSize; x++) {
    board[row][x] = 0;
  }
};

let time = 0;

while (board[r - 1][c - 1] !== k && time <= 100) {
  let transposed = false;

  if (curColumnSize > curRowSize) {
    transpose();
    transposed = true;
  }

  for (let y = 0; y < curRowSize; y++) {
    frequencySort(y);
  }

  if (transposed) {
    transpose();
  }

  time++;
}

console.log(time > 100 ? -1 : time);

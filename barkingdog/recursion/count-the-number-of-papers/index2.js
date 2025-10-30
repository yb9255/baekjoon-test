/** https://www.acmicpc.net/problem/1780 */

const [[N], ...paper] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code (barkingdog)
 * 1. 기존 풀이의 간결화, size만 인자로 받아서 size 계산은 내부에서 함.
 */

const countMap = [0, 0, 0]; // -1: countMap[0], 0: countMap[1], 1: countMap[2]

const check = (startY, startX, size) => {
  const base = paper[startY][startX];

  for (let y = startY; y < startY + size; y++) {
    for (let x = startX; x < startX + size; x++) {
      if (paper[y][x] !== base) {
        return false;
      }
    }
  }

  return true;
};

const countPaper = (y, x, size) => {
  if (check(y, x, size)) {
    countMap[paper[y][x] + 1]++;
    return;
  }

  const nextSize = size / 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      countPaper(y + nextSize * i, x + nextSize * j, nextSize);
    }
  }
};

countPaper(0, 0, N);
console.log(countMap.join('\n'));

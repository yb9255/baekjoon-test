const [[N], ...paper] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code (barkingdog)
 * 1. 기존 풀이의 간결화, size만 인자로 받아서 size 계산은 내부에서 함.
 */

const countMap = [0, 0, 0]; // -1: cnt[0], 0: cnt[1], 1: cnt[2]

const check = (y, x, size) => {
  const base = paper[y][x];

  for (let ny = y; ny < y + size; ny++) {
    for (let nx = x; nx < x + size; nx++) {
      if (base !== paper[ny][nx]) {
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

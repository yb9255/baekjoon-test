/** https://www.acmicpc.net/problem/2630 */

const [[N], ...paper] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code
 *
 * 1. base condition
 * 만약 paper의 모든 숫자가 0 혹은 1이라면, 0 혹은 1 색종이 카운트를 올리고 return
 *
 * 2. 함수의 정의
 * func(y, x, size)
 *
 * 3. 재귀방식
 * 3-1. 현재 y, x 기준 size의 모든 종이가 같은 색이 아니라면
 * 3-2. 1,2,3,4분면이 시작하는 좌표를 시작 좌표, 다음 size를 절반으로 줄인 상태로 재귀를 돌린다.
 *
 */

const map = [0, 0];

const check = (y, x, size) => {
  const base = paper[y][x];

  for (let curY = y; curY < y + size; curY++) {
    for (let curX = x; curX < x + size; curX++) {
      if (base !== paper[curY][curX]) return false;
    }
  }

  return true;
};

const countPaper = (y, x, size) => {
  if (check(y, x, size)) {
    map[paper[y][x]]++;
    return;
  }

  const half = size / 2;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      countPaper(y + i * half, x + j * half, half);
    }
  }
};

countPaper(0, 0, N);

console.log(map.join('\n'));

/** https://www.acmicpc.net/problem/1992 */

const [N, ...frame] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 함수 인자
 * func(y, x, size)
 *
 * 2. base condition
 * 모든 면이 다 같다면 종료
 *
 * 3. 재귀
 * 3-1. 재귀 시작 시 (를 정답 문자열에 붙임
 * 3-2. 숫자가 전부 같다면 같은 숫지를 정답 문자열에 붙이고 마무리로 )를 붙임.
 * 3-3. 전부 같지 않다면 재귀를 재실행함.
 */

const check = (y, x, size) => {
  const base = frame[y][x];

  for (let i = y; i < y + size; i++) {
    for (let j = x; j < x + size; j++) {
      if (frame[i][j] !== base) return false;
    }
  }

  return true;
};

const compressFrame = (y, x, size) => {
  if (check(y, x, size)) {
    return frame[y][x];
  }

  let curStr = '(';

  const nextSize = size / 2;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      curStr += compressFrame(y + i * nextSize, x + j * nextSize, nextSize);
    }
  }

  curStr += ')';

  return curStr;
};

console.log(compressFrame(0, 0, +N));

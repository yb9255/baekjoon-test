/** https://www.acmicpc.net/problem/2447 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo Code (최대속도 풀이)
 * 1. size === 1이면 ['*'] return
 * 2. star(size - 1)을 구한 다음. 1번 줄과 3번 줄은 star(size - 1)을 3번 이어붙임
 * 3. 2번 줄은 star(size - 1) + star(size - 1).length 만큼의 빈 공간 + star(size - 1)
 */

const printStar = (size) => {
  if (size === 1) return ['*'];

  const nextSize = size / 3;
  const base = printStar(nextSize);

  return [
    ...base.map((line) => line.repeat(3)),
    ...base.map((line) => line + ' '.repeat(base.length) + line),
    ...base.map((line) => line.repeat(3)),
  ];
};

console.log(printStar(N).join('\n'));

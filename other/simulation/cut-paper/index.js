/** https://www.acmicpc.net/problem/2628 */

const [[N, M], [T], ...cases] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 종이를 자르는 지점을 모은 widthCuts, heightCuts 배열을 넣고, cases를 순회하면서
 * 해당 배열에 종이를 자르는 좌표 지점을 다 모은 뒤 오름차순으로 정렬한다.
 *
 * 2. 다음 좌표 - 현재 좌표 사이의 값이 제일 큰 값이 가장 긴 width/height 이므로, widthCuts와
 * heightCuts를 순회하면서 maxWidth와 maxHeight를 구한 다음 둘을 곱한 값을 로그한다.
 */

const widthCuts = [0, N];
const heightCuts = [0, M];

for (let t = 0; t < T; t++) {
  const [direction, coord] = cases[t];

  if (direction === 0) {
    heightCuts.push(coord);
  } else {
    widthCuts.push(coord);
  }
}

widthCuts.sort((a, b) => a - b);
heightCuts.sort((a, b) => a - b);

let maxWidth = 0;

for (let i = 0; i < widthCuts.length - 1; i++) {
  maxWidth = Math.max(maxWidth, widthCuts[i + 1] - widthCuts[i]);
}

let maxHeight = 0;

for (let i = 0; i < heightCuts.length - 1; i++) {
  maxHeight = Math.max(maxHeight, heightCuts[i + 1] - heightCuts[i]);
}

console.log(maxWidth * maxHeight);

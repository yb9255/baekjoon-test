/** https://www.acmicpc.net/problem/2309 */

const heights = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** filter 사용 */
const total = heights.reduce((acc, cur) => acc + cur, 0);
let result = [];

for (let i = 0; i < 9; i++) {
  for (let j = i + 1; j < 9; j++) {
    if (total - heights[i] - heights[j] === 100) {
      result = heights.filter((_, idx) => idx !== i && idx !== j);
      break;
    }
  }
  if (result.length > 0) break;
}

console.log(result.sort((a, b) => a - b).join('\n'));

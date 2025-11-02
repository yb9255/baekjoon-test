/** https://www.acmicpc.net/problem/2309 */

const heights = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** Pseudo Code
 * 1. 전체 키의 합을 구한다. (totalSum)
 * 2. 키 배열을 순회한다. (i)
 * 3. 매 순회마다 자기 자신을 제외한 나머지를 또 순회한다. (j)
 * 4. totalSum - heights[i] - heights[j] === 100인 경우 순회를 중단한다.
 * 5. heights[i], heights[j]를 제외한 나머지를 값으로 리턴한다.
 */

const total = heights.reduce((acc, cur) => acc + cur, 0);

for (let i = 0; i < 9; i++) {
  for (let j = i + 1; j < 9; j++) {
    if (total - heights[i] - heights[j] === 100) {
      heights[i] = heights[j] = null;
      console.log(
        heights
          .filter(Boolean)
          .sort((a, b) => a - b)
          .join('\n')
      );
      process.exit();
    }
  }
}

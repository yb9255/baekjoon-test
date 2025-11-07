/** https://www.acmicpc.net/problem/10211 */

const [[T], ...lines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let line = 0;

const result = [];

for (let t = 0; t < T; t++) {
  const N = lines[line++][0];
  const arr = lines[line++];

  let curSum = arr[0];
  let maxSum = arr[0];

  for (let i = 1; i < N; i++) {
    const num = arr[i];

    curSum = Math.max(num, curSum + num);
    maxSum = Math.max(curSum, maxSum);
  }

  result.push(maxSum);
}

console.log(result.join('\n'));

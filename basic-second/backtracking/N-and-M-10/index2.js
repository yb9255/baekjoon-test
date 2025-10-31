/** https://www.acmicpc.net/problem/15664 */

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

numbers.sort((a, b) => a - b);

/** stack 대신 cur에 매 재귀마다 값을 오버라이딩하도록 구현 */

const cur = [];
const result = [];

const dfs = (depth, startIdx) => {
  if (depth === M) {
    result.push(cur.join(' '));
    return;
  }

  let prev = null;

  for (let i = startIdx; i < N; i++) {
    if (prev === numbers[i]) continue;
    cur[depth] = prev = numbers[i];
    dfs(depth + 1, i + 1);
  }
};

dfs(0, 0);
console.log(result.join('\n'));

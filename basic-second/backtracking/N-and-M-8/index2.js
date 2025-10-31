/** https://www.acmicpc.net/problem/15657 */

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** stack 대신 cur에 매 재귀마다 값을 오버라이딩하도록 구현 */

numbers.sort((a, b) => a - b);
const cur = [];
const result = [];

const dfs = (depth, startIdx) => {
  if (depth === M) {
    result.push(cur.map((i) => numbers[i]).join(' '));
    return;
  }

  for (let i = startIdx; i < N; i++) {
    cur[depth] = i;
    dfs(depth + 1, i);
  }
};

dfs(0, 0);
console.log(result.join('\n'));

/** https://www.acmicpc.net/problem/15663 */

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
const visited = Array(N).fill(false);

const dfs = (depth) => {
  if (depth === M) {
    result.push(cur.join(' '));
    return;
  }

  let prev = null;

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    if (numbers[i] === prev) continue;

    cur[depth] = prev = numbers[i];

    visited[i] = true;
    dfs(depth + 1);
    visited[i] = false;
  }
};

dfs(0);
console.log(result.join('\n'));

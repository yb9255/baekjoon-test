/** https://www.acmicpc.net/problem/15654 */

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** stack을 제거하고 cur에 오버라이딩하는 형태로 구현 */

numbers.sort((a, b) => a - b);
const visited = Array(N).fill(false);

const cur = [];
const result = [];

const dfs = (depth) => {
  if (depth === M) {
    result.push(cur.join(' '));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;

    cur[depth] = numbers[i];

    visited[i] = true;
    dfs(depth + 1);
    visited[i] = false;
  }
};

dfs(0);
console.log(result.join('\n'));

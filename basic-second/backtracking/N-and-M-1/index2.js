/** https://www.acmicpc.net/problem/15649 */

const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** depth를 i로 쓰는 stack 사용하는 풀이 */

const visited = Array(N + 1).fill(false);
const stack = Array(M);
const result = [];

const dfs = (depth) => {
  if (depth === M) {
    result.push(stack.join(' '));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    stack[depth] = i;
    dfs(depth + 1);
    visited[i] = false;
  }
};

dfs(0);

console.log(result.join('\n'));

/** https://www.acmicpc.net/problem/15652 */

const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** stack을 인자로 직접 받지 않고 cur 배열에 오버라이딩 하는 풀이 추가 */

const cur = [];
const result = [];

const dfs = (depth) => {
  if (depth === M) {
    result.push(cur.join(' '));
    return;
  }

  let start = 1;
  if (depth > 0) start = cur[depth - 1];

  for (let i = start; i <= N; i++) {
    cur[depth] = i;
    dfs(depth + 1);
  }
};

dfs(0);
console.log(result.join('\n'));

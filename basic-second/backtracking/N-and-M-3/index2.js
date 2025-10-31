/** https://www.acmicpc.net/problem/15651 */

const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** 기존 풀이에서 acc를 cur 배열에서 오버라이딩 하도록 한 풀이 */

const cur = Array(M);
const result = [];

const dfs = (depth) => {
  if (depth === M) {
    result.push(cur.join(' '));
    return;
  }

  for (let i = 1; i <= N; i++) {
    cur[depth] = i;
    dfs(depth + 1);
  }
};

dfs(0);
console.log(result.join('\n'));

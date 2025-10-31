/** https://www.acmicpc.net/problem/15655 */

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. 현재 재귀중인 값을 기록해두는 배열 cur를 만듬
 * 2. 오름차순으로 구현되야 하므로 시작 인덱스를 두번째 인자로 받는 N과 M 재귀함수를 생성
 * 3. 시작 인덱스부터 N-1까지 순회하면서 cur에 number의 index를 기록해둔 다음 재귀
 * 4. M의 길이까지 도달하면, cur에 기록해둔 index를 numbers에 mapping하여 result로 push하고 재귀 탈출
 * 5. result를 로그
 * */

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
    dfs(depth + 1, i + 1);
  }
};

dfs(0, 0);
console.log(result.join('\n'));

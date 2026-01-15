/** https://www.acmicpc.net/source/84918876 */

const [[n], signs] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

/** Pseudo Code
 * 1. dfs로 순회한다. dfs의 시그니쳐는 depth
 *
 * 2. 순회하면서 현재 depth의 stack 자리에 숫자를 배치한다.
 * 2-1. 현재 depth가 0인 경우에는 그냥 숫자를 배치하고 방문을 기록한 뒤 dfs 재귀를 실행한다.
 * 2-2. 현재 depth가 1 이상인 경우, 이전 depth의 숫자와 현재 depth 차례의 부등호가 일치하는 경우만
 * 방문을 기록하고 숫자를 배치한 다음 dfs 재귀를 실행한다.
 * 2-3. 2-1/2-2 모두 재귀 시 depth를 1 늘려주고 재귀가 끝나면 방문 체크를 다시 해제한다.
 * 2-4. depth가 N + 1 까지 도달했을 때, stack의 길이가 N + 1과 일치하면 result에 값을 넣는다.
 *
 * 3. result의 문자열을 숫자로 변환 후 비교한 뒤 내림차순으로 정렬한다.
 * 4. result에서 최대 숫자와 최소 숫자로 치환되는 문자열을 구해서 로그한다.
 */

const N = +n;

const visited = Array(10).fill(false);
const stack = [];
const result = [];

const check = (sign, prev, next) => {
  if (sign === '<') {
    return prev < next;
  } else {
    return prev > next;
  }
};

const dfs = (depth) => {
  if (depth === N + 1) {
    if (stack.length === N + 1) {
      result.push(stack.join(''));
    }

    return;
  }

  for (let i = 0; i <= 9; i++) {
    if (visited[i]) continue;

    if (depth === 0) {
      visited[i] = true;
      stack[depth] = i;
      dfs(depth + 1);
      visited[i] = false;
    } else {
      const sign = signs[depth - 1];

      if (check(sign, stack[depth - 1], i)) {
        visited[i] = true;
        stack[depth] = i;
        dfs(depth + 1);
        visited[i] = false;
      }
    }
  }
};

dfs(0);
result.sort((a, b) => b.localeCompare(a));

console.log(result[0] + '\n' + result[result.length - 1]);

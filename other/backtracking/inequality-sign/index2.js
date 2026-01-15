/** https://www.acmicpc.net/source/84918876 */

const [[n], signs] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' '));

/** Pseudo Code
 * 1. index.js와 풀이는 비슷하나, 사용하는 숫자 순서를
 * 가능한 큰 숫자부터 시도하는 경우와 가능한 작은 숫자부터 시도하는 경우로 조합을 시도
 *
 * 2. 둘 다 가장 먼저 만들어진 조합이 나오면 그게 최대값/최소값이 됨.
 * 2-1. 숫자 순서가 현재 가지고 있는 가장 큰/작은 값부터 시도하는 코드이기 때문
 *
 * 3. 두 개의 숫자 순서로 값을 구한디 정답이 나오면 얼리리턴, 이후 최대값 / 최소값을 로그
 */

const N = +n;
const check = (sign, prev, next) => (sign === '<' ? prev < next : prev > next);

const findAnswer = (digits) => {
  const visited = Array(10).fill(false);
  const stack = [];
  let result = null;

  const dfs = (depth) => {
    if (result !== null) return;

    if (depth === N + 1) {
      result = stack.join('');
      return;
    }

    for (const num of digits) {
      if (visited[num]) continue;

      if (depth === 0 || check(signs[depth - 1], stack[depth - 1], num)) {
        visited[num] = true;
        stack[depth] = num;
        dfs(depth + 1);
        visited[num] = false;

        if (result !== null) return;
      }
    }
  };

  dfs(0);

  return result;
};

const max = findAnswer([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
const min = findAnswer([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log(max);
console.log(min);

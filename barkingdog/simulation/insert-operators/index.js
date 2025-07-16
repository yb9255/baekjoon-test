const [[N], nums, operatorMap] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const PLUS = 0;
const MINUS = 1;
const MULTIPLY = 2;
const DIVIDE = 3;

/** Pseudo Code
 * 1. operatorMap가 있으면 해당 operatorMap를 줄이고 늘리는 식으로 백트래킹을 진행
 * 2. operator의 개수가 N - 1개가 되면, 숫자와 연산자를 조합해서 값을 구한 뒤 최소값과 최대값을 갱신
 */

let minSum = Infinity;
let maxSum = -Infinity;

const calc = (a, b, operator) => {
  if (operator === PLUS) {
    return a + b;
  } else if (operator === MINUS) {
    return a - b;
  } else if (operator === MULTIPLY) {
    return a * b;
  } else if (operator === DIVIDE) {
    if (a < 0) {
      const quotient = Math.floor(Math.abs(a) / b);
      return Object.is(-quotient, -0) ? 0 : -quotient;
    } else {
      return Math.floor(a / b);
    }
  }
};

const insertOperator = (depth, sum) => {
  if (depth === N) {
    minSum = Math.min(minSum, sum);
    maxSum = Math.max(maxSum, sum);
    return;
  }

  for (let operator = 0; operator < 4; operator++) {
    if (!operatorMap[operator]) continue;

    operatorMap[operator]--;

    const nextSum = calc(sum, nums[depth], operator);
    insertOperator(depth + 1, nextSum);

    operatorMap[operator]++;
  }
};

insertOperator(1, nums[0]);

console.log(maxSum);
console.log(minSum);

const input = require('fs').readFileSync('input.txt').toString().split('\n');
const iter = Number(input[0]);
const array = input[1].split(' ').map(Number);

/**
 * Kadane's Algorithm
 * 문제를 해결하기 위해 서브문제로 나눠서 푼다.
 */

/**
 * 1. maxSum을 기록하는 변수를 만들고, 배열의 첫 번째 값을 배치한다.
 * 2. 현재까지의 합을 기록하는 curSum 변수를 만들고, 배열의 첫 번째 값을 배치한다.
 * 3. 배열의 1번째 인덱스부터 순회한다.
 *
 * 4. curSum을 갱신할 때, (curSum + 현재 숫자)와 (현재 숫자) 중 더 큰 값을 선택한다.
 *    4-1. (curSum + 현재 숫자)가 크면 기존 부분 배열에 포함시킨다.
 *    4-2. 현재 숫자가 크면 새로운 부분 배열을 시작한다.
 *
 * 5. maxSum을 curSum과 비교하여 항상 최댓값을 유지한다.
 * 6. 최종적으로 maxSum을 답으로 제출한다.
 */

let maxSum = array[0];
let curSum = array[0];

for (let i = 1; i < iter; i++) {
  curSum = Math.max(curSum + array[i], array[i]);
  maxSum = Math.max(maxSum, curSum);
}

console.log(maxSum);

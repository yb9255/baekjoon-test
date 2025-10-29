/** https://www.acmicpc.net/problem/1912 */

const [[N], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Kadane's Algorithm
 * 문제를 해결하기 위해 서브문제로 나눠서 푼다.
 */

/** 점화식
 * 1. 이전까지의 연속합 + 현재 값 > 현재 값의 경우,
 * 현재 연속합을 이전까지의 연속합 + 현재 값으로 변경한다.
 *
 * 2. 이전까지의 연속합 + 현재 값 < 현재 값의 경우
 * 이전까지의 연속합이 오히려 값을 낮추기 때문에 더할 필요가 없음
 * 따라서 현재 연속합을 갱신하고, 현재 연속값의 시작을 현재 값으로 변경한다.
 *
 * 3. 현재 기록된 최대값과 현재 연속합을 비교하고 더 큰 쪽으로 갱신한다.
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

let maxSum = nums[0];
let curSum = nums[0];

for (let i = 1; i < N; i++) {
  curSum = Math.max(curSum + nums[i], nums[i]);
  maxSum = Math.max(maxSum, curSum);
}

console.log(maxSum);

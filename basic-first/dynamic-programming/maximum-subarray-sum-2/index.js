/** https://www.acmicpc.net/problem/13398 */

const [[N], sequence] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** 점화식
 * 1. Kadane 알고리즘에 기반한 연속합 defaultDp를 만든다. 자세한 수식은 maximum-subarray-sum 참조
 * 2. 숫자 하나를 뺀 경우의 연속합 최대를 저장하는 dp oneRemovedDp를 만든다.
 *
 * 2. 숫자를 하나 뺀 경우 현재 자리 n의 최대값은 둘 중 하나가 될 수 있다.
 * 2-1. 현재 자리의 숫자 sequence[n]을 하나 뺐을 때가 최대값일 경우 값은 defaultDp[n]에서
 * sequence[n]을 뺀 값이므로 defaultDp[n - 1]과 일치한다. 즉, oneRemovedDp[n] = defaultDp[n - 1]
 * 2-2. 현재 자리 이전 숫자 중 하나를 빼고 sequence[n]을 더한 경우괴 최대값일 경우는 oneRemovedDp[n - 1]
 * 에 현재값을 더하는 경우와 같다. 즉 oneRemovedDp[n] = oneRemovedDp[n - 1] + sequence[n]
 *
 * 3. oneRemovedDp의 최대값과 defaultDp의 최대값 중 하나를 리턴한다.
 */

let defaultCurSum = sequence[0];
let defaultMaxSum = sequence[0];
let oneRemovedCurSum = sequence[0];
let oneRemovedMaxSum = sequence[0];

for (let i = 1; i < N; i++) {
  const num = sequence[i];
  const newDefaultCurSum = Math.max(num, defaultCurSum + num);
  const newOneRemovedCurSum = Math.max(defaultCurSum, oneRemovedCurSum + num);

  defaultCurSum = newDefaultCurSum;
  oneRemovedCurSum = newOneRemovedCurSum;
  defaultMaxSum = Math.max(newDefaultCurSum, defaultMaxSum);
  oneRemovedMaxSum = Math.max(newOneRemovedCurSum, oneRemovedMaxSum);
}

console.log(Math.max(defaultMaxSum, oneRemovedMaxSum));

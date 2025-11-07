/** https://www.acmicpc.net/problem/13900 */

const [[N], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(BigInt));

/**
 * Pseudo Code
 *
 * 1. [3,4,5]에서 3을 포함한 순서쌍 곱의 합은 3 * 4 + 3 * 5 = 27이고, 이는 즉
 * 3 * (4 + 5)와 같다. 즉, nums[i]를 포함한 순서쌍 곱의 함은, nums[i] 이후의 모든 값을 더한 뒤
 * nums[i]랑 곱하는 것과 같다.
 *
 * 2. 모든 숫자를 우선 더한다. (totalSum)
 * 3. nums를 순회한다. (i)
 * 4. totalSum에서 nums[i]를 빼서 곱할 대상의 합을 구한다.
 * 5. totalSum에 nums[i]를 곱한 뒤 result에 더한다.
 * 6. result를 로그한다.
 */

let totalSum = nums.reduce((acc, cur) => acc + cur, 0n);
let result = 0n;

for (let i = 0; i < N; i++) {
  totalSum -= nums[i];
  result += nums[i] * totalSum;
}

console.log(result.toString());

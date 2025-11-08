/** https://www.acmicpc.net/problem/23827 */

const [rawLen, raw] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 기본적으로 순서쌍의 곱의 합(sum-of-products-of-ordered-pairs) 문제와 풀이가 같으나, MOD를 사용해야 함
 * 2. 합을 MOD로 나눌 경우 실제 값보다 작아지기 때문에, 그 값에 연산을 적용할 경우 MOD를 더한 뒤 MOD remainder를 구하는
 * 작업을 추가로 해주어야 함.
 * 3. 원하지 않을 경우 BigInt를 적용할 수 있지만 그럴 경우 시간이 좀 느려짐.
 */

const N = +rawLen;
const nums = raw
  .split(' ')
  .map(Number)
  .sort((a, b) => a - b);

const MOD = 1_000_000_007;

let totalSum = nums.reduce((acc, cur) => (acc + cur) % MOD, 0);
let result = 0;

for (let i = 0; i < N; i++) {
  totalSum = (totalSum - nums[i] + MOD) % MOD;
  result += (nums[i] * totalSum) % MOD;
}

console.log(result % MOD);

/** https://www.acmicpc.net/problem/2230 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);

/** Pseudo Code
 * 1. 숫자를 오름차순으로 정렬한다.
 * 2. 각 숫자 인덱스에서 시작하는 투 포인터를 만든다. (left는 i, right는 0)
 * 3. nums[right] - nums[left]가 M과 같거나 커질때까지 right를 계속 늘려준다.
 *
 * 4. 만약 right가 N까지 도달해도 M보다 같거나 커지지 않는다면 현재 값에서는 M 차이를 구할 방법이 없는 것이니,
 * break한다.
 *
 * 5. 현재 nums[right] - nums[left]와 min을 비교해서 min을 더 최소값으로 갱신한다.
 * 6. min은 로그한다.
 */

const nums = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

let min = Infinity;
let right = 0;

for (let left = 0; left < N; left++) {
  while (right < N && nums[right] - nums[left] < M) right++;
  if (right === N) break;

  min = Math.min(min, nums[right] - nums[left]);
}

console.log(min);

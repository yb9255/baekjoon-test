/** https://www.acmicpc.net/problem/1874 */

const [N, ...nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** Pseudo Code
 * 1. 한 번 stack에 push한 숫자는 다시 넣을 수 없다.
 *    - 예: 1, 2, 3을 push한 뒤 2를 다시 push하는 건 불가능.
 *
 * 2. 현재 stack에서 push된 최대 숫자보다 큰 타겟 숫자를 만나면:
 *    - stack에 그 숫자가 나올 때까지 push를 반복한다.
 *    - 그 후 pop하여 수열에 배치한다.
 *
 * 3. 현재 stack에서 push된 최대 숫자보다 작은 타겟 숫자를 만나면:
 *    - 추가 push는 하지 않고 바로 pop 시도.
 *    - pop한 값이 타겟 숫자와 같아야만 수열 배치 가능.
 *
 * 4. 만약 pop한 값이 타겟 숫자와 다르면:
 *    - 숫자별로 딱 한번만 push할 수 있으므로, pop을 두 번 하는 경우 처음 pop한 숫자는 이 후 등장해도 누락된다.
 *    - 즉, pop을 한번 했을 때 현재 top과 현재 숫자가 다르다면, 해당 수열은 만들 수 없다.
 */

const stack = [];
const record = [];

let curMaxNum = 1;

for (let i = 0; i < N; i++) {
  const num = nums[i];

  while (curMaxNum <= num) {
    stack.push(curMaxNum++);
    record.push('+');
  }

  const topNumInStack = stack.pop();
  record.push('-');

  if (topNumInStack !== num) {
    console.log('NO');
    process.exit();
  }
}

console.log(record.join('\n'));

const [N, K] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code
 * 1. index에서 jump만큼 이동한 다음 그 자리의 숫자를 splice해서 answer에 push, 이때 index는 0부터 시작하므로 실제로는 jump - 1 만큼 이동해야 함.
 *
 * 2. 값이 하나 사라졌기 때문에, 현재 인덱스에는 다음 숫자가 자동으로 있음.
 * 예를 들면 3을 지웠다면 3이 사라진 자리에 4가 들어오게 되고, 현재 index는 4를 가르키게 됨.
 *
 * 3. 사라진 숫자 기준으로 jump만큼 이동해야 하기 때문에, 다음 이동도 jump - 1 만큼 반복됨.
 * 예를 들어 jump가 3이어서 3을 지웠다면 다음 숫자는 6이 되어야 하는데,
 * 현재 3이 있던 index 자리에는 4가 있으므로 2만큼만 이동.
 *
 * 4. index를 업데이트할 때 항상 queue.length를 remainder로 설정해서
 * index가 queue.length를 넘었을 때 queue의 길이 값을 뺀 값을 가지도록 함.
 *
 * 5. 이 과정은 queue.length === 0이 될 때까지 반복
 */

const queue = Array.from({ length: N }, (_, index) => index + 1);
const answer = [];
let index = 0;

while (queue.length) {
  index = (index + K - 1) % queue.length;
  answer.push(queue.splice(index, 1)[0]);
}

console.log(`<${answer.join(', ')}>`);

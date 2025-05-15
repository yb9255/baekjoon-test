const [[N], towers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code 2 - 바킹독 풀이
 * 1. stack에 항상 어떤 값보다 큰 더미 아이템을 넣어놓고, index를 0으로 정한다.
 * 2. towers를 순회하면서 현재 값이 stack보다 크면 stack을 날려서 도착지 후보 값에서 제외한다.
 * 3. 처음 값은 Infinity보다 무조건 작으므로 stack이 pop되지 않음
 * 4. stack의 top에 저장된 idx를 정답 배열에 push한 다음, 이후 값들보다 현재 타워가
 * 더 높은지 테스트해야 하므로 현재 값을 stack에 넣는다.
 * 5. answer를 리턴한다.
 */

const POSSIBLE_MAX_TOWER_HEIGHT = 100_000_000;

const stack = [[POSSIBLE_MAX_TOWER_HEIGHT + 1, 0]];
const answer = [];

for (let i = 0; i < N; i++) {
  const tower = towers[i];

  while (stack[stack.length - 1][0] < tower) {
    stack.pop();
  }

  answer.push(stack[stack.length - 1][1]);
  stack.push([tower, i + 1]);
}

console.log(answer.join(' '));

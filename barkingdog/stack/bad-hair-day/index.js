const [N, ...buildings] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** Pseudo Code
 * 1. 빌딩의 stack에는 "현재 순회 중인 빌딩을 볼 수 있는" 빌딩이 stack에 쌓이도록 해야 한다.
 * 2. buildings를 거꾸로 순회한다.
 *
 * 3. stack의 top에 있는 값이 현재 빌딩보다 작다면, 현재 빌딩을 볼 수 없는 빌딩이므로 pop하고
 * 현재 빌딩보다 높은 빌딩이 나올때까지 반복한다.
 *
 * 4. 3번 과정 이후 남은 값들은 현재 빌딩보다 커서 모두 나를 볼 수 있는 빌딩이므로, 스택의 길이만큼
 * count를 올려준다.
 *
 * 5. 3번 과정에서 기존의 모든 빌딩보다 높은 빌딩이 현재 빌딩이면 stack이 전부 pop되므로, 현재 빌딩 뒤의
 * 빌딩은 이전 빌딩을 볼 수 없게 된다.
 */

let count = 0;
const stack = [];

for (let i = 0; i < N; i++) {
  const building = buildings[i];

  while (stack.length && stack[stack.length - 1] <= building) {
    stack.pop();
  }

  count += stack.length;
  stack.push(building);
}

console.log(count);

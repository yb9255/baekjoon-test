const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

const [iter, ...numbers] = input;

let answer = [];
let stackNum = 1;
const stack = [];

// 1. 한번 stack에 쌓인 숫자를 다시 넣지 못한다. (1,2,3까지 넣고 2를 다시 못넣음)

// 2. 현재 stack 횟수보다 큰 타겟 숫자의 수열 위치를 찾는 경우,
// stack에 계속 숫자를 push해 순서가 될 때까지 반복한다.
// 이후 pop해서 수열 배치를 완료한다.

// 3. 현재 stack 횟수보다 작은 타겟 숫자의 수열 위치를 찾는 경우,
// 위의 push는 하지 않고 바로 pop해서 수열 배치가 가능한지 체크한다.

// 4. pop한 값은 현재 stack에 남아있는 값 중 가장 큰 값인데 현재 타겟 숫자가
// pop한 값과 일치하지 않는 경우, stack 내 모든 값은 타겟 숫자와 일치하지 않는다.
// 즉, 해당 수열은 만들 수 없다.

for (let i = 0; i < iter; i++) {
  const num = +numbers[i];

  while (stackNum <= num) {
    stack.push(stackNum);
    answer.push('+');
    stackNum++;
  }

  const lastNumInStack = stack.pop();
  answer.push('-');

  if (lastNumInStack !== num) {
    answer = ['NO'];
    break;
  }
}

console.log(answer.join('\n'));

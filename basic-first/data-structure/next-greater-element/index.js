const [[N], sequence] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. sequence의 첫 숫자의 index를 stack에 push한다.
 * 2. stack 최상단 index는 항상 가장 최근에 오큰수를 찾지 못한 숫자의 index가 된다.

 * 2. 다음 숫자를 넣을 때, sequence[<stack 최상단 index>]보다 현재 숫자가 큰 지 확인한다.
 * 2-1. 숫자가 크다면,sequence[<stack 최상단 index>]의 오큰수는 현재 숫자, sequence[index]이다.
 * answer[<stack 최상단 index>]에 현재 숫자를 오큰수로 넣어준다.
 * 즉, sequence[<stack 최상단 index>]의 오큰수 == answer[<stack 최상단의 index>]
 * 2-2. 숫자가 작다면, 현재 숫자의 index를 stack에 push한다.

 * 3. 2-1의 경우를 했는데도 stack에 값이 남아있다면, 해당 값의 index도 오큰수를 찾지 못한
 * index라는 뜻. 2-1의 과정을 반복해준다.
 * 3-1. 이때 while문은 반드시 stack에 값이 남아있고
 * sequence[<stack 최상단 index>]보다 현재 숫자가 큰 상황에서만 돌아야 한다.
 * 그렇지 않으면 sequence[<stack 최상단 index>보다 현재 숫자가 작은 상황에서도 while문이 동작해
 * 무한 루프에 빠지게 된다.
*/

const answer = Array(N).fill(-1);
const stack = [];

for (let i = 0; i < N; i++) {
  const num = sequence[i];

  while (stack.length && sequence[stack[stack.length - 1]] < num) {
    answer[stack.pop()] = num;
  }

  stack.push(i);
}

console.log(answer.join(' '));

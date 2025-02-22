const input = require('fs').readFileSync('input.txt').toString().split('\n');
const iter = +input.shift();

// 1. 숫자 배열을 순회하면서 숫자 개수를 카운트함
// 2. 첫 순회에서는 현재 숫자의 배열은 스택에 담음.

// 3. 두 번째 순회부터
// 3-1. numbers[<stack의 끝에 있는 index>] 보다 현재 숫자의 개수가 더 많다면
// 현재 숫자가 numbers[<stack의 끝에 있는 index>]의 오등큰수가 됨.
// 따라서 answers[<stack의 끝에 있는 index>]에 현재 숫자를 넣고, <stack의 끝에 있는 index>는 pop한다.
// 3-2. 3-1을 <새 stack의 끝에 있는 index>를 사용하여 다시 하고, stack이 빌때까지
// 혹은 현재 숫자의 개수보다 numbers[<새 stack의 끝에 있는 index>]보다 같거나 적을때까지 반복한다.

const countMap = {};
const numbers = input[0].split(' ').map(Number);
const answer = Array.from({ length: iter }, () => -1);
const stack = [];

for (let i = 0; i < iter; i++) {
  countMap[numbers[i]] = (countMap[numbers[i]] || 0) + 1;
}

for (let i = 0; i < iter; i++) {
  while (
    stack.length &&
    countMap[numbers[stack[stack.length - 1]]] < countMap[numbers[i]]
  ) {
    answer[stack.pop()] = [numbers[i]];
  }

  stack.push(i);
}

console.log(answer.join(' '));

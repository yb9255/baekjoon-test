/** https://www.acmicpc.net/problem/17299 */

const [[N], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// 1. 숫자 배열을 순회하면서 숫자 개수를 카운트함
// 2. 첫 순회에서는 현재 숫자의 배열은 스택에 담음.

// 3. 두 번째 순회부터
// 3-1. nums[<stack의 끝에 있는 index>] 보다 현재 숫자의 개수가 더 많다면
// 현재 숫자가 nums[<stack의 끝에 있는 index>]의 오등큰수가 됨.
// 따라서 result[<stack의 끝에 있는 index>]에 현재 숫자를 넣고, <stack의 끝에 있는 index>는 pop한다.
// 3-2. 3-1을 <새 stack의 끝에 있는 index>를 사용하여 다시 하고, stack이 빌때까지
// 혹은 현재 숫자의 개수보다 nums[<새 stack의 끝에 있는 index>]보다 같거나 적을때까지 반복한다.

const result = Array(N).fill(-1);
const stack = [];
const map = {};

for (let i = 0; i < N; i++) {
  map[nums[i]] = (map[nums[i]] || 0) + 1;
}

for (let i = 0; i < N; i++) {
  while (stack.length && map[nums[stack[stack.length - 1]]] < map[nums[i]]) {
    result[stack.pop()] = nums[i];
  }

  stack.push(i);
}

console.log(result.join(' '));

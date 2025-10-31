/** https://www.acmicpc.net/problem/15652 */

const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code
 * 1. N-and-M-2에서 checked 로직만 제외
 */

const answer = [];

const getSequence = (depth, prev, total) => {
  if (depth === M) {
    answer.push(total.trim());
    return;
  }

  for (let i = prev; i <= N; i++) {
    if (i === 0) continue;
    getSequence(depth + 1, i, total + i + ' ');
  }
};

getSequence(0, 0, '');

console.log(answer.join('\n'));

/**
 * Pseudo Code
 * stack 기반 풀이
 *
 * stack 풀이 시 장점
 * 1. 함수 호출 스택이 쌓이지 않음 -> 빠름
 * 2. 문자열 조작이 answer에 push할때 한번만 있음 -> 빠름
 *
 * 순서
 *
 * 1. start가 N이 될 때까지 반복하는 while문을 시작한다.
 * 2. start 숫자 1을 담은 배열을 stack에 넣는다 -> stack = [[1]]
 * 3. 내부에서 다시 while 문을 시작한다.
 */

const answer2 = [];
let stack = [];
let start = 1;

while (start <= N) {
  stack.push([start]);

  while (stack.length) {
    const curStack = stack.pop();

    if (curStack.length === M) {
      answer2.push(curStack.join(' '));
      continue;
    }

    const maxNum = curStack[curStack.length - 1];

    for (let i = N; i >= maxNum; i--) {
      stack.push([...curStack, i]);
    }
  }

  start++;
}

console.log(answer2.join('\n'));

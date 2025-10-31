/** https://www.acmicpc.net/problem/15666 */

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

const setNumbers = [...new Set(numbers.sort((a, b) => a - b))];

/** Pseudo Code
 * 1. 모든 수를 반복하며 수열을 만들되 같은 숫자가 있을 때 중복실행되며 안되므로,
 * numbers 내 같은 값을 Set으로 제거한다.
 * 2. 그 뒤 풀이는 N-and-M-10과 유사하다.
 */

const answer = [];

const getSequence = (depth, stack, startIndex) => {
  if (depth === M) {
    answer.push(stack.join(' '));
    return;
  }

  for (let i = startIndex; i < setNumbers.length; i++) {
    stack.push(setNumbers[i]);
    getSequence(depth + 1, stack, i);
    stack.pop();
  }
};

getSequence(0, [], 0);

console.log(answer.join('\n'));

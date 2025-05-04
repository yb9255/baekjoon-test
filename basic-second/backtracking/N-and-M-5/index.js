const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. N과 M(1) 풀이에서 주어진 숫자만 사용하도록 for문 로직 살짝 변경
 * 2. stack 배열을 사용하도록 풀이 약간 수정 (시간 약간 단축)
 */

numbers.sort((a, b) => a - b);
const visited = Array(N).fill(false);
const answer = [];

const getSequence = (depth, stack) => {
  if (depth === M) {
    answer.push(stack.join(' '));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      stack.push(numbers[i]);
      getSequence(depth + 1, stack);
      stack.pop();
      visited[i] = false;
    }
  }
};

getSequence(0, []);
console.log(answer.join('\n'));

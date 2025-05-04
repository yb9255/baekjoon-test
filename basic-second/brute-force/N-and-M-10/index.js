const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

numbers.sort((a, b) => a - b);

/**
 * Pseudo Code
 * 1. N-and-M 9번 풀이에서 비내림차순을 유지하기 위해 재귀마다 시작 index를 1씩 올려줌
 * 2. 이렇게 함으로써 numbers가 정렬이 되어있기 때문에 자연스럽게 크거나 같은 값이 다음 순서에 붙게 됨.
 * 3. 시작 index가 1씩 올라가면 자연스럽게 이전에 방문한 곳은 방문하지 않으므로 visited 제거
 */

const answer = [];

const getSequence = (depth, stack, firstIndex) => {
  if (depth === M) {
    answer.push(stack.join(' '));
    return;
  }

  let prev = -1;

  for (let i = firstIndex; i < N; i++) {
    if (numbers[i] !== prev) {
      stack.push(numbers[i]);
      getSequence(depth + 1, stack, i + 1);
      stack.pop();
      prev = numbers[i];
    }
  }
};

getSequence(0, [], 0);

console.log(answer.join('\n'));

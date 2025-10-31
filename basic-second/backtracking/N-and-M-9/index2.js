/** https://www.acmicpc.net/problem/15663
 */
const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

numbers.sort((a, b) => a - b);

/**
 * Pseudo Code
 * 1. visited를 사용하고, Set 대신 prev를 지정하도록 변경
 * 2. prev는 현재 함수 실행 컨텍스트 같은 "값"을 또 사용하지 않도록 역할
 * 3. visited는 모든 함수 실행 컨텍스트에서 방문한 "인덱스"의 값을 사용하지 않도록 역할
 * 4. prev를 하지 않으면, [1, 1, 1, 1]과 같은 경우 1, 1, 1, 1이 4번 나오게 됨. 중복을 제거하는 용도로 사용
 */

const visited = Array(N).fill(false);
const answer = [];

const getSequence = (depth, stack) => {
  if (depth === M) {
    answer.push(stack.join(' '));
    return;
  }

  let prev = -1;

  for (let i = 0; i < N; i++) {
    if (!visited[i] && numbers[i] !== prev) {
      visited[i] = true;
      stack.push(numbers[i]);
      getSequence(depth + 1, stack);
      stack.pop();
      visited[i] = false;
      prev = numbers[i];
    }
  }
};

getSequence(0, []);
console.log(answer.join('\n'));

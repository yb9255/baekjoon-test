/** https://www.acmicpc.net/problem/15663 */

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

numbers.sort((a, b) => a - b);

/**
 * Pseudo Code
 * 1. N-and-M-5 풀이에서 visited 대신 방문 index를 체크하도록 로직 변경
 * 2. answer를 Set을 사용해서 중복 답 제거
 */

const indexMap = Array(N).fill(0);

numbers.forEach((_, index) => {
  indexMap[index]++;
});

const answer = new Set();

const getSequence = (depth, stack, indexMap) => {
  if (depth === M) {
    answer.add(stack.join(' '));
    return;
  }

  for (let i = 0; i < N; i++) {
    if (indexMap[i]) {
      stack.push(numbers[i]);
      const newIndexMap = indexMap.slice();
      newIndexMap[i]--;
      getSequence(depth + 1, stack, newIndexMap);
      stack.pop();
    }
  }
};

getSequence(0, [], indexMap);
console.log([...answer].join('\n'));

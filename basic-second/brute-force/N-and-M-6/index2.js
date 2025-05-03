const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/**
 * Pseudo Code
 *
 * 1. 숫자를 오름차순으로 정렬한다.
 * 2. stack이 빌 때까지 numbers 거꾸로 순회하면서 stack에 계속 값을 넣는다. [[현재까지 싸인 값], 마지막 index] 형태로
 * 초기 stack -> numbers가 [1, 2, 3, 4]라고 가정하면, 첫번째 for문을 돌았을 때 stack은 [[[4], 3], [[3], 2], [[2], 1], [[1], 0]]
 *
 * 3. 마지막 값을 pop하고, 다시 pop한 값을 기준으로 for문을 또 돌면 다음과 같이 값이 추가된다.
 * [[[4], 3], [[3], 2], [[2], 1], [[1], 0], [[1, 4], 3], [[1, 3], 2], [[1, 2], 1]]
 *
 * 이런 형태로 값을 만들가다보면 최종적으로 M 길이가 완성되는데, 이때 정답에 push한다.
 */

numbers.sort((a, b) => a - b);
const stack = [[[], -1]];
const answer = [];

while (stack.length) {
  const [sequence, lastIndex] = stack.pop();

  if (sequence.length === M) {
    answer.push(sequence.join(' '));
    continue;
  }

  for (let i = N - 1; i > lastIndex; i--) {
    stack.push([[...sequence, numbers[i]], i]);
  }
}

console.log(answer.join('\n'));

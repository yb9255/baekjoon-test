/** https://www.acmicpc.net/problem/15654 */

const [[N, M], numbers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. N-and-M-4에서 start를 numbers의 index를 사용하도록 변경하여 구현
 * 2. 4에서는 비내림차순이었기 때문에 startIndex가 필수적이었지만, 여기는 비내림차순이 아니므로 시작값을 구할 필요가 없음.
 * 3. 4에서와 다르게 이 풀이는 visited 배열을 유지해야 해서 메모리가 더 많이 들어 풀이가 효율적이지는 않음.
 */

numbers.sort((a, b) => a - b);
const stack = [[[], Array(N).fill(false)]];
const answer = [];

while (stack.length) {
  const [curItem, visited] = stack.pop();

  if (curItem.length === M) {
    answer.push(curItem.join(' '));
    continue;
  }

  for (let i = N - 1; i >= 0; i--) {
    if (!visited[i]) {
      const nextItem = [...curItem, numbers[i]];
      const nextVisited = visited.slice();
      nextVisited[i] = true;
      stack.push([nextItem, nextVisited]);
    }
  }
}

console.log(answer.join('\n'));

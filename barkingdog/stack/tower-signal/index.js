/* https://www.acmicpc.net/problem/2493 */

const [[N], towers] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code 1
 * 1. towers를 pop (tower)
 * 2. stack이 비어있다면 tower와 tower의 index를 push
 * 3. stack이 있다면, stack의 top보다 tower가 큰 경우,
 * 현재 tower가 stack에 있는 tower의 레이저를 처음 만나므로
 * top을 pop해서 answer[topIdx]에 지금 값의 index로 바꿔줌
 * 4. 3의 과정을 stack이 비거나 top이 tower보다 클때까지 반복
 * 5. 3~4가 끝나면 지금 값을 stack에 push하고 2부터 다시 반복
 * 6. 최종적으로 모두 업데이트된 answer를 리턴
 */

const answer = Array(N).fill(0);
const stack = [];

while (towers.length) {
  const idx = towers.length - 1;
  const tower = towers.pop();

  while (stack.length && stack[stack.length - 1][0] < tower) {
    const [, topIdx] = stack.pop();
    answer[topIdx] = idx + 1;
  }

  stack.push([tower, idx]);
}

console.log(answer.join(' '));

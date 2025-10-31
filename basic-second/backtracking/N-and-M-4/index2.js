/** https://www.acmicpc.net/problem/15652 */

const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

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
 *
 * 4. stack이 있다면, 가장 마지막에 쌓인 stack을 꺼내서 M과 길이가 같은지 체크한다. 같으면
 * 해당 stack을 문자열로 변환 후 answer에 push한다.
 *
 * 5. M과 같지 않다면, 현재 stack의 최대값부터 N까지를 역순으로 순회하며 기존 item보다 1씩 더 길어진 배열을
 * push한다.
 * e.g.) N이 3이라면, stack = [[1, 3], [1, 2], [1, 1]]
 *
 * 6. 그 다음 길이가 1씩 늘어난 stack의 값들을 pop하면서 뒤의 값부터 처리한다.
 * e.g.) N이 3이고, M이 3이라면 우선 stack = [[1, 3], [1, 2], [1, 1, 3], [1, 1, 2], [1, 1, 1]]
 * 이 되며, 다음 3번의 순회를 돌면서 뒤의 3개가 pop이 되어 answer로 들어가며 stack = [[1, 3], [1, 2]],
 * answer = [[1, 1, 1], [1, 1, 2], [1, 1, 3]]이 된다.
 *
 * 7. 내부 while을 반복하여 stack이 다 비워진 뒤 start로 시작하는 케이스가 전부 끝나게 되면,
 * start를 1 올려 2부터 시작하는 수열의 케이스를 구한다.
 *
 * 8. N까지 구한 이후 answer를 리턴한다.
 *
 */

const answer = [];
let stack = [];
let start = 1;

while (start <= N) {
  stack.push([start]);

  while (stack.length) {
    const curItem = stack.pop();

    if (curItem.length === M) {
      answer.push(curItem.join(' '));
      continue;
    }

    const maxNum = curItem[curItem.length - 1];

    for (let i = N; i >= maxNum; i--) {
      stack.push([...curItem, i]);
    }
  }

  start++;
}

console.log(answer.join('\n'));

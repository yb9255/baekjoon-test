/** https://www.acmicpc.net/problem/5430 */

const [T, ...cases] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 각 문자열을 파싱해서 명령어 목록과 deque을 구현한다.
 * 2. front, back을 가리키는 포인터를 선언한다. front는 0, back은 deque.length로 시작한다.
 * 3. reverse 여부 flag인 isReversed와 error 여부 플래그인 isError를 선언하고, false로 값을 시작한다.
 * 4. 명령어를 순회하며 R을 만났을 경우 isReversed 플래그를 !isReversed로 바꾼다.
 *
 * 5. D 명령어를 만났을 경우 뒤집지 않았다면 front를 더해서 앞에서 값을 빼고,
 * 뒤집었다면 back을 줄여서 뒤에서 값을 뺀다.
 *
 * 6. 5 상황에서 front가 back보다 크거나 같다면 배열이 이미 다 비워졌다는 뜻이기 때문에 에러 플래그를
 * true로 바꾸고 명령어 순회를 break한다.
 *
 * 7. isError일 경우 정답 배열에 error push, 아닌 경우 front, back만큼 덱을 slice한 다음,
 * isReversed인 경우 reverse하고 stringify하여 push, 아닌 경우 바로 stringify하여 push한다.
 */

let line = 0;
const answer = [];

for (let t = 0; t < +T; t++) {
  const commands = cases[line++];
  const N = +cases[line++];
  const raw = cases[line++];
  const deque = N === 0 ? [] : raw.slice(1, -1).split(',').map(Number);

  let front = 0;
  let back = N;
  let isReversed = false;
  let isError = false;

  for (const command of commands) {
    if (command === 'R') {
      isReversed = !isReversed;
    } else {
      if (front >= back) {
        isError = true;
        break;
      }

      if (isReversed) back--;
      else front++;
    }
  }

  if (isError) {
    answer.push('error');
  } else {
    const result = deque.slice(front, back);
    if (isReversed) result.reverse();

    answer.push(`[${result.join(',')}]`);
  }
}

console.log(answer.join('\n'));

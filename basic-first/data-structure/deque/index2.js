const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code (barkingdog)
 * 1. 최대 길이의 덱을 미리 생성한다.
 * 2. front, back 모두 최대 길이 덱 인덱스의 절반 시점에서 시작한다.
 * 3. 앞으로 값을 넣을때는 front값을 1 줄이고 값을 배당한다.
 * 4. 뒤로 값을 넣을때는 back에 값을 넣고 back 값을 1 늘려준다.
 * 5. 앞에서 값을 뺄때는 현재 front의 값을 answer에 push하고 front를 1 늘려준다.
 * 6. 뒤에서 값을 뺄때는 현재 back - 1의 값을 answer에 push하고 back을 1 줄인다.
 * 7. 나머지는 queue의 투 포인터 풀이와 같다.
 */

const N = input.shift();
const MAX_DEQUE_LENGTH = 2_000_000;

const answer = [];
const deque = new Array(MAX_DEQUE_LENGTH);
let front = MAX_DEQUE_LENGTH / 2;
let back = MAX_DEQUE_LENGTH / 2;

for (let i = 0; i < N; i++) {
  const [cmd, val] = input[i].split(' ');

  switch (cmd) {
    case 'push_front':
      deque[--front] = +val;
      break;
    case 'push_back':
      deque[back++] = +val;
      break;
    case 'pop_front':
      answer.push(front === back ? -1 : deque[front++]);
      break;
    case 'pop_back':
      answer.push(front === back ? -1 : deque[--back]);
      break;
    case 'size':
      answer.push(back - front);
      break;
    case 'empty':
      answer.push(front === back ? 1 : 0);
      break;
    case 'front':
      answer.push(front === back ? -1 : deque[front]);
      break;
    case 'back':
      answer.push(front === back ? -1 : deque[back - 1]);
      break;
  }
}

console.log(answer.join('\n'));

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const N = +input.shift();
const MAX_QUEUE_LENGTH = 2_000_000;

/** Pseudo Code
 * 1. 최대 길이의 고정 배열을 만든 다음, 왼쪽 포인터와 오른쪽 포인터로 값을 세팅함.
 * 값이 추가되면 backIndex를 늘려주고, 값이 빠지면 frontIndex를 늘려줌
 * 2. queue.length를 계산하는 로직이나 GC 체크등이 사라지고 더미 값이 사라져서 더 빠를 확률이 높음
 */

const answer = [];
const queue = new Array(MAX_QUEUE_LENGTH);
let frontIndex = 0;
let backIndex = 0;

for (let i = 0; i < N; i++) {
  const [cmd, val] = input[i].split(' ');

  switch (cmd) {
    case 'push':
      queue[backIndex++] = val;
      break;
    case 'pop':
      answer.push(frontIndex === backIndex ? -1 : queue[frontIndex++]);
      break;
    case 'size':
      answer.push(backIndex - frontIndex);
      break;
    case 'empty':
      answer.push(frontIndex === backIndex ? 1 : 0);
      break;
    case 'front':
      answer.push(frontIndex === backIndex ? -1 : queue[frontIndex]);
      break;
    case 'back':
      answer.push(frontIndex === backIndex ? -1 : queue[backIndex - 1]);
      break;
  }
}

console.log(answer.join('\n'));

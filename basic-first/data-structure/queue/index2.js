const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const N = +input.shift();

/** Pseudo Code (바킹독)
 * 1. 현재 시점의 index를 frontIndex로 지정해서 모든 queue를 O(1)로 처리한다.
 * 2. queue의 길이와 frontIndex의 길이가 같다면 전부 pop했다는 의미.
 * 3. 값이 많아지면 shift 등을 사용하는게 성능제한에 걸려서 frontIdex 사용이 필수
 */

const answer = [];
const queue = [];
let frontIndex = 0;

for (let i = 0; i < N; i++) {
  const [cmd, val] = input[i].split(' ');

  switch (cmd) {
    case 'push':
      queue.push(val);
      break;
    case 'pop':
      if (queue.length === frontIndex) {
        answer.push(-1);
      } else {
        answer.push(queue[frontIndex]);
        frontIndex++;
      }

      break;
    case 'size':
      answer.push(queue.length - frontIndex);
      break;
    case 'empty':
      if (queue.length === frontIndex) {
        answer.push(1);
      } else {
        answer.push(0);
      }

      break;
    case 'front':
      if (queue.length === frontIndex) {
        answer.push(-1);
      } else {
        answer.push(queue[frontIndex]);
      }

      break;

    case 'back':
      if (queue.length === frontIndex) {
        answer.push(-1);
      } else {
        answer.push(queue[queue.length - 1]);
      }

      break;
  }
}

console.log(answer.join('\n'));

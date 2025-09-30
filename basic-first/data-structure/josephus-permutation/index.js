/** https://www.acmicpc.net/problem/1158 */

const [N, K] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code
 * 1. 값을 queue에서 shift
 * 2. count가 K와 같아지면 shift한 값을 answer에 넣고 count를 다시 1로 치환
 * 3. count가 K와 같지 않으면  queue에 shift한 값을 다시 push
 * 4. queue가 빌때까지 반복 후 answer 로그
 */

const queue = Array.from({ length: N }, (_, index) => index + 1);
const answer = [];

let count = 1;

while (queue.length) {
  const shiftItem = queue.shift();

  if (count % K === 0) {
    answer.push(shiftItem);
    count = 1;
  } else {
    queue.push(shiftItem);
    count++;
  }
}

console.log(`<${answer.join(', ')}>`);

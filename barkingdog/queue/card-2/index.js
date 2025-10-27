/** https://www.acmicpc.net/problem/2164 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo Code
 * 1. frontIndex를 더해서 앞 카드를 버림
 * 2. 가장 뒤 인덱스에 현재 frontIndex를 넣고, frontIndex 값을 1 늘림
 * 3. node에서 shift 성능은 좋지 않으므로 two pointer 형태로 구현
 */

const queue = Array.from({ length: N }, (_, index) => index + 1);
let frontIndex = 0;
let backIndex = N;

while (frontIndex < backIndex - 1) {
  frontIndex++;
  queue[backIndex++] = queue[frontIndex++];
}

console.log(queue[frontIndex]);

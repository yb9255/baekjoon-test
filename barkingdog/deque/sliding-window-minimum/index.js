/** https://www.acmicpc.net/problem/11003 */

const [[N, L], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 현재 값의 index와 value를 저장하는 deque을 생성
 * 2. 덱의 뒷부분이 현재 값보다 크거나 같으면 덱을 pop한다.
 * 3. 그 다음 현재 값을 덱에 삽입한다.
 * 4. 덱의 앞부분의 index가 현재 window를 넘어갔다면 전부 shift로 제거한다.
 * 5. 1 ~ 4의 과정을 거치면 현재 덱의 0번 index의 값이 최소값이 되므로, 0번 index의 value를 결과 배열에 push 한다.
 *
 * 6. 일반적인 console.log를 한번에 표현하면 node.js 사용 시 메모리 초과가 자꾸 발생하는 풀이.
 * 따라서 만개 단위로 stream하게 process.stdout으로 로그를 표시한다.
 */

const deque = new Array(N);
let front = 0;
let back = 0;

let res = '';

for (let i = 0; i < N; i++) {
  const num = nums[i];

  while (back > front && deque[back - 1][1] >= num) {
    back--;
  }

  deque[back++] = [i, num];

  while (deque[front][0] <= i - L) {
    front++;
  }

  res += deque[front][1] + ' ';

  if (i % 10000 === 0) {
    process.stdout.write(res);
    res = '';
  }
}

process.stdout.write(res);

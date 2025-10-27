/** https://www.acmicpc.net/problem/1021 */

const [[N, M], targets] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input4.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. N 길이만큼의 덱을 생성한다.
 * 2. 타겟 숫자 전체를 순회한다.
 *
 * 3. 타겟 숫자의 덱 내 인덱스를 찾는다. index > deque.length - index 라면
 * 중앙값 기준 왼쪽에 위치하고 아닌 경우 중앙값 기준 오른쪽에 위치한다.
 *
 * 4. 중앙값 기준 왼쪽에 있으면 왼쪽으로 돌려야 함. 덱에서 shift한 값을 다시 push한다. 이 동작을
 * index 횟수만큼 반복한다. 반복할때마다 회전 횟수를 1씩 늘려준다.
 *
 * 5. 중앙값 기준 오른쪽에 있으면 오른쪽으로 돌려야 함. 덱에서 pop한 값을 다시 unshift한다. 이 동작을
 * deque.length - index 횟수만큼 반복한다. 반복할때마다 회전 횟수를 1씩 늘려준다.
 *
 * 6. 제일 위의 값을 unshift한다.
 */

const deque = Array.from({ length: N }, (_, i) => i + 1);
let count = 0;

for (let i = 0; i < M; i++) {
  const target = targets[i];
  const targetIdx = deque.indexOf(target);

  if (targetIdx < deque.length - targetIdx) {
    for (let j = 0; j < targetIdx; j++) {
      deque.push(deque.shift());
      count++;
    }
  } else {
    for (let k = 0; k < deque.length - targetIdx; k++) {
      deque.unshift(deque.pop());
      count++;
    }
  }

  deque.shift();
}

console.log(count);

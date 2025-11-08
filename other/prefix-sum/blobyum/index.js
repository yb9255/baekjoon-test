/** https://www.acmicpc.net/problem/24499 */

const [[N, K], pies] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. pies를 순회하면서 len이 K가 될때까지 현재 파이를 더한다. 이 때 pie는 원형 상태로 배치되어
 * 한바퀴 돌고 나면 다음 바퀴로 순회하므로, 현재 파이는 pies[i % N], 순회 범위는 0 ~ 2 * N이 된다. (sum) (누적합)
 *
 * 2. len이 K보다 길어지면 pies[left]의 값을 빼고 left를 1 늘려서 갱신한다. (sliding window)
 * 3. len이 K가 되면 result를 Math.amx(len, sum)으로 갱신한다.
 * 4. result를 로그한다.
 */

let len = 0;
let left = 0;
let sum = 0;
let result = 0;

for (let i = 0; i < 2 * N; i++) {
  sum += pies[i % N];
  len++;

  if (len > K) {
    sum -= pies[left % N];
    len--;
    left++;
  }

  if (len === K) {
    result = Math.max(sum, result);
  }
}

console.log(result);

/** https://www.acmicpc.net/problem/2003 */

const [[N, M], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 투 포인터를 두고 값을 계속 누적한다.
 *
 * 2. 만약 누적합이 M보다 크면 왼쪽 값을 제거해야 하므로, left 인덱스를 늘려주면서 누적합이 M보다 작아질때까지
 * left 인덱스에 해당하는 값을 뺀다.
 *
 * 3. 누적합이 M과 같다면 result를 1 올린다.
 * 4. result를 로그한다.
 */

let result = 0;
let curSum = 0;
let left = 0;

for (let right = 0; right < N; right++) {
  curSum += nums[right];

  while (curSum > M && left <= right) {
    curSum -= nums[left++];
  }

  if (curSum === M) {
    result++;
  }
}

console.log(result);

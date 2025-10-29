/** https://www.acmicpc.net/problem/14002 */

const [[N], sequence] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. dp[i] = i번째 길이를 가진 부분수열 중 가장 작은 마지막 값의 sequence내 인덱스
 * 1-1. 가장 작은 값이 i번째 길이에 있어야 부분수열이 최대한 길어질 수 있기 때문에 업데이트
 *
 * 2. prev[i] = 가장 긴 부분수열의 i번째 숫자의 이전 인덱스.
 *
 * 3. 0부터 N까지 순회하면서 이진탐색으로 dp의 i번째 길이를 가진 값 중 가장 작은 부분수열을 업데이트 하면서 이전 인덱스도 추가해준다.
 * 3-1. 처음에는 바로 인덱스를 dp에 인덱스를 push
 * 3-2. 현재까지 가장 긴 부분수열(dp[dp.length - 1])의 숫자보다 sequence[i]가 더 크다면,
 * 가장 긴 부분수열의 마지막 인덱스를 현재 숫자의 prev로 기록하고 현재 숫자의 index를 dp로 push
 * 3-3. 3-1/3-2가 아니라면, 이진 탐색으로 현재 i가 위치해야 할 dp 내 인덱스를 찾고 거기에 값을 배치하고 prev는
 * 바로 이전 dp 인덱스의 값 혹은 0일 경우 -1을 넣는다.
 *
 * 4. dp 배열의 가장 끝 인덱스가 LIS의 가장 끝 인덱스. 이를 prev로 백트래킹 하면서 LIS를 만들어서 부분수열 배열에 push
 * 5. 부분수열 배열을 reverse로 로그
 */

const dp = [];
const prev = Array(N).fill(-1);
const result = [];

const binarySearch = (num) => {
  let left = 0;
  let right = dp.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (sequence[dp[mid]] >= num) right = mid;
    else left = mid + 1;
  }

  return right;
};

for (let i = 0; i < N; i++) {
  const num = sequence[i];

  if (!dp.length) {
    dp.push(i);
  } else if (sequence[dp[dp.length - 1]] < num) {
    prev[i] = dp[dp.length - 1];
    dp.push(i);
  } else {
    const targetDpIndex = binarySearch(num);
    dp[targetDpIndex] = i;
    prev[i] = targetDpIndex > 0 ? dp[targetDpIndex - 1] : -1;
  }
}

let lastLisIndex = dp[dp.length - 1];

while (lastLisIndex !== -1) {
  result.push(sequence[lastLisIndex]);
  lastLisIndex = prev[lastLisIndex];
}

console.log(result.length);
console.log(result.reverse().join(' '));

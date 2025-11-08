/** https://www.acmicpc.net/problem/21921 */

const [[N, X], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. sliding window로 값을 구하면서 최대값을 구한
 * 2. 만약 현재 합이 최대값과 같다면, count를 올림
 * 3. 만약 현재 합이 새로운 최대값이라면, 최대값을 현재 합으로 초기화하고 count를 1로 갱신
 * 4. 만약 최대값이 0이라면 SAD를 로그, 그렇지 않다면 최대값과 count를 로그
 */

let curSum = 0;
let len = 0;
let max = 0;
let count = 0;
let left = 0;

for (let i = 0; i < N; i++) {
  curSum += nums[i];
  len++;

  if (len > X) {
    curSum -= nums[left];
    left++;
    len--;
  }

  if (len === X) {
    if (curSum === max) {
      count++;
    }

    if (curSum > max) {
      max = curSum;
      count = 1;
    }
  }
}

if (max === 0) {
  console.log('SAD');
} else {
  console.log(max);
  console.log(count);
}

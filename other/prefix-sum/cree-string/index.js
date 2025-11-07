/** https://www.acmicpc.net/problem/11059 */

const nums = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('')
  .map(Number);

/** Pseudo Code
 * 1. nums의 인덱스 전체를 순회한다 (i)
 *
 * 2. i를 left, i + 1을 right의 시작점으로 잡고 left와 right를 한칸씩 넓혀 (left는 1 감소, right는 1 증가)
 * 두칸씩 윈도우를 넓혀가며 크리 문자열인지 확인한다
 *
 * 3. 만약 크리 문자열이라면, result와 비교하여 길이가 더 긴지 확인하고 더 길다면 result를 갱신한다.
 * 4. result를 로그한다.
 */

const N = nums.length;
let result = -Infinity;

for (let i = 0; i < N - 1; i++) {
  let left = i;
  let right = i + 1;
  let leftSum = 0;
  let rightSum = 0;

  while (left >= 0 && right < N) {
    leftSum += nums[left];
    rightSum += nums[right];

    if (leftSum === rightSum) {
      result = Math.max(right - left + 1, result);
    }

    left--;
    right++;
  }
}

console.log(result);

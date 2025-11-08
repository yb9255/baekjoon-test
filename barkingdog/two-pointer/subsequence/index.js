/** https://www.acmicpc.net/problem/1806 */

const [[N, S], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code
 * 1. nums를 순회하면서 계속 값을 curSum에 더해나가면서 현재 길이도 증가시킴
 *
 * 2. 만약 curSum이 S보다 크거나 같다면, minLen을 right - left + 1과 Math.min으로 비교 후 초기화
 * 이 후 현재 nums[left]를 curSum에서 제거하고 left를 1 증가시킴
 *
 * 3. minLen이 한번도 업데이트 되지 않았다면 0, 아니면 minLen을 로그
 */

let minLen = Infinity;
let curSum = 0;
let left = 0;

for (let right = 0; right < N; right++) {
  curSum += nums[right];

  while (curSum >= S) {
    minLen = Math.min(minLen, right - left + 1);
    curSum -= nums[left++];
  }
}

console.log(minLen === Infinity ? 0 : minLen);

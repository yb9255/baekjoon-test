/** https://www.acmicpc.net/problem/1806 */

const [[N, S], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code (Barkingdog)
 * 1. 각 nums의 인덱스를 시작점으로 잡고 투포인터를 시작
 * 2. 만약 right가 N보다 작고 total의 S보다 작다면, total에 계속 값을 더해 나가면서 right를 증가시킴
 * 3. right가 N이 될때까지 total이 S를 넘지 못하면 break;
 * 4. total이 S보다 크다면 부분합의 길이인 right - left + 1과 min을 Math.min으로 비교 후 갱신
 * 5. min이 변경되지 않았다면 0, 변경되었다면 min을 로그
 */

let min = Infinity;
let total = nums[0];
let right = 0;

for (let left = 0; left < N; left++) {
  while (right < N && total < S) {
    right++;

    if (right !== N) {
      total += nums[right];
    }
  }

  if (right === N && total < S) break;

  if (total >= S) {
    min = Math.min(min, right - left + 1);
  }

  total -= nums[left];
}

console.log(min === Infinity ? 0 : min);

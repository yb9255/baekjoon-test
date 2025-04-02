const input = require('fs').readFileSync('input.txt').toString().split('\n');

const iter = +input[0];
const sequence = input[1].split(' ').map(Number);

/** 점화식
 * 1. sequence의 정방향으로 LIS의 index별 최대 길이를 구하는 dp를 만든다. (forwardDp)
 * 2. sequence의 역방향으로 LIS의 index별 최대 길이를 구하는 dp를 만든다. (backwardDp)
 *
 * 3. forwardDp와 backwardDp의 합이 최대값인 index가 최대 길이가 된다.
 * 3-1. forwardDp = [1, 2, 3, 3, 3], backwardDp = [1, 1, 3, 2, 1]인 경우,
 * forwardDp[2]가 sequence[2]의 정방향 LIS 최대길이, backwardDp[2]가 sequence[2]의 역방향 LIS 최대길이가 된다.
 * 3-2. 바이토닉 수열을 양 방향 LIS의 합에서 가장 가운데 숫자가 두번 체크되므로 1을 뺀다.
 * e.g.) [1,2,4,3,1]과 같은 sequence이면 1,2,3이 가장 긴 정방향 부분수열, 1,3,4가 가장 긴 역방향 부분수열이 되며
 * 이 둘을 합친 1,2,4,3,1이 가잔 긴 바이토닉 부분수열이 된다. 이 dp[2]의 값을 세는 경우 4가 두번 포함되므로
 * 1을 빼준다.
 */

const forwardDp = Array(iter).fill(1);
const backwardDp = Array(iter).fill(1);
let result = -Infinity;

for (let i = 1; i < iter; i++) {
  for (let j = 0; j < i; j++) {
    if (sequence[i] > sequence[j]) {
      forwardDp[i] = Math.max(forwardDp[i], forwardDp[j] + 1);
    }
  }
}

for (let i = iter - 2; i >= 0; i--) {
  for (let j = iter - 1; j > i; j--) {
    if (sequence[i] > sequence[j]) {
      backwardDp[i] = Math.max(backwardDp[i], backwardDp[j] + 1);
    }
  }
}

for (let i = 0; i < iter; i++) {
  result = Math.max(result, forwardDp[i] + backwardDp[i] - 1);
}

console.log(result);

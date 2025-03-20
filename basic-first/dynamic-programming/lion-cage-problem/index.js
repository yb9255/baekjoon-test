const n = +require('fs').readFileSync('input.txt').toString();
const MOD = 9901;

/** 점화식
 * 1. dp의 n번째 index에는 length가 3인 배열을 넣는다.
 * dp[n][0] = n번째 줄에 추가하는 우리에 사자가 들어가지 않는 우리를 넣는 케이스
 * dp[n][1] = n번째 줄에 추가하는 우리 중 왼쪽에만 사자가 들어가는 우리를 넣는 케이스
 * dp[n][2] = n번째 줄에 추가하는 우리 중 오른쪽에만 사자가 들어가는 우리를 넣는 케이스
 *
 * 2. dp[n][0]의 경우, n - 1번쨰 줄 우리가 비어있던, 왼쪽만 있던, 오른쪽만 있던 다 n번쨰
 * 줄로 빈 우리를 넣을 수 있음. dp[n][0] = (dp[n - 1][0] + dp[n - 1][1] + dp[n - 1][2])
 *
 * 3. dp[n][1]의 경우, n - 1번째 줄의 우리가 오른쪽만 찼던가, 비어있을때만 넣을 수 있음.
 * dp[n][1] = (dp[n - 1][0] + dp[n - 1][2])
 *
 * 4. dp[n][2]의 경우, n - 1번째 줄의 우리가 왼쪽만 찼던가, 비어있을때만 넣을 수 있음.
 * dp[n][2] = (dp[n - 1][0] + dp[n - 1][1])
 *
 * 5. dp[n]의 누적값을 전부 더한 뒤 리턴
 */

const dp = [0, [1, 1, 1]];

for (let i = 2; i <= n; i++) {
  dp[i] = [];
  dp[i][0] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % MOD;
  dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % MOD;
  dp[i][2] = (dp[i - 1][0] + dp[i - 1][1]) % MOD;
}

console.log(dp[n].reduce((prev, cur) => (prev + cur) % MOD, 0));

/** 메모리 최적화 */
/** 점화식
 * 1. 이전 점화식을 합치면 total[n] = (dp[n - 1][0] * 3) + (dp[n - 1][1] * 2) + (dp[n - 1][2] * 2)가 됨
 *
 * 2. total[n - 1] = dp[n - 1][0] + dp[n - 1][1] + dp[n - 1][2]이므로,
 * total[n] = total[n - 1] * 2 + dp[n - 1][0]이 성립됨.
 *
 * 3. 마지막 우리에 빈 우리를 넣는 경우는, 사실상 이전 값 전체에 빈 우리 한줄을 넣기만 하기 때문에
 * 이전 값 전체의 경우의 수와 같은
 * dp[n][0] = total[n - 1]
 *
 * 4. 최종적으로, total[n] = total[n - 1] * 2 + total[n - 2]
 */

let prev2 = 3;
let prev1 = 7;

if (n === 1) {
  console.log(prev2);
  return;
}

if (n === 2) {
  console.log(prev1);
  return;
}

for (let i = 3; i <= n; i++) {
  [prev2, prev1] = [prev1, (prev1 * 2 + prev2) % MOD];
}

console.log(prev1);

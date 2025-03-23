const digit = +require('fs').readFileSync('input3.txt').toString();
const MOD = 10007;

/**
 * 점화식
 * 1. dp의 각 index는 자리수를 의미,
 *
 * 2. dp 각 index에는 길이가 10인 배열이 들어가며, 중첩 배열 내 각 index는
 * index로 끝난 숫자의 개수를 카운트함
 * e.g.) dp[1][0]은 0으로 끝난 수가 1개이므로 1, dp[1][1]은 1로 끝난 수가 1개이므로 1..
 *
 * 3. 각 마지막 숫자 k에는 자기 자신보다 큰 수가 올 수 있음. 0의 경우에는 1 ~ 9, 9의 경우에는 올 수 없음.
 *
 * 4. 따라서 n - 1에서 k보다 작은 수가 올 수 있는 경우의 수를 모두 더하면, n의 자리에서 k로 끝나는
 * 오르막 수의 모든 경우의 수를 구할 수 있음.
 *
 * 4. dp[n][k] = dp[n - 1][0] +... dp[n - 1][k - 1]
 */

const dp = [null, Array.from({ length: 10 }, () => 1)];

for (let i = 2; i <= digit; i++) {
  dp[i] = [];

  for (let j = 0; j <= 9; j++) {
    dp[i][j] = 0;

    for (let k = 0; k <= j; k++) {
      dp[i][j] += dp[i - 1][k] % MOD;
    }
  }
}

console.log(dp[digit].reduce((acc, cur) => (acc + cur) % MOD, 0));

/** 중첩문을 좀 더 줄인 버전 */

/**
 * 1. dp2는 '길이 1'일 때, 0부터 9까지 각 숫자로 끝나는 오르막 수의 누적 개수로 초기화
 *    - dp2[0]: 0으로 끝나는 오르막 수 개수 (초기엔 1)
 *    - dp2[1]: 0 또는 1로 끝나는 오르막 수 개수
 *    - dp2[2]: 0, 1, 2로 끝나는 오르막 수 개수
 *    - ...
 *    - dp2[9]: 0 ~ 9로 끝나는 오르막 수의 총 개수
 *
 * 2. 각 자리수를 추가해가며 dp2를 업데이트한다.
 *    - dp2[k] = dp2[k] + dp2[k - 1]
 *    - dp2[k]: 이전 단계에서 'k'로 끝나는 수에 'k'를 이어붙이는 경우
 *              (e.g., ...3 → ...3 → ...3)
 *    - dp2[k - 1]: 이전 단계에서 'k-1'로 끝나는 수에 'k'를 이어붙이는 경우
 *                  (e.g., ...2 → ...23)
 *    - 두 경우를 더해서 '현재 자리수'에서 'k'로 끝나는 오르막 수 개수를 만든다.
 */

const dp2 = Array(10)
  .fill(0)
  .map((_, i) => i + 1);

for (let addedDigit = 1; addedDigit < digit; addedDigit++) {
  for (let accumulatedCount = 1; accumulatedCount < 10; accumulatedCount++) {
    dp2[accumulatedCount] =
      (dp2[accumulatedCount] + dp2[accumulatedCount - 1]) % MOD;
  }
}

console.log(dp2[9]);

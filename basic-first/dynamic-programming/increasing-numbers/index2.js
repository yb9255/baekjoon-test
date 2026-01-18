/** https://www.acmicpc.net/problem/11057 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const MOD = 10_007;

/** 중첩문을 좀 더 줄인 버전 */

/**
 * 1. dp는 '길이 1'일 때, 0부터 9까지 각 숫자로 끝나는 오르막 수의 누적 개수로 초기화
 *    - dp[0]: 0으로 끝나는 오르막 수 개수 (초기엔 1)
 *    - dp[1]: 0 또는 1로 끝나는 오르막 수 개수
 *    - dp[2]: 0, 1, 2로 끝나는 오르막 수 개수
 *    - ...
 *    - dp[9]: 0 ~ 9로 끝나는 오르막 수의 총 개수
 *
 * 2. 각 자리수를 추가해가며 dp를 업데이트한다.
 *    - dp[k] = dp[k] + dp[k - 1]
 *    - dp[k]: 이전 단계에서 'k'로 끝나는 수에 'k'를 이어붙이는 경우
 *              (e.g., ...3 → ...3 → ...3)
 *    - dp[k - 1]: 이전 단계에서 'k-1'로 끝나는 수에 'k'를 이어붙이는 경우
 *                  (e.g., ...2 → ...23)
 *    - 두 경우를 더해서 '현재 자리수'에서 'k'로 끝나는 오르막 수 개수를 만든다.
 */

const dp = Array(10)
  .fill(0)
  .map((_, i) => i + 1);

for (let addedDigit = 1; addedDigit < N; addedDigit++) {
  for (let accumulatedCount = 1; accumulatedCount < 10; accumulatedCount++) {
    dp[accumulatedCount] =
      (dp[accumulatedCount] + dp[accumulatedCount - 1]) % MOD;
  }
}

console.log(dp[9]);

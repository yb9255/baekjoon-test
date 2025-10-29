/** https://www.acmicpc.net/problem/10844 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const MOD = 1_000_000_000;

/**
 * dp[n][d] = 길이가 n이고 마지막 자릿수가 d인 계단 수의 개수
 *
 * 점화식:
 * - 마지막 자릿수가 0인 경우: 앞자리는 무조건 1 → dp[n][0] = dp[n - 1][1]
 * - 마지막 자릿수가 9인 경우: 앞자리는 무조건 8 → dp[n][9] = dp[n - 1][8]
 * - 1 ≤ d ≤ 8인 경우: 앞자리는 d-1 또는 d+1 → dp[n][d] = dp[n - 1][d - 1] + dp[n - 1][d + 1]
 *
 * 초기값:
 * - dp[1][1~9] = 1 (길이 1인 계단 수는 1~9만 가능)
 * - dp[1][0] = 0 (0으로 시작하는 수는 계단 수에서 제외)
 */

const dp = [0, Array.from({ length: 10 }, (_, index) => (!index ? 0 : 1))];

for (let i = 2; i <= N; i++) {
  dp[i] = Array(10).fill(0);

  for (let digit = 0; digit <= 9; digit++) {
    if (digit === 0) {
      dp[i][digit] = dp[i - 1][1] % MOD;
    } else if (digit > 0 && digit < 9) {
      dp[i][digit] = (dp[i - 1][digit + 1] + dp[i - 1][digit - 1]) % MOD;
    } else {
      dp[i][digit] = dp[i - 1][8] % MOD;
    }
  }
}

console.log(dp[N].reduce((acc, cur) => (acc + cur) % MOD, 0));

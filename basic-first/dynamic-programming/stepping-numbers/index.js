const input = Number(require('fs').readFileSync('input.txt').toString().trim());
const MOD = 1_000_000_000;

/** 점화식
 * 1. 10, 20, 30 등은 1을 뒤에 붙이는 것만 가능 -> dp[n][0] = dp[n - 1][1]
 * 2. 9로 끝나는 수는 뒤에 8만 붙이는 것만 가능 -> dp[n][9] = dp[n - 1][8]
 * 3. m으로 끝나는 수 (1 <= m <= 8)의 경우 n - 1과 n + 1을 붙이는 것이 가능
 * -> dp[n][m] = dp[n - 1][m - 1] + dp[n - 1][m + 1]
 */

const dp = [0, Array.from({ length: 10 }, (_, index) => (!index ? 0 : 1))];

for (let n = 2; n <= input; n++) {
  dp[n] = Array.from({ length: 10 }, () => 0);

  for (let digit = 0; digit <= 9; digit++) {
    if (digit === 0) dp[n][digit] = dp[n - 1][1] % MOD;
    else if (digit === 9) dp[n][digit] = dp[n - 1][8] % MOD;
    else dp[n][digit] = (dp[n - 1][digit - 1] + dp[n - 1][digit + 1]) % MOD;
  }
}

console.log(dp[input].reduce((acc, cur) => (acc + cur) % MOD, 0));

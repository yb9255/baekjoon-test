const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

const MOD = 10_007;

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

for (let i = 2; i <= N; i++) {
  dp[i] = [];

  for (let j = 0; j <= 9; j++) {
    dp[i][j] = 0;

    for (let k = 0; k <= j; k++) {
      dp[i][j] += dp[i - 1][k] % MOD;
    }
  }
}

console.log(dp[N].reduce((acc, cur) => (acc + cur) % MOD, 0));

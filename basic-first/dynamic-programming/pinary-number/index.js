const n = +require('fs').readFileSync('input.txt').toString();

/** 점화식
 * 1. 끝자리가 0으로 끝나는 경우 -> 끝에 0, 1 둘 다 붙일 수 있음.
 * 2. 끝자리가 1로 끝나는 경우 -> 끝에 0만 붙일 수 있음.
 *
 * 3. dp에 중첩 배열로 0으로 끝나는 개수와 1로 끝나는 개수를 모음
 * e.g. dp[1]은 1자리 수이며, 1 하나만 있으므로 dp[1] = [0, 1]
 *
 * 4. dp[n][0] = dp[n - 1][0](끝자리가 0인데 0을 붙임) + dp[n - 1][1](끝자리가 1일때 0을 붙임)
 * 5. dp[n][1] = dp[n - 1][0](끝자리가 0일때 1을 붙임)
 * 6. 숫자가 커지므로 BigInt 필수
 */

const dp = Array.from({ length: n + 1 }, () => [BigInt(0), BigInt(0)]);
dp[1] = [BigInt(0), BigInt(1)];

for (let i = 2; i <= n; i++) {
  dp[i][0] = dp[i - 1][0] + dp[i - 1][1];
  dp[i][1] = dp[i - 1][0];
}

console.log((dp[n][0] + dp[n][1]).toString());

// 조금 더 최적화한다면, let으로 계속 변수만 바꾸는 방법도 있다.

let curZero = 0n;
let curOne = 1n;

for (let i = 2; i <= n; i++) {
  const newZero = curZero + curOne;
  const newOne = curZero;
  curZero = newZero;
  curOne = newOne;
}

console.log((curZero + curOne).toString());

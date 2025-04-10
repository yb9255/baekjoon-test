const n = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();

/**
 * 1. dp[n] === n개의 돌을 구했을 때 이긴 사람.
 * 2. dp[n - 1] 혹은 dp[n - 3]에서 상근이가 이겼으면 상근이 차례라서 창영이가 이기게 됨
 * 3. dp[n - 1] 혹은 dp[n - 3]에서 창영이가 이겼으면 창영이 차례라서 상근이가 이기게 됨
 */

const dp = [];
dp[1] = dp[3] = 'SK';
dp[2] = 'CY';

for (let i = 4; i <= n; i++) {
  if (dp[i - 1] === 'SK' || dp[i - 3] === 'SK') {
    dp[i] = 'CY';
  } else {
    dp[i] = 'SK';
  }
}

console.log(dp[n]);

/** 수학적 풀이
 * 홀수개만 고를 수 있으므로 홀수개의 순서만 상근이가 이긴거고
 * 짝수개의 순서면 창영이가 이긴거임
 */

console.log(n % 2 === 0 ? 'CY' : 'SK');

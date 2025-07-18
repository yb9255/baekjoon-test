const [T, ...nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** Pseudo Code
 * 1. 점화식: dp[n]은 dp[i - 1] + dp[i - 5] 혹은 dp[i - 2] + dp[i - 3]과 같음.
 */

const dp = [0, 1, 1, 1, 2, 2, 3, 4, 5, 7, 9];
const answer = [];

for (let t = 0; t < T; t++) {
  const num = nums[t];

  if (dp[num]) {
    answer.push(dp[num]);
    continue;
  }

  for (let i = 11; i <= num; i++) {
    dp[i] = dp[i - 3] + dp[i - 2];
  }

  answer.push(dp[num]);
}

console.log(answer.join('\n'));

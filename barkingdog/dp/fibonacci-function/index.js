const [N, ...nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. dp[i]는 0의 개수와 1의 개수를 기록하는 배열을 가지고,
 * dp[n] = [dp[n - 1][0] + dp[n - 2][0], dp[n - 1][1] + dp[n - 2][1]]이 된다.
 */

const dp = [
  [1, 0],
  [0, 1],
];

const fibonacci = (n) => {
  if (n === 0) return dp[0];
  if (n === 1) return dp[1];

  return [dp[n - 1][0] + dp[n - 2][0], dp[n - 1][1] + dp[n - 2][1]];
};

const answer = [];

for (let i = 0; i < N; i++) {
  const num = nums[i];

  for (let j = 0; j <= num; j++) {
    if (dp[j]) continue;
    dp[j] = fibonacci(j);
  }

  answer.push(`${dp[num][0]} ${dp[num][1]}`);
}

console.log(answer.join('\n'));

const input = require('fs').readFileSync('input.txt').toString().split('\n');

const iter = +input.shift();
const triangle = input.map((val) => val.split(' ').map(Number));

/** 점화식
 * dp[n][i] n번째 줄의 i번째 값까지 왔을 때 최대값이라고 가정
 * 정수 삼각형의 각 행의 값의 인덱스를 확인해보면
 *
 *     0
 *    0 1
 *   0 1 2
 *  0 1 2 3
 * 0 1 2 3 4
 *
 * 위와 같이 자기 인덱스와 같거나 1 작은 인덱스에서만 값을 전달받을 수 있음을 확인할 수 있다.
 * 즉, dp[n][i] = Math.max(dp[n - 1][i - 1], dp[n - 1][i]) + triangle[n][i]가 된다.
 */

const dp = Array.from({ length: iter + 1 }, () => []);
dp[0] = triangle[0];

for (let i = 1; i < iter; i++) {
  for (let j = 0; j < triangle[i].length; j++) {
    if (j === 0) {
      dp[i][j] = dp[i - 1][j] + triangle[i][j];
    } else if (j === triangle[i].length - 1) {
      dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
    } else {
      dp[i][j] = Math.max(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
    }
  }
}

console.log(Math.max(...dp[iter - 1]));

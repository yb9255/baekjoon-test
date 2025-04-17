let [n, ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n');

n = +n;
input = input.map((str) => str.split(' ').map(Number));

/**
 * 점화식
 * 1. dp[n][0] = 이번에 빨강을 선택했을 때 누적값
 * dp[n][1] = 이번에 초록을 선택했을 때 누작값
 * dp[n][2] = 이번에 파랑을 선택했을 때 누적값
 * dp[n][0] = Math.min(dp[n - 1][1](이전에 초록을 선택한 경우) + input[n][0](이번 빨강), dp[n - 1][2](이전에 파랑을 선택한 경우) + input[n][0])
 * dp[n][1] = Math.min(dp[n - 1][0](이전에 빨강을 선택한 경우) + input[n][1](이번 초록), dp[n - 1][2](이전에 파랑을 선택한 경우) + input[n][1])
 * dp[n][2] = Math.min(dp[n - 1][0](이전에 빨강을 선택한 경우) + input[n][2](이번 파랑), dp[n - 1][1](이전에 초록을 선택한 경우) + input[n][2])

 * 2. dp[0][1], dp[0][2]를 Infinity로 지정하여 첫번째 집이 무조건 빨강인 경우를 dp[n - 1]까지 구한다. (rDp)
 * 3. dp[0][0], dp[0][2]을 Infinity로 지정하여 첫번째 집이 무조건 초록인 경우를 dp[n - 1]까지 구한다. (gDp)
 * 4. dp[0][0], dp[0][1]을 Infinity로 지정하여 첫번째 집이 무조건 파랑인 경우를 dp[n - 1]까지 구한다. (bDp)
 * 5. rDp[n][0]은 될 수 없다. rDp[n][1]과 rDp[n][2]의 케이스를 구하고 rDp[n][0]은 무시한다.
 * 6. gDp[n][1]은 될 수 없다. gDp[n][0]과 gDp[n][2]의 케이스를 구하고 gDp[n][1]은 무시한다.
 * 7. bDp[n][2]는 될 수 없다. bDp[n][0]과 bDp[n][1]의 케이스를 구하고 bDp[n][2]는 무시한다.
 * 8. rDp[n], gDp[n], bDp[n] 중 최소 값을 리턴
 */

const initDp = (startIndex) => {
  const dp = [Infinity, Infinity, Infinity];
  dp[startIndex] = input[0][startIndex];

  for (let i = 1; i < n; i++) {
    const [r, g, b] = dp;
    const [rCost, gCost, bCost] = input[i];

    [dp[0], dp[1], dp[2]] = [
      Math.min(g, b) + rCost,
      Math.min(r, b) + gCost,
      Math.min(r, g) + bCost,
    ];
  }

  dp[startIndex] = Infinity;

  return dp;
};

const rDp = initDp(0);
const gDp = initDp(1);
const bDp = initDp(2);

console.log(Math.min(...rDp, ...gDp, ...bDp));

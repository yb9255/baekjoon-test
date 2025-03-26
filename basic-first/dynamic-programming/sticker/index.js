const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n');

let iter = +input.shift();
let curCase = 0;
const answer = [];

/**
 * 점화식
 * 1. stickers[0][n]은 위쪽 스티커 중 n번째에 위치한 스티커까지 더했을 때 최대값을 의미하며,
 * stickers[1][n]은 아래쪽 스티커 중 n번째에 위치한 스티커까지 더했을 때 최대값을 의미함.
 *
 * 2. dp[0][n]은 위쪽 스티커 중 n번째에 위치한 스티커까지 더했을 때 최대값을 의미하며,
 * dp[1][n]은 아래쪽 스티커 중 n번째에 위치한 스티커까지 더했을 때 최대값을 의미함.
 *
 * 3. 위쪽 스티커는 이전 열에서 위쪽 스티커가 뜯겼으면 값에 포함될 수가 없음.
 * 즉, 이전 열에는 아래쪽 스티커가 뜯겼어야 지금 열에서 위쪽 스티커를 뜯을 수 있음.
 *
 * 4. 아래쪽 스티커는 이전 열에서 아래쪽 스티커가 뜯겼으면 값에 포함될 수가 없음.
 * 즉, 이전 열에는 위쪽 스티커가 뜯겼어야 지금 열에서 아래쪽 스티커를 뜯을 수 있음.
 *
 * 5. 이때 바로 이전 열의 아래쪽 스티커를 떼지 않고 두 칸 전 아래쪽 스티커를 떼었어도 현재 열의 위쪽 스티커를 뗄 수 있으며,
 * 그 값이 더 클 수도 있다. 아래쪽 스티커도 같은 원리로, 두 칸 전 위쪽 스티커를 뗀 값이 더 클 수도 있다.
 *
 * 6. 예를 들어, dp[0][2]를 구할때는 dp[1][0]과 dp[1][1]중 더 큰 값에 stickers[0][2]를 더해야 하며
 * n === 2까지 왔을 때 최대값을 자연스럽게 누적하게 된다. 다음 계산부터는 n < 2 아래의 최대값의 누적을 계산하지
 * 않아도 된다.
 *
 * 7. 결국 각 행의 스티커 최대 누적값을 구하는 식은 다음과 같이 된다.
 * dp[0][n] = Math.max(dp[1][n - 1], dp[1][n - 2]) + stickers[0][n];
 * dp[1][n] = Math.max(dp[0][n - 1], dp[0][n - 2]) + stickers[1][n];
 *
 * 8. 두 값 중 더 큰 값을 정답으로 제출한다.
 */

while (iter > 0) {
  const curN = +input[curCase];

  const dp = [
    input[curCase + 1].split(' ').map(Number),
    input[curCase + 2].split(' ').map(Number),
  ];

  dp[0][1] += dp[1][0];
  dp[1][1] += dp[0][0];

  for (let i = 2; i < curN; i++) {
    dp[0][i] += Math.max(dp[1][i - 1], dp[1][i - 2]);
    dp[1][i] += Math.max(dp[0][i - 1], dp[0][i - 2]);
  }

  answer.push(Math.max(dp[0][curN - 1], dp[1][curN - 1]));

  curCase += 3;

  iter--;
}

console.log(answer.join('\n'));

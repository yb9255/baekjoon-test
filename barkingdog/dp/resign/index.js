/** https://www.acmicpc.net/problem/14501 */

const [[N], ...days] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. days 값을 1-based index 배열인 T와 P로 변환한다.
 * 2. i번째 날의 최대 이익을 기록하는 dp를 만든다. 이 dp는 뒤에서 앞으로 순회할 것이기 때문에
 * 마지막 날짜보다 조금 더 길게 만든다.
 *
 * 3. dp[i]는 i일부터 퇴사일까지 받을 수 있는 최대 보상을 의미한다. 점화식은 오늘 업무를 받음으로써 수익 vs 오늘을 받지 않았을때 최대 수익
 * 즉, dp[i] = Math.max(P[i] + dp[i + T[i]], dp[i + 1]);
 * 3-1. P[i] + dp[i + T[i]]: dp[i + T[i]]는 오늘 날짜로부터 T[i]일 뒤 날짜부터 마지막날까지 수익의 최대
 * 즉 오늘 날짜 일을 받으면 i + T[i]일까지 다른 일을 못하므로 오늘 날짜 금액에 i + T[i]일 금액의 최대를 더함
 * 3-2. dp[i + 1]오늘 날짜일을 받지 않았다면, 무조건 내일은 일을 할 수 있게 되므로 내일 날짜 최대 금액을 의미
 *
 * 4. 만약 오늘 날짜 기준으로 T[i]만큼 더했을때 N + 1보다 작거나 같으면 3을 적용하고 그렇지 않다면
 * 받을 수 없는 상담이므로 오늘 날짜 일을 받지 않는거로 처리한다.
 * 4-1. N + 1인 이유는 dp[i + 1]과 같은 케이스에서 오류가 발생하지 않도록 하기 위해서.
 * 값이 다음날로 건너뛰는 케이스를 고려해야 하기 때문
 *
 * 5. 최종적으로, dp[1]에 1일부터 N일까지 일하는 경우 최대값이 기록이 된다.
 */

const T = Array(N + 1).fill(0);
const P = Array(N + 1).fill(0);

days.forEach(([t, p], i) => {
  T[i + 1] = t;
  P[i + 1] = p;
});

const dp = Array(N + 2).fill(0);

for (let i = N; i >= 1; i--) {
  if (i + T[i] <= N + 1) {
    dp[i] = Math.max(P[i] + dp[i + T[i]], dp[i + 1]);
  } else {
    dp[i] = dp[i + 1];
  }
}

console.log(dp[1]);

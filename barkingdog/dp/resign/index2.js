/** https://www.acmicpc.net/problem/14501 */

const [[N], ...days] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 입력으로 받은 days를 1-based 인덱스 배열인 T, P로 옮긴다.
 * 2. dp[i]를 “i-1일째까지 벌 수 있는 최대 이익”이라 정의하고,
 *    dp 크기를 N+2로 잡아 dp[N+1]까지 접근할 수 있도록 한다.
 * 3. for i = 1…N:
 *      (1) dp[i] = max(dp[i], dp[i-1])
 *          → i일째에 아무 상담도 안 할 때, 전날까지의 최대 이익 유지
 *      (2) 만약 i일에 상담을 시작해서 끝나는 날이 N일을 넘지 않으면
 *          dp[i + T[i]] = max(dp[i + T[i]], dp[i] + P[i])
 *          → 상담이 끝나는 날(다음 날 인덱스)에 i일까지 누적 이익 + P[i] 반영
 * 4. 정답은 max(dp[N], dp[N+1])
 *    → N일까지 끝낼 수 있는 것과, N일에 끝나는 것을 모두 고려
 */

const T = Array(N + 1).fill(0);
const P = Array(N + 1).fill(0);

days.forEach(([t, p], idx) => {
  T[idx + 1] = t;
  P[idx + 1] = p;
});

const dp = Array(N + 2).fill(0);

for (let i = 1; i <= N; i++) {
  dp[i] = Math.max(dp[i], dp[i - 1]);

  if (i + T[i] <= N + 1) {
    dp[i + T[i]] = Math.max(dp[i + T[i]], dp[i] + P[i]);
  }
}

console.log(Math.max(dp[N], dp[N + 1]));

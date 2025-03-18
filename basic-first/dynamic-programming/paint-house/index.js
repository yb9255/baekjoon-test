const input = require('fs').readFileSync('input.txt').toString().split('\n');

const iter = Number(input.shift());
const matrix = input.map((item) => item.split(' ').map(Number));

/**
 * 점화식
 * 1. matrix를 순회한다.
 * 2. 첫 순회에서 모든 matrix[0]의 값을 dp에 넣는다.
 *
 * 3. 두 번째 순회부터 matrix[i](row)의 로직이 조금 달라진다.
 * 3-1. 지금 이순간 최저값을 고르면서 나아가는게 틀릴 수 있음.
 * 다음 행에서 더 최저값을 못 고르게 경우 등이 발생할 수 있기 때문
 *
 * 4. 두번째 순회에서는 각 색을 선택할 경우의 최소값 누적을 기록한다.
 * 4-1. 빨강의 index는 0이므로, 현재 row에서 빨갱을 선택했을때 최저값은
 * dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + curRow[0]이 된다.
 * 4-2 초록은 dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + curRow[1]
 * 4-3 파랑은 dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + curRow[2]
 *
 * 5. 최종적으로 dp 마지막 인덱스 값의 최소값을 구해서 리턴.
 */

let acc = matrix[0];

for (let i = 1; i < iter; i++) {
  const curRow = matrix[i];
  const curMinValues = [];

  curMinValues[0] = Math.min(acc[1], acc[2]) + curRow[0];
  curMinValues[1] = Math.min(acc[0], acc[2]) + curRow[1];
  curMinValues[2] = Math.min(acc[0], acc[1]) + curRow[2];

  acc = curMinValues;
}

console.log(Math.min(...acc));

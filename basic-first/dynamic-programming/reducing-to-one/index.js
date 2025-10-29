/** https://www.acmicpc.net/problem/1463 */

const num = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo Code
 * 🔹 Dynamic Programming (DP) 기법을 사용하여 최적의 연산 횟수를 구함
 * 🔹 작은 숫자의 최적해를 먼저 계산한 뒤, 이를 활용해 더 큰 숫자의 최적해를 구하는 방식
 * 1. 0부터 숫자까지 해당하는 배열을 만든 후 0을 채운다.
 * 이 배열은 각 숫자별 최단거리를 memo하는 기능으로 사용된다.
 * e.g.) 배열의 5번 인덱스에선 숫자 5의 최단거리 저장, 배열의 6번 인덱스에선 숫자 6의 최단거리 저장
 *
 * 2. 배열을 2부터 순회한다. (1은 어차피 값이 0이므로)
 *
 * 3. 현재 index에서 나올 수 있는 최단거리의 가능성은
 * 바로 이전 인덱스의 최단거리에 + 1 / 2로 나눈 인덱스의 최단거리에 + 1 / 3으로 나눈 인덱스로 이동의 최단거리에 + 1
 * 세가지 경우의 수가 있음.
 *
 * 4. 3에서 나온 세가지 경우의 수 중 가장 숫자가 작은 값을 현재 index에 기록
 */

const dp = new Array(num + 1).fill(0);

for (let i = 2; i <= num; i++) {
  dp[i] = dp[i - 1] + 1;

  if (i % 2 === 0) {
    dp[i] = Math.min(dp[i / 2] + 1, dp[i]);
  }

  if (i % 3 === 0) {
    dp[i] = Math.min(dp[i / 3] + 1, dp[i]);
  }
}

console.log(dp[num]);

const [[T], ...calendars] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/**
 * Pseudo Code
 *
 * Brute Force
 *
 * 1. [N, M, x, y]를 기준으로 해(year)를 계산한다.
 *    예를 들어, year = 1일 때는 (1 % N, 1 % M),
 *              year = 2일 때는 (2 % N, 2 % M)처럼 진행된다.
 *    가능한 최대 해는 N과 M의 최소공배수이며, 최악의 경우 N * M까지 탐색해야 한다.
 *
 * 2. JavaScript의 % 연산자는 0부터 N-1까지의 값을 반환하는 0-based modulo 방식이다.
 *    하지만 문제의 카잉 달력은 1부터 N까지의 값을 사용하는 1-based modulo 방식이다.
 *
 * 3. 따라서 일반적인 나머지 연산을 그대로 사용할 경우, 0~N-1 범위의 값이 나오기 때문에
 *    문제에서 요구하는 값(x 또는 y)과 직접 비교하면 오류가 발생할 수 있다.
 *
 * 4. 이를 해결하기 위해 (현재 해 - 1)에 대해 % 연산을 수행하고, 결과에 1을 더해줌으로써
 *    1-based modulo 연산을 시뮬레이션할 수 있다.
 *    즉, (year - 1) % N + 1이 x와 같은지를 확인하면 된다.
 *
 * 5. 탐색 범위를 줄이기 위해 j를 x에서 시작해서 N씩 증가시키면 다음과 같은 형태가 된다:
 *    j = x + K * N (단, K ≥ 0)
 *    이 때 j는 항상 (j - 1) % N + 1 === x 를 만족하게 된다.
 *
 * 5-1. j - 1 = x - 1 + K * N
 * 5-2. (j - 1) % N = (x - 1 + K * N) % N
 * 5-3. K * N은 N으로 나누면 나머지가 0이므로, (j - 1) % N = (x - 1) % N
 * 5-4. 따라서 (j - 1) % N + 1 = ((x - 1) % N) + 1
 * 5-5. 문제에서 x는 항상 1 이상 N 이하이므로, (x - 1) % N = x - 1
 * 5-6. 결국 (j - 1) % N + 1 = x가 된다
 * 5-7. 이러한 내용은 modulo shifting 등의 키워드로 찾아볼 수 있다.
 *
 * 6. 위 과정을 통해, j를 x에서 시작하여 N씩 증가시키면 j는 항상 카잉 달력에서 x에 해당하는 해가 된다.
 *
 * 7. 따라서 j를 x부터 시작하여 N씩 증가시키며, 각 j에 대해 y 조건인 (j - 1) % M + 1 === y를 만족하는지 확인한다.
 *
 * 8. 조건을 만족하면 순회를 중단하고 해당 j를 정답으로 사용한다. 만족하지 않으면 -1을 출력한다.
 */

const answer = Array(T).fill(-1);

for (let i = 0; i < T; i++) {
  const [N, M, x, y] = calendars[i];

  for (let j = x; j <= N * M; j += N) {
    if (((j - 1) % M) + 1 === y) {
      answer[i] = j;
      break;
    }
  }
}

console.log(answer.join('\n'));

/**
 * Pseudo Code
 *
 * 0. Chinese Remainder Theorem(중국인의 나머지 정리) 사용법이 있으나,
 * 정확히 이해가 어려워서 나중에 추가
 *
 * 1. 최소공배수를 N * M에서 나눠서 둘 사이에서 가능한 max year를 줄인다.
 */

const answer2 = Array(T).fill(-1);

const getGcd = (a, b) => (a % b ? getGcd(b, a % b) : b);
const getLcm = (a, b) => (a * b) / getGcd(a, b);

for (let i = 0; i < T; i++) {
  const [N, M, x, y] = calendars[i];
  const maxYear = getLcm(N, M);

  for (let j = x; j <= maxYear; j += N) {
    if (((j - 1) % M) + 1 === y) {
      answer2[i] = j;
      break;
    }
  }
}

console.log(answer2.join('\n'));

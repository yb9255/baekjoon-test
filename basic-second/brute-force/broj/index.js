const N = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim();

/** Pseudo Code
 * 1. 숫자 N에서 n의자리 수가 몇개인지 구한다.
 * 2. 그 개수 * n 만큼을 answer에 더한다.
 *
 * 3. 각 자리수 최대 값은 ((10 ** 자리수) - 1)이다.
 * e.g.) 두 자리수의 최대값 99는 10 ** 2 - 1.
 *
 * 4. 각 자리수의 최소값은 (10 ** 자리수 - 1)이다.
 * e.g.) 두 자리수의 최소값 10은 10 ** (2 - 1)
 *
 * 5. 자리수 최대값에서 최소값을 빼면, 최소값을 카운트하지 않은 자리수 개수를 구할 수 있다.
 * e.g.) 99 - 10은 89개, 그러나 실제론 10을 포함해서 90개가 되어야 함.
 *
 * 6. 위와 같은 방식으로 각 자리수의 개수를 구한 뒤, 자리수 개수 * 자리수 길이를 answer에 더한다.
 */

let answer = 0;

const digitCount = N.toString().length;

for (let digitLen = 1; digitLen <= digitCount; digitLen++) {
  const start = 10 ** (digitLen - 1);
  const end = Math.min(N, 10 ** digitLen - 1);

  const count = end - start + 1;
  answer += digitLen * count;
}

console.log(answer);

/**
 * 다른 풀이 설명
 *
 * 1. i는 현재 자리수의 최소값을 의미하며, 1부터 시작해 10씩 곱하면서 N의 자리수까지 순회한다.
 * 2. 각 자리수 i에 대해, 해당 자리수를 가지는 숫자의 개수를 구하고,
 *    그 개수만큼 해당 자리수를 정답(answer)에 더해준다.
 *
 * 예: N = 121일 경우
 *
 * - 1의 자리수: i = 1
 *   → 1부터 121까지 총 121개의 숫자가 존재하므로,
 *     이 숫자들은 최소한 1자리수를 가지므로 answer에 121 * 1을 더한다.
 *
 *
 * - 2의 자리수: i = 10
 *   → 10부터 121까지 총 112개의 숫자는 두 자리수를 가지므로,
 *     answer에 112 * 1을 추가로 더한다.
 *     121 - 9를 하면 112가 된다.
 *
 * - 3의 자리수: i = 100
 *   → 100부터 121까지 총 22개의 숫자는 세 자리수를 가지므로,
 *     answer에 22 * 1을 추가로 더한다.
 *     121 - 99를 하면 22가 된다.
 *
 * 이렇게 각 자리수마다 해당 범위에 포함되는 숫자 개수를 구한 뒤,
 * 그 개수만큼 해당 자리수를 곱해 answer에 누적하면 된다.
 *
 * 갯수를 구하는 방법을 보면 N 에서 9, 99, 999와 같이 10의 제곱수 - 1을 하면 구해지는데,
 * 따라서 answer += N - i + 1의 공식이 성립되게 된다.
 */
answer = 0;

for (let i = 1; i <= N; i *= 10) {
  answer += N - i + 1;
}

console.log(answer);

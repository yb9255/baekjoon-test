const [A, B, C] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);

/**
 * 1. 지수 b가 1n이 될 때까지 재귀 호출한다. (Base case: b === 1n)
 *
 * 2. 지수 b를 2로 계속 나누며 절반씩 줄인다.
 *    BigInt는 나눗셈에서 소수점 아래를 자동으로 버리므로 Math.floor는 필요 없다.
 *
 * 3. a^k를 계산할 수 있다면,
 *    - 짝수일 경우: a^(2k) = a^k * a^k
 *    - 홀수일 경우: a^(2k+1) = a^k * a^k * a
 *    이 성질을 이용해 재귀적으로 거듭제곱 값을 구할 수 있다.
 *
 * 4. 각 단계에서 곱셈 후 반드시 % mod 연산을 적용해 숫자를 작게 유지하며,
 *    결과의 정확도도 보장된다.
 *    (곱셈에 대해 모듈러 연산은 결합법칙이 성립함: (a * b) % m = ((a % m) * (b % m)) % m)
 *
 * 5. 짝수 지수 (예: b = 4n)인 경우:
 *    - a^4 % mod = (a^2 % mod) * (a^2 % mod) % mod
 *    - a^2는 다시 a^1 * a^1이므로, 재귀적으로 내려가며 계산된다.
 *
 * 6. 홀수 지수 (예: b = 5n)인 경우:
 *    - a^5 % mod = (a^2 % mod) * (a^2 % mod) * (a % mod) % mod
 *    - 즉, 짝수 제곱 두 번에 a 한 번을 추가로 곱한 형태
 *
 * 7. a % mod부터 a^b % mod가 될때까지 거듭제곱을 반복한다.
 */

const modularExponentiation = (a, b, mod) => {
  if (b === 1n) return a % mod;

  let val = modularExponentiation(a, b / 2n, mod);
  val = (val * val) % mod;

  if (b % 2n === 0n) return val;
  else return (val * a) % mod;
};

console.log(modularExponentiation(A, B, C).toString());

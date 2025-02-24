const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const [n, m] = input;

/** 조합의 개수를 구하는 기본 원리 */
// 1. 5개 중 3개의 조합을 구한다 -> 5 * (5 - 1) * (5 - 2);
// 2. n개 중 m개의 조합을 구한다 -> n * (n - 1) * (n - 2) * ... (n - (m - 1));
// 3. (n - (m - 1)) === (n - m + 1)
// 4. 즉 조합의 개수를 구하는 원리는  n * (n - 1) * (n - 2) * ... (n - m + 1);

// 5. d의 값을 구하려면 n! / (n - m)!을 구하면 됨
// e.g. n의 5, m이 3이라면 n!은 5 * 4 * 3 * 2 * 1, (n - m)!은 2 * 1이 됨.
// 우리가 필요한 것은 n!에서 (n - m)!을 나눈 것임을 알 수 있음.

// 6. 5의 결과는 순서가 변경되도 다른 값으로 치게 됨. (a, b 조합과 b, a조합을 별개로 카운트하게 됨)

// 7. m개를 고를 수 있을 시 생길 수 있는 모든 순서는 m!개임. 즉, m!개의 중복이 발생함.
// m개 중 하나를 구하면, 그 다음의 경우의 수는  m - 1, 그 다음 경우의 수는 m - 2...이기 때문에
// 모든 고를수 있는 경우의 수가 factorial이 됨.

// 8. 즉, 5.에서 구한 것을 다시 m!으로 나누는 n! / m!(n-m)!이 최종적으로 조합의 개수를 구하는 식임.

/** 풀이 */
// 1. n!의 0의 개수를 구한다. (0의 개수를 구하는 고식은 factorial-zero-count에서 찾음)
// 2. 끝자리 0은 10으로 나눠질 때마다 갯수가 하나씩 줄어든다.
// 3. 즉, (2*5)로 나눠질 때마다 0의 갯수가 하나씩 줄어든다,

// 4. 따라서 n! / m!(n-m)! 의 0의 개수를 구할 때는,
// n!의 0의 개수를 우선 구하고
// m! 과 (n-m)!에 2와 5의 약수 조합이 하나 있을 때마다 n!에서 0의 개수를 제거한다.

// 5. 일반 팩토리얼에서는 약수로 2를 가진 숫자가 약수를 5로 가진 숫자보다 항상 많기 때문에
// 6. 0의 개수를 구할 때 5만 구하면 됐지만, 조합에선 분모와 분자가 약분이 되버릴 수 있기 때문에
// 7. 2의 개수가 5의 개수보다 더 적을 수 있다. 약수로 2를 가진 숫자의 조합도 카운트 해야 함.

// 8. 이를 기반하여 n!의 0의 개수를 구하고, m!의 0의 개수와 m - n!의 0의 개수를 빼주되,
// 5가 적은 케이스와 2가 적은 케이스를 각각 별개로 구해본 뒤,
// 0이 줄어드는 케이스는 더 적은 쪽 개수만큼 10이 만들어져 줄어들 것이므로, Math.min으로 적은 쪽을 출력한다.

const getZeroCountWith5 = (number) => {
  let count = 0;

  for (let i = 5; i <= number; i *= 5) {
    count += Math.floor(number / i);
  }

  return count;
};

const getZeroCountWith2 = (number) => {
  let count = 0;

  for (let i = 2; i <= number; i *= 2) {
    count += Math.floor(number / i);
  }

  return count;
};

console.log(
  Math.min(
    getZeroCountWith2(n) - getZeroCountWith2(m) - getZeroCountWith2(n - m),
    getZeroCountWith5(n) - getZeroCountWith5(m) - getZeroCountWith5(n - m),
  ),
);

// 혹은 while문을 통해 분모를 계속 5나 2로 나눠가면서 구하는 방법도 있음
// n / 5 -> n / 5 / 5

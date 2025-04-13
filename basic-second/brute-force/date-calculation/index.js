const [E, S, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split(' ')
  .map(Number);

let curE = 1;
let curS = 1;
let curM = 1;
let count = 1;

/**
 * 아래 두 풀이 모두 메모리 초과로 풀이가 통과되지 않는다.
 * node.js에서 풀이가 불가능한 것으로 보인다.
 */

while (curE !== E || curS !== S || curM !== M) {
  count++;

  if (curE === 15) {
    curE = 1;
  } else {
    curE++;
  }

  if (curS === 28) {
    curS = 1;
  } else {
    curS++;
  }

  if (curM === 19) {
    curM = 1;
  } else {
    curM++;
  }
}

console.log(count);

/**
 * 1. E, S, M이라는 3개의 다른 주기를 구하는 연도 표기법을 다시 풀면
 * 1 1 1인 경우 셋 다 E / S / M 주기로 현재 연도를 나눴을 때 나눠떨어진다는 의미이다.
 *
 * 2. 그렇다면, 1 16 16인 경우, E는 15로 나눴을 때 1이 남았으며
 * S는 9가 남았으며
 * M은 3이 남았다는 뜻이다.
 *
 * 3. n / m을 나눴을 때 나머지가 3이라고 가정하면
 * n - 3 / m 으론 나누면 나머지 없이 딱 떨어지게 나눠지게 된다.
 * 즉 현재 E, S, M을 각 divider 숫자(15, 28, 19)의 나머지로 가지게 되는 숫자가
 * 같은 숫자가 된다.
 *
 * 4. 3에 따라 아래의 조건을 만족하게 되면 정답이 된다.
 * (year - E) % 15 === 0 && (year - S) % 28 === 0 && (year - M) % 19 === 0
 *
 */

let year = 1;

while (true) {
  if ((year - E) % 15 === 0 && (year - S) % 28 === 0 && (year - M) % 19 === 0) {
    console.log(year);
    break;
  }
  year++;
}

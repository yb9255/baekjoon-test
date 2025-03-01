const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const [start, end] = input;
const answer = [];

// 🌟 에라토스테네스의 체 (Sieve of Eratosthenes)
// - 특정 범위 내에서 소수를 빠르게 찾는 알고리즘
// - 소수를 찾을 때, 해당 소수의 배수를 모두 제거하여 소수를 걸러냄

// 1. 입력된 최대 숫자만큼의 크기를 가지는 boolean 배열을 생성한다.
//    - 초기 상태에서는 모든 값을 `true`로 설정 (모든 숫자가 소수라고 가정)
// 2. 0과 1은 소수가 아니므로 `false`로 변경한다.
// 3. 2부터 시작하여 배열을 순회한다.

// 4. 현재 인덱스가 `true`라면, 이는 소수이므로 해당 숫자의 배수를 전부 `false`로 변경한다.
//    - 예를 들어, 2의 배수(4, 6, 8...), 3의 배수(6, 9, 12...)를 제거
//    - 이때, 배수를 지울 때 `현재 숫자의 제곱`부터 시작하면 불필요한 중복 제거 가능
//      (이미 작은 소수들의 배수는 이전 단계에서 처리됨)

// 4-1. (초기 풀이 시 불필요한 로직을 넣었던 부분)
//    - 처음에는 모든 숫자가 소수인지 여부를 직접 판별하려고 했으나, 사실 이는 불필요한 연산이었다.
//    - 이유: 2와 3 같은 작은 소수부터 배수를 제거해 나가기 때문에, 이후의 숫자들은 자동으로 거를 수 있음.
//    - 예를 들어, 2가 소수로 판별되는 순간, 2의 배수(4, 6, 8...)는 전부 제거됨.
//      → 즉, 4, 6, 8이 소수인지 다시 판별할 필요가 없음.
//    - 같은 방식으로 3의 배수(9, 12, 15...)도 제거되므로, 5 이상에서 남아있는 숫자는 소수일 수밖에 없음.
//    - 따라서, 별도로 `소수 여부를 판별하는 로직`을 추가할 필요가 없으며, 단순히 `true`인 숫자만 남기면 됨.

// 5. 범위 내에서 소수를 찾아야 하므로, 주어진 시작(start)부터 끝(end)까지 반복하며 `true`인 숫자를 정답 배열에 추가한다.
// 6. 최종적으로 소수만 남은 배열을 반환한다.

const primeNumberMap = Array.from({ length: end + 1 }, () => true);
primeNumberMap[0] = primeNumberMap[1] = false;

for (let i = 2; i <= end; i++) {
  if (!primeNumberMap[i]) continue;

  if (primeNumberMap[i]) {
    for (let j = i * i; j <= end; j += i) {
      primeNumberMap[j] = false;
    }
  }
}

for (let i = start; i <= end; i++) {
  if (primeNumberMap[i]) answer.push(i);
}

console.log(answer.join('\n'));

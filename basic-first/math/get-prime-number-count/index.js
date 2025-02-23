const input = require('fs').readFileSync('input.txt').toString().split('\n');
const iter = +input.shift();
const numbers = input[0].split(' ').map(Number);
let answer = 0;

// 소수 찾기
// 2부터 Square Root까지 찾아보고 나머지가 딱 떨어지는 숫자가 없다면,
// 그 숫자는 소수이다.
// 약수의 한쪽은 반드시 제곱근보다 작아야 하므로(둘 다 제곱근보다 크면 원래 숫자를 넘게 됨)
// 제곱근 이전까지만 나눠보면 됨
// e.g. 36은 2,3,4,6까지만 체크하면, 6, 9, 12, 18에 대한 체크도 되는 것.

// 1. 숫자 배열을 순회한다.

// 2. 제곱근을 구하고, 2 부터 제곱근까지 순회하면서
// 그 사이에 약수가 있는지 구하고 없으면 소수로 판별한다.

for (let i = 0; i < iter; i++) {
  const number = numbers[i];
  if (number === 1) continue;

  const squareRoot = Math.sqrt(number);
  let isPrimeNumber = true;

  for (let j = 2; j <= squareRoot; j++) {
    if (number % j === 0) {
      isPrimeNumber = false;
      break;
    }
  }

  if (isPrimeNumber) {
    answer++;
  }
}

console.log(answer);

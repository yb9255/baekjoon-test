const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .split(' ')
  .map(Number);

let decimal = input.shift();
const targetRadix = input.shift();
const map = {};

for (let i = 0; i <= 25; i++) {
  const curCharCode = 'A'.charCodeAt();
  map[i + 10] = String.fromCharCode(curCharCode + i);
}

// 진법 구하는 법
// 1. 몫이 0이 될때까지 타겟 진법으로 나눈다
// 2. 나머지를 계속 거꾸로 붙인다.
// 기타) decimal.toString(targetRadix)와 같은 내장 메소드 사용법도 있음.

let result = '';

while (decimal > 0) {
  const quotient = Math.floor(decimal / targetRadix);
  const remainder = decimal % targetRadix;

  if (remainder < 10) {
    result = remainder + result;
  } else {
    result = map[remainder] + result;
  }

  decimal = quotient;
}

console.log(result);

const input = require('fs').readFileSync('input.txt').toString().split('\n');

const [curRadix, targetRadix] = input.shift().split(' ').map(Number);
const digitCount = Number(input.shift());
const numberForDigit = input.shift().split(' ').map(Number);

// 1. 10진법으로 우선 전환한다.
// 2. 10진법 수를 타겟 진법으로 전환한다.

let decimal = 0;
let answer = [];

for (let i = 0; i < digitCount; i++) {
  const curDigitNum = numberForDigit[i];
  const curDigitPosition = digitCount - 1 - i;

  decimal += curDigitNum * curRadix ** curDigitPosition;
}

while (decimal > 0) {
  const quotient = Math.floor(decimal / targetRadix);

  const remainder = decimal % targetRadix;

  answer = [remainder, ...answer];
  decimal = quotient;
}

console.log(answer.join(' '));

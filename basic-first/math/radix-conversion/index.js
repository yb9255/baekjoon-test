const input = require('fs').readFileSync('input.txt').toString().split(' ');

const number = input.shift();
const radix = Number(input.shift());
const map = {};
let result = 0;

for (let i = 0; i <= 25; i++) {
  const curCharCode = 'A'.charCodeAt();
  map[String.fromCharCode(curCharCode + i)] = i + 10;
}

// n진법 -> 10진법
// 1. 0의 자리에는 n^0을 곱하고, 1의 자리에는 n^1... 가장 마지막 자리 m에는 n^m을 한 뒤
// 2. 전부 더함.
// 기타) parseInt(number, radix)로 구할 수도 있음.

for (let i = 0; i < number.length; i++) {
  const digit = number[i];

  if (map[digit]) {
    result += map[digit] * Math.pow(radix, number.length - 1 - i);
  } else {
    result += Number(digit) * Math.pow(radix, number.length - 1 - i);
  }
}

console.log(result);

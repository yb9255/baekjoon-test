const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(' ')
  .map((char) => Number(char));

// 1. 유클리드 호제법
// a. 큰 수 / 작은수 = 나머지 0이 되면 최소공배수는 작은수
// b. 만약 나머지가 있다면, 작은 수 / a의 나머지를 또 나눔.
// c. 그래도 나머지가 있다면, a의 나머지 / b의 나머지를 또 나눔..
// d. 0이 나올때까지 반복

const getGcd = ([num1, num2]) => {
  let greater = Math.max(num1, num2);
  let lesser = Math.min(num1, num2);
  let result = greater % lesser === 0 ? lesser : 0;

  while (lesser > 0) {
    const remainder = greater % lesser;

    if (remainder === 0) {
      result = lesser;
      break;
    }

    greater = lesser;
    lesser = remainder;
  }

  return result;
};

// 최소공배수 = num1 * num2 / 최대공약수
const getLcm = ([num1, num2]) => {
  return (num1 * num2) / getGcd(input);
};

console.log(`${getGcd(input)}\n${getLcm(input)}`);

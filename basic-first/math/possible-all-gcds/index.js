const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n');

const iter = +input.shift();
const answer = [];

// 1. 조합의 개수는 O(n^2)로 구함.
// 2. 모든 조합을 순회하면 Gcd합을 구해서 정답에 push

const getGcd = (num1, num2) => {
  let greater = Math.max(num1, num2);
  let lesser = Math.min(num1, num2);
  let result = lesser;

  while (lesser > 0) {
    const remainder = greater % lesser;

    if (!remainder) {
      result = lesser;
      break;
    }

    greater = lesser;
    lesser = remainder;
  }

  return result;
};

const getCombinationGcdSum = (iter, numbers) => {
  let gcdSum = 0;

  for (let i = 0; i < iter; i++) {
    for (let j = i + 1; j < iter; j++) {
      gcdSum += getGcd(numbers[i], numbers[j]);
    }
  }

  return gcdSum;
};

for (let i = 0; i < iter; i++) {
  const numbers = input[i].split(' ').map(Number);
  answer.push(getCombinationGcdSum(numbers.shift(), numbers));
}

console.log(answer.join('\n'));

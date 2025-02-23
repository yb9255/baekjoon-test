const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n');

const iter = +input.shift();
const answer = [];

// A = G * a, B = G * b
// A - B == G * a - G * b == G * (a - b)
const getGcd = ([num1, num2]) => {
  let greater = Math.max(num1, num2);
  let lesser = Math.min(num1, num2);
  let result = greater % lesser === 0 ? lesser : null;

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

for (let i = 0; i < iter; i++) {
  const [num1, num2] = input[i].split(' ').map(Number);
  const gcd = getGcd([num1, num2]);

  answer.push((num1 * num2) / gcd);
}

console.log(answer.join('\n'));

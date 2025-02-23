const input = Number(require('fs').readFileSync('input.txt').toString().trim());

const factorial = (num) => {
  let result = 1;

  for (let i = num; i >= 1; i--) {
    result = result * i;
  }

  return result;
};

console.log(factorial(input));

const input = require('fs').readFileSync('input.txt').toString().split('\n');

const answer = [];

for (let i = 0; i < input.length; i++) {
  const string = input[i];
  if (string === '') continue;

  const countArr = Array.from({ length: 4 }, () => 0);

  for (let j = 0; j < string.length; j++) {
    const char = string[j];

    const isBlank = char === ' ';
    const isNumber = /[0-9]/.test(char);
    const isLowerCase = /[a-z]/.test(char);
    const isUpperCase = /[A-Z]/.test(char);

    if (isLowerCase) {
      countArr[0]++;
    } else if (isUpperCase) {
      countArr[1]++;
    } else if (isNumber) {
      countArr[2]++;
    } else if (isBlank) {
      countArr[3]++;
    }
  }

  answer.push(countArr.join(' '));
}

console.log(answer.join('\n'));

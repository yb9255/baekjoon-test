let input = require('fs').readFileSync('input2.txt').toString();

const lower = 'abcdefghijklmnopqrstuvwxyz';
const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let answer = '';

for (let i = 0; i < input.length; i++) {
  const char = input[i];

  const isLowerCase = lower.includes(char);
  const isUpperCase = upper.includes(char);
  const isAlphabetToken = isLowerCase || isUpperCase;

  if (!isAlphabetToken) {
    answer += char;
  } else if (isLowerCase) {
    const newChar = lower[(lower.indexOf(char) + 13) % lower.length];
    answer += newChar;
  } else if (isUpperCase) {
    const newChar = upper[(upper.indexOf(char) + 13) % upper.length];
    answer += newChar;
  }
}

console.log(answer);

const input = require('fs').readFileSync('input.txt').toString();

const answer = Array.from({ length: 26 }, () => 0);
const alphabetIndexMap = {};

for (let i = 0; i < answer.length; i++) {
  alphabetIndexMap[String.fromCharCode(97 + i)] = i;
}

for (let i = 0; i < input.length; i++) {
  const char = input[i];

  answer[alphabetIndexMap[char]]++;
}

console.log(answer.join(' '));

const input = require('fs').readFileSync('input.txt').toString();

const answer = Array.from({ length: 26 }, () => -1);
const alphabetIndexMap = {};

for (let i = 0; i < answer.length; i++) {
  alphabetIndexMap[String.fromCharCode(97 + i)] = i;
}

input.split('').forEach((char, index) => {
  if (answer[alphabetIndexMap[char]] === -1) {
    answer[alphabetIndexMap[char]] = index;
  }
});

console.log(answer.join(' '));

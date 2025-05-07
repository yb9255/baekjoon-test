const [first, second] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const alphabetCount = 'z'.charCodeAt() - 'a'.charCodeAt() + 1;
const BASE_CODE_COUNT = 'a'.charCodeAt();

const count = Array(alphabetCount).fill(0);

for (let i = 0; i < first.length; i++) {
  const codeIndex = first[i].charCodeAt() - BASE_CODE_COUNT;
  count[codeIndex]++;
}

for (let i = 0; i < second.length; i++) {
  const codeIndex = second[i].charCodeAt() - BASE_CODE_COUNT;
  count[codeIndex]--;
}

console.log(count.reduce((acc, cur) => acc + Math.abs(cur), 0));

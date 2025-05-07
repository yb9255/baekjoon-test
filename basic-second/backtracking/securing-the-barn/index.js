const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 조합을 구한 다음,
 * 2. answer에 넣기 전에 자음, 모음 개수가 충족되는지 확인하고 push
 */

const [L, C] = input[0].split(' ').map(Number);
const answer = [];
const VOWELS = 'aeiou';

const chars = input[1]
  .split(' ')
  .sort((a, b) => a.charCodeAt() - b.charCodeAt());

const checkIsValidPassword = (stack) => {
  let vowelCount = 0;
  let consonantCount = 0;
  let isValid = false;

  for (const char of stack) {
    if (VOWELS.includes(char)) vowelCount++;
    else consonantCount++;

    if (vowelCount >= 1 && consonantCount >= 2) {
      isValid = true;
      break;
    }
  }

  return isValid;
};
const getCombs = (startIndex, stack) => {
  if (stack.length === L) {
    const isValid = checkIsValidPassword(stack);

    if (isValid) {
      answer.push(stack.join(''));
    }

    return;
  }

  for (let i = startIndex; i < C; i++) {
    stack.push(chars[i]);
    getCombs(i + 1, stack);
    stack.pop();
  }
};

getCombs(0, []);
console.log(answer.join('\n'));

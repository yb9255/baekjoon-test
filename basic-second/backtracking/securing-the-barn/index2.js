/** https://www.acmicpc.net/problem/1759 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** stack 대신 cur에 매 재귀마다 값을 오버라이딩하도록 구현 */

const [L, C] = input[0].split(' ').map(Number);
const vowels = 'aeiou';

const chars = input[1]
  .split(' ')
  .sort((a, b) => a.charCodeAt() - b.charCodeAt());

const cur = [];
const result = [];

const check = (chars) => {
  let vowelCount = 0;
  let consonantCount = 0;
  let isValid = false;

  for (const char of chars) {
    if (vowels.includes(char)) vowelCount++;
    else consonantCount++;

    if (vowelCount >= 1 && consonantCount >= 2) {
      isValid = true;
      break;
    }
  }

  return isValid;
};

const dfs = (depth, startIdx) => {
  if (depth === L) {
    if (check(cur)) {
      result.push(cur.join(''));
    }

    return;
  }

  for (let i = startIdx; i < C; i++) {
    cur[depth] = chars[i];
    dfs(depth + 1, i + 1);
  }
};

dfs(0, 0);
console.log(result.join('\n'));

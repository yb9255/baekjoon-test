const word = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * Pseudo Code
 * 1. 현재 문자열 코드에서 3을 빼고 기본 코드도 빼면 A로부터 다음 코드 인덱스를 얻을 수 있음.
 * 2. 만약 음수까지 내려갔다면 전체 길이를 더해줘서 음수 보정을 해준다.
 * 3. A 코드 + 다음 코드 인덱스를 더해서 타겟 문자열을 구한 뒤 정답에 더해준다.
 */

const baseCode = 'A'.charCodeAt();
let answer = '';

for (let i = 0; i < word.length; i++) {
  const char = word[i];
  let nextCodeIdx = char.charCodeAt() - 3 - baseCode;

  if (nextCodeIdx < 0) {
    nextCodeIdx += 26;
  }

  const nextChar = String.fromCharCode(baseCode + nextCodeIdx);
  answer += nextChar;
}

console.log(answer);

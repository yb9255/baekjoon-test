/** https://www.acmicpc.net/problem/11655 */

/**
 * Pseudo Code
 *
 * 1. 단어가 공백이면 그냥 정답에 더함
 *
 * 2. 단어가 소문자라면 'a'의 코드를 뺀 다음 26의 나머지를 구해 만약 13을 더했을때 'z'를 넘어가는 경우
 * 얼마나 로테이션 되어야 하는지를 구하고, 그 구한 값에 다시 'a'의 코드를 더함
 *
 * 3. 단어가 대문자라면 'A'의 코드를 뺀 다음 26의 나머지를 구해 만약 13을 더했을때 'Z'를 넘어가는 경우
 * 얼마나 로테이션 되어야 하는지를 구하고, 그 구한 값에 다시 'A'의 코드를 더함
 *
 * 4. 2, 3의 결과를 정답에 더하고 로그
 */

const sentence = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString();

let answer = '';

for (let i = 0; i < sentence.length; i++) {
  const char = sentence[i];
  const code = char.charCodeAt();

  let base;

  if ('a' <= char && char <= 'z') {
    base = 'a'.charCodeAt();
  } else if ('A' <= char && char <= 'Z') {
    base = 'A'.charCodeAt();
  } else {
    answer += char;
    continue;
  }

  const rotate = String.fromCharCode(((code - base + 13) % 26) + base);
  answer += rotate;
}

console.log(answer);

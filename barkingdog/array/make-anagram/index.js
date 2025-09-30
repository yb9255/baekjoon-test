/* https://www.acmicpc.net/problem/1919 */

const [first, second] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. a를 0번 인덱스... z를 25번 인덱스에 기록하는 countMap을 만든다.
 * 2. first를 순회하면서 countMap에 문자에 해당하는 index를 1씩 늘린다.
 * 3. second를 순회하면서 countMap에 문제 해당하는 index를 1씩 줄인다.
 * 4. 이 후 countMap을 순회하면서 0이 아닌 경우 first 혹은 second에면 해당 알파벳이 있다는 뜻이므로,
 * 절대값을 최종 count에 더한 뒤 로그한다.
 */

const alphabetCount = 'z'.charCodeAt() - 'a'.charCodeAt() + 1;
const BASE_CODE = 'a'.charCodeAt();

const countMap = Array(alphabetCount).fill(0);

for (let i = 0; i < first.length; i++) {
  const codeIndex = first[i].charCodeAt() - BASE_CODE;
  countMap[codeIndex]++;
}

for (let i = 0; i < second.length; i++) {
  const codeIndex = second[i].charCodeAt() - BASE_CODE;
  countMap[codeIndex]--;
}

console.log(countMap.reduce((acc, cur) => acc + Math.abs(cur), 0));

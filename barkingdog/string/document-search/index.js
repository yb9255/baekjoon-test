const [doc, word] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * Pseudo Code
 * 1. indexOf의 두번째 인자로 몇번째 index부터 특정 문자열을 찾을 수 있는지 설정할 수 있음
 * e.g.) <문자열>.indexOf('ab', 5)는 ab가 있는 시작인덱스가 어디인지 찾되, 5번째 인덱스부터 찾음.
 *
 * 2. word가 있는 초기 index부터 word 길이만큼 시작 index를 늘려가면서 count를 늘려간다.
 * 3. 더이상 index가 초기화되질 못할때까지 반복한다.
 */

let count = 0;
let index = doc.indexOf(word);

while (index !== -1) {
  count++;
  index = doc.indexOf(word, index + word.length);
}

console.log(count);

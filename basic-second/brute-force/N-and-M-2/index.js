const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .split(' ')
  .map(Number);

/** Pseudo Code
 * 1. getSequence 함수는 depth, total, prev 함수를 받는다.
 * 2. getSequence 함수는 depth가 4가 되면 answer에 total.trim()을 push한다.
 * 3. getSequence는 prev + 1부터 값을 순회하면서 재귀로 실행된다.
 * 4. 재귀를 끝내면, 오름차순으로 완성된 길이 M의 수열이 완성된다.
 */

const answer = [];

const getSequence = (depth, total, prev) => {
  if (depth === M) {
    answer.push(total.trim());
    return;
  }

  for (let i = prev + 1; i <= N; i++) {
    getSequence(depth + 1, total + i + ' ', i);
  }
};

getSequence(0, '', 0);
console.log(answer.join('\n'));

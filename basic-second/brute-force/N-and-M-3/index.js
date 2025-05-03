const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code
 * N-and-M-1에서 checked 부분을 빼고 풀이
 */

const answer = [];

const getSequence = (depth, total) => {
  if (depth === M) {
    answer.push(total.trim());
    return;
  }

  for (let i = 1; i <= N; i++) {
    getSequence(depth + 1, total + i + ' ');
  }
};

getSequence(0, '');
console.log(answer.join('\n'));

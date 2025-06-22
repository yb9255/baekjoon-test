const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/**
 * Pseudo Code
 * 1. 현재 인덱스의 숫자를 계속 덮어씌우는 재귀를 돈다.
 * 2. 만약 idx가 0이 아니라면 idx 이전 인덱스부터 for문을 돈다.
 */

const curSequence = [];
const answer = [];

const generateSequence = (idx) => {
  if (idx === M) {
    answer.push(curSequence.join(' '));
    return;
  }

  let start = 1;
  if (idx !== 0) start = curSequence[idx - 1] + 1;

  for (let i = idx; i <= N; i++) {
    curSequence[idx] = i;
    generateSequence(idx + 1);
  }
};

generateSequence(0);
console.log(answer.join('\n'));

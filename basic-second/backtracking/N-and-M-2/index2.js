/** https://www.acmicpc.net/problem/1182 */

const [N, M] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/**
 * Pseudo Code (BarkingDog 풀이)
 * 1. 현재 인덱스의 숫자를 계속 덮어씌우는 재귀를 돈다.
 * 2. 만약 idx가 0이 아니라면 idx 이전 인덱스부터 for문을 돈다.
 */

const curSequence = [];
const answer = [];

const generateSequence = (depth) => {
  if (depth === M) {
    answer.push(curSequence.join(' '));
    return;
  }

  let start = 1;
  if (depth !== 0) start = curSequence[depth - 1] + 1;

  for (let i = start; i <= N; i++) {
    curSequence[depth] = i;
    generateSequence(depth + 1);
  }
};

generateSequence(0);
console.log(answer.join('\n'));

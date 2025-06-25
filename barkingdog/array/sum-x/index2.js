const [[N], sequence, [X]] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. 각 숫자가 몇번 나왔는지 기록한다.
 * 2. X의 절반만 순회하면서, i와 X에서 i를 뺀 횟수가 1씩 나온다면, 그 두 수의 합이 X가 되므로 1을 더한다.
 */

const countMap = [];

for (let i = 0; i < N; i++) {
  countMap[sequence[i]] = (countMap[sequence[i]] || 0) + 1;
}

let answer = 0;

for (let i = 1; i < Math.floor((X + 1) / 2); i++) {
  if (countMap[i] === 1 && countMap[X - i] === 1) answer++;
}

console.log(answer);

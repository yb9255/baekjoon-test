/** https://www.acmicpc.net/problem/30088 */

const [[N], ...teams] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 1번째로 퇴근이 빠른 부서 퇴근 시간 + 2번째 + 3번째.... + N번째를 누적하는 문제이므로
 * 먼저 각 부서의 퇴근시간을 구한 뒤 배열 times에 담고 sort한다.
 * 2. times를 순회하면서 i번쨰 팀까지 누적합을 만들고, 그 누적합을 result에 더한다.
 * 3. result를 로그한다.
 */

const times = [];

for (let i = 0; i < N; i++) {
  const [count, ...members] = teams[i];
  let sum = 0n;

  for (let j = 0; j < count; j++) {
    sum += BigInt(members[j]);
  }

  times.push(sum);
}

let total = 0n;
let prefix = 0n;

times.sort((a, b) => (a < b ? -1 : 1));

for (const time of times) {
  prefix += time;
  total += prefix;
}

console.log(total.toString());

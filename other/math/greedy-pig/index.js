/** https://www.acmicpc.net/problem/3060 */

const [N, ...lines] = require('fs')
  /** 간혹 아래와 같이 0, utf-8로 풀이를 해야 할 때가 있음. */
  .readFileSync(process.platform === 'linux' ? 0 : 'input.txt', 'utf-8')
  .toString()
  .trim()
  .split('\n');

/**
 * 경우의 수에 돼지 먹이가 사용되는 경우를 구하면 모든 돼지 먹이가 4번씩 사용됨.
 * 즉 하루가 지나면 필요한 먹이는 전날 먹이 총합의 4배씩 증가
 */

const days = [];

let line = 0;

for (let i = 0; i < +N; i++) {
  const feedAmount = +lines[line++];
  const pigs = lines[line++].split(' ').map(Number);

  let total = pigs.reduce((acc, cur) => acc + cur, 0);
  let day = 1;

  while (total <= feedAmount) {
    day++;
    total *= 4;
  }

  days.push(day);
}

console.log(days.join('\n'));

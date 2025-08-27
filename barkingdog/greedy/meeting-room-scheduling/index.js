/** https://www.acmicpc.net/problem/1931 */

const [N, ...lines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 스케쥴을 끝나는 시간 기준으로 오름차순으로 정렬한다. 끝나는 시간이 같다면, 시작 시간을 기준으로 오름차순으로 정렬한다.
 *    - 끝나는 시간이 빠른 수업을 최대한 많이 들어야 최대 개수를 구하기 때문
 * 2. 현재 몇시까지 시간이 지났는지 기록하는 currentTime 변수를 만들고 0으로 초기화한다.
 * 3. 스케쥴을 처음부터 순회한다. currentTime이 현재 스케쥴의 시작 시간보다 뒤라면 건너뛴다.
 * 4. currentTime이 시작시간보다 빠르다면 이 수업을 듣는것으로 기록(answer++)하고 currentTime을 현재 수업의 끝나는 시간으로 초기화한다.
 * 5. answer를 로그한다.
 */

const schedules = lines
  .map((line) => line.split(' ').map(Number))
  .sort((a, b) => a[1] - b[1] || a[0] - b[0]);

let answer = 0;
let currentTime = 0;

for (let i = 0; i < +N; i++) {
  const [start, end] = schedules[i];
  if (currentTime > start) continue;
  answer++;
  currentTime = end;
}

console.log(answer);

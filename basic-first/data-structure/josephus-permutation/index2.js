/** https://www.acmicpc.net/problem/1158 */

const [N, K] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/**  Pseudo Code: 원형 배열 풀이(링크드 리스트 풀이)
 * 1. 링크드 리스트를 바로 구현하기는 어려우므로 배열 두개로 만드는 링크드 리스트
 * 2. 공간복잡도가 크므로 공간복잡도가 중요하면 사용하지 않는다.
 *
 * 3. prev = [], cur = [] 두개를 만들고,
 *    prev[1] === N
 *    prev[i] (0 < i <= n) === i - 1
 *    next[n] === 1;
 *    next[i] (0 < i <= n) === i + 1
 *    형태로 링크드 리스트를 구현한다.
 *
 * 4. 이렇게하면 prev[n]에는 n의 이전값, next[n]에는 n의 이후값이 들어간다.
 * 5. prev, next의 len을 기록한 다음, len이 끝날떄가지 순회하는 while문을 돌기 시작한다.
 * 6. order가 k와 일치하지 않으면 order를 눌려준 다음 현재 값을 다음으로 넘긴다. (next[cur]);
 *
 * 7. order가 k와 일치하면, 링크드 리스트의 연결고리를 끊어야 한다. 다음 숫자의 prev를 현재 숫자의 prev로 바꾸고
 * 다음 숫자의 next를 현재 숫자의 next로 바꿔 연결고리를 지운다. 이 후 order를 다시 1로 바꾸고 정답에 현재값을 push한 다음
 * cur를 next[cur]로 바꿔서 링크드 리스트에서 완전히 제거후 len을 1 줄여준다.
 *
 * 8. 이 과정을 len이 0이 될때까지 반복한다. len이 0이 되면 answer를 로그한다.
 *
 */

const prev = [];
const next = [];
const answer = [];

for (let i = 1; i <= N; i++) {
  prev[i] = i === 1 ? N : i - 1;
  next[i] = i === N ? 1 : i + 1;
}

let order = 1;
let cur = 1;
let len = N;

while (len) {
  if (order === K) {
    prev[next[cur]] = prev[cur];
    next[prev[cur]] = next[cur];

    answer.push(cur);

    len--;
    cur = next[cur];
    order = 1;
  } else {
    cur = next[cur];
    order++;
  }
}

console.log(`<${answer.join(', ')}>`);

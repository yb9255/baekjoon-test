/** https://www.acmicpc.net/problem/14226 */

const S = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo Code
 *
 * 1. 현재 화면의 글자수 screen과 클립보드에 저장된 글자수 clipboard를 저장하는 방문 배열을 만든다.
 * 초기 값은 -1이며, -1이면 이 상태에 도달한 적이 없다는 의미이다.
 * e.g. dist[screen][clipboard] = 현재 screen과 clipboard 상태가 될때까지 걸린 시간
 *
 * 2. 현재 screen을 그대로 clipboard에 담은 상태가 없다면, dist[screen][screen](현재 screen을 복사함)
 * 에 현재 상태 시간 (dist[screen][clipboard])의 1을 더해준 시간을 기록하고 queue에 복사 상태를 push한다.
 *
 * 3. 현재 상태에 clipboard 글씨를 더하는 screen + clipboard 상태가 없다면, 현재 시간에 1을 더한 시간을
 * screen + clipboard에 해당하는 dist 위치에 기록하고 queue에 push한다.
 *
 * 4. 현재 상태에서 screen 한글자를 지우는 screen - 1 상태가 없다면, 현재 시간에 1을 더한 시간을
 * screen -1 해당하는 dist 위치에 기록하고 queue에 push한다.
 *
 * 5. screen이 S가 된다면, dist[screen][clipboard]를 로그한다.
 */

const MAX = 2000;
const dist = Array.from({ length: MAX + 1 }, () => Array(MAX + 1).fill(-1));

const queue = [[1, 0]];
let front = 0;
dist[1][0] = 0;

while (front < queue.length) {
  const [screen, clipboard] = queue[front++];
  const sec = dist[screen][clipboard];

  if (screen === S) {
    console.log(sec);
    break;
  }

  if (dist[screen][screen] === -1) {
    dist[screen][screen] = sec + 1;
    queue.push([screen, screen]);
  }

  if (
    clipboard > 0 &&
    screen + clipboard <= MAX &&
    dist[screen + clipboard][clipboard] === -1
  ) {
    dist[screen + clipboard][clipboard] = sec + 1;
    queue.push([screen + clipboard, clipboard]);
  }

  if (screen > 0 && dist[screen - 1][clipboard] === -1) {
    dist[screen - 1][clipboard] = sec + 1;
    queue.push([screen - 1, clipboard]);
  }
}

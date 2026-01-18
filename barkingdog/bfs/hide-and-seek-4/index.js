/** https://www.acmicpc.net/problem/13913 */

const [seekerPosition, hiderPosition] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code
 * 1. 시작 인덱스부터 끝 인덱스까지 걸린 시간을 기록하는 time 배열 생성
 * 2. 백트래킹을 기록하는 prevPath 배열 생성
 * 3. bfs로 이전 좌표, 이후 좌표, 2배 좌표를 순회하면서 다음 좌표의 prev 좌표를 기록
 *
 * 4. bfs로 이전 좌표, 이후 좌표, 2배 좌표를 순회하면서 다음 좌표까지 걸린 시간을
 * 현재좌표 + 1로 기록
 *
 * 5. bfs가 끝난 이후 걸린 시간을 리턴
 *
 * 6. 끝 인덱스의 이전 인덱스를 while로 찾고, 찾으면 이전 인덱스의 이전 인덱스를 찾고..
 * 이런 식으로 이전 인덱스가 없을때까지 순회하면서 순서를 복원함. 이 때 인덱스를 찾을 때마다 배열에 push
 *
 * 7. 인덱스 순서를 기록한 배열을 reverse해서 출력
 */

const MAX = 100_001;

const prevPath = Array(MAX).fill(-1);
const time = Array(MAX).fill(-1);
time[seekerPosition] = 0;

const queue = [seekerPosition];
let front = 0;

while (front < queue.length) {
  const curSeekerPosition = queue[front++];

  for (const next of [
    curSeekerPosition + 1,
    curSeekerPosition - 1,
    curSeekerPosition * 2,
  ]) {
    if (next < 0 || next >= MAX || time[next] !== -1) continue;

    time[next] = time[curSeekerPosition] + 1;
    prevPath[next] = curSeekerPosition;
    queue.push(next);
  }
}

console.log(time[hiderPosition]);

let lastPosition = hiderPosition;
const path = [hiderPosition];

while (prevPath[lastPosition] > -1) {
  path.push(prevPath[lastPosition]);
  lastPosition = prevPath[lastPosition];
}

console.log(path.reverse().join(' '));

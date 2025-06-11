const [seekerPosition, hiderPosition] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code (BarkingDog 풀이)
 * 1. 동생이 이동할때마다 수빈이가 그 시간에 방문하는게 가능하지 모든 포지션을 기록하고
 * 검사하는 것은 시간 / 공간 모두 비효율적이다.
 * 동생의 이동 시간이 홀수인지 짝수인지에 따라 홀수 시간에 거기에 방문 가능한지, 짝수시간에
 * 거기에 방문이 가능한지 체크한다.
 *
 * 2. bfs로 수빈이의 포지션을 초별로 기록하는 배열을 만든다.
 * visited[홀/짝][몇 초] = 누적 초 형태로 bfs를 순회하며 기록한다.
 * 이전에 먼저 방문한 기록이 있다면 건너뛴다.
 *
 * 3. 동생의 시간을 업데이트하는 while문을 돌면서 업데이트 할때마다 홀수 초 / 짝수 초 배열을
 * 체크해서 동생 시간에 방문하거나 그 이전에 방문하여 대기하고 있는게 가능했는지 체크하고
 * 그렇다면 time 리턴
 *
 * 4. 동생 시간이 MAX를 초과했음에도 같이 만나지 못했다면, -1 리턴
 */

const MAX = 500_001;
const visited = Array.from({ length: 2 }, () => Array(MAX).fill(-1));

const queue = [[seekerPosition, 0]];
let front = 0;

visited[0][seekerPosition] = 0;

while (front < queue.length) {
  const [curSeekerPosition, time] = queue[front++];
  const nextTime = time + 1;

  for (const next of [
    curSeekerPosition + 1,
    curSeekerPosition - 1,
    curSeekerPosition * 2,
  ]) {
    if (next < 0 || next > MAX) continue;
    if (visited[nextTime % 2][next] !== -1) continue;

    visited[nextTime % 2][next] = nextTime;
    queue.push([next, nextTime]);
  }
}

let time = 0;
let curHiderPosition = hiderPosition;

while (curHiderPosition <= MAX) {
  if (
    visited[time % 2][curHiderPosition] !== -1 &&
    visited[time % 2][curHiderPosition] === time
  ) {
    console.log(time);
    process.exit();
  }

  time++;
  curHiderPosition += time;
}

console.log(-1);

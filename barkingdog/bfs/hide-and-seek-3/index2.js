/** https://www.acmicpc.net/problem/13549 */

const [seekerPosition, hiderPosition] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** 0-1 BFS: 간선의 가중치가 0 또는 1인 BFS
 * 이 경우 큐가 아닌 덱을 사용하는 BFS가 추천됨
 */

/** Pseudo Code
 * 1. deque에 쓸 배열을 만들고, 넉넉하게 앞뒤로 움직일 수 있도록 N의 두배 길이로 생성
 * 2. 처음에 deque의 front/back 모두 중간에 위치시킨 뒤, N을 push_back으로 넣음
 * 3. distance를 기록하는 배열을 만들고, seekerPosition을 0으로 기록
 * 4. bfs로 deque를 순회, 처음에는 dequeue로 값을 꺼내온 뒤 teleport할 좌표를 구한다.
 * 5. distance의 teleport 좌표에 현재 distance를 기록하고, teleport를 push_front로 넣음. 방문한 기록이 있으면 건너뜀.
 * 6. 이 후 +-1씩 이동하는 좌표는 push_back으로 넣고 다음 좌표의 distance는 현재 좌표의 +1을 기록. 방문한 기록이 있으면 건너뜀
 * 7. bfs에서 hiderPosition에 도달하면, distance[curSeekerPosition]을 리턴
 *
 */

const MAX = 100_001;
const distance = new Array(MAX).fill(-1);

const deque = new Array(MAX * 2);
let front = MAX;
let back = MAX;

deque[back++] = seekerPosition;
distance[seekerPosition] = 0;

while (front < back) {
  const curSeekerPosition = deque[front++];

  if (curSeekerPosition === hiderPosition) {
    console.log(distance[hiderPosition]);
    break;
  }

  const teleport = curSeekerPosition * 2;

  if (teleport < MAX && distance[teleport] === -1) {
    distance[teleport] = distance[curSeekerPosition];
    deque[--front] = teleport;
  }

  for (const next of [curSeekerPosition - 1, curSeekerPosition + 1]) {
    if (next < 0 || next >= MAX || distance[next] !== -1) continue;
    distance[next] = distance[curSeekerPosition] + 1;
    deque[back++] = next;
  }
}

/** https://www.acmicpc.net/problem/5014 */

const [F, S, G, U, D] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code (barkingdog)
 * 1. 이동거리를 기록하는 distance 배열을 만든다
 * 2. S의 distance를 0으로 기록한다.
 * 3. U만큼 올라가거나 D만큼 내려갈 때, 다음 distance에 현재 distance 거리에 1을 더해준다.
 * 4. distance[G]가 -1이면 'use the stairs'를, 그렇지 않다면 distance[G]를 리턴한다.
 */

const distance = Array(F + 1).fill(-1);
distance[S] = 0;

const queue = [S];
let front = 0;

while (front < queue.length) {
  const curFloor = queue[front++];

  if (curFloor === G) {
    console.log(distance[G]);
    process.exit();
  }

  for (const next of [curFloor + U, curFloor - D]) {
    if (next < 1 || next > F || distance[next] !== -1) continue;
    distance[next] = distance[curFloor] + 1;
    queue.push(next);
  }
}

console.log('use the stairs');

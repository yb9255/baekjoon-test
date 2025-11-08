/** https://www.acmicpc.net/problem/3020 */

const [first, ...rest] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. bottom[h] -> h 높이의 석순 개수를 기록 (1-based)
 * 2. top[h] -> h 높이의 종유석 개수를 기록 (1-based)
 * 3. 먼저 각 종유석/석순의 높이를 top, bottom에 기록한다.
 *
 * 4. 만약 h 높이로 비행하고 있다면, h높이에 있는 종유석과 석순의 개수를 모두 배열을 순회하면서
 * 구해야 하는데 이 경우 순회를 다시 돌아야 함. 그렇기 때문에 bottom/top을 재정의하고 값을 다시 구함
 * 4-1. bottom[h] -> h 높이 이상의 석순 개수를 기록
 * 4-2. top[h] -> h 높이 이상의 종유석 개수를 기록
 * 4-3. H - 1부터 뒤로 순회하면서 top과 bottom보다 더 높은 값을 누적해서 더해준다
 * (bottom[i] += bottom[i + 1]을 계속 반복하면 bottom[0]에는 모든 높이의 석순이 누적됨. top도 같은 이치)
 *
 * 5. 높이 1부터 H까지 순회한다. (1-based이므로, h)
 * 5-1. 해당 높이로 날아갈 때 총둘하는 종유석은 top[H - h + 1], 석순은 bottom[h]이다.
 * 5-2  충돌하는 종유석과 석순의 합이 현재 최소값보다 작다면 최소값을 갱신하고 갯수를 1로 초기화
 * 5-3. 충돌하는 종유석과 석순의 합이 현재 최소값과 같다면 갯수를 1 증가
 *
 * 6. 최솟값을 로그
 */

const [N, H] = first.split(' ').map(Number);
const heights = rest.map(Number);
const bottom = Array(H + 2).fill(0);
const top = Array(H + 2).fill(0);

for (let i = 0; i < N; i++) {
  const height = heights[i];
  if (i % 2 === 0) bottom[height]++;
  else top[height]++;
}

for (let i = H - 1; i >= 1; i--) {
  bottom[i] += bottom[i + 1];
  top[i] += top[i + 1];
}

let minCrashedCount = Infinity;
let areaCount = 0;

for (let h = 1; h <= H; h++) {
  const crashedCount = bottom[h] + top[H - h + 1];

  if (crashedCount < minCrashedCount) {
    minCrashedCount = crashedCount;
    areaCount = 1;
  } else if (crashedCount === minCrashedCount) {
    areaCount++;
  }
}

console.log(minCrashedCount, areaCount);

const [[N, M, G, R], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 배양액을 뿌릴 수 있는 좌표를 전부 구한 뒤 배열에 보관(candidates)
 *
 * 2. candidates 좌표 중 배양액을 뿌릴 좌표 인덱스 조합을 만들어주는 pickPositions 함수 구현
 * 2-1. 현재 탐색하는 candidates index 빈 배열을 인자로 받고 시작
 * 2-2. 재귀함수로 다음 candidates index를 탐색하고 현재 인덱스는 배열에 담지 않는 케이스를 추가한다.
 * pickPositions(idx + 1, picked)
 * 2-3. 재귀함수로 다음 candidates index를 탐색하고 현제 인덱스를 배열에 담는 케이스를 추가한다.
 * pickPositions(idx + 1, [...picked, idx])
 * 2-4. 누적된 idx가 전체 배양액 수와 일치하면 maxFlower 수를 세는 countMaxFlower 함수를 실행한다.
 * countMaxFlower는 다음의 인자를 가진다.
 * 2-4-1. <현재 탐색중인 index>
 * 2-4-2. <현재 선택된 초록 배양액을 뿌릴 좌표 index array>
 * 2-4-3. <배양액을 뿌릴 좌표 index array>
 * 2-5. 현재 탐색하는 candidates index가 candidates의 length를 넘었다면 리턴
 *
 * 3. countMaxFlower 함수는 다음의 과정을 거친다.
 * 3-1. 초록색 배양액을 뿌릴 좌표 index 배열의 길이가 G가 되면 candidates에서
 * 초록배양액 좌표를 찾아내고, 남은 배양액을 뿌릴 좌표는 빨강 배양액을 뿌릴 좌표로 지정한다.
 * 3-2. 두 배양액 좌표를 인자로 받아 꽃을 카운트해서 리턴하는 simulate 함수를 실행한다.
 * 3-3. maxFlower 값을 Math.max(maxFlower, <simulate 함수 실행 결과물>)로 업데이트한다.
 *
 * 4. simulate<초록 배양액 좌표, 빨강 배양액 좌표> 함수는 다음의 과정을 거친다.
 * 4-1. 방문여부와 시간을 값으로 가지는 2차원 배열 visited를 만든다. 기초값은 [-1, <색깔/꽃 상수>]
 * 4-2. 배양액 좌표 배열을 순회를 돌면서, 해당 좌표의 visited에 [0<시간>, <색깔>]을 기로갛고, queue에는
 * [y, x, 시간, 색깔]을 넣는다.
 * 4-3. queue를 bfs로 순회한다.
 * 4-3-1. 현재 좌표가 꽃일 경우 건너뛴다.
 * 4-3-2. 다음 좌표가 꽃이거나 호수일 경우 건너뛴다.
 * 4-3-3. 다음 좌표의 시간이 -1, 즉 방문 이전일 경우 [ny, nx, 시간 + 1, <색>]을 queue에 넣고,
 * visited에 [시간 + 1, <색>]을 기록한다.
 * 4-3-4. 다음 좌표가 방문 기록이 있고 다른 색인데 현재 시간에서 1을 더했을 때와 기록된 시간이 같다면,
 * visited에 꽃으로 표시하고 flowerCount를 1 올린다.
 * 4-3-5. flowerCount를 리턴한다.
 */

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const EMPTY = 0;
const GREEN = 1;
const RED = 2;
const FLOWER = 3;

const LAKE = 0;
const APPLICABLE = 2;

const candidates = [];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === APPLICABLE) candidates.push([y, x]);
  }
}

const total = G + R;
let maxFlower = 0;

const pickPositions = (idx, picked) => {
  if (candidates.length - idx < total - picked.length) return;

  if (picked.length === total) {
    countTotalFlower(0, [], picked);
    return;
  }

  if (idx === candidates.length) return;

  pickPositions(idx + 1, picked);
  pickPositions(idx + 1, [...picked, idx]);
};

const countTotalFlower = (idx, greenCoordsIdx, allCoordsIdx) => {
  if (greenCoordsIdx.length === G) {
    const redCoordsIdx = allCoordsIdx.filter(
      (idx) => !greenCoordsIdx.includes(idx),
    );

    const greenCoords = greenCoordsIdx.map((idx) => candidates[idx]);
    const redCoords = redCoordsIdx.map((idx) => candidates[idx]);

    const flowerCount = simulate(greenCoords, redCoords);
    maxFlower = Math.max(flowerCount, maxFlower);

    return;
  }

  if (idx === allCoordsIdx.length) return;

  countTotalFlower(idx + 1, greenCoordsIdx, allCoordsIdx);

  countTotalFlower(
    idx + 1,
    [...greenCoordsIdx, allCoordsIdx[idx]],
    allCoordsIdx,
  );
};

const simulate = (greenCoords, redCoords) => {
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [-1, EMPTY]),
  );

  const queue = [];
  let front = 0;

  let flowerCount = 0;

  for (const [y, x] of greenCoords) {
    visited[y][x] = [0, GREEN];
    queue.push([y, x, 0, GREEN]);
  }

  for (const [y, x] of redCoords) {
    visited[y][x] = [0, RED];
    queue.push([y, x, 0, RED]);
  }

  while (front < queue.length) {
    const [y, x, time, color] = queue[front++];

    if (visited[y][x][1] === FLOWER) continue;

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      if (board[ny][nx] === LAKE) continue;

      const [nextTime, nextColor] = visited[ny][nx];

      if (nextTime === -1) {
        visited[ny][nx] = [time + 1, color];
        queue.push([ny, nx, time + 1, color]);
      } else if (
        nextColor !== color &&
        nextColor !== FLOWER &&
        nextTime === time + 1
      ) {
        visited[ny][nx][1] = FLOWER;
        flowerCount++;
      }
    }
  }

  return flowerCount;
};

pickPositions(0, []);

console.log(maxFlower);

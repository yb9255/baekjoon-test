/** https://www.acmicpc.net/problem/17141 */

const [[N, M], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. board 전체를 순회하면서 바이러스 시작좌표를 구한 뒤, 벽은 -2, 이동 가능한 칸은 -1로 초기화한다.
 * 2. startingPoints index의 중복의 수를 고려하는 backtracking을 시작한다.
 *
 * 3. backtracking 중 depth가 M이 되면 저장해둔 startingPoints를 인자로 받는 getInfectionTime 함수를 실행한다.
 * 이 함수 내부에서는 bfs로 순회하면서 바이러스가 퍼지는데 걸리는 최대 시간을 구해 리턴한다.
 * 3-1. board를 복제한 distance 배열을 생성한다.
 * 3-2. startingPoints내 해당하는 index의 좌표들을 queue에 넣고 해당 좌표의 distance를 0으로 기록한다.
 * 3-3. 순회를 하면서 벽이 있거나 이미 방문한 경우가 아니라면 상하좌우로 이동하면서 distance를 이전 좌표의 1씩 늘려준다.
 * 3-4. 순회가 끝난 이후, distance가 기록된 최대값을 구한 다음 최대값을 리턴한다. 만약 바이러스가 퍼지지 못한 곳이 있다면
 * (좌표 값이 -1이 있다면,) -1을 리턴한다.
 *
 * 4. 3번 함수의 결과에서 값을 구했다면 minTime 값을 Math.min(minTime, <결괏값>)으로 초기화한다. 이 때 바이러스가
 * 퍼진 곳이 없다면 초기화하지 않는다. minTime의 기본값은 Infinity이다.
 *
 * 5. 4번까지의 결과로 minTime이 Infinity라면 어떤 조합도 바이러스를 다 퍼뜨리지 못한 것이므로 -1을 로그,
 * 그렇지 않다면 minTime을 로그한다.
 */

const startingPoints = [];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 0) board[y][x] = -1;
    if (board[y][x] === 1) board[y][x] = -2;
    if (board[y][x] === 2) {
      board[y][x] = -1;
      startingPoints.push([y, x]);
    }
  }
}

let minTime = Infinity;

const dy = [1, 0, -1, 0];
const dx = [0, 1, 0, -1];

const getInfectionTime = (startIndices) => {
  const distance = board.map((row) => row.slice());

  const queue = [];
  let front = 0;

  startIndices.forEach((idx) => {
    const [startY, startX] = startingPoints[idx];
    distance[startY][startX] = 0;
    queue.push([startY, startX]);
  });

  while (front < queue.length) {
    const [y, x] = queue[front++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
      if (distance[ny][nx] === -2) continue;
      if (distance[ny][nx] !== -1) continue;

      distance[ny][nx] = distance[y][x] + 1;
      queue.push([ny, nx]);
    }
  }

  let maxTime = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (distance[y][x] === -1) return -1;
      maxTime = Math.max(maxTime, distance[y][x]);
    }
  }

  return maxTime;
};

const getCombs = (depth, indices, startIdx) => {
  if (depth === M) {
    const time = getInfectionTime(indices);

    if (time !== -1) {
      minTime = Math.min(minTime, time);
    }

    return;
  }

  for (let i = startIdx + 1; i < startingPoints.length; i++) {
    getCombs(depth + 1, [...indices, i], i);
  }
};

getCombs(0, [], -1);

console.log(minTime === Infinity ? -1 : minTime);

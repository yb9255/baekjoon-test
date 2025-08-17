/** https://www.acmicpc.net/problem/17142 */

const [[N, M], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** lab-2와 거의 같은 풀이이나, 비활성 바이러스는 distance에 이동시간은 기록하되
 * 감염이 아닌 활성이므로 maxTime 계산에서 비활성 바이러스 칸은 제외해야 한다.
 */

const startingPoints = [];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 0) board[y][x] = -1;
    if (board[y][x] === 1) board[y][x] = -2;
    if (board[y][x] === 2) {
      board[y][x] = -3;
      startingPoints.push([y, x]);
    }
  }
}

const dy = [1, 0, -1, 0];
const dx = [0, 1, 0, -1];

const getInfectionTime = (startIndices) => {
  const distance = board.map((line) => line.slice());

  const queue = [];
  let front = 0;

  startIndices.forEach((idx) => {
    const [y, x] = startingPoints[idx];
    queue.push([y, x]);
    distance[y][x] = 0;
  });

  while (front < queue.length) {
    const [y, x] = queue[front++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;
      if (distance[ny][nx] === -2) continue;
      if (distance[ny][nx] >= 0) continue;

      distance[ny][nx] = distance[y][x] + 1;
      queue.push([ny, nx]);
    }
  }

  let maxTime = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (board[y][x] === -1) {
        if (distance[y][x] === -1) return -1;
        maxTime = Math.max(maxTime, distance[y][x]);
      }
    }
  }

  return maxTime;
};

let minTime = Infinity;

const getCombs = (depth, stack, startIdx) => {
  if (depth === M) {
    const time = getInfectionTime(stack);

    if (time !== -1) {
      minTime = Math.min(minTime, time);
    }

    return;
  }

  for (let i = startIdx + 1; i < startingPoints.length; i++) {
    getCombs(depth + 1, [...stack, i], i);
  }
};

getCombs(0, [], -1);

console.log(minTime === Infinity ? -1 : minTime);

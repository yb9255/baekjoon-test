const [[N, M], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 전체 board를 순회하면서 0인 곳에서 standWall 함수를 실행한다. 이때 해당 좌표를 방문했다고 기록하고, 함수 실행 후 방문 기록을 해제한다.
 * 2. standWall 함수는 백트래킹 재귀함수이며 depth가 3이 되면 stack에 있는 빈 공간 좌표 3개에 벽을 세운다.
 * 3. 벽을 세운 이후 바이러스를 bfs로 퍼뜨린 다음 안전 영역 개수를 계산한 다음 Math.max로 maxCount를 초기화한다.
 */

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
let maxCount = 0;

const visited = Array.from({ length: N }, () => Array(M).fill(false));

const standWall = (depth, stack) => {
  if (depth === 3) {
    const wallAddedBoard = board.map((line) => line.slice());

    for (const [y, x] of stack) {
      wallAddedBoard[y][x] = 1;
    }

    const queue = [];
    let front = 0;

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (wallAddedBoard[y][x] === 2) {
          queue.push([y, x]);
        }
      }
    }

    while (front < queue.length) {
      const [y, x] = queue[front++];

      for (let dir = 0; dir < 4; dir++) {
        const ny = y + dy[dir];
        const nx = x + dx[dir];

        if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
        if (wallAddedBoard[ny][nx] !== 0) continue;

        wallAddedBoard[ny][nx] = 2;
        queue.push([ny, nx]);
      }
    }

    let safetyCount = 0;

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < M; x++) {
        if (wallAddedBoard[y][x] === 0) safetyCount++;
      }
    }

    maxCount = Math.max(maxCount, safetyCount);
    return;
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (visited[y][x]) continue;
      if (board[y][x] !== 0) continue;

      visited[y][x] = true;
      standWall(depth + 1, [...stack, [y, x]]);
      visited[y][x] = false;
    }
  }
};

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === 0) {
      visited[y][x] = true;
      standWall(1, [[y, x]]);
      visited[y][x] = false;
    }
  }
}

console.log(maxCount);

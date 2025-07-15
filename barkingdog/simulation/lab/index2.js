const [[N, M], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

// Pseudo Code (Barkingdog)
// 1. 모든 빈 칸 좌표를 freeCells에, 초기 바이러스 좌표를 virusCells에 모은다.
//
// 2. standWall(depth, startIdx): depth까지 벽을 세웠다면 spreadAndCountVirus로 안전영역 계산,
//    아니라면 freeCells[idx...]에서 하나씩 골라 벽을 세우고 재귀 호출.
//
// 3. bfs는 방문 스탬프로 매번 초기화, virusCells에서 출발해 퍼진 칸 수를 반환.
// 4. standWall이 끝나면 maxSafeArea에 정답이 담긴다.
//
// 5. 기존 풀이에서는 depth가 찰때마다 board를 새로 생성해서 시간이 더 걸렸다면
// 현재 풀이는 board를 재활용하고 있어서 시간이 덜걸림.

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
let maxSafeArea = 0;

const visited = Array.from({ length: N }, () => Array(M).fill(0));
let visitedStamp = 0;

const freeCells = [];
const virusCells = [];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === 0) {
      freeCells.push([y, x]);
    }

    if (board[y][x] === 2) {
      virusCells.push([y, x]);
    }
  }
}

const spreadAndCountVirus = () => {
  visitedStamp++;

  const queue = virusCells.map((cell) => cell.slice());
  let front = 0;
  let spreadVirusCount = 0;

  for (const [y, x] of queue) {
    visited[y][x] = visitedStamp;
  }

  while (front < queue.length) {
    const [y, x] = queue[front++];
    spreadVirusCount++;

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      if (board[ny][nx] !== 0) continue;
      if (visited[ny][nx] === visitedStamp) continue;

      visited[ny][nx] = visitedStamp;
      queue.push([ny, nx]);
    }
  }

  return spreadVirusCount;
};

const standWall = (depth, startIdx) => {
  if (depth === 3) {
    const totalSpreadVirusCellCount = spreadAndCountVirus();

    const infected = totalSpreadVirusCellCount - virusCells.length;
    const safeArea = freeCells.length - 3 - infected;

    maxSafeArea = Math.max(maxSafeArea, safeArea);

    return;
  }

  for (let i = startIdx; i < freeCells.length; i++) {
    const [y, x] = freeCells[i];
    board[y][x] = 1;
    standWall(depth + 1, i + 1);
    board[y][x] = 0;
  }
};

standWall(0, 0);
console.log(maxSafeArea);

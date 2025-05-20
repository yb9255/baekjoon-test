const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code (BarkingDog)
 * 1. 전체적인 index.js를 for문 풀이를 bfs와 countArea 함수로 진행
 * 2. 색약카운트를 구할때, G를 R로 바꿔서 진행해서 조건을 통합했음.
 */

const N = +input.shift();
const board = input.map((line) => line.split(''));

const colorBlindedBoard = input.map((line) =>
  line.split('').map((char) => (char === 'G' ? 'R' : char)),
);

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const bfs = (startY, startX, visited, board) => {
  const queue = [[startY, startX]];
  let front = 0;

  visited[startY][startX] = true;

  while (front < queue.length) {
    const [y, x] = queue[front++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) {
        continue;
      }

      if (visited[ny][nx]) continue;
      if (board[ny][nx] !== board[y][x]) continue;

      visited[ny][nx] = true;
      queue.push([ny, nx]);
    }
  }
};

const countArea = (board) => {
  let count = 0;
  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (visited[y][x]) continue;
      count++;
      bfs(y, x, visited, board);
    }
  }

  return count;
};

const normalCount = countArea(board);
const colorBlindedCount = countArea(colorBlindedBoard);

console.log(`${normalCount} ${colorBlindedCount}`);

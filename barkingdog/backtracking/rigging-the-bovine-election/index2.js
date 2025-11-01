/** https://www.acmicpc.net/problem/1941 */

const board = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 조합을 구하면서 Y의 갯수를 계속 누적하면서 구함
 * 2. Y의 갯수가 4보다 작고 조합의 길이가 7이 되면 조건 검사
 * 3. 조건 검사를 통과하면 result 개수를 증가시킴
 * 4. 최종적으로 result 로그
 */

const coords = [];
const N = 5;
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let y = 0; y < 5; y++) {
  for (let x = 0; x < 5; x++) {
    coords.push([y, x]);
  }
}

let result = 0;

const check = (coords) => {
  const selected = Array.from({ length: N }, () => Array(N).fill(false));
  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  for (const [y, x] of coords) selected[y][x] = true;

  const [startY, startX] = coords[0];
  const queue = [[startY, startX]];
  let front = 0;
  visited[startY][startX] = true;

  let connected = 0;

  while (front < queue.length) {
    const [cy, cx] = queue[front++];
    connected++;

    for (let dir = 0; dir < 4; dir++) {
      const ny = cy + dy[dir];
      const nx = cx + dx[dir];

      if (ny < 0 || nx < 0 || ny >= 5 || nx >= 5) continue;
      if (visited[ny][nx]) continue;
      if (!selected[ny][nx]) continue;

      visited[ny][nx] = true;
      queue.push([ny, nx]);
    }
  }

  return connected === 7;
};

const cur = [];

const dfs = (depth, startIdx, yCount) => {
  if (yCount >= 4) return;
  if (coords.length - startIdx < 7 - depth) return;

  if (depth === 7) {
    if (check(cur)) {
      result++;
    }

    return;
  }

  for (let i = startIdx; i < coords.length; i++) {
    const [y, x] = coords[i];
    const isY = board[y][x] === 'Y';

    if (isY && yCount + 1 >= 4) continue;
    cur[depth] = [y, x];
    dfs(depth + 1, i + 1, yCount + (isY ? 1 : 0));
  }
};

dfs(0, 0, 0);
console.log(result);

/** https://www.acmicpc.net/problem/18290 */

const [[N, M, K], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. dfs 함수를 실행함. dfs 함수는 시작 index, depth, 현재 sum을 인자로 받음
 * 1-1. 시작 인덱스는 후술할 2차원 배열 -> 1차원 배열로 바꿨을 때, 이미 방문한 배열 index
 * 를 건너뛰기 위한 용도
 *
 * 2. N*M을 곱해서 2차원 배열을 1차원으로 만들고 순회를 시작함
 * e.g.) 1차원 배열 예시
 * idx: 0    1    2   ...   M-1   M   M+1 ...
 *    (0,0)(0,1)(0,2)      (1,0)(1,1) ...
 *
 * 3. 1차원 배열 for문을 돌면서 해당 좌표를 방문한 적이 있다면 루프를 건너뜀
 * 4. 1차원 배열 상하좌우 좌표에 방문 이력이 있다면 해당 루프를 건너뜀
 * 5. 2,3을 통과했다면,  1차원 배열에서 y, x를 구함
 * 6. y, x 좌표를 visited로 기록함
 * 7. y, x 좌표에 있는 값에 sum에 더하고 depth와 startIndex에 i + 1을 넣어서 dfs를 재귀실행
 * 8. 재귀실행이 완료된 이후 visited를 다시 false로 변경
 * 9. depth가 K까지 들어갔을 때 sum과 result중 최대값으로 result를 갱신하고 재귀 종료
 * 10. result 로그
 */

const visited = Array.from({ length: N }, () => Array(M).fill(false));
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

let result = -Infinity;

const canPick = (y, x) => {
  if (visited[y][x]) return false;

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];
    if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
    if (visited[ny][nx]) return false;
  }

  return true;
};

const dfs = (depth, startIdx, sum) => {
  if (depth === K) {
    result = Math.max(result, sum);
    return;
  }

  for (let i = startIdx; i < N * M; i++) {
    const y = Math.floor(i / M);
    const x = i % M;

    if (!canPick(y, x)) continue;

    visited[y][x] = true;
    dfs(depth + 1, i + 1, sum + board[y][x]);
    visited[y][x] = false;
  }
};

dfs(0, 0, 0);
console.log(result);

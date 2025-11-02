/** https://www.acmicpc.net/problem/14500 */

const [[n, m], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code - DFS
 *
 * 1. 테트로미노는 블록 4개를 연결했을 때 가장 큰 값을 구하는 것이기 때문에
 * DFS로 상하좌우를 전부 순회하면서 가장 큰 4개의 블록의 합을 구하면 됨.
 *
 * 2. DFS는 한 번에 한개씩의 step만 탐색할 수 있으며, 다른 step은 탐색할 수 없음.
 * e.g.) 좌표 (2, 3)에서 탐색할 수 있는 다음 분기는 (2, 2), (2, 4), (1, 3), (3, 3)이 있는데
 * 예를 들어 (1, 3)을 탐색했으면 다시 (2, 3)으로 돌아와야만 (2, 4)를 탐색할 수 있다.
 * 즉, (2, 3)과 (2, 4)를 동시에 탐색하는 것은 불가능
 *
 * 3. 2의 이유 때문에 T자형 블록의 경우 2번째 블록까지 탐색한 다음 동시에 2개를 탐색하지 못함
 *
 * 4. 각 step별로 상하좌우를 전부 DFS로 탐색한다. step은 1부터 시작하고, DFS 재귀를 한번 순회할때마다
 * step을 1씩 추가해준다.
 *
 * 5. 4를 실행 중에, 다음 step의 DFS를 실행하기 이전에 현재 블럭을 탐색했다고 visited로 표시한다.
 *
 * 6. step이 2일때 처음 시작 좌표를 기준으로 옆으로 튀어나온 블럭 DFS가 필요하므로 처음 시작점으로
 * 돌아가는 분기를 만든다. 분기를 만들어서 T자형 모양 값을 구하는 프로세스는 다음과 같다.
 * e.g)
 * 1) step 1
 * 1-1) visited -> (2, 2)
 * 1-2) total === board[2][2]
 * 1-3) 현재 위치 (2, 2)
 * 1-4) 현재 step === 1
 *
 * 2) step 2, 위로 우선 움직인다 (1, 2)
 * 2-1) visited -> (2, 2), (1, 2)
 * 2-2) total = board[2][2] + board[1][2]
 * 2-3) 현재 위치 (1, 2)
 * 2-4) 현재 step === 2
 *
 * 3) step 2에서 복귀로 분기한 step 3
 * 현재 좌표에서 step을 1을 눌리고 재시작 하지만
 * 상단 board[0][2]의 값을 total에 더해주고 (0, 2)를 visited로 체크한다.
 * 이렇게 함으로써 (0, 2)를 한번 갔다온 상태인 block 3개인 I자 모양에서, 상하좌우로 삐져나온 부분을
 * 순회할 수 있게 되어 T자형 모양에 대응할 수 있게 된다.
 * 3-1) visited -> (2, 2), (1, 2), (0, 2)
 * 3-2) total === board[2][2] + board[1][2] + board[0][2]
 * 3-3) 현재 위치 (1, 2)
 * 3-4) 현재 step === 3
 *
 *
 * 4) step 4 -> 왼쪽
 * 이제 (1, 2)에서 방문하지 않은 왼쪽, 오른쪽 블럭의로 이동하면서 step 4를 만들고, max 값을 비교하고 리턴한다.
 * 우선 왼쪽으로 이동하여 값을 구한다.
 * 4-1) visited -> (2, 2), (1, 2), (0, 2), (1, 1)
 * 4-2) total === board[2][2] + board[1][2] + board[0][2] + board[1][1]
 * 4-3) 현재 위치 (1, 1)
 * 4-4) 현재 step === 4
 *
 * 5) step 4 -> 오른쪽
 * 4-1) visited -> (2, 2), (1, 2), (0, 2), (1, 3)
 * 4-2) total === board[2][2] + board[1][2] + board[0][2] + board[1][3]
 * 4-3) 현재 위치 (1, 3)
 * 4-4) 현재 step === 4
 *
 * 7. 만약 현재 남은 step에 모두 max값을 더해도 현재 최대값보다 작다면, 얼리 리턴한다
 * 8. step === 4에서 구한 값을 이전 최대값(answer)와 비교한 뒤 더 크다면 신규 최대값으로 answer를 업데이트 한다.
 * 9. 최종적으로 answer를 제출한다.
 */

const visited = Array.from({ length: n }, () => Array(m).fill(false));

const maxBoardValue = board.reduce((acc, cur) => {
  const curRowMax = Math.max(...cur);
  acc = Math.max(acc, curRowMax);

  return acc;
}, 0);

// flat을 사용할 수 있으나 flat은 메모리 사용량이 많음
// const maxBoardValue = Math.max(...board.flat());

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

let answer = 0;

const dfs = (y, x, step, total) => {
  if (total + maxBoardValue * (4 - step) <= answer) {
    return;
  }

  if (step === 4) {
    answer = Math.max(answer, total);
    return;
  }

  for (let i = 0; i < 4; i++) {
    const ny = y + dy[i];
    const nx = x + dx[i];

    if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
    if (visited[ny][nx]) continue;

    if (step === 2) {
      visited[ny][nx] = true;
      dfs(y, x, step + 1, total + board[ny][nx]);
      visited[ny][nx] = false;
    }

    visited[ny][nx] = true;
    dfs(ny, nx, step + 1, total + board[ny][nx]);
    visited[ny][nx] = false;
  }
};

for (let y = 0; y < n; y++) {
  for (let x = 0; x < m; x++) {
    visited[y][x] = true;
    dfs(y, x, 1, board[y][x]);
    visited[y][x] = false;
  }
}

console.log(answer);

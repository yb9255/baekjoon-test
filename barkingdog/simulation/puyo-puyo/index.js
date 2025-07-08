const board = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(''));

/**
 * Pseudo Code
 *
 * 1. 이번 while에 뿌요가 터졌는지 여부를 체크하는 isChainPopped 플래그를 설정.
 *
 * 2. column을 아래 - 1 인덱스에서 위로 순회하면서 공중에 떠 있는 뿌요를 바닥을 내려주는
 * 함수 sinkDown을 생성
 * 2-1. 현재 y에서 시작하는 변수 curY에서 루프 내부 코드 시작
 * 2-2. 현재 좌표의 값이 뿌요가 아니라면 continue
 * 2-3. curY + 1부터 시작해서 curY + 1이 N을 벗어나지 않고, [curY + 1][x]가 뿌요가 아닐 경우
 * curY + 1과 .의 위치를 바꿔주고 curY를 1 올리는 while문을 실행.
 *
 * 3. 시작점부터 상하좌우를 계속 bfs로 순회하면서 cluster에 뿌요 좌표를 담는 popPuyo 실행
 * 3-1. cluster가 4를 넘는다면, isChainPopped 플래그를 true로 바꾸고 cluster 좌표에 있는 뿌요를 전부 없앤다.
 *
 * 4. isChainPopped가 true이면 계속 반복되는 while문 실행
 * 4-1. sinkDown 함수를 실행해서 공중에 떠있는 뿌요를 바닥으로 내림
 * 4-2. 좌표 전체를 순회하며, 뿌요가 있는 경우 popPuyo 함수를 실행
 * 4-3. popPuyo가 끝난 후 연쇄가 발생했다는 isChainPopped가 true이면, chains를 1 올려준다.
 *
 * 5. chains를 로그.
 */

const N = 12;
const M = 6;

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

let chains = 0;
let isChainPopped;
let visited = Array.from({ length: N }, () => Array(M).fill(false));

const resetVisited = () =>
  (visited = Array.from({ length: N }, () => Array(M).fill(false)));

const sinkDown = () => {
  for (let x = 0; x < M; x++) {
    for (let y = N - 2; y >= 0; y--) {
      let curY = y;
      if (board[curY][x] === '.') continue;

      while (curY + 1 < N && board[curY + 1][x] === '.') {
        board[curY + 1][x] = board[curY][x];
        board[curY][x] = '.';
        curY++;
      }
    }
  }
};

const popPuyo = (startY, startX) => {
  const color = board[startY][startX];

  const queue = [[startY, startX]];
  let front = 0;

  visited[startY][startX] = true;

  const cluster = [[startY, startX]];

  while (front < queue.length) {
    const [y, x] = queue[front++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
      if (visited[ny][nx]) continue;
      if (board[ny][nx] !== color) continue;

      visited[ny][nx] = true;
      queue.push([ny, nx]);
      cluster.push([ny, nx]);
    }
  }

  if (cluster.length >= 4) {
    isChainPopped = true;

    cluster.forEach(([y, x]) => {
      board[y][x] = '.';
    });
  }
};

do {
  isChainPopped = false;

  sinkDown();

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (board[y][x] !== '.') {
        popPuyo(y, x);
      }
    }
  }

  if (isChainPopped) {
    chains++;
  }

  resetVisited();
} while (isChainPopped);

console.log(chains);

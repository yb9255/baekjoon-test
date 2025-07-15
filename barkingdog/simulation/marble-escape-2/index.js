const [sizeInfo, ...rest] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * Pseudo Code
 * 1. 판을 기울일때마다 두 개의 구슬을 동시에 움직여야 하므로 queue에 두 개의 구슬 좌표를 모두 넣어야 한다.
 * 2. 두 구슬의 시작 좌표를 기록한 다음, board에서 두 구슬의 좌표도 움직일 수 있는 구역으로 표시한다.
 *
 * 3. 두 구슬의 좌표가 해당 위치에 해당할 때까지 이동 횟수를 기록하는 distance 4중 배열을 생성한다. 기본값은 -1
 * e.g.)(distance[1][2][3][4]의 값은 빨간 구슬이 (1, 2), 파란 구술이 (3, 4)일때 판을 몇번 기울였는지 값이 위치한다.)
 *
 * 4. queue에 두 구슬의 시작 좌표를 넣고, distance의 두 구슬 시작좌표에는 기울임 횟수를 0으로 기록 후 bfs를 시작한다
 * 5. 기울이기를 시작할 때, queue에서 빨간 구슬과 파란 구슬의 좌표를 꺼낸다.
 * 6. 전후좌우 방향으로 구슬을 기울여서 이동시키기 시작한다. 우선 파란 구슬부터 전후좌우를 순회로 돌며 이동할 수 있는 영역이 있는 동안 계속 이동시킨다.
 * 7. 벽이나 구멍 앞에서는 파란 구슬의 이동을 멈춘다.
 * 8. 기울여서 파란 구슬을 이동하다가 다음 이동 좌표가 구멍일 경우, 이 경우는 정답에 해당하지 않으므로 continue 한다.
 * 9. 빨간 구슬을 똑같은 형태로 기울이면서 벽이나 구멍 앞에서 빨간 구슬의 이동을 멈춘다
 * 10. 빨간 구슬이 구멍 앞에서 멈춘경우, 현재 distance에 기록된 현재 좌표의 이동 수에 1을 더한 다음 정답을 리턴한다.
 *
 * 11. 만약 기울인 빨간 구슬과 파란 구슬의 좌표가 같은 경우, 현재 방향이 상하좌우냐에 따라 보정해주어야 한다.
 * 11-1. 동쪽으로 기울였을 경우 기울기 전 더 서쪽에 있던 구슬을 한칸 더 서쪽으로 배치한다.
 * 11-2. 남쪽으로 기울였을 경우 기울기 전 더 북쪽에 있던 구슬을 한칸 더 북쪽으로 배치한다.
 * 11-3. 서쪽으로 기울였을 경우 기울기 전 더 동쪽에 있던 구슬을 한칸 더 동쪽으로 배치한다.
 * 11-4. 북쪽으로 기울였을 경우 기울기 전 더 남쪽에 있던 구슬을 한칸 더 남쪽으로 배치한다.
 *
 * 12. 최종적으로 완성된 다음 빨간 구슬/파란 구슬 좌표가 이미 방문한적이 있다면 continue한다.
 * 13. distance에 기울임 횟수를 출발지 기울임 횟수 + 1을 더해서 기록하고 queue에 빨간 구슬과 파란 구슬의 좌표를 담는다.
 */

const [N, M] = sizeInfo.split(' ').map(Number);
const board = rest.map((line) => line.split(''));

const redPos = [0, 0];
const bluePos = [0, 0];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] === 'R') {
      redPos[0] = y;
      redPos[1] = x;
      board[y][x] = '.';
    }

    if (board[y][x] === 'B') {
      bluePos[0] = y;
      bluePos[1] = x;
      board[y][x] = '.';
    }
  }
}

const distance = Array.from({ length: N }, () =>
  Array.from({ length: M }, () =>
    Array.from({ length: N }, () => Array(M).fill(-1))
  )
);

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const queue = [[...redPos, ...bluePos]];
distance[redPos[0]][redPos[1]][bluePos[0]][bluePos[1]] = 0;

while (queue.length) {
  const [redY, redX, blueY, blueX] = queue.shift();
  const tiltCount = distance[redY][redX][blueY][blueX];

  if (tiltCount >= 10) {
    console.log(-1);
    process.exit();
  }

  for (let dir = 0; dir < 4; dir++) {
    let nRedY = redY;
    let nRedX = redX;
    let nBlueY = blueY;
    let nBlueX = blueX;

    while (board[nBlueY + dy[dir]][nBlueX + dx[dir]] === '.') {
      nBlueY += dy[dir];
      nBlueX += dx[dir];
    }

    if (board[nBlueY + dy[dir]][nBlueX + dx[dir]] === 'O') continue;

    while (board[nRedY + dy[dir]][nRedX + dx[dir]] === '.') {
      nRedY += dy[dir];
      nRedX += dx[dir];
    }

    if (board[nRedY + dy[dir]][nRedX + dx[dir]] === 'O') {
      console.log(tiltCount + 1);
      process.exit();
    }

    if (nRedY === nBlueY && nRedX === nBlueX) {
      if (dir === 0) {
        redY < blueY ? nBlueY++ : nRedY++;
      } else if (dir === 1) {
        redX < blueX ? nRedX-- : nBlueX--;
      } else if (dir === 2) {
        redY < blueY ? nRedY-- : nBlueY--;
      } else {
        redX < blueX ? nBlueX++ : nRedX++;
      }
    }

    if (distance[nRedY][nRedX][nBlueY][nBlueX] !== -1) continue;
    distance[nRedY][nRedX][nBlueY][nBlueX] = tiltCount + 1;
    queue.push([nRedY, nRedX, nBlueY, nBlueX]);
  }
}

console.log(-1);

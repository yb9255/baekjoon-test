const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 상근의 위치가 빌딩 바깥에서 시작하므로 빌딩 벽 전체를 돌아다닐 수
 * 있어야 한다. board의 크기를 N + 2, M + 2로 늘려준다.
 *
 * 2. 방문 내역을 기록하는 visited를 배열을 만든다. 상근이 방문한 모든 영역을
 * 기록해야 하므로, 똑같이 N + 2, M + 2 크기로 만든다.
 *
 * 3. 방문 시점에서 열쇠가 없어서 들어갈 수 없는 문의 좌표를 기록하는 lockedDoor 배열을 만든다.
 * 길이는 알파벳을 모두 기록할 수 있는 26으로 만든다.
 * 각 알파벳 좌표에는 해당 알파벳 키가 필요한 문의 좌표가 배열로 담긴다.
 *
 * 3-1. 방문 시점에서 열쇠가 없어서 들어가지 못했다가 나중에 획득하고 돌아가는 것을 bfs로 구현하려면
 * visited를 리셋해야 하는데, 이 경우 너무 로직이 복잡해진다. 대신 lockedDoor에 미리 좌표를 보관해 두었다가
 * 해당 좌표가 방문이 가능해진 순간에 전부 queue에 넣는 형태로 방문 로직을 구현한다.
 *
 * 4. 해당 문의 키를 가지고 있는 여부를 기록하는 hasKeyMap을 만든다. 문의 최대 개수인 26개의 길이를 가진다.
 *
 * 5. 주어진 빌딩 좌표를 순회하면서 board에 기록한다. 이 때, 빌딩 좌표를 둘러쌓는 좌표도 만들어야 하기 때문에
 * 빌딩 좌표는 board의 (1, 1) 지점부터 시작한다.
 *
 * 6. 0,0 좌표부터 bfs로 순회를 시작한다.
 * 7. 다음 좌표가 벽 좌표인 경우 건너뛴다.
 *
 * 8. 다음 좌표가 열쇠 좌표인 경우
 * 8-1. hasKeyMap에서 해당 문을 방문 가능으로 표시를 변경한다.
 * 8-2. 해당 key의 lockedDoors를 전부 queue에 넣고 방문했다고 기록한다.
 *
 * 9. 다음 좌표가 문 좌표인 경우
 * 9-1. 열쇠가 있는 문인 경우 계속 bfs 순회를 반복한다.
 * 9-2. 열쇠가 없는 문인 경우 lockedDoors에 좌표를 기록하고 넘어간다.
 *
 * 10. 다음 좌표가 문서 좌표인 경우 문서 카운트를 올린다.
 * 11. bfs가 끝났을 때, 문서 카운트를 리턴한다.
 *
 */

let line = 1;

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

for (let t = 0; t < +input[0]; t++) {
  const [N, M] = input[line++].split(' ').map(Number);
  const board = Array.from({ length: N + 2 }, () => Array(M + 2).fill('.'));

  for (let y = 1; y <= N; y++) {
    const row = input[line++];

    for (let x = 1; x <= M; x++) {
      board[y][x] = row[x - 1];
    }
  }

  const startKeys = input[line++].split('');

  const visited = Array.from({ length: N + 2 }, () => Array(M + 2).fill(false));
  const lockedDoors = Array.from({ length: 26 }, () => []);
  const hasKeyMap = Array.from({ length: 26 }, () => false);
  const firstKeyCharCode = 'a'.charCodeAt();

  if (startKeys[0] !== '0') {
    for (const key of startKeys) {
      hasKeyMap[key.charCodeAt() - firstKeyCharCode] = true;
    }
  }

  let docsCount = 0;

  const queue = [[0, 0]];
  let front = 0;

  visited[0][0] = true;

  while (front < queue.length) {
    const [y, x] = queue[front++];

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny > N + 1 || nx > M + 1) continue;
      if (visited[ny][nx]) continue;

      const cell = board[ny][nx];

      if (cell === '*') {
        continue;
      } else if (cell >= 'a' && cell <= 'z') {
        const keyCode = cell.charCodeAt() - firstKeyCharCode;
        hasKeyMap[keyCode] = true;

        for (const [doorY, doorX] of lockedDoors[keyCode]) {
          if (visited[doorY][doorX]) continue;

          visited[doorY][doorX] = true;
          queue.push([doorY, doorX]);
        }

        lockedDoors[keyCode] = [];
      } else if (cell >= 'A' && cell <= 'Z') {
        const keyCode = cell.toLowerCase().charCodeAt() - firstKeyCharCode;

        if (!hasKeyMap[keyCode]) {
          lockedDoors[keyCode].push([ny, nx]);
          continue;
        }
      } else if (cell === '$') {
        docsCount++;
      }

      visited[ny][nx] = true;
      queue.push([ny, nx]);
    }
  }

  console.log(docsCount);
}

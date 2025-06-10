const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input5.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 각 사용자 i가 동시에 speeds[i]칸씩 이동해야 하므로, queue가 여러개가 필요함.
 * 2. board 전체를 순회하면서 각 사용자의 queue에 시작 좌표를 push
 * 3. 확장할 값이 남았는지 여부인 flag isExpanding이 true인동안 반복되는 while문을 시작
 * 4. 루프 시작 시 우선 isExpanding을 false로 끈다.
 * 5. 사용자 전체를 순회하면서 각 사용자의 속도를 획득한다.
 * 6. 사용자의 이동 단계를 0부터 speeds[i]까지 쪼개서 현재 칸수만큼 이동했을때 queue의 상태를 담을 newQueue를 생성한다.
 * 7. 현재 큐를 생성하면서 이동할 다음 좌표가 있다면, newQueue에 이동할 다음 좌표를 담고, board에 player의 영역임을 표시 후 isExpanding 플래그를 true로 전환한다.
 * 8. newQueue에 현재 이동 단계의 좌표를 전부 담았다면, queues[player]를 newQueue로 업데이트 하고 다음 이동 단계로 넘어간다.
 * 만약 다음 이동 단계에 넘길 좌표가 없다면 현재 사용자 루프를 break 한다.
 * 9. 최종적으로 모든 사용자별 이동 단계 탐색이 끝났다면, isExpanding이 false가 유지가 되므로 while문이 break된다.
 * 10. board을 전부 순회하면서 각 player별 영역 수를 카운트 하고 정답을 리턴한다.
 */

const [N, M, P] = input[0].split(' ').map(Number);
const speeds = input[1].split(' ').map(Number);
const board = input.slice(2).map((row) => row.split(''));

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const queues = Array.from({ length: P }, () => []);
const fronts = Array(P).fill(0);

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    const cell = board[y][x];

    if (cell !== '.' && cell !== '#') {
      queues[Number(cell) - 1].push([y, x]);
    }
  }
}

let isExpanding = true;

while (isExpanding) {
  isExpanding = false;

  for (let i = 0; i < P; i++) {
    for (let step = 0; step < speeds[i]; step++) {
      const newQueue = [];

      while (fronts[i] < queues[i].length) {
        const [y, x] = queues[i][fronts[i]++];

        for (let dir = 0; dir < 4; dir++) {
          const ny = y + dy[dir];
          const nx = x + dx[dir];

          if (ny < 0 || ny >= N || nx < 0 || nx >= M) continue;
          if (board[ny][nx] !== '.') continue;

          board[ny][nx] = (i + 1).toString();
          newQueue.push([ny, nx]);
          isExpanding = true;
        }
      }

      queues[i] = newQueue;
      fronts[i] = 0;

      if (newQueue.length === 0) break;
    }
  }
}

const answer = Array(P).fill(0);

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    const cell = board[y][x];

    if (cell !== '.' && cell !== '#') {
      answer[Number(cell) - 1]++;
    }
  }
}

console.log(answer.join(' '));

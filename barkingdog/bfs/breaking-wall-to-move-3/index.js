const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M, K] = input.shift().split(' ').map(Number);
const board = input.map((str) => str.split('').map(Number));

/**
 * Pseudo Code (일반적인 barkingdog 풀이이나, Node.js로는 백준을 통과할 수 없음.)
 *
 * 1. 벽을 K번 부쉈을때를 N, M의 위치까지의 distance를 기록하면서 그 때 낮/밤인지를 기록하는 4차원 배열을 만든다.
 * 2. Queue에 시작좌표를 넣는다.
 * 3. bfs로 값을 순회하며 <y, x, 벽 부순 횟수, 낮/밤> 을 값에 넣는다.
 * 4. 벽 부순 횟수가 남아있고 방문한 적이 없으며 낮일때만 벽을 부수는 케이스를 추가한다.
 * 5. 벽 부순 횟수가 남아있고 밤인 경우, 낮일때 방문한 적이 있으면 건너뛰고 아니면 현재 좌표에서 낮인 경우의 distance를 1 늘려준다.
 * 6. 목표 좌표에 도달하면 이동횟수를 리턴한다.
 * 7. bfs가 끝날때까지 목표좌표에 도달하지 못했다면 -1을 리턴한다.
 *
 */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(val) {
    const node = new Node(val);

    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length++;
  }

  dequeue() {
    if (!this.head) return null;

    const prevHead = this.head;
    this.head = this.head.next;
    this.length--;

    return prevHead.val;
  }

  get isEmpty() {
    return this.length === 0;
  }
}

const distance = Array.from({ length: N }, () =>
  Array.from({ length: M }, () =>
    Array.from({ length: K + 1 }, () => Array(2).fill(-1)),
  ),
);

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const DAY = 0;
const NIGHT = 1;

const queue = new Queue();
queue.enqueue([0, 0, 0, DAY]);
distance[0][0][0][0] = 1;

while (!queue.isEmpty) {
  const [y, x, k, time] = queue.dequeue();

  if (y === N - 1 && x === M - 1) {
    console.log(distance[y][x][k][time]);
    process.exit();
  }

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;

    if (board[ny][nx] === 0) {
      const nk = k;
      const nt = time === NIGHT ? DAY : NIGHT;
      if (distance[ny][nx][nk][nt] !== -1) continue;

      distance[ny][nx][nk][nt] = distance[y][x][k][time] + 1;
      queue.enqueue([ny, nx, nk, nt]);
    } else {
      if (k === K) continue;

      if (time === DAY) {
        const nk = k + 1;
        const nt = NIGHT;

        if (distance[ny][nx][nk][nt] !== -1) continue;

        distance[ny][nx][nk][nt] = distance[y][x][k][time] + 1;
        queue.enqueue([ny, nx, nk, nt]);
      } else {
        const nt = DAY;

        if (distance[y][x][k][nt] !== -1) continue;
        distance[y][x][k][nt] = distance[y][x][k][time] + 1;
        queue.enqueue([y, x, k, nt]);
      }
    }
  }
}

console.log(-1);

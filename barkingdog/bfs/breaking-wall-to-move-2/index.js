const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 벽을 부순 횟수별로 이동거리를 기록하는 3차원 배열을 생성한다.
 * 2. bfs로 순회를 돌면서 [y, x, 현재까지 부순 벽의 개수]를 큐에 넣는다.
 *
 * 3. 매번 순회 시 벽을 만나면 현재까지 부순 벽의 개수를 1 늘린다. 1 늘렸을 때 부술 수 있는 벽의 개수를 초과했다면
 * 큐에 넣지 않고 건너뛴다.
 *
 * 4. 최종 좌표에 도달했을 때 distance 3차원 배열에서 현재 값을 리턴한다. 최종 좌표에 끝까지 도달하지 못했다면, -1을 리턴한다.
 * 5. JS의 경우 Queue를 직접 구현해야만 시간을 통과할 수 있다.
 */

const [N, M, K] = input.shift().split(' ').map(Number);
const board = input.map((str) => str.split('').map(Number));

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

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
    const prevVal = this.head.val;
    this.head = this.head.next;
    this.length--;

    return prevVal;
  }

  get size() {
    return this.length;
  }
}

const distance = Array.from({ length: N }, () =>
  Array.from({ length: M }, () => Array(K + 1).fill(-1)),
);

const queue = new Queue();
queue.enqueue([0, 0, 0]);

distance[0][0][0] = 1;

while (queue.size > 0) {
  const [y, x, k] = queue.dequeue();

  if (y === N - 1 && x === M - 1) {
    console.log(distance[y][x][k]);
    process.exit();
  }

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];
    let nk = k;

    if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;
    if (board[ny][nx] === 1) nk++;

    if (distance[ny][nx][nk] !== -1) continue;
    if (nk > K) continue;

    distance[ny][nx][nk] = distance[y][x][k] + 1;
    queue.enqueue([ny, nx, nk]);
  }
}

console.log(-1);

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.size = 0;
    this.front = null;
    this.rear = null;
  }
  isEmpty() {
    return this.size === 0;
  }
  enqueue(data) {
    const newNode = new Node(data);
    if (this.size === 0) {
      this.front = newNode;
      this.rear = newNode;
    } else {
      this.rear.next = newNode;
      this.rear = newNode;
    }
    this.size++;
  }
  dequeue() {
    if (this.isEmpty()) return null;
    const rtn = this.front;
    this.front = this.front.next;
    this.size--;
    return rtn.data;
  }
}

const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input:
    process.platform === 'linux'
      ? process.stdin
      : fs.createReadStream('./input.txt'),
  output: process.stdout,
});

let N = 0,
  M = 0,
  K = 0;
let ln = 0;
let board = [];
let dp = [];

const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

rl.on('line', (line) => {
  if (ln === 0) {
    [N, M, K] = line.split(' ').map(Number);
    board = Array.from({ length: N }, () => Array(M).fill(0));
    dp = Array.from({ length: N }, () => Array(M).fill(K + 1));
    dp[0][0] = 0;
  } else {
    const row = line.split('');
    for (let i = 0; i < M; i++) {
      board[ln - 1][i] = row[i] === '0' ? 0 : 1;
    }
  }
  ln++;
});

rl.on('close', () => {
  const queue = new Queue();
  queue.enqueue([0, 0, 1, 0, false]);

  while (!queue.isEmpty()) {
    const [y, x, dist, k, isNight] = queue.dequeue();

    if (y === N - 1 && x === M - 1) {
      console.log(dist);
      return;
    }

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];
      if (ny < 0 || nx < 0 || ny >= N || nx >= M) continue;

      const nk = k + board[ny][nx];
      if (nk >= dp[ny][nx]) continue;

      if (board[ny][nx] === 1 && isNight) {
        queue.enqueue([y, x, dist + 1, k, !isNight]);
      } else {
        dp[ny][nx] = nk;
        queue.enqueue([ny, nx, dist + 1, nk, !isNight]);
      }
    }
  }

  console.log(-1);
});

/** https://www.acmicpc.net/problem/15684 */

const [[N, M, H], ...lines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 기존 풀이의 3중 for문 대신 dfs로 순회
 * 2. 만약 연결선이 없다면 y를 계속 늘려줘서 불필요한 depth가 들어가는 것을 생략
 *
 * 3. depth가 0일때, 1일때, 2일때, 3일때를 순회로 돌면서 traverseLadder를 실행
 * 하면서 값을 갱신
 */

const connectingLinePoint = Array.from({ length: H }, () =>
  Array(N - 1).fill(false)
);

for (let i = 0; i < M; i++) {
  const [y, x] = lines[i];
  connectingLinePoint[y - 1][x - 1] = true;
}

const check = () => {
  for (let x = 0; x < N; x++) {
    let cur = x;

    for (let y = 0; y < H; y++) {
      if (connectingLinePoint[y][cur - 1]) cur--;
      else if (cur < N - 1 && connectingLinePoint[y][cur]) cur++;
    }

    if (cur !== x) return false;
  }

  return true;
};

let answer = Infinity;

const traverseLadder = (depth, max) => {
  if (answer <= max) return;

  if (depth === max) {
    if (check()) answer = depth;
    return;
  }

  for (let x = 0; x < N - 1; x++) {
    for (let y = 0; y < H; y++) {
      if (connectingLinePoint[y][x]) continue;
      if (connectingLinePoint[y][x - 1]) continue;
      if (connectingLinePoint[y][x + 1]) continue;

      connectingLinePoint[y][x] = true;
      traverseLadder(depth + 1, max);
      connectingLinePoint[y][x] = false;

      while (
        y < H &&
        !connectingLinePoint[y][x + 1] &&
        !connectingLinePoint[y][x - 1]
      ) {
        y++;
      }
    }
  }
};

for (let i = 0; i < 4; i++) {
  traverseLadder(0, i);
  if (answer === i) break;
}

console.log(answer === Infinity ? -1 : answer);

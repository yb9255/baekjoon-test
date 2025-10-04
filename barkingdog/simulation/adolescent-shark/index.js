/** https://www.acmicpc.net/problem/19236 */

/**
 * Pseudo Code
 * 1. board[y][x] = [number, direction]
 *    - number: 1~16 (물고기 번호)
 *    - direction: 0~7 (상, 좌상, 좌, 좌하, 하, 우하, 우, 우상)
 *    - number, direction가 -1: 물고기가 잡아먹힌 자리
 *
 * 2. order[number] = [y, x, direction]
 *    - 각 물고기의 현재 위치 및 방향 기록
 *    - 먹힌 물고기는 [-1, -1, -1]
 *
 * 3. moveFishes -> 시그니처로 board, order, sharkY, sharkX를 받음
 * 3-1. 1 ~ 16을 순회하면서 물고기 전체를 순회 (number)
 * 3-2. y, x가 -1인 경우 이미 잡아먹힌 물고기이므로 continue;
 * 3-3. direction의 길이만큼 순회하는 순회 시작 (dir)
 * 3-3-1. 만약 현재 dir에서 범위를 벗어나거나 상어가 있다면, 다음 dir로 continue, 즉 45도 기올여서 이동
 * 3-3-2. dir로 이동이 가능하다면 이동 가능한 좌표에 있는 물고기와 현재 물고기간의 좌표 swap
 *
 *
 * 4. DFS(백트래킹) -> simulate 함수를 생성. 시그니처로 board, order, sharkY, sharkX, sum을 받음
 * 4-1. 상어가 (0,0)의 물고기를 먹고 시작
 * 4-2. 매 단계마다 물고기 이동 함수 moveFishes 실행
 * 4-3. moveFishes 실행 후 상어 이동 위치 backtracking 시작
 * 4-3-1. 상어는 최대 3칸 이동 가능, 백트래킹이 재귀로 실행되는 경우의 수는 3개이므로
 * (상어가 방향으로 한칸 이동, 두칸 이동, 세칸 이동)
 * 1 ~ 3 step을 for문으로 순회한다.
 * 4-3-2. 매 순회마다 board와 order를 공유하면 안되므로 tempBoard와 tempOrder를 만든다.
 * 4-3-3. tempBoard에 상어의 현재 위치를 [-1, -1]로 초기화하고, 다음 위치로 상어를 옮긴다.
 * 4-3-4. tempOrder에 다음 위치의 물고기를 [-1, -1, -1]로 초기화하고, tempOrder의
 * 상어 위치를 다음 좌표와 다음 위치 물고기의 방향으로 바꾼다.
 * 4-3-5. 이 다음, sum에 잡아먹힌 물고기의 number를 더해 재귀로 simulate를 실행한 값과
 * 현재 maxSum을 Math.max로 비교해서 maxSum을 갱신한다.
 *
 * 4-4. 상어가 좌표를 벗어나 step이 break가 되면 maxSum을 리턴한다.
 * 4-5. 리턴된 maxSum은 하위 stack의 simulate에서 4-3-5에 활용되어 top stack의
 * maxSum을 확정지어준다.
 * 4-6. 번호의 최대 합을 simulate 함수로 구한다.
 *
 * 5. 최대 합을 로그한다.
 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
const dx = [0, -1, -1, -1, 0, 1, 1, 1];

const N = 4;

const board = [];
const order = Array(18).fill([-1, -1]);

for (let y = 0; y < N; y++) {
  const row = [];

  for (let x = 0; x < N * 2; x += 2) {
    const number = input[y][x];
    const direction = input[y][x + 1] - 1;
    row.push([number, direction]);
    order[number] = [y, x / 2, direction];
  }

  board.push(row);
}

const isOutOfBoundary = (y, x) => y < 0 || y >= N || x < 0 || x >= N;

const moveFishes = (board, order, sharkY, sharkX) => {
  for (let number = 1; number <= 16; number++) {
    if (order[number][0] === -1) continue;

    const [y, x, curDir] = order[number];

    for (let dir = 0; dir < 8; dir++) {
      const nd = (curDir + dir) % 8;
      const ny = y + dy[nd];
      const nx = x + dx[nd];

      if (isOutOfBoundary(ny, nx)) continue;
      if (ny === sharkY && nx === sharkX) continue;

      const [targetNumber, targetDir] = board[ny][nx];

      board[y][x] = [targetNumber, targetDir];
      board[ny][nx] = [number, nd];
      order[number] = [ny, nx, nd];
      order[targetNumber] = [y, x, targetDir];

      break;
    }
  }
};

const simulate = (board, order, sharkY, sharkX, direction, sum) => {
  let maxSum = sum;

  moveFishes(board, order, sharkY, sharkX);

  for (let step = 1; step <= 3; step++) {
    const ny = sharkY + dy[direction] * step;
    const nx = sharkX + dx[direction] * step;

    if (isOutOfBoundary(ny, nx)) break;
    if (board[ny][nx][0] === -1) continue;

    const tempBoard = board.map((row) => [...row]);
    const tempOrder = order.map((fish) => [...fish]);

    const [nextNumber, nextFishDir] = tempBoard[ny][nx];

    tempBoard[sharkY][sharkX] = [-1, -1];
    tempOrder[nextNumber] = [-1, -1, -1];

    maxSum = Math.max(
      maxSum,
      simulate(tempBoard, tempOrder, ny, nx, nextFishDir, sum + nextNumber)
    );
  }

  return maxSum;
};

const [firstNumber, firstDirection] = board[0][0];
order[firstNumber] = [-1, -1];

console.log(simulate(board, order, 0, 0, firstDirection, firstNumber));

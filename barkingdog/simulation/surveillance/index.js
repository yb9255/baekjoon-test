const [[N, M], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code (Barkingdog)
 * 1. 각 cctv의 방향 정하기
 *    - 가능한 방향이 n개인 경우, n진법으로 모든 경우의 수를 체크할 수 있음.
 *    - e.g.) 카메라가 3개이면, 000, 001, ... 333까지 숫자로 표기해서
 *    카메라의 이동방향 경우의 수를 모두 구할 수 있음. 4진법의 모든 digit은 다 0 ~ 3으로 표시되기 때문.
 *    333은 3*(4^2) + 3*(4^1) + 3*(4^0)이므로 0 ~ 63 까지 총 64개 조합이 있음을 확인
 *    - 10진수를 계속 4로 나누면서 나머지를 붙이면 10진수 -> 4진수로 전환이 가능하다. 혹은
 *    toString 사용.
 *    - cctv가 k개이면 4^k - 1개의 경우의 수가 있을 수 있음.
 *    - 2번 cctv는 상하/좌우 2개의 경우의 수, 5번 cctv는 상하좌우 1개의 경우의 수만 있어서 중복이
 *    하지만, 시간 여유가 충분하므로 굳이 중복을 줄이지 않음.
 *
 * 2. cctv의 좌표를 cctvList 목록에 담는다.
 *
 * 3. 가능한 감시 경우의 수는 4 ** cctvList.length - 1,
 * 이를 비트연산자로 표현하면 1 << (2 * cctvList.length - 1). (4인 1<<2를 cctvList.length - 1만큼 반복)
 *
 * 4. 한쪽 방향으로 끝까지 탐색하면서 감시영역을 표시하는 함수 checkWatchableSpot을 만듬.
 * 이 때 인자로 받는 dir을 4 mod를 써서 항상 dir가 0, 1, 2, 3중 하나가 되도록 함
 *
 * 5. 어떤 방향으로 이동할 지 결정하는 getDirection함수를 생성함
 * 5-1. 1 cctv의 경우 한 방향만 볼 수 있으므로 dir는 한 방향이면 됨.
 * 5-2. 2 cctv의 경우 한 방향을 보고 있으면 그 방향의 반대편도 봐야함. dy/dx에 0, 2가 반대 방향, 1, 3이 반대방향을
 * 보도록 설정했으므로 가능한 direction은 [dir, dir + 2]
 * 5-3. 3 cctv의 경우 한 방향을 보고 있으면 인접한 다른 방향을 하나 더 봐야함. 인접이 가능한 케이스끼리 인덱스를 붙였으므로
 * 가능한 경우는 [dir, dir + 1]
 * 5-4. 4 cctv의 경우 반대방향과 인접한 방향 하나를 봐야하므로 가능한 경우는 [dir, dir + 1, dir + 2]
 * 5-5. 5 cctv의 경우 동시에 모든 방향을 봐야하므로 가능한 경우는 [0, 1, 2, 3]
 *
 * 6. 0부터 가능한 경우의 수 길이만큼 for문을 돌음. (caseNum) 그리고 현재 루프에서 사각지대를 기록할 copiedBoard를 만듬.
 * 7. caseNum을 cctvList의 길이만큼 4로 나누면서 cctvList 길이만큼의 숫자를 가진 4진수가 되도록 반복함. (i)
 * e.g.) caseNum이 0이고, cctvList의 길이가 5면 00000이 되고 caseNum이 4고 cctvList 길이가 5면 00010이 됨.
 *
 * 8. cctvList 길이만큼 만들어진 4진수의 각 digit을 각 카메라가 바라보는 기본 시작 방향 baseDir로 간주함.
 * 9. getDirections(<cctvList의 카메라 타입>, <baseDir>)를 넣어서 바라보아야 하는 모든 방향 directions을 구함
 * 10. directions를 순회하면서 감시 가능 지역을 copiedBoard에 기록
 *
 * 11. copiedBoard를 순회하면서 현재 케이스의 사각지대 갯수를 기록하고, 이전의 사각지대 최소 기록과 비교 후
 * 이번이 최소인 경우 최소 기록을 갱신한다.
 *
 * 12. 최소 기록을 리턴
 *
 */

// 동, 남, 서, 북
const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];

const cctvList = [];
let minBlindSpots = Infinity;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < M; x++) {
    if (board[y][x] >= 1 && board[y][x] <= 5) {
      cctvList.push([y, x]);
    }
  }
}

const isOutOfBoundary = (y, x) => y < 0 || y >= N || x < 0 || x >= M;

const checkWatchableSpot = (y, x, dir, board) => {
  dir %= 4;

  while (true) {
    y += dy[dir];
    x += dx[dir];
    if (isOutOfBoundary(y, x) || board[y][x] === 6) return;
    if (board[y][x] !== 0) continue;
    board[y][x] = 7;
  }
};

const getDirections = (type, baseDir) => {
  switch (type) {
    case 1:
      return [baseDir];
    case 2:
      return [baseDir, baseDir + 2];
    case 3:
      return [baseDir, baseDir + 1];
    case 4:
      return [baseDir, baseDir + 1, baseDir + 2];
    case 5:
      return [0, 1, 2, 3];
  }
};

for (let caseNum = 0; caseNum < 1 << (2 * cctvList.length); caseNum++) {
  const copiedBoard = board.map((row) => [...row]);
  let caseNumRemainder = caseNum;

  for (let i = 0; i < cctvList.length; i++) {
    const baseDir = caseNumRemainder % 4;
    caseNumRemainder = Math.floor(caseNumRemainder / 4);

    const [y, x] = cctvList[i];
    const type = board[y][x];

    const directions = getDirections(type, baseDir);

    for (const direction of directions) {
      checkWatchableSpot(y, x, direction, copiedBoard);
    }
  }

  let curBlindSpots = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (copiedBoard[y][x] === 0) curBlindSpots++;
    }
  }

  minBlindSpots = Math.min(minBlindSpots, curBlindSpots);
}

console.log(minBlindSpots);

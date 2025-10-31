/** https://www.acmicpc.net/problem/9663 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * Pseudo Code
 * 1. y + x가 동일하면 기준 좌표에서 시작하는 좌하단 대각선상에 위치하는 좌표임
 * 2. y - x가 동일하면 기준 좌표에서 시작하는 우하단 대각선상에 위치하는 좌표임
 *
 * 3. 각 x, y + x, y - x 값을 만드는 좌표에 퀸이 있는지 여부를 체크해주는 방문 배열을 3개 생성
 * 이 때, y - x는 -(N - 1)까지 될 수 있으나 배열에 마이너스 인덱스는 없음. 그러므로 N - 1을 더한
 * y - x + N - 1 인덱스에 y - x 값을 만드는 좌표에 퀸이 있는지 체크하도록 함.
 * y과 N - 1 인덱스, x가 N - 1 인덱스만큼 존재하므로 1번과 2번 모두 2 * N - 1개 인덱스만큼 존재하므로 배열 길이를
 * 넉넉하게 2 * N + 1로 설정
 *
 * 4. 인자로 y를 받는 재귀함수를 돈다. y가 N이면 겹치지 않고 마지막 열까지 도착했다는 뜻이므로 정답 count를 올리고
 * 재귀를 종료한다.
 *
 * 5. 재귀함수 내에서 x 길이만큼 순회를 돌면서, x, y + x, y - x + N - 1에 해당하는 좌표에 방문 기록이 있다면
 * 순회를 건너뛴다.
 *
 * 6.재귀함수 내에서 x 길이만큼 순회를 돌면서, x, y + x, y - x + N - 1에 해당하는 좌표에 방문 기록이 없다면
 * 해당 값의 방문 인덱스에 방문을 기록하고, 다음 열을 재귀를 돌린다.
 *
 * 7. 백트래킹으로 반복실행되므로 재귀함수 실행이 끝나면 방문 기록을 false로 다시 돌려준다.
 *
 * 8. count를 리턴한다.
 *
 */

const occupiedColumnMap = Array(N).fill(false);
const occupiedRightTopDiagonalMap = Array(2 * N + 1).fill(false);
const occupiedLeftTopDiagonalMap = Array(2 * N + 1).fill(false);

let count = 0;

const placeQueen = (y) => {
  if (y === N) {
    count++;
    return;
  }

  for (let x = 0; x < N; x++) {
    const rightTopDiagonal = y + x;
    const leftTopDiagonal = y - x + N - 1;

    if (occupiedColumnMap[x]) continue;
    if (occupiedRightTopDiagonalMap[rightTopDiagonal]) continue;
    if (occupiedLeftTopDiagonalMap[leftTopDiagonal]) continue;

    occupiedColumnMap[x] = true;
    occupiedLeftTopDiagonalMap[leftTopDiagonal] = true;
    occupiedRightTopDiagonalMap[rightTopDiagonal] = true;

    placeQueen(y + 1);

    occupiedColumnMap[x] = false;
    occupiedLeftTopDiagonalMap[leftTopDiagonal] = false;
    occupiedRightTopDiagonalMap[rightTopDiagonal] = false;
  }
};

placeQueen(0);
console.log(count);

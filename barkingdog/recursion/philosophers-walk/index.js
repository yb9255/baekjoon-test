/** https://www.acmicpc.net/problem/14956 */

const [[K, totalWalk]] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code (Barkingdog 풀이)
 * 1. base condition - 2^1 사이즈의 맵일 때 최대 걸음 수는 4이며,
 * 그 4에 따른 좌표 기준값을 리턴
 *
 * 2. 함수 구조: func(k, 이동해야 하는 남은 걸음 수)
 *
 * 3. 재귀식
 * 3-1. 남은 걸음 수가 1사분면 전체 개수보다 적은 경우
 * 걸음 수가 2^(n - 1)의 미로 내에서 끝나므로 걸음걸이를 줄일 필요가 없음.
 * func(halfSize, walk)로 재귀를 돈 결과를 리턴하되,
 * 2^(n - 1) 좌표에서 시계방향으로 90도 돌려야 매치되므로 [x, y]를 리턴
 *
 * 3-2. 남은 걸음 수가 3-1보다 크지만 1 + 2사분면 전체 개수보다 적은 경우
 * 기존 걸음걸이 수에서 1사분면 걸음 걸이 수를 빼고 남은 좌표로 이동을 해야 구해짐.
 * 2^(n - 1) 좌표에서 x값에만 절반 더해주면 좌표가 매치되므로 [y, x + halfSize]를 리턴
 *
 * 3-3. 남은 걸음 수가 3-2보다 크지만 1 + 2 + 3사분면 전체 개수보다 적은 경우
 * 기존 걸음걸이 수에서 1사분면 + 2사분면 걸음 걸이 수를 빼고 남은 좌표로 이동을 해야 구해짐.
 * 2^(n - 1) 좌표에서 y, x 모두 절반 더해주면 좌표가 매치되므로 [y + halfSize, x + halfSize]를 리턴
 *
 * 3-4. 남은 걸음 수가 3-3보다 크지만 현재 맵 전체 개수보다 적은 경우
 * 기존 걸음걸이 수에서 1사분면 + 2사분면 + 3사분면 걸음 걸이 수를 빼고 남은 좌표로 이동을 해야 구해짐.
 * 2^(n - 1) 좌표에서 y를 절반 더해주고 반시계로 회전한 값을 리턴해야 하므로 맞게 설정해줌
 *
 * 4. 재귀 스택 초과로 node.js에서는 아래 풀이를 쓸 수 없음.
 *
 */

const findCoords = (size, walk) => {
  if (size <= 2) {
    switch (walk) {
      case 1:
        return [1, 1];
      case 2:
        return [1, 2];
      case 3:
        return [2, 2];
      case 4:
        return [2, 1];
    }
  }

  const halfSize = size / 2;
  const sectionCount = halfSize * halfSize;

  if (walk <= sectionCount) {
    const [y, x] = findCoords(halfSize, walk);
    return [x, y];
  }

  if (walk <= 2 * sectionCount) {
    const [y, x] = findCoords(halfSize, walk - sectionCount);
    return [y, halfSize + x];
  }

  if (walk <= 3 * sectionCount) {
    const [y, x] = findCoords(halfSize, walk - 2 * sectionCount);
    return [halfSize + y, halfSize + x];
  }

  const [y, x] = findCoords(halfSize, walk - 3 * sectionCount);

  switch (walk - 3 * sectionCount) {
    case 1:
    case 3:
      return [y + 1 + halfSize, x + 1 + halfSize];
    case 2:
    case 4:
      return [y + halfSize, x + halfSize];
  }
};

console.log(findCoords(2 ** K, totalWalk).join(' '));

const [[K, totalWalk]] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code
 * 1. 현재 지도를 4분면으로 나눠 0-based 좌표로 구한다고 할 때, 지도를 0, 90, 180, 270도 회전 시
 * 4분면의 좌표가 어디에 해당하는지 정보를 담은 UNIT 맵을 만든다.
 * 즉, UNIT[0: 0도, 1: 90도, 2: 180도, 3: 270도][n - 1 == n사분면]
 * e.g.) UNIT[2][3] = 지도를 180도 회전했을 경우 제 4사분면의 좌표는 [0, 0]이다.
 *
 * 2. 0,1,2,3의 회전각도를 시계방향으로 돌리면 1,2,3,4가 되는데 4가 아니라 0이 되어야 함. 그래서 시계 방향으로 회전시키려면
 *  (현재 각도 + 1) % 4가 됨.
 *
 * 3. 0,1,2,3의 회전각도를 반시계방향으로 돌리면 -1,0,1,2가 되는데 -1은 처리가 곤란하기 때문에, 최대값인 3부터 시작하도록 3,4,5,6
 * 이 되도록 한뒤 4로 나눈 나머지를 쓰면 반시계로 돌리는게 됨. 즉, (현재 각도 + 3) % 4가됨.
 *
 * 4. 재귀의 결과 최소 사이즈인 2x2까지 오게 됐다면, 현재 회전각도 중 남은 걸음 수로 이동할 수 있는 좌표를 지금까지 이동한 y, x에 더해서
 * 리턴한다.
 *
 * 5. 4에 해당하지 않는다면, 다음 사이즈로 현재 사이즈의 절반, 다음 사이즈의 각 영역 카운트는 절반 * 절반으로 지정하고 재귀를 준비한다.
 * 6. 남은 걸음수를 다음 사이즈 영역 카운트로 나누고 나머지를 버리면 현재 좌표가 어느 사분면에 속하는지 알 수 있다.
 * 7. 현재 사분면으로 이동하기 위한 좌표 거리 dy, dx는 UNIT[현재 회전 각도][현재 사분면]으로 구할 수 있다.
 *
 * 8. y, x는 2^n의 시작 지점에서 시작하기 때문에, y와 x에 dy, dx만 더하는게 아니라 2^(n - 1)의 n사분면이 시작하는 좌표인
 * ny = y + dy * nextSize, nx = x + dx * nextSize가 된다. 즉, ny/nx가 현재 사분면의 시작 지점이고, 이 시작 지점에서
 * 2^(n - 1)의 재귀를 반복하게 된다.
 *
 * 9. 1사분면에서 2사분면으로 넘어갈 때, 회전 방향이 시계 방향으로 틀어진다
 */

const UNIT = [
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ],
  [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  [
    [1, 1],
    [1, 0],
    [0, 0],
    [0, 1],
  ],
  [
    [1, 1],
    [0, 1],
    [0, 0],
    [1, 0],
  ],
];

const rotate = (currentDirection, isClockWise) =>
  isClockWise ? (currentDirection + 1) % 4 : (currentDirection + 3) % 4;

const findCoords = (size, walk, y, x, dir) => {
  if (size === 2) {
    const [dy, dx] = UNIT[dir][walk];
    return [y + dy, x + dx];
  }

  const nextSize = size / 2;
  const nextQuadrantCount = nextSize * nextSize;
  const quadrant = Math.floor(walk / nextQuadrantCount);

  const [dy, dx] = UNIT[dir][quadrant];

  const ny = y + dy * nextSize;
  const nx = x + dx * nextSize;

  if (quadrant === 0) dir = rotate(dir, dir % 2 === 0);
  else if (quadrant === 3) dir = rotate(dir, dir % 2 !== 0);

  return findCoords(nextSize, walk % nextQuadrantCount, ny, nx, dir);
};

const [row, col] = findCoords(K, totalWalk - 1, 1, 1, 0);

console.log(row, col);

const [N, R, C] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code
 * 1. 함수의 정의
 * fn(n, r, c) -> 2^n * 2^n일때 r, c를 반환하는 순서
 *
 * 2. base condition
 * n === 0이면 0을 반환
 *
 * 3. 재귀식
 * 3-1. 1번 사각형은 2^n - 1 안에 좌표가 들어간 것이므로 fn(n -1,r,c)를 구한다.
 * 3-2. half === 2^(n - 1)로, half보다 x축만 크면 2사분면, half보다 y축만 크면 3사분면, half보다 x,y 둘다 크면 4사분면이 된다.
 * 3-3. 예시에서 볼 수 있듯이 각 사분면의 크기는 2^(n - 1)과 똑같다.
 *
 * 3-4. 2사분면은 2^(n - 1)을 가로로 두개 붙인 것의 두번째이므로, x축에 half를 빼면
 * 1사분면에서 가로로 대칭되는, 즉 2^(n - 1)에서 대칭되는 위치를 찾을 수 있다. 3사분면은 2^(n - 1)에서
 * 세로 대칭 되도록 세로로 2^(n - 1)을 붙인 것이므로, y에서 half를 빼면 2^(n - 1)세로로 대칭되는 포지션을 찾을 수 있다.
 * 4사분면은 half는 x,y모두 붙인 케이스이므로, y와 x에서 모두 half를 빼야 2^(n - 1)에서 대칭되는 포지션을 찾을 수 있다.
 *
 * 3-1. r, c가 1번 사각형 안이면 2^(n - 1)안에도 포함이 되므로, fn(n - 1, r, c)를 리턴하면 된다.
 *
 * 3-2. r, c가 2번 사각형 안일때 2^(n - 1) 사각형 만큼의 좌표를 전부 순회한 다음, 2^(n - 1)에서 대칭되는 포지션의 위치를 더해야 한다.
 * 즉, half * half (2^(n - 1) 사각형 전체의 순서 순회) + fn(n -1, r, c - half)(2^(n - 1) 사각형의 대칭되는 좌표 포지션)
 *
 * 3-3. r, c가 3번 사각형 안일때 2^(n - 1) 사각형 2개 만큼의 좌표를 전부 순회한 다음, 2^(n - 1)에서 대칭되는 포지션의 위치를 더해야 한다.
 * 즉, 2 * half * half (2^(n - 1) 사각형 전체의 순서 순회 두개를 더함) + fn(n -1, r - half, c)(2^(n - 1) 사각형의 대칭되는 좌표 포지션)
 *
 * 3-4. r, c가 3번 사각형 안일때 2^(n - 1) 사각형 2개 만큼의 좌표를 전부 순회한 다음, 2^(n - 1)에서 대칭되는 포지션의 위치를 더해야 한다.
 * 즉, 3 * half * half (2^(n - 1) 사각형 전체의 순서 순회 세개를 더함) + fn(n -1, r - half, c - half)(2^(n - 1) 사각형의 대칭되는 좌표 포지션)
 */

const z = (n, y, x) => {
  if (n === 0) return 0;

  const halfOfAxis = 2 ** (n - 1);
  const nMinusOneZCount = halfOfAxis * halfOfAxis;

  if (y < halfOfAxis && x < halfOfAxis) {
    return z(n - 1, y, x);
  } else if (y < halfOfAxis && x >= halfOfAxis) {
    return nMinusOneZCount + z(n - 1, y, x - halfOfAxis);
  } else if (y >= halfOfAxis && x < halfOfAxis) {
    return 2 * nMinusOneZCount + z(n - 1, y - halfOfAxis, x);
  } else {
    return 3 * nMinusOneZCount + z(n - 1, y - halfOfAxis, x - halfOfAxis);
  }
};

console.log(z(N, R, C));

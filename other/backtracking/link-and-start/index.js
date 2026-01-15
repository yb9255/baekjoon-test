/** https://www.acmicpc.net/problem/15661 */

const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 뽑힌 팀원을 기록하는 picked 방문객체를 생성한다.
 *
 * 2. 팀원을 뽑을 때마다 minDiff를 계산한다.
 * 2-1. picked에 x, y가 둘 다 true이면 두 명이 픽된 것이므로 픽된 사람이 모인 팀에 가산점을 준다.
 * 2-2. picked에 x, y가 둘 다 false이면 둘 다 픽되지 않은 것이므로 픽되지 않은 사람이 모인 팀에 가산점을 준다.
 * 2-3. 두 가산점 차이 절댓값을 구한뒤, minDiff와 비교해 더 작은 쪽으로 minDiff로 갱신한다.
 *
 * 3. dfs로 순회하면서 팀원이 픽이 되는 모든 경우의 수를 구하면서 depth를 기록한다.
 * 3-1. depth가 N - 1, 즉 1명 빼고 전부 픽되면 minDiff를 계산하고 dfs를 종료한다.
 * 3-2. 중복 체크가 발생하면 안되므로, dfs로 순회시마다 루프 startIndex를 1씩 늘려준다.
 *
 * 4. minDiff를 로그한다.
 */

const picked = Array(N).fill(false);
let minDiff = Infinity;

const checkMinDiff = () => {
  let sumA = 0;
  let sumB = 0;

  for (let y = 0; y < N; y++) {
    for (let x = y + 1; x < N; x++) {
      const stat = board[y][x] + board[x][y];

      if (picked[y] && picked[x]) {
        sumA += stat;
      } else if (!picked[y] && !picked[x]) {
        sumB += stat;
      }
    }
  }

  minDiff = Math.min(minDiff, Math.abs(sumA - sumB));
};

const dfs = (depth, startIdx) => {
  if (depth === N - 1) {
    checkMinDiff();
    return;
  }

  for (let i = startIdx; i < N; i++) {
    picked[i] = true;
    checkMinDiff();
    dfs(depth + 1, i + 1);
    picked[i] = false;
  }
};

dfs(0, 0);

console.log(minDiff);

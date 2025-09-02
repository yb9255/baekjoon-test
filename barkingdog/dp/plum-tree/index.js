/** https://www.acmicpc.net/problem/2240 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [T, W] = input[0].split(' ').map(Number);
const plums = [0, ...input.slice(1).map(Number)];

/** Pseudo Code
 * 1. 점화식은 dp[시간][움직인 횟수][현재 위치 인덱스] 전부 1-based
 * 2. 자두가 떨어지는 좌표 모음 plums의 길이만큼 for문 순회
 * 3. 현재 자두가 떨어지는 좌표 treeWithPlums를 기록하고 내부에서 moveCount만큼 for문 순회
 * 3. 시간이 흐를때 전혀 움직이지 않고 가만히 계속 있는 dp[time][0][1]은
 * dp[time - 1][0][1]에 현재 시간에 1번 나무에 자두가 떨어지면 1을 더한 값
 *
 * 4. 이 후 움직인 횟수별로 dp를 기록해야 하므로 moveCount만큼 순회
 * 이 때 1초에 한번 이상 움직이는 것은 의미가 없으므로 moveCount가 현재 시간보다 많으면
 * moveCount 순회를 break
 *
 * 5. 이번 시간에 1번 나무에서 자두가 떨어졌다면, dp[현재 시간][현재 이동 카운트][1]은
 * dp[현재 시간 - 1][현재 이동 카운트][1]번 나무값 (1번 나무에서 이동하지 않음.)
 * 혹은 dp[현재 시간 - 1][현재 이동 카운트 - 1][2] (2번 나무에서 이동해서 현재 1번으로 온 경우)
 * 중 더 큰 값에 1을 더함.
 *
 * 6. 이번 시간에 1번 나무에서 자두가 떨어졌다면, dp[현재 시간][현재 이동 카운트][2]는
 * dp[현재 시간 - 1][현재 이동 카운트 - 1][1]번 나무값 (1번 나무에서 이동해서 2번 나무로 옴)
 * 혹은 dp[현재 시간 - 1][현재 이동 카운트][2] (2번 나무에서 움직이지 않음)
 * 중 하나를 선택함.
 *
 * 7. 이번 시간에 2번 나무에서 자두가 떨어졌다면, 5/6을 역으로 실행함.
 *
 * 8. 0번 이동부터 W번 이동까지 순회하면서 목적 시간 T 시점에 몇번 이동했을 때 가장 많은 자두를 얻었는지
 * 확인하고 로그함.
 */

const dp = Array.from({ length: T + 1 }, () =>
  Array.from({ length: W + 1 }, () => Array(3).fill(0))
);

for (let time = 1; time <= T; time++) {
  const treeWithPlums = plums[time];

  dp[time][0][1] = dp[time - 1][0][1] + (treeWithPlums === 1 ? 1 : 0);

  for (let moveCount = 1; moveCount <= W; moveCount++) {
    if (time < moveCount) break;

    if (treeWithPlums === 1) {
      dp[time][moveCount][1] =
        Math.max(dp[time - 1][moveCount][1], dp[time - 1][moveCount - 1][2]) +
        1;

      dp[time][moveCount][2] = Math.max(
        dp[time - 1][moveCount - 1][1],
        dp[time - 1][moveCount][2]
      );
    } else {
      dp[time][moveCount][1] = Math.max(
        dp[time - 1][moveCount][1],
        dp[time - 1][moveCount - 1][2]
      );

      dp[time][moveCount][2] =
        Math.max(dp[time - 1][moveCount - 1][1], dp[time - 1][moveCount][2]) +
        1;
    }
  }
}

let maxCount = 0;

for (let moveCount = 0; moveCount <= W; moveCount++) {
  maxCount = Math.max(moveCount, dp[T][moveCount][1], dp[T][moveCount][2]);
}

console.log(maxCount);

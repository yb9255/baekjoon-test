/** https://www.acmicpc.net/problem/15661 */

const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code
 * 1. 전처리
 *    - totalSum = 모든 시너지의 합.
 *    - pairSum[i] = i번째 선수가 페어가 되는 선수와 얻을 수 있는 시너지 점수 총합.
 *      (pairSum[i] === Σ_j (board[i][j] + board[j][i]))
 *    - 팀원끼리 매칭이 될 때 시너지를 일일히 계산하는 것은 비효율적, 시너지 전체 총합으로 비교를 한다. 즉, a가 A팀에 픽이 되었을 때,
 *    A팀에는 a의 시너지 점수 전체를 더해버리는 식. 기존 스타트와 링크와 달리 팀원이 항상 평등하지 않기 때문에 가능.
 *
 * 2. 팀 선택을 picked[]로 관리하며, 팀 크기 t를 0..floor(N/2)까지 순회
 *    - 중복 방지를 위해 조합(오름차순 인덱스)으로만 고른다.
 *
 * 3. dfs는 depth, startIdx, targetCount를 시그니처로 가진다.
 * 3-1. targetCount는 1부터 절반까지 된다. targetCount만큼 재귀를 돌면서 팀원을 픽할건데,
 * 절반 이상부터는 정확히 반대팀으로 시너지 점수가 이동하는 중복 계산이기 때문에 탐색할 필요는 없기 때문
 * 3-2. dfs를 돌면서 picked에 현재 index를 체크하고 dfs에 depth, startIdx를 현재 index에서 1 늘려준다.
 * 3-3. 모든 targetCount에 대해 dfs로 조합을 탐색한다.
 * 3-4. depth가 targetCount에 도달했을 때, 전체 index를 순회하며 picked된 경우 한쪽 팀 점수로 더한다.
 * 3-5. 미리 구해뒀던 totalSum과 teamSum을 뺐을 때 절대값과 minDiff를 비교 후, 더 작은 값으로 minDiff를 초기화한다.
 *
 * 4. minDiff를 로그한다.
 */

let totalSum = 0;
let minDiff = Infinity;
const pairSum = Array(N).fill(0);
const picked = Array(N).fill(false);

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    const val = board[y][x];
    totalSum += val;
    pairSum[y] += val;
    pairSum[x] += val;
  }
}

const dfs = (depth, startIdx, target) => {
  if (depth === target) {
    let teamSum = 0;

    for (let i = 0; i < N; i++) {
      if (picked[i]) teamSum += pairSum[i];
    }

    minDiff = Math.min(minDiff, Math.abs(totalSum - teamSum));

    return;
  }

  for (let i = startIdx; i < N; i++) {
    picked[i] = true;
    dfs(depth + 1, i + 1, target);
    picked[i] = false;
  }
};

for (let i = 1; i <= Math.floor(N / 2); i++) {
  dfs(0, 0, i);
}

console.log(minDiff);

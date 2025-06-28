const [[N], ...eggs] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * Pseudo Code
 * 1. dfs(curEggIndex, brokenCount) 함수를 생성
 * 2. 현재 인덱스의 계란이 깨졌으면 다음 인덱스에서 dfs 실행
 *
 * 3. 계란 전체를 순회하면서 칠 수 있는 계란이면 계란을 쳤다고 기록하고 두개의 계란이 깨졌을 경우
 * dfs(curEggIndex + 1, brokenCount + <깨진 계란 개수>) 실행,
 * 이 때 그냥 계속 계란을 쳤다고 기록하면 다른 계란을 칠때 기록이 남으므로 dfs가 끝난 이후 깎인 내구도를 복구
 *
 * 4. 만약 칠 수 있는 계란이 아무것도 없을 경우, 다음 인덱스로 dfs 진행
 * 5. 인덱스가 N이 되었을 때, 깨진 계란의 갯수를 기존 answer와 비교하여 더 크면 현재 깨진 계란 갯수로 answer를 갱신
 *
 */

let answer = 0;

const dfs = (curEggIndex, brokenEggCount) => {
  if (curEggIndex >= N) {
    answer = Math.max(answer, brokenEggCount);
    return;
  }

  if (eggs[curEggIndex][0] <= 0) {
    dfs(curEggIndex + 1, brokenEggCount);
    return;
  }

  let hit = false;

  for (let i = 0; i < N; i++) {
    if (i === curEggIndex) continue;
    if (eggs[i][0] <= 0) continue;

    hit = true;

    eggs[i][0] -= eggs[curEggIndex][1];
    eggs[curEggIndex][0] -= eggs[i][1];

    let curEggBrokenCount = 0;

    if (eggs[i][0] <= 0) curEggBrokenCount++;
    if (eggs[curEggIndex][0] <= 0) curEggBrokenCount++;

    dfs(curEggIndex + 1, brokenEggCount + curEggBrokenCount);

    eggs[i][0] += eggs[curEggIndex][1];
    eggs[curEggIndex][0] += eggs[i][1];
  }

  if (!hit) dfs(curEggIndex + 1, brokenEggCount);
};

dfs(0, 0);

console.log(answer);

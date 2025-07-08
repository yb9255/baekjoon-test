const [[N, M], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 치킨가게와 집 좌표를 모두 담는다.
 * 2. 선택할 수 있는 M개의 치킨가게 조합을 모두 고른 뒤 combinations 배열에 담는다.
 *
 * 3. 각 조합별로 순회하면서 루프를 돈다. (i), 이 때 현재 조합에서 나올 수 있는 치킨 거리 총합인
 * curTotalChickenDistance 변수를 생성한다.
 *
 * 4. 모든 집 좌표를 순회하면서 해당 루프 내부에서 combinations[i]를 순회하도록 구현한다.
 *
 * 5. 각 집에서 가장 가까운 치킨거리를 구한 뒤 curHouseChickenDistance에 담은 다음,
 * curHouseChickenDistance를 구하는걸 완료했다면 curTotalChickenDistance에 curHouseChickenDistance를 더한다.
 *
 * 6. 현재 조합의 치킨 거리 합을 다 구했다면, minChickenDistance의 현재값과 현재 조합의 치킨 거리의 합 중
 * 더 작은 값으로 minChickenDistance를 초기화한다.
 *
 * 7. minChickenDistance를 로그한다.
 */

const storeCoords = [];
const houseCoords = [];

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    if (board[y][x] === 1) {
      houseCoords.push([y, x]);
    }

    if (board[y][x] === 2) {
      storeCoords.push([y, x]);
    }
  }
}

const combinations = [];
const visited = Array(M).fill(false);

const getCombinations = (startIdx, stack) => {
  if (stack.length === M) {
    combinations.push(stack);
    return;
  }

  for (let i = startIdx + 1; i < storeCoords.length; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    getCombinations(i, [...stack, i]);
    visited[i] = false;
  }
};

getCombinations(-1, []);

let minChickenDistance = Infinity;

for (let i = 0; i < combinations.length; i++) {
  const selectedStoreCoords = combinations[i].map((i) => storeCoords[i]);
  let curTotalChickenDistance = 0;

  for (const [houseY, houseX] of houseCoords) {
    let curHouseChickenDistance = Infinity;

    for (const [storeY, storeX] of selectedStoreCoords) {
      curHouseChickenDistance = Math.min(
        curHouseChickenDistance,
        Math.abs(storeY - houseY) + Math.abs(storeX - houseX)
      );
    }

    curTotalChickenDistance += curHouseChickenDistance;
    if (curTotalChickenDistance >= minChickenDistance) break;
  }

  minChickenDistance = Math.min(minChickenDistance, curTotalChickenDistance);
}

console.log(minChickenDistance);

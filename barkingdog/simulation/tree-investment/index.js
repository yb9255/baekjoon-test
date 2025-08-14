const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input8.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 시작 tree를 treeMap에 넣는다. treeMap에는 해당 좌표에 나무의 나이가 들어간다.
 * 2. year가 K가 될때까지 while을 반복한다.
 *
 * 3. 첫 y/x 좌표를 순회한다.
 * 3-1. 봄에는 어린 나무부터 양분을 주고 나이를 더한 다음 newTrees를 넣고,
 * 양분이 부족하면 deadTreeNutrient에 더한다. 이 때 treeMap을 sort해서 어린 나이부터 넣는다.
 * 3-2. 봄 작업이 끝나면 deadTreeNutrient를 nutrientMap[y][x]에 더한다.
 *
 * 4. 두번째 y/x 좌표를 순회한다.
 * 4-1. 가을에는 treeMap내 나무가 5의 배수이면 상하좌우 대각선 8개 좌표에 한 살 나무를 push한다.
 * 4-2. 겨울에는 winterNutrientMap에서 확인할 수 있는 추가 양분을 넣는다.
 *
 * 5. treeMap 전체를 순회한 다음, 나무 개수를 계산하여 로그한다.
 */

const [N, M, K] = input[0];
const winterNutrientMap = input.slice(1, N + 1);
const nutrientMap = Array.from({ length: N }, () => Array(N).fill(5));

const treeMap = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [])
);

const startTrees = input.slice(N + 1);

for (let m = 0; m < M; m++) {
  const [y, x, age] = startTrees[m];
  treeMap[y - 1][x - 1].push(age);
}

let year = 0;

const dy = [-1, -1, -1, 0, 1, 1, 1, 0];
const dx = [-1, 0, 1, 1, 1, 0, -1, -1];

while (year < K) {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      // 봄
      if (!treeMap[y][x].length) continue;
      treeMap[y][x].sort((a, b) => a - b);

      const newTrees = [];
      let deadNutrient = 0;

      for (let i = 0; i < treeMap[y][x].length; i++) {
        const age = treeMap[y][x][i];

        if (nutrientMap[y][x] >= age) {
          newTrees.push(age + 1);
          nutrientMap[y][x] -= age;
        } else {
          deadNutrient += Math.floor(age / 2);
        }
      }

      treeMap[y][x] = newTrees;

      // 여름
      nutrientMap[y][x] += deadNutrient;
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      // 가을
      for (const age of treeMap[y][x]) {
        if (age % 5 !== 0) continue;

        for (let dir = 0; dir < 8; dir++) {
          const ny = y + dy[dir];
          const nx = x + dx[dir];

          if (ny < 0 || ny >= N || nx < 0 || nx >= N) continue;
          treeMap[ny][nx].push(1);
        }
      }

      // 겨울
      nutrientMap[y][x] += winterNutrientMap[y][x];
    }
  }

  year++;
}

let treeCount = 0;

for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    treeCount += treeMap[y][x].length;
  }
}

console.log(treeCount);

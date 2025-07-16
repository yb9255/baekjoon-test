const [[N], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 사용자가 선택되었음을 기록하는 picked 배열을 만든다.
 * 2. picked를 조합 dfs로 순회하면서 전부 기록한다.
 *
 * 3. board 배열 전체를 순회하면서, y와 x가 전부 picked로 기록된 경우
 * dfs 과정에서 둘 다 선택되었음을 의미하므로 A팀에 값을 더한다.
 *
 * 4. y와 x 둘 다 picked가 되지 않았다면 둘 다 선택되지 않았음을 의미하므로
 * B팀에 값을 더한다.
 *
 * 5. A팀과 B팀의 값의 차이를 구하고 minDiff를 초기화한다.
 * 6. minDiff를 로그한다.
 */

const picked = Array(N).fill(false);
let minDiff = Infinity;

const findMinDiff = (depth, startIdx) => {
  if (depth === N / 2) {
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

    return;
  }

  for (let playerIdx = startIdx; playerIdx < N; playerIdx++) {
    picked[playerIdx] = true;
    findMinDiff(depth + 1, playerIdx + 1);
    picked[playerIdx] = false;
  }
};

findMinDiff(0, 0);
console.log(minDiff);

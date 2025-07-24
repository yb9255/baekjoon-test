/** https://www.acmicpc.net/problem/17281 */

const [[N], ...gameBoard] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input6.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code (Barkingdog)
 * 0. node.js 에서는 시간초과 발생함
 *
 * 1. 타순을 기록하는 battingOrder와 현재 타순에 해당 선수가 배치됨 여부를 기록하는 playerUsed 배열을 만듬
 *
 * 2. 0번 인덱스는 4번 타자로 항상 고정하고, 타순 조합을 dfs로 순회하면서 배치하는 generateBattingOrder 함수 실행
 * 재귀가 끝나면 playerUsed를 다시 false로 바꿈.
 *
 * 3. generateBattingOrder의 depth가 9가 됐을 때, simulateGame 함수를 실행
 * 4. battingOrder에 기록된 player 1번 ~ 9번씩 순회하면서 base를 채우는 로직을 만듬
 * 5. 만약 현재 inning에 해당 선수가 아웃되었다면 outCount를 올림
 *
 * 6. 만약 현재 inning에 해당 선수가 안타, 2루타, 3루타를 쳤다면 3루부터 체크하면서
 * 홈에 들어올 선수가 있으면 score를 올리고, 아닌 선수는 루를 옮겨준다. 그 선수가 있던 베이스는 false로 변경
 *
 * 7. 정해진 inning만큼 이 행동을 반복하고, score를 maxScore와 비교하여 score가 더 크면 값을 갱신한다.
 * 8. score를 로그한다.
 */

const battingOrder = new Array(9).fill(0);
const playerUsed = new Array(9).fill(false);
let maxScore = -Infinity;

const simulateGame = () => {
  let score = 0;
  let batterIndex = 0;

  for (let inning = 0; inning < N; inning++) {
    const bases = [false, false, false, false]; // home, 1루, 2루, 3루
    let outCount = 0;

    while (outCount < 3) {
      bases[0] = true;
      const hitResult = gameBoard[inning][battingOrder[batterIndex]];
      batterIndex = (batterIndex + 1) % 9;

      if (hitResult === 0) {
        outCount++;
      } else {
        for (let base = 3; base >= 0; base--) {
          if (!bases[base]) continue;
          bases[base] = false;

          if (base + hitResult >= 4) {
            score++;
          } else {
            bases[base + hitResult] = true;
          }
        }
      }
    }
  }

  maxScore = Math.max(maxScore, score);
};

const generateBattingOrder = (orderCount) => {
  if (orderCount === 9) {
    simulateGame();
    return;
  }

  if (orderCount === 3) {
    battingOrder[orderCount] = 0;
    generateBattingOrder(orderCount + 1);
    return;
  }

  for (let player = 1; player < 9; player++) {
    if (!playerUsed[player]) {
      playerUsed[player] = true;
      battingOrder[orderCount] = player;
      generateBattingOrder(orderCount + 1);
      playerUsed[player] = false;
    }
  }
};

generateBattingOrder(0);
console.log(maxScore);

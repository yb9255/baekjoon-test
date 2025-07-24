/** https://www.acmicpc.net/problem/17281 */

const [[N], ...gameBoard] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input6.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 기존 풀이에서 비트마스크를 사용해서 주자를 표현하는 형태로 표현해서 시간초과 통과
 * e.g.) 0000 -> 주자 없음, 0001 -> 타석에 주자가 섰음, 1101 3루/2루에 주자가 있고 1루에는 없고 주자가 타석에 있음.
 */

const battingOrder = new Array(9).fill(0);
const playerUsed = new Array(9).fill(false);

let maxScore = -Infinity;

const simulateGame = () => {
  let score = 0;
  let batterIndex = 0;

  for (let inning = 0; inning < N; inning++) {
    let baseMask = 0;
    let outCount = 0;

    while (outCount < 3) {
      baseMask |= 1;

      const player = battingOrder[batterIndex];
      const hitResult = gameBoard[inning][player];
      batterIndex = (batterIndex + 1) % 9;

      if (hitResult === 0) {
        outCount++;
      } else {
        for (let base = 3; base >= 0; base--) {
          if (!(baseMask & (1 << base))) continue;

          baseMask &= ~(1 << base);

          if (hitResult + base >= 4) {
            score++;
          } else {
            baseMask |= 1 << (hitResult + base);
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

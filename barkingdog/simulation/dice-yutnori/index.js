/** https://www.acmicpc.net/problem/17825 */

const diceRolls = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input4.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

/** Pseudo Code
 * 1. 각 말의 현재 포지션을 담은 piecePositions 배열을 만든다.
 * 2. 특수 경로(파란색 화살표)가 있는지 여부를 기록하는 specialPaths 배열을 만든다.
 * 3. 각 칸에서 한칸 이동할 다음 칸을 기록하는 nextPositions 배열을 만든다.
 *
 * 4. scores 배열을 만든다. 0번째 인덱스는 시작 지점으로 0을 담는다.
 * 4-1. 그 다음부터 정상적으로 한바퀴를 두는 루트대로 갔을 때 얻을 수 있는 점수를 먼저 담는다.
 * 4-2. 이 후 첫 번째 특수 경로를 탔을 경우에만 획득 가능한 점수와, 특수 경로를 탔을 떄
 * 모두 공통으로 획득 가능한 점수(30, 35)를 담는다
 * 4-3. 이 후 두 번쨰 특수 경로를 탔을 경우에만 획득 가능한 점수를 담는다.
 * 4-4. 이 다음 세 번쨰 특수 경로를 탔을 경우에만 획득 가능한 점수를 담는다.
 * 4-5. 마지막 인덱스 (32번째 인덱스)는 도착 인덱스로 0을 담는다.
 *
 * 5. 가장 큰 점수를 구하는 maxScore 변수를 만들고 0으로 초기화한다.
 *
 * 6. specialPath에서 특수 경로를 타는 인덱스에 score에서 특수 경로가 시작되는 인덱스를 담는다.
 * 6-1. 5번 인덱스는 첫번째 특수 경로가 시작되는 지점이므로, scores에 첫번쨰 특수 경로 점수 목록이 시작되는 인덱스
 * 21을 담는다.
 * 6-2. 10번 인덱스는 첫번째 특수 경로가 시작되는 지점이므로, scores에 두번쨰 특수 경로 점수 목록이 시작되는 인덱스
 * 27을 담는다.
 * 6-3. 15번 인덱스는 첫번째 특수 경로가 시작되는 지점이므로, scores에 세번쨰 특수 경로 점수 목록이 시작되는 인덱스
 * 29을 담는다.
 *
 * 7. nextPositions를 도착 index 전까지 순회하면서 현재 index의 + 1을 다음 index로 기록한다.
 *
 * 8. 이 후, scores 내에서 다음 index가 index + 1이 아닌 지점들을 nextPositions에서 수정해준다.
 * 8-1. 20번쨰 인덱스의 경우 (score 40) 그 다음이 도착이여야 하므로 nextPosition을 32로 수정해준다.
 * 8-2. 26번째 인덱스의 경우 (score 35) 그 다음이 기본 경로 마지막 칸인 40이 되어야 하므로
 * nextPosition을 40으로 수정해준다.
 * 8-3. 28번째 인덱스(score 24)와 31번째 인덱스(scores 26)의 경우 특수 경로의 공통 부분 경로 시작
 * 지점인 24번째 인덱스 (score 25)로 이동해야 하므로 nextPosition을 24로 수정해야 한다.
 *
 * 9. diceIndex, totalScore을 param으로 받는 simulate 함수를 작성한다.
 * 9-1. diceIndex는 현재 dice가 몇 번째 주사위 시도 값인지 나타낸다. dices[3]의 경우
 * 세 번째로 주사위를 굴렸을 때 값을 나타냄
 * 9-2. totalScore는 현재까지 굴린 주사위 시도 값의 합을 나타낸다.
 *
 * 10. 만약 diceIndex가 10이라면, maxScore를 Math.max로 totalScore로 비교해 갱신한 이후
 * 함수 실행을 종료한다.
 *
 * 11. diceIndex를 통해 현재 주사위 시도의 값을 구한다. (diceValue)
 *
 * 12. piecePositions를 루프로 순회한다. (pieceIndex)
 * 12-1. 현재 확인중일 말의 위치가 도착 위치이면 continue
 *
 * 13. 다음 위치를 담는 nextPositionIndex 변수를 만들고, 현재 index로 초기화한다.
 *
 * 14. 12번 루프 내에서 1부터 diceValue까지 한칸씩 이동하는 루프를 시작한다 (step)
 * 14-1. 만약 nextPositionIndex가 도착 인덱스면 루프를 종료한다.
 * 14-2. step이 0, 즉 이동을 이제 막 시작했는데 specialPath[nextPositionIndex]에 값이
 * 있다면 특수 경로로 이동해야 한다. nextPositionIndex를 specialPath[nextPositionIndex로 갱신한다.
 * 14-3. 특수 경로가 없다면, nextPositions에 기록된 다음 index로 nextPositionIndex를 갱신한다.
 * 14-4. 이동을 마쳤을 때 그 칸이 도착칸이 아님에도 다른 말이 있다면 고를 수 없으므로, 해당 조건의 경우
 * 14-3이 완료된 시점에서 continue로 다른 말로 넘어간다.
 * 14-5. 현재 말의 index를 임시로 저장해둔 다음, piecePositions에 현재 말의 index를 nextPositionIndex로
 * 갱신한 뒤 simulate(diceIndex + 1, totalScore + scores[nextPositionIndex])로 재귀함수를 실행한다. 즉
 * 이 이동시의 값을 구하기 위해 백트래킹 재귀를 실행한다.
 * 14-6. 14-5의 재귀가 끝났으면 다른 재귀에 영향을 주면 안되므로 현재 말의 index를 다시 원상복귀 시켜준다.
 *
 * 15. 14의 실행으로 기록된 maxScore를 로그한다.
 *
 */

const MAX_POSITION_LENGTH = 33;

const piecePositions = [0, 0, 0, 0];
const specialPaths = Array(MAX_POSITION_LENGTH).fill(0);

specialPaths[5] = 21;
specialPaths[10] = 27;
specialPaths[15] = 29;

const nextPositions = Array.from({ length: MAX_POSITION_LENGTH }, (_, index) =>
  index === MAX_POSITION_LENGTH - 1 ? 0 : index + 1
);

nextPositions[20] = 32;
nextPositions[26] = 20;
nextPositions[28] = nextPositions[31] = 24;

const scores = [
  0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40,
  13, 16, 19, 25, 30, 35, 22, 24, 28, 27, 26, 0,
];

let maxScore = 0;

const simulate = (diceIndex, totalScore) => {
  if (diceIndex === 10) {
    maxScore = Math.max(maxScore, totalScore);
    return;
  }

  const diceValue = diceRolls[diceIndex];

  for (let pieceIndex = 0; pieceIndex < piecePositions.length; pieceIndex++) {
    if (piecePositions[pieceIndex] === MAX_POSITION_LENGTH - 1) continue;

    let nextPositionIndex = piecePositions[pieceIndex];

    for (let step = 0; step < diceValue; step++) {
      if (nextPositionIndex === MAX_POSITION_LENGTH - 1) break;

      if (step === 0 && specialPaths[nextPositionIndex]) {
        nextPositionIndex = specialPaths[nextPositionIndex];
      } else {
        nextPositionIndex = nextPositions[nextPositionIndex];
      }
    }

    if (
      nextPositionIndex !== MAX_POSITION_LENGTH - 1 &&
      piecePositions.includes(nextPositionIndex)
    ) {
      continue;
    }

    const prevPositionIndex = piecePositions[pieceIndex];
    piecePositions[pieceIndex] = nextPositionIndex;
    simulate(diceIndex + 1, totalScore + scores[nextPositionIndex]);
    piecePositions[pieceIndex] = prevPositionIndex;
  }
};

simulate(0, 0);
console.log(maxScore);

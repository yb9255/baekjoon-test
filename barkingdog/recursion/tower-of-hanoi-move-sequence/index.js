/** https://www.acmicpc.net/problem/11729 */

const n = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * Pseudo Code
 * 1. 꼭대기 1부터 맨 아래 n까지의 원판을 1번 기둥으로 옮기려면, 일단 1 ~ n - 1번까지 원판은 2번 기둥
 * n번 원판은 3번 기둥으로 가야함. 이후 2번 기둥의 원판을 3번 기둥으로 옮기면 답에 도달함
 *
 * 2. 이를 다시 정의하면, 원판이 n - 1개일 때 옮길 수 있으면, 원판이 n개일때도 옮길 수 있다.
 * 원판이 k개일때 옮길 수 있으면, 원판이 k + 1개일때도 옮길 수 있다.
 *
 * 3. 원판 n개를 기둥 1에서 기둥 3으로 옮기는 함수를 작성한다.
 * 인자로 원판 개수 n, 시작 기둥 a, 도착 기둥 b를 인자로 받는다.
 *
 * 4. base condition은 n이 1일 때 기둥 a에서 기둥 b로 값을 옮기고 이동을 기록한다.
 *
 * 5. a도 b도 아닌 기둥은 6 - a - b.
 * 이에 기반한 재귀식은 다음과 같다.(1 + 2 + 3 = 6에서 기둥 2개 번호를 빼면 남은 기둥 값이 남으므로)
 * 5-1. n - 1개의 원판을 기둥 a에서 6 - a - b로 옮긴다.
 * 5-2. n번 원판을 기둥 a에서 b로 옮기고 이동을 기록한다.
 * 5-3. n - 1개의 원판을 기둥 6-a-b에서 b로 옮긴다.
 */

const answer = [];

const hanoi = (n, startTower, targetTower) => {
  if (n === 1) {
    answer.push(`${startTower} ${targetTower}`);
    return;
  }

  const remainingTower = 6 - startTower - targetTower;

  hanoi(n - 1, startTower, remainingTower);
  answer.push(`${startTower} ${targetTower}`);
  hanoi(n - 1, remainingTower, targetTower);
};

hanoi(n, 1, 3);
console.log(answer.length);
console.log(answer.join('\n'));

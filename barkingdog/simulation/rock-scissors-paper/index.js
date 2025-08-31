/** https://www.acmicpc.net/problem/16986 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 각 가위바위보의 결과를 resultBoard에 담는다. 이는 서로 이기고 지는거를 표로 보여주는
 * 판정표 역할을 한다.
 *    - resultBoard[i][j] === 2 → i가 j를 이김
 *    - resultBoard[i][j] === 1 → i와 j가 비김
 *    - resultBoard[i][j] === 0 → i가 j에게 짐
 *
 *    예: resultBoard[1][2] === 2 라면,
 *        손동작 1이 손동작 2를 이긴다는 뜻이다.
 * 2. 경희의 손동작을 담은 kOrder와 민호의 손동작을 담은 mMap을 만든다.
 * 3. 지우의 손동작 순서를 담는 jOrder와 visited 배열을 만든다.
 * 4. 지우의 손동작 순서 순열을 dfs로 구하면서, N의 길이가 되면 simulate 함수를 실행해서 지우의 승리 여부를 파악한다.
 *
 * 5. simulate 함수는 먼저 각 손동작을 담은 hands 배열을 가진다. 0번째는 현재 지우의 손동작 순서, 1번째는 경희의 손동작 순서,
 * 2번째는 민호의 손동작 순서를 담는다.
 *
 * 6. simulate 함수는 각 플레이어의 승리 갯수를 구하는 winCount 배열을 가진다. 0번째는 지우의 승리횟수, 1번째는 경희의 승리횟수,
 * 2번째는 민호의 승리횟수를 담는다.
 *
 * 7. 먼저 지우 vs 경희부터 대결을 한다. 이 후 패배하는 사람이 나오면 기다리는 플레이어가 패배하는 플레이어 대신 플레이하며 이를 while문으로 반복한다.
 * 이 while문은 지우가 모든 손패를 다 썼거나 누군가 K번 승리할때까지 반복된다.
 *
 * 8. 플레이어는 0, 1, 2로 지정하고 3에서 현재 플레이어를 빼는 방식으로 대기 사용자를 지정한다. 이 때, 현재 플레이어가 (1, 0)이거나 (0, 1)인 경우는 실제 플레이어는 같지만
 * firstPlayer와 secondPlayer를 갱신하는 로직을 적용할 때 초기화되는 사용자가 달라지는, 즉 패배 처리 로직이 다른 사람에게 적용되기 때문에 firstPlayer가
 * 항상 적은 값이 되도록 한다.
 *
 * e.g.) firstPlayer = 0, secondPlayer = 1일 때와 firstPlayer = 1, secondPlayer = 0일 때 붙은 플레이어는 같지만, 만약 1이 이긴다고 하면
 * 전자는 firstPlayer가 갱신되고 후자는 secondPlayer가 갱신된다. 혼돈을 방지하기 위해 firstPlayer가 항상 작은 값이 되도록 한다.
 *
 * 9. hands[현재 플레이어][현재 플레이어의 손동작 순서++]를 하면 지금 내야하는 현재 플레이어의 손동작을 구하면서 해당 플레이어의
 * 손동작 인덱스 (curPatternIndices[현재 플레이어])를 업데이트 할 수 있다.
 * resultBoard[플레이어 1의 손동작][플레이어 2의 손동작]이 2가 나온다면 두번째 플레이어를 대기 플레이어로 바꾸고 첫번째 플레이어의 승수를 올린다.
 * 그렇지 않다면 첫번째 플레이어를 대기 플레이어로 바꾸고 두번째 플레이어의 승수를 올린다.
 *
 * 10. 누군가의 승수가 K가 되면, winCount[0](지우의 승수)가 K인지 여부를 리턴한다. 여기까지가 simulate 함수의 동작이다.
 * 지우의 손동작을 다 쓸때까지 누군가의 승수가 K가 되지 않으면, false를 리턴한다.
 *
 * 11. 4번에서 simulate 함수를 실행해서 지우가 승리했다면 answer를 1로 바꾼다. 이 후 재귀에서 answer가 1이면 전부 얼리 리턴해서 불필요한 계산을 줄인다.
 *
 * 12. answer를 로그한다.
 */

let line = 0;
const [N, K] = input[line++].split(' ').map(Number);

const resultBoard = Array.from({ length: N }, () =>
  input[line++].split(' ').map(Number)
);

const kOrder = input[line++].split(' ').map(Number);
const mOrder = input[line++].split(' ').map(Number);

const jOrder = [];
const visited = Array(N).fill(false);

const simulate = (curJOrder) => {
  const hands = [curJOrder, kOrder, mOrder];
  const winCount = [0, 0, 0];
  const curPatternIndices = [0, 0, 0];

  let firstPlayer = 0;
  let secondPlayer = 1;

  while (true) {
    if (firstPlayer > secondPlayer) {
      [firstPlayer, secondPlayer] = [secondPlayer, firstPlayer];
    }

    if (firstPlayer === 0 && curPatternIndices[0] >= N) break;

    const waitingPlayer = 3 - firstPlayer - secondPlayer;

    const firstPlayerPattern =
      hands[firstPlayer][curPatternIndices[firstPlayer]++];

    const secondPlayerPattern =
      hands[secondPlayer][curPatternIndices[secondPlayer]++];

    if (resultBoard[firstPlayerPattern - 1][secondPlayerPattern - 1] === 2) {
      winCount[firstPlayer]++;

      if (winCount[firstPlayer] === K) {
        return winCount[0] === K;
      }

      secondPlayer = waitingPlayer;
    } else {
      winCount[secondPlayer]++;

      if (winCount[secondPlayer] === K) {
        return winCount[0] === K;
      }

      firstPlayer = waitingPlayer;
    }
  }

  return false;
};

let answer = 0;

const dfs = (depth) => {
  if (answer) return;

  if (depth === N) {
    if (simulate([...jOrder])) {
      answer = 1;
    }

    return;
  }

  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    jOrder[depth] = i + 1;
    dfs(depth + 1);
    visited[i] = false;
  }
};

dfs(0);
console.log(answer);

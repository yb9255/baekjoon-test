const board = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 *
 * 1. 2차원 배열을 flat하게 만들었다면, 특정 index (y,x)중 y축의 값은 Math.floor(index / N)이 될 것이며
 * x는 index % M이 될 것이다.
 *
 * 2. 목표 상태를 123456780, 현재 상태를 board.flat().join('')으로 구함.
 * 3. queue에 시작 상태와 숫자 0을 담은 배열을 넣은 후 visited에 기록한다.
 * 4. queue에 있는 값을 전부 루프로 돈다. 목표 상태와 같은 값이 있다면 depth를 로그에 찍고 종료.
 *
 * 5. 4에서 목표 상태와 같은 값을 구하지 못했다면 getNextStates 함수를 실행서 다음 상태 목록을 획득한다.
 * 5-1. 인자로 받은 상태에서 0의 index를 찾고, 거기서 y와 x를 구한다.
 * 5-2. 상하좌우를 탐색해서 ny, nx를 구한 다음, ny * 3 + nx를 통해서 상하좌우의 좌표를 평면 index로 치환한다.
 * 5-3. 평면 index로 치환한 index(swapIdx)와 0 인덱스 (zeroIdx)의 자리를 바꾼 문자열을 구하고 배열에 담는다.
 * 5-4. 상하좌우를 탐색하며 배열에 담은 문자열을 nextStates로 리턴한다.
 *
 * 6. nextStates중에 방문 기록이 없다면 방문했다고 기록하고 nextQueue에 담는다.
 *
 * 4. 4에서 목표 상태와 같은 값이 없었다면 더 이상 해당 값들을 체크할 필요가 없으므로 queue를 nextQueue로 바꿔주고,
 * depth를 1 늘려준다. (메모리 관리를 위해 필수)
 */

const N = 3;
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const visitedState = new Set();
const startState = board.flat().join('');
const targetState = '123456780';

let queue = [startState];
let depth = 0;
visitedState.add(startState);

const getNextStates = (state) => {
  const nextStates = [];
  const zeroIdx = state.indexOf('0');
  const y = Math.floor(zeroIdx / N);
  const x = zeroIdx % N;

  for (let dir = 0; dir < 4; dir++) {
    const ny = y + dy[dir];
    const nx = x + dx[dir];

    if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;

    const swapIdx = ny * 3 + nx;
    const minIdx = Math.min(swapIdx, zeroIdx);
    const maxIdx = Math.max(swapIdx, zeroIdx);

    const nextState =
      state.slice(0, minIdx) +
      state[maxIdx] +
      state.slice(minIdx + 1, maxIdx) +
      state[minIdx] +
      state.slice(maxIdx + 1);

    nextStates.push(nextState);
  }

  return nextStates;
};

while (queue.length) {
  const nextQueue = [];

  for (const curState of queue) {
    if (curState === targetState) {
      console.log(depth);
      process.exit();
    }

    const nextStates = getNextStates(curState);

    for (const next of nextStates) {
      if (!visitedState.has(next)) {
        visitedState.add(next);
        nextQueue.push(next);
      }
    }
  }

  queue = nextQueue;
  depth++;
}

console.log(-1);

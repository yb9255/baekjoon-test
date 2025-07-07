const board = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. index.js와 같으나, 함수를 쓰지 않아서 실행속도가 조금 더 빠르다
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

while (queue.length) {
  const nextQueue = [];

  for (const state of queue) {
    if (state === targetState) {
      console.log(depth);
      process.exit();
    }

    const nextStates = [];

    const zeroIdx = state.indexOf('0');
    const zeroY = Math.floor(zeroIdx / N);
    const zeroX = zeroIdx % N;

    for (let dir = 0; dir < 4; dir++) {
      const ny = zeroY + dy[dir];
      const nx = zeroX + dx[dir];

      if (ny < 0 || nx < 0 || ny >= N || nx >= N) continue;

      const swapIdx = ny * 3 + nx;
      const minIdx = Math.min(zeroIdx, swapIdx);
      const maxIdx = Math.max(zeroIdx, swapIdx);

      const nextState =
        state.slice(0, minIdx) +
        state[maxIdx] +
        state.slice(minIdx + 1, maxIdx) +
        state[minIdx] +
        state.slice(maxIdx + 1);

      nextStates.push(nextState);
    }

    for (const nextState of nextStates) {
      if (!visitedState.has(nextState)) {
        visitedState.add(nextState);
        nextQueue.push(nextState);
      }
    }
  }

  queue = nextQueue;
  depth++;
}

console.log(-1);

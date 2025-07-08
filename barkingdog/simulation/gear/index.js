const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input4.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 회전 시키는 톱니바퀴의 인덱스와 톱니바퀴의 회전방향을 queue에 담고 방문했다고 기록한다.
 *
 * 2. bfs를 시작한다. queue에서 처음 값을 꺼내 회전방향으로 톱니를 돌린다. 돌리기 이전 톱니 상태는
 * 주변 톱니를 돌리는 방향을 계산할때 필요하므로 curGear 변수에 보관해둔다.
 *
 * 3. 방문하지 않은 이전 톱니로 이동할때는, 이전 톱니의 2번 index 톱니와 curGear의 6번 index 톱니가 다르면
 * queue에 [이전 톱니 index, 현재와 반대되는 회전방향]을 넣는다. 그리고 이전 톱니 index를 방문했다고 기록한다.
 *
 * 4. 방문하지 않은 다음 톱니로 이동할때는, 다음 톱니의 6번 index 톱니와 curGear의 2번 index 톱니가 다르면
 * queue에 [다음 톱니 index, 현재와 반대되는 회전방향]을 넣는다. 그리고 다음 톱니 index를 방문했다고 기록한다.
 *
 * 5. 1 ~ 4의 과정을 톱니바퀴 회전 케이스 전체만큼 반복한다.
 * 6. 각 톱니바퀴의 첫번째 톱니가 1일 경우, 그 2 ** <톱니 인덱스>만큼의 값을 누적해서 리턴한다.
 *
 */

const K = +input[4];
const gears = input.slice(0, 4).map((line) => line.split('').map(Number));
const rotationInfo = input.slice(5).map((line) => line.split(' ').map(Number));

const rotateClockwise = (gear) => {
  const newGear = Array(8);

  for (let i = 0; i < 8; i++) {
    if (i === 7) newGear[0] = gear[i];
    else newGear[i + 1] = gear[i];
  }

  return newGear;
};

const rotateCounterClockwise = (gear) => {
  const newGear = Array(8);

  for (let i = 7; i >= 0; i--) {
    if (i === 0) newGear[7] = gear[i];
    else newGear[i - 1] = gear[i];
  }

  return newGear;
};

for (let i = 0; i < K; i++) {
  const [gearNumber, direction] = rotationInfo[i];
  const visited = Array(4).fill(false);
  const pivotIdx = gearNumber - 1;

  const queue = [[pivotIdx, direction]];
  visited[pivotIdx] = true;
  let front = 0;

  while (front < queue.length) {
    const [curIdx, curDirection] = queue[front++];
    const curGear = gears[curIdx];
    const nextDirection = curDirection === 1 ? -1 : 1;

    if (curDirection === 1) {
      gears[curIdx] = rotateClockwise(curGear);
    } else {
      gears[curIdx] = rotateCounterClockwise(curGear);
    }

    if (
      curIdx - 1 >= 0 &&
      !visited[curIdx - 1] &&
      gears[curIdx - 1][2] !== curGear[6]
    ) {
      visited[curIdx - 1] = true;
      queue.push([curIdx - 1, nextDirection]);
    }

    if (
      curIdx + 1 < 4 &&
      !visited[curIdx + 1] &&
      gears[curIdx + 1][6] !== curGear[2]
    ) {
      visited[curIdx + 1] = true;
      queue.push([curIdx + 1, nextDirection]);
    }
  }
}

console.log(
  gears.reduce((point, curGear, gearIdx) => {
    if (curGear[0] === 1) {
      point += 2 ** gearIdx;
    }

    return point;
  }, 0)
);

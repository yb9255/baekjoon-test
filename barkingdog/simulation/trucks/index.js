const [[, W, L], trucks] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. queue 역할의 bridge [첫번째 트럭, 트럭의 이동 거리(1)]를 넣고 시간이 1초 지났다고 가정한다.
 * 2. bridge가 빌때까지 반복하는 while을 실행한다.
 * 3. bridge 위 모든 트럭에 이동 거리를 1 더해준다.
 * 4. 이동거리가 W를 넘는 트럭이 있으면 shift로 해당 트럭을 빼고 현재 다리 위 트럭 무게 합에서 값을 뺴준다.
 *
 * 5. 다음 트럭이 남아있으며 다음 트럭과 현재 다리 위 트럭 무게의 합이 W를 넘지 않으면, [다음 트럭, 1]을
 * bridge 큐에 넣는다.
 *
 * 6. bridge가 다 빌때까지 이 작업을 반복하고, 순회 한번마다 time 시간을 늘려준다.
 * 7. 루프가 끝나면 time을 리턴한다.
 */

const bridge = [[trucks[0], 1]];

let time = 1;
let trucksFront = 1;
let bridgeFront = 0;
let curTotalWeight = trucks[0];

while (bridgeFront < bridge.length) {
  for (let i = bridgeFront; i < bridge.length; i++) {
    bridge[i][1]++;
  }

  if (bridge[bridgeFront][1] > W) {
    const [truckWeight] = bridge[bridgeFront++];
    curTotalWeight -= truckWeight;
  }

  if (
    trucksFront < trucks.length &&
    curTotalWeight + trucks[trucksFront] <= L
  ) {
    bridge.push([trucks[trucksFront], 1]);
    curTotalWeight += trucks[trucksFront++];
  }

  time++;
}

console.log(time);

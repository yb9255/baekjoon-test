/** https://www.acmicpc.net/problem/15684 */

const [[N, M, H], ...lines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input7.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code (Barkingdog)
 * 1. 연결 좌표를 기록하는 connectingLinePoint 배열 구현
 * 2. lines를 순회하면서 y,x에서 x와 x + 1이 연결된 경우 true가 되도록 표시
 *
 * 3. 새 연결선을 놓은 후보군 좌표를 coords에 담음. 아래 두 조건 충족해야 함
 * 3-1. 이미 연결된 선이 아님.
 * 3-2. 다음 연결될 곳인 x - 1, x + 1도 연결된 선이 아니어야 함.
 *
 * 4. i번째 줄이 i번쨰에 도착하는지 체크하는 check 함수 생성,
 * 4-1. x를 순회한다. 각 loop마다 도착지 값을 상징하는 cur 변수를 만든 뒤
 * 현재 순회 중인 x 값으로 초기화함.
 * 4-2. x 순회 내부에서 y를 순회하면서 x축을 고정하면서 y축을 내려가면서 탐색하도록 한다.
 * 4-3. y를 순회중에 connectingLinePoint[y][x]가 true이면 x와 x + 1 연결선이 있다는 의미이므로
 * cur를 1 늘려준다.
 * 4-4. y를 순회중에 connectingLinePoint[y][x - 1]가 true이면 x - 1과 x 연결선이 있다는 의미이므로
 * cur를 1 줄여준다.
 * 4-5. 최종적으로 cur와 x가 하나라도 다르다면 false, 모두 같다면 true를 리턴한다.
 *
 * 5. 3중 for문으로 가능한 모든 연결선을 새로 놓을 경우의 수를 탐색함.
 * 5-1. 첫번째 for문은 모든 가능한 곳에 연결선을 1개 둔 경우. 여기서 check가 true가 나오면 정답은 1이 된다.
 * 5-2. 두번째 for문은 모든 가능한 곳에 연결선을 2개 둔 경우. 여기서 check가 true가 나오면 정답은 2가 된다.
 * 5-3. 첫번째 for문은 모든 가능한 곳에 연결선을 3개 둔 경우. 여기서 check가 true가 나오면 정답은 3이 된다.
 * 5-4. 각 루프를 돌때마다 connectingLinePoint를 true로 표시해서 중복방문을 방지한다.
 *
 * 6. 5를 거치고도 i번째 줄이 i에 도착하지 않으면 -1 로그.
 */

const connectingLinePoint = Array.from({ length: H }, () =>
  Array(N - 1).fill(false)
);

for (let i = 0; i < M; i++) {
  const [y, x] = lines[i];
  connectingLinePoint[y - 1][x - 1] = true;
}

const coords = [];

for (let y = 0; y < H; y++) {
  for (let x = 0; x < N - 1; x++) {
    if (connectingLinePoint[y][x]) continue;
    if (x > 0 && connectingLinePoint[y][x - 1]) continue;
    if (x < N - 2 && connectingLinePoint[y][x + 1]) continue;

    coords.push([y, x]);
  }
}

const check = () => {
  for (let x = 0; x < N; x++) {
    let cur = x;

    for (let y = 0; y < H; y++) {
      if (cur > 0 && connectingLinePoint[y][cur - 1]) cur--;
      else if (cur < N - 1 && connectingLinePoint[y][cur]) cur++;
    }

    if (cur !== x) return false;
  }

  return true;
};

if (check()) {
  console.log(0);
  process.exit();
}

let answer = Infinity;

for (let i = 0; i < coords.length; i++) {
  const [y1, x1] = coords[i];
  connectingLinePoint[y1][x1] = true;

  if (check()) {
    answer = 1;
    break;
  }

  for (let j = i + 1; j < coords.length; j++) {
    const [y2, x2] = coords[j];

    connectingLinePoint[y2][x2] = true;

    if (check()) {
      answer = Math.min(answer, 2);
    }

    for (let k = j + 1; k < coords.length; k++) {
      const [y3, x3] = coords[k];

      connectingLinePoint[y3][x3] = true;

      if (check()) {
        answer = Math.min(answer, 3);
      }

      connectingLinePoint[y3][x3] = false;
    }

    connectingLinePoint[y2][x2] = false;
  }

  connectingLinePoint[y1][x1] = false;
}

console.log(answer === Infinity ? -1 : answer);

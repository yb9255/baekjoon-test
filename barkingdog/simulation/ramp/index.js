const [[N, L], ...board] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input4.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/** Pseudo Code
 * 1. 통과 가능한 길인지 체크하는 checkPassable 함수를 만든다. 시그니처는 checkPassable(row)
 * 1-1. 현재 row에서 탐색중인 index인 변수 i와 현재까지 연속으로 이어지는 평지 개수를 가지고 있는 curFlatStreak 변수를 생성한다.
 * 1-2. row를 순회하면서 다음 블럭과의 차이를 구한다. 0이면 같은 높이, 1이면 오르막, -1이면 내리막이다.
 * 만약 셋 중 하나가 아니라면 연결할 수 없으므로 false를 리턴한다.
 * 1-3. FLAT하면 이어지는 평지 개수를 늘리고 인덱스를 늘린다.
 * 1-4. 오르막일때 이전에 이어지는 평지 개수가 L보다 작으면 경사로를 놓을 수 없으므로 false 리턴
 * 1-5. 오르막일때 이전에 이어지는 평지 개수가 L보다 같거나 크면 경사로를 놓고 올릴 수 있으므로
 * 경사로를 올린 것으로 간주하고 다음 인덱스로 넘어간다. 다음 인덱스는 경사로가 있는 곳이 아닌
 * 평지이므로 연속된 평지 개수를 1로 초기화한다.
 * 1-6. 내리막일때 L의 길이만큼 평지가 이어져 있어야만 한다. 그렇지 못하거나 L의 길이 이전에 길이 끝나면 false 리턴
 * 1-7. 내리막일때 L의 길이만큼 평지가 이어져 있다면 i를 L만큼 건너뛴다. 건너뛴 i 위치는 평지가 아니라 경사로가 있으므로
 * 연속된 평지 개수를 0으로 초기화한다.
 * 1-8 최종적으로 경사로가 잘 배치되었다면, true를 리턴한다.
 *
 * 2. row, column을 순회하면서 checkPassable 함수를 실행 후, true가 리턴되면 passableCount를 1 올린다
 * 3. passableCount를 로그한다.
 */

const checkPassable = (lane) => {
  let curFlatStreak = 1;
  let i = 0;

  while (i < N - 1) {
    const diff = lane[i + 1] - lane[i];
    if (Math.abs(diff) > 1) return false;

    const FLAT = diff === 0;
    const UPHILL = diff === 1;
    const DOWNHILL = diff === -1;

    if (FLAT) {
      curFlatStreak++;
      i++;
    } else if (UPHILL) {
      if (curFlatStreak < L) return false;
      curFlatStreak = 1;
      i++;
    } else if (DOWNHILL) {
      if (i + L >= N) return false;

      for (let j = i + 1; j < i + L; j++) {
        if (lane[j + 1] !== lane[j]) return false;
      }

      i += L;
      curFlatStreak = 0;
    }
  }

  return true;
};

let passableCount = 0;

for (let y = 0; y < N; y++) {
  if (checkPassable(board[y])) passableCount++;
}

for (let y = 0; y < N; y++) {
  const column = [];

  for (let x = 0; x < N; x++) {
    column.push(board[x][y]);
  }

  if (checkPassable(column)) passableCount++;
}

console.log(passableCount);

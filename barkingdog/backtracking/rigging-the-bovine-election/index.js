const board = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * Pseudo Code (Barkingdog, BFS)
 * 1. 25개의 좌표 (y, x) 중 7개를 선택하는 조합을 모두 구함
 *    - Y가 4개 이상이면 조합 목록에 넣지 않음
 * 2. 각 조합에 대해:
 *    - 선택된 좌표를 isSelected[y][x]로 표시
 *    - BFS로 7개가 연결돼 있는지 확인
 *    - 연결돼 있고 'S'가 4개 이상이면 정답 증가
 */

const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];

const getAllCombinations = (coordinateList, combLength) => {
  const combinations = [];

  const generateCombination = (startIndex, selectedCoords, doyeonCount) => {
    if (doyeonCount >= 4) {
      return;
    }

    if (selectedCoords.length === combLength) {
      combinations.push(selectedCoords.slice());
      return;
    }

    for (let i = startIndex; i < coordinateList.length; i++) {
      selectedCoords.push(coordinateList[i]);

      const nextDoyeonCount =
        board[coordinateList[i][0]][coordinateList[i][1]] === 'Y'
          ? doyeonCount + 1
          : doyeonCount;

      generateCombination(i + 1, selectedCoords, nextDoyeonCount);
      selectedCoords.pop();
    }
  };

  generateCombination(0, [], 0);

  return combinations;
};

const isValidGroup = (selectedCoords) => {
  const isSelected = Array.from({ length: 5 }, () => Array(5).fill(false));
  const visited = Array.from({ length: 5 }, () => Array(5).fill(false));

  for (const [y, x] of selectedCoords) isSelected[y][x] = true;

  const [startY, startX] = selectedCoords[0];
  const queue = [[startY, startX]];
  visited[startY][startX] = true;

  let connectedCount = 1;

  while (queue.length > 0) {
    const [y, x] = queue.shift();

    for (let dir = 0; dir < 4; dir++) {
      const ny = y + dy[dir];
      const nx = x + dx[dir];

      if (ny < 0 || nx < 0 || ny >= 5 || nx >= 5) continue;
      if (visited[ny][nx]) continue;
      if (!isSelected[ny][nx]) continue;

      visited[ny][nx] = true;
      queue.push([ny, nx]);
      connectedCount++;
    }
  }

  return connectedCount >= 7;
};

const coordinateList = [];

for (let y = 0; y < 5; y++) {
  for (let x = 0; x < 5; x++) {
    coordinateList.push([y, x]);
  }
}

const allCombinations = getAllCombinations(coordinateList, 7);

let answer = 0;

for (const combination of allCombinations) {
  if (isValidGroup(combination)) answer++;
}

console.log(answer);

const [[N], ...paper] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. 함수의 정의
 *   - 종이는 한번 쪼개질 때마다 9등분으로 쪼개진다.
 *   - func(시작X, 끝X, 시작Y, 끝 Y)
 * 2. base condition
 *   - 값이 모두 같으면 탈출.
 * 3. 재귀식
 *   - 현재 종이 전체를 순회한 다음, 값이 모두 같으면 종이에 써있는 숫자의 count를 올리고
 *   - 그렇지 않다면 종이를 9등분해서 재귀한다.
 */

const countMap = {
  '-1': 0,
  0: 0,
  1: 0,
};

const countPaper = (startWidth, endWidth, startHeight, endHeight) => {
  const curNum = paper[startHeight][startWidth];
  const third = (endWidth - startWidth) / 3;

  let isAllSame = true;

  for (let y = startHeight; y < endHeight; y++) {
    for (let x = startWidth; x < endWidth; x++) {
      if (curNum !== paper[y][x]) {
        isAllSame = false;
        break;
      }
    }
  }

  if (isAllSame) {
    countMap[curNum]++;
    return;
  } else {
    countPaper(
      startWidth,
      endWidth - third * 2,
      startHeight,
      endHeight - third * 2
    );

    countPaper(
      startWidth + third,
      endWidth - third,
      startHeight,
      endHeight - third * 2
    );

    countPaper(
      startWidth + third * 2,
      endWidth,
      startHeight,
      endHeight - third * 2
    );

    countPaper(
      startWidth,
      endWidth - third * 2,
      startHeight + third,
      endHeight - third
    );

    countPaper(
      startWidth + third,
      endWidth - third,
      startHeight + third,
      endHeight - third
    );

    countPaper(
      startWidth + third * 2,
      endWidth,
      startHeight + third,
      endHeight - third
    );

    countPaper(
      startWidth,
      endWidth - third * 2,
      startHeight + third * 2,
      endHeight
    );

    countPaper(
      startWidth + third,
      endWidth - third,
      startHeight + third * 2,
      endHeight
    );

    countPaper(
      startWidth + third * 2,
      endWidth,
      startHeight + third * 2,
      endHeight
    );
  }
};

countPaper(0, N, 0, N);

console.log(countMap[-1]);
console.log(countMap[0]);
console.log(countMap[1]);

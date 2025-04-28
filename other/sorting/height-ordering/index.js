const [N, ...studentHeightsList] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * O(n log n) 풀이
 *
 * 1. 빈 배열 sortedQueue를 생성한다.
 * 2. 첫번째 studentHeights 순회 시, 가장 처음 값은 해당 배열에 우선 값을 넣는다.
 * 3. 이 후 studentHeights 가장 마지막 값보다 큰 경우, 값을 그냥 맨 마지막에 배치한다.
 * 4. studentHeights 값이 중간에 있는 경우, binarySearch로 포지션을 찾아서 배치한 다음
 * 값들을 한칸씩 미룬 다음 이동 횟수를 늘린다.
 * 5. 최종적으로 계산된 이동 횟수를 정답에 포함한다.
 */

const answer = [];

const binarySearch = (target, arr) => {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] >= target) right = mid;
    else left = mid + 1;
  }

  return right;
};

for (let i = 0; i < N; i++) {
  const sortedArray = [];
  const [num, ...studentHeights] = studentHeightsList[i];
  let count = 0;

  for (let j = 0; j < 20; j++) {
    const curHeight = studentHeights[j];

    if (
      !sortedArray.length ||
      sortedArray[sortedArray.length - 1] < curHeight
    ) {
      sortedArray.push(curHeight);
    } else {
      const curPosition = binarySearch(curHeight, sortedArray);

      for (let k = sortedArray.length; k > curPosition; k--) {
        sortedArray[k] = sortedArray[k - 1];
        count++;
      }

      sortedArray[curPosition] = curHeight;
    }
  }

  answer.push(`${num} ${count}`);
}

console.log(answer.join('\n'));

/* Pseudo Code O(N^2)
 * i번 학생: 처음~i-1번 학생들 중 본인보다 키가 큰애들을 밀어냄
 * 단순히 초기상태에서 본인 앞에 본인보다 키큰애가 몇명인지 세는 문제.
 * O(N^2)이지만 max(N)=20이라 충분히 가능.
 */

const answer2 = [];

studentHeightsList.forEach((list) => {
  const [num, ...students] = list;

  const count = students.reduce((acc, cur, i, self) => {
    let count = 0;

    for (let j = 0; j < i; j++) {
      if (self[j] > cur) count++;
    }

    acc = acc + count;
    return acc;
  }, 0);

  answer2.push(`${num} ${count}`);
});

console.log(answer2.join('\n'));

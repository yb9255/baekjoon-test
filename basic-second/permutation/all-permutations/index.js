const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo Code
 * 1. 가장 첫번째 순열을 dp에 담는다.
 * 2. 다음 순열을 구하는 코드(next-permutation 참조)를 실행한 다음 배열에 넣는다.
 * 3. 이 과정을 끝까지 반복 후, 다음 순열이 없을 경우 반복을 종료한다.
 */

const findPivot = (permutation) => {
  let pivot = N - 2;

  while (pivot >= 0 && permutation[pivot] > permutation[pivot + 1]) {
    pivot--;
  }

  return pivot;
};

const getNextPermutation = (permutationStr) => {
  const permutationArr = permutationStr.split(' ');
  const pivotIndex = findPivot(permutationArr);

  if (pivotIndex === -1) return null;

  let successorIndex = N - 1;

  while (
    successorIndex > pivotIndex &&
    permutationArr[successorIndex] < permutationArr[pivotIndex]
  ) {
    successorIndex--;
  }

  [permutationArr[pivotIndex], permutationArr[successorIndex]] = [
    permutationArr[successorIndex],
    permutationArr[pivotIndex],
  ];

  const reverse = (start, end) => {
    while (start < end) {
      [permutationArr[start], permutationArr[end]] = [
        permutationArr[end],
        permutationArr[start],
      ];

      start++;
      end--;
    }
  };

  reverse(pivotIndex + 1, N - 1);

  return permutationArr;
};

const answer = [];
const firstAnswer = [];

for (let i = 1; i <= N; i++) {
  firstAnswer.push(i);
}

answer.push(firstAnswer.join(' '));

while (true) {
  const prevPermutationStr = answer[answer.length - 1];
  const nextPermutation = getNextPermutation(prevPermutationStr);

  if (!nextPermutation) break;

  answer.push(nextPermutation.join(' '));
}

console.log(answer.join('\n'));

const input = require('fs').readFileSync('input.txt').toString().split('\n');
const iter = +input.shift();
const sequence = input[0].split(' ').map(Number);

/** 점화식
 * 1. 가장 긴 증가하는 부분수열은 binary search로 오름차순으로 lds를 넣을 수 있었음.
 * 2. 가장 긴 감소하는 부분수열의 경우 내림차순이기 때문에 그대로 활용할 수는 없으나
 * 3. 모든 값을 음수로 전환한 다음, lds의 가장 끝 값보다 값이 크면 push하는 형태로
 * 오름차순을 강제 구현할 수 있음.
 */

const negativeSequence = sequence.map((num) => -num);
const lds = [negativeSequence[0]];

const binarySearch = (target) => {
  let left = 0;
  let right = lds.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (lds[mid] >= target) right = mid;
    else left = mid + 1;
  }

  return right;
};

for (let i = 1; i < iter; i++) {
  if (negativeSequence[i] > lds[lds.length - 1]) {
    lds.push(negativeSequence[i]);
  } else {
    const position = binarySearch(negativeSequence[i]);
    lds[position] = negativeSequence[i];
  }
}

console.log(lds.length);

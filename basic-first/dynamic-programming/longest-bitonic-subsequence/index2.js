const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n');

const n = +input[0];
const sequence = input[1].split(' ').map(Number);

/**
 * O(n log n) 점화식
 * Binary Search로 값을 정렬할때마다, 정렬한 값이 들어간 dp의 최대길이를 계속 보관한다.
 * e.g) forwardDp[i]의 값을 업데이트 할 때, lisLen[i]에는 sequence[i] 시점에서
 * 제일 긴 부분수열 길이를 보관한다.
 *
 * 풀이 결과 시간이 드라마틱하게 단축되지는 않았음.
 */

const forwardDp = [];
const lisLen = Array(n).fill(0);
const backwardDp = [];
const ldsLen = Array(n).fill(0);

const binarySearch = (target, dp) => {
  let left = 0;
  let right = dp.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (dp[mid] >= target) right = mid;
    else left = mid + 1;
  }

  return right;
};

for (let i = 0; i < n; i++) {
  const num = sequence[i];

  if (!forwardDp.length || forwardDp[forwardDp.length - 1] < num) {
    forwardDp.push(num);
    lisLen[i] = forwardDp.length;
  } else {
    const replaceIndex = binarySearch(num, forwardDp);
    forwardDp[replaceIndex] = num;
    lisLen[i] = replaceIndex + 1;
  }
}

for (let i = n - 1; i >= 0; i--) {
  const num = sequence[i];

  if (!backwardDp.length || backwardDp[backwardDp.length - 1] < num) {
    backwardDp.push(num);
    ldsLen[i] = backwardDp.length;
  } else {
    const replaceIndex = binarySearch(num, backwardDp);
    backwardDp[replaceIndex] = num;
    ldsLen[i] = replaceIndex + 1;
  }
}

let result = -Infinity;

for (let i = 0; i < n; i++) {
  result = Math.max(result, lisLen[i] + ldsLen[i] - 1);
}

console.log(result);

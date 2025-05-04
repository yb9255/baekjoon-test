const [[N], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 *
 * Prev Permutation
 *
 * 1. 순열은 사전순으로 정렬하면 기본적으로 오름차순 -> 내림차순으로 변경됨
 * 2. 이전 순열을 찾으려면 "현재 순열보다 작으면서 최대인 값을 구해야함."
 *
 * 3. 순열이 가장 작아지지 않으면서 감소하려면, 가장 뒤에서부터 가능한 최소한만 변경해야 함
 * → 가장 뒤쪽에서 작은 변화를 주는 것이 가장 가까운 순열을 만든다.
 *
 * 4. 끝에서 처음으로 순회를 돌 때 내림차순이 유지되면, 정방향 인덱스 시점으로 보면 그 인덱스까지는
 * 오름차순이 유지되고 있다는 의미이다.
 * e.g.) [1, 2, 4, 3, 5, 6]에서 3까지 순회했을 때 정방향 시점으로 보면 3,5,6이며,
 * 이는 오름차순이기 때문에 가장 작은 값을 유지하고 있다는 의미
 *
 * 5. 4에 의거하여, 끝에서 처음으로 순회를 돌 때 내림차순이 유지되면 계속 가장 작은 값을 유지하고 있다는 뜻이기
 * 때문에 숫자 순서를 바꿔서 무언가 할 필요가 없다.
 *
 * 6. 5에 의거하여, 끝에서 처음으로 순회를 돌다가 "내림차순이 깨지면" 가장 작은 값이 유지가 되지 않는 다는 의미이다.
 * 그래서 내림차순이 깨진 index를 pivot으로 지정한다.
 *
 * 7. pivot을 찾았다면, pivot 이후의 값들 중에 pivot보다 작은 값 중 가장 큰 값과 pivot을 switch한다.
 *
 * 8. 이제 pivot 기점으로 가장 큰 값을 구해야 하므로, pivot 뒤의 값이 최대가 될 수 있도록 nums[pivot + 1] ~ nums[nums.length - 1]까지를
 * 오름차순으로 정리한다.
 *
 * 9. 답을 리턴한다.
 */

let i = N - 2;

while (i >= 0 && nums[i] < nums[i + 1]) {
  i--;
}

if (i >= 0) {
  let j = N - 1;

  while (j > i && nums[i] < nums[j]) {
    j--;
  }

  [nums[i], nums[j]] = [nums[j], nums[i]];

  const reverse = (start, end) => {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  };

  reverse(i + 1, N - 1);

  console.log(nums.join(' '));
} else {
  console.log(-1);
}

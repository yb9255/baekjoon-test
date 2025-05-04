const [[N], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/**
 * Next Permutation
 *
 * Pseudo Code
 *
 * 1. 사전순 순열은 완전 오름차순에서 시작해 완전 내림차순으로 끝난다.
 *    [1,2,3] → ... → [3,2,1]
 *    각 순열은 사전순 기준으로 정렬된 순열이기 때문에,
 *    특정 순열보다 "바로 다음 순열"은 반드시 현재 순열보다 크면서 가장 가까운 순열이어야 한다.
 *
 * 2. 이 문제의 핵심은 현재 순열에서 사전순으로 다음에 오는 순열을 구하는 것이며,
 *    이는 "가능한 가장 작은 증가"를 만들어야 한다는 뜻이다.
 *    즉, 지금 순열보다 더 크되, 그 중 가장 작은 순열을 만들어야 한다.
 *
 * 3. 이를 위해 뒤에서부터 탐색하며 "오름차순이 깨지는 지점"을 찾아야 한다.
 *    이유는 다음과 같다:
 *      - 뒷부분이 이미 내림차순이라면, 더 이상 그 구간을 증가시킬 수 없기 때문이다.
 *      - 따라서 오름차순이 깨지는 가장 마지막 위치를 pivot으로 지정하면,
 *        그 앞은 고정하고, 뒤를 조작함으로써 사전순으로 가장 가까운 증가를 만들 수 있다.
 *
 * 4. pivot을 기준으로 그 뒤는 내림차순이므로, 거기서 pivot보다 큰 값 중 가장 작은 값을 찾는다.
 *    이 값이 successor이며, 이 둘을 swap하면 현재보다 큰 수가 되면서 가능한 가장 작은 증가를 만든다.
 *    (내림차순 중이므로, 뒤에서부터 찾으면 가장 작은 증가가 자동으로 보장된다.)
 *
 * 5. 다만 pivot과 successor를 바꾼 것만으로는 충분하지 않다.
 *    그 이후는 여전히 내림차순이므로, 가능한 가장 작은 상태로 바꾸기 위해 오름차순 정렬이 필요하다.
 *    내림차순을 오름차순으로 만드는 건 곧 reverse로 구현 가능하다.
 *
 * 6. 이 알고리즘은 결국 아래와 같은 흐름을 가진다:
 *    - 가장 오른쪽에서 가능한 최소 단위 증가(pivot swap)를 만들고,
 *    - 그 뒤를 가능한 최소 상태로 정렬함으로써,
 *    - 현재보다 크면서 사전순으로 "가장 가까운 순열"을 만든다.
 *
 * 7. 만약 pivot이 존재하지 않는다면 (완전 내림차순),
 *    이는 사전순으로 가장 마지막 순열이므로 다음 순열은 존재하지 않으며, -1을 출력한다.
 */

let i = N - 2;

while (i >= 0 && nums[i] >= nums[i + 1]) {
  i--;
}

if (i >= 0) {
  let j = nums.length - 1;

  while (j > i && nums[j] <= nums[i]) {
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

  reverse(i + 1, nums.length - 1);

  console.log(nums.join(' '));
} else {
  console.log(-1);
}

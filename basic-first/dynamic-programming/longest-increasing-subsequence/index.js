const [[N], sequence] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

/**
 * 점화식
 * 1. 길이가 n인 부분 수열보다 긴 부분 수열을 찾으려면, 마지막 n 자리에 오는 숫자가 가장
 * 작아야 더 긴 부분 수열을 만들 수 있다.
 * e.g) 1,2인 부분 수열은 1,3인 부분수열보다 한자리만큼 더 길 수 있다. 1,2의 경우 뒤에
 * 숫자 3이 올 수 있지만, 1,3은 뒤에 숫자 4부터 올 수 있기 때문
 *
 * 2. 1에 의거하여, lis[i]에 i + 1의 길이를 가진 부분 수열의 마지막 값 중 가장 작은 값만 기록하면 그
 * 길이가 부분 수열의 최대 길이가 됨
 * e.g.) lis[0] == 1의 길이를 가진 부분 수열 중 마지막 값이 가장 작은 경우
 * lis[1] == 2의 길이를 가진 부분 수열 중 마지막 값이 가장 작은 경우
 *
 * 3. 2를 구하기 위해 수열을 순회하기 시작한다.
 * 4. lis에 값이 없다면, 현재 수열의 값을 push한다.
 *
 * 5. lis의 마지막 값보다 현재 값이 더 크다면, 마지막 부분수열 길이에 현재 값을 붙일 수 있으므로
 * 현재 값을 push한다.
 *
 * 6. lis의 길이가 0보다 길고 마지막 값보다 작다면, 가장 긴 부분수열에 붙일 수 있는 값은 아니고
 * 더 작은 부분수열의 값으로 들어갈 수 있다는 의미이다. 이 때, 이미 해당 값이 특정 길이의 최소값으로
 * 지정되었을 수 있으므로 이진 탐색으로 lis 내 현재 값이 있을 위치를 찾아서 그 인덱스에 배치한다.
 *
 * 7. lis의 길이를 리턴한다.
 */

/** Pseudo Code
 * 1. sequence index를 0부터 순회한다. (sequence[i]와 같은 값을 num이라고 한다.)
 * 2. 만약 lis(Longest Increasing sequence)의 길이가 0이면, 값을 push한다.
 * 3. 만약 lis 배열의 마지막 값보다 현재 num이 더 크다면, 값을 push한다.
 *
 * 4. 2, 3에 둘 다 해당하지 않는다면, Binary Search(Divide and Conquer)를 시작한다.
 * 4-1. 현재 lis의 중간 index를 구하고, left에 0, right에 list 마지막 인덱스를 지정한다.
 * 4-2. 왼쪽 인덱스를 가르키는 left pivot이 right보다 작을 동안 while을 순회한다.
 * 4-3. while 내에서 현재 left, right의 중간 인덱스를 구한다.
 * 4-4. 중간 인덱스에 있는 값보다 현재 num의 값이 크다면, mid 아래의 값은 필요하지 않으므로
 * left pivot을 mid + 1로 옮긴다.
 * 4-5. 중간 인덱스에 있는 값보다 현재 num의 값이 작다면, mid 위의 값이 필요하지 않으므로
 * right pivot을 mid로 옮긴다. 우리는 현재 lis[mid]에 있는 값과
 * num이 동일한 케이스도 대응해야 하기 때문에, right가 mid - 1이 되면 안된다.
 * e.g.)[10, 20, 40, 10]의 경우 두번째 10을 순회할때는 lis[mid] === target이 될 수 있다.
 * 4-6. 최종적으로 right에 현재 숫자의 lis 포지션이 담기게 된다.
 */

const lis = [];

const findPosition = (target) => {
  let left = 0;
  let right = lis.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (lis[mid] >= target) right = mid;
    else left = mid + 1;
  }

  return right;
};

for (let i = 0; i <= N; i++) {
  const num = sequence[i];

  if (lis.length === 0 || lis[lis.length - 1] < num) {
    lis.push(num);
  } else {
    const position = findPosition(num);
    lis[position] = num;
  }
}

console.log(lis.length);

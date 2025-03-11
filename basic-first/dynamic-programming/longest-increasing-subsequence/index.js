const input = require('fs').readFileSync('input.txt').toString().split('\n');

const subsequenceLength = +input[0];
const subsequence = input[1].split(' ').map(Number);

// 0. 부분수열은 기본적으로 수열의 순서를 따라가야 하지만
// 값을 덮어쓰는 경우는 순서를 따라가지 않을 수 있음
// e.g.) 현재 수열이 3, 5, 7인데 2를 만나면, 2, 5, 7로 최소값을 덮어씌우는게 가능.

// 1. subsequence index를 0부터 순회한다. (subsequence[i]와 같은 값을 num이라고 한다.)
// 2. 만약 lis(Longest Increasing Subsequence)의 길이가 0이면, 값을 push한다.
// 3. 만약 lis 배열의 마지막 값보다 현재 num이 더 크다면, 값을 push한다.

// 4. 2, 3에 둘 다 해당하지 않는다면, Binary Search(Divide and Conquer)를 시작한다.
// 4-1. 현재 lis의 중간 index를 구하고, left에 0, right에 list 마지막 인덱스를 지정한다.
// 4-2. 왼쪽 인덱스를 가르키는 left pivot이 right보다 작을 동안 while을 순회한다.
// 4-3. while 내에서 현재 left, right의 중간 인덱스를 구한다.

// 4-4. 중간 인덱스에 있는 값보다 현재 num의 값이 크다면, mid 아래의 값은 필요하지 않으므로
// left pivot을 mid + 1로 옮긴다.

// 4-5. 중간 인덱스에 있는 값보다 현재 num의 값이 작다면, mid 위의 값이 필요하지 않으므로
// right pivot을 mid로 옮긴다. 우리는 현재 lis[mid]에 있는 값과
// num이 동일한 케이스도 대응해야 하기 때문에, right가 mid - 1이 되면 안된다.
// e.g.)[10, 20, 40, 10]의 경우 두번째 10을 순회할때는 lis[mid] === target이 될 수 있다.

// 4-6. 최종적으로 right에 현재 숫자의 lis 포지션이 담기게 된다.

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

for (let i = 0; i <= subsequenceLength; i++) {
  const num = subsequence[i];

  if (lis.length === 0 || lis[lis.length - 1] < num) {
    lis.push(num);
  } else {
    const position = findPosition(num);
    lis[position] = num;
  }
}

console.log(lis.length);

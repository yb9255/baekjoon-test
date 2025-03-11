const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n');

const subsequenceLength = +input[0];
const subsequence = input[1].split(' ').map(Number);

// 0. 부분수열은 기본적으로 수열의 순서를 따라가야 하지만
// 값을 덮어쓰는 경우는 순서를 따라가지 않을 수 있음
// e.g.) 현재 수열이 3, 5, 7인데 2를 만나면, 2, 5, 7로 최소값을 덮어씌우는게 가능.

// 1. lis의 길이를 구하는 용도로 binarySearch 함수를 구현
// 2. lis의 위치를 추적하지 않고 길이를 담는 배열 lis 생성
// 3. lis의 원본 인덱스를 저장하는 배열 lisIndices 생성

// 4. 만약 sequence의 i 인덱스에 있는 num이 부분수열에 포함된다면, 그 num의
// 앞 포지션에 위치한 부분수열 숫자의 index를 기록하는 parent 배열 생성
// e.g.) sequence가 [3, 5, 7]이라고 한다면
// parent는 [-1, 0, 1]이 됨. sequence[0]의 값은 부분 수열에서 앞에 값이 없어서 parent[0] === -1
// sequence[1]은 부분수열 내에서 3 뒤인데 3의 sequence내 index가 0이므로 parent[1] === 0
// sequence[2]는 부분수열 내에서 5 뒤인데 5의 sequence내 index가 1이므로 parent[2] === 1

// 5. lis의 길이를 구함. 구체적인 구하는 로직은 longest-increasing-subsequence 참조
// 이 때, lisIndices는 현재 index를 넣는다.
// 또한, parent은 이전 index가 없다면 -1 lis의 가장 끝값보다 크다면 lisIndices의 마지막 값,
// 중간 인덱스에 lis 값이 배치되면 중간 index의 바로 이전 index를 parent에 배치한다.

// 6. lisIndices의 마지막 값이 부분 수열 마지막 값의 subsequence 내 index임. 그 값을 우선 answer에 push
// 7. parent에서 lisIndices의 이전 부분 수열 숫자의 index를 찾음. 이 index로 이전 수열 값을 구해서 answer에 push
// 8. 최종적으로 answer에는 부분 수열이 역순으로 숫자가 들어감. 이 값을 리턴

const lis = [];
const lisIndices = [];
const parent = Array.from({ length: subsequenceLength }, () => -1);

const binarySearch = (targetNum) => {
  let left = 0;
  let right = lis.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (lis[mid] >= targetNum) right = mid;
    else left = mid + 1;
  }

  return right;
};

for (let i = 0; i < subsequenceLength; i++) {
  const num = subsequence[i];

  if (!lis.length) {
    parent[i] = -1;
    lis.push(num);
    lisIndices.push(i);
  } else if (lis[lis.length - 1] < num) {
    parent[i] = lisIndices[lis.length - 1];
    lis.push(num);
    lisIndices.push(i);
  } else {
    const replaceIndex = binarySearch(num);
    lis[replaceIndex] = num;
    lisIndices[replaceIndex] = i;
    parent[i] = replaceIndex > 0 ? lisIndices[replaceIndex - 1] : -1;
  }
}

let lastIndex = lisIndices[lisIndices.length - 1];
const answer = [];

while (lastIndex !== -1) {
  answer.push(subsequence[lastIndex]);
  lastIndex = parent[lastIndex];
}

console.log(lis.length + '\n' + answer.reverse().join(' '));

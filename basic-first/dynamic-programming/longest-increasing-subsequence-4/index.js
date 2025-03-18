const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n');

const sequenceLength = +input[0];
const sequence = input[1].split(' ').map(Number);

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
 * 3. 다만 2만 구하면 부분 수열의 실제 순서와 일치하지 않을 수 있으므로, lis를 구하면서
 * 그 lis에 들어가는 값 앞에 위치한 값의 index와 lis에 들어가는 값 index를 구해 실제 인덱스를 추적한다.
 *
 * 4. 수열을 순회하기 시작한다.
 *
 * 5. lis에 값이 없다면, 현재 수열의 값을 push한다. 이 때, 현재 값의 index를 가지는 배열 lisIndices에
 * 현재 수열의 index를 push, 현재 값보다 바로 앞의 값의 index를 구하는 parentIndices에는 -1을 push한다.
 *
 * 5. lis의 마지막 값보다 현재 값이 더 크다면, 마지막 부분수열 길이에 현재 값을 붙일 수 있으므로
 * 현재 값을 push하며, parentIndices에는 listIndices의 마지막 값을 push,
 * 현재 값의 index를 listIndices에 push한다.
 *
 * 6. lis의 길이가 0보다 길고 마지막 값보다 작다면, 가장 긴 부분수열에 붙일 수 있는 값은 아니고
 * 더 작은 부분수열의 값으로 들어갈 수 있다는 의미이다. 이 때, 이미 해당 값이 특정 길이의 최소값으로
 * 지정되었을 수 있으므로 이진 탐색으로 lis 내 현재 값이 있을 위치를 찾아서 그 인덱스에 배치한다.
 * 이 후 listIndices에도 이진 탐색으로 찾은 위치에 현재 index를 보관, parentIndices는 이진 탐색으로 찾은
 * 위치보다 한칸 앞 listIndices에 있는 index를 push한다.
 *
 * 7. lis의 길이를 리턴한다.
 * 8. lisIndices의 제일 마지막 인덱스의 값을 answer 배열에 푸시한다.
 * 9. parentIndices 제일 마지막 인덱스에 있는 값을 추적하고, 그 값을 index로 가진 lisIndices 값을 추적한다.
 * 10. 최종적으로 parentIndices의 값이 -1이 될때까지 백트래킹하고 그 결과를 answer에 담은 뒤, reverse해서 리턴한다.
 */

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

for (let i = 0; i < sequenceLength; i++) {
  const num = sequence[i];

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
  answer.push(sequence[lastIndex]);
  lastIndex = parent[lastIndex];
}

console.log(lis.length + '\n' + answer.reverse().join(' '));

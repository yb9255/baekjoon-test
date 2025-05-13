const [iter, k] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

const queue = Array.from({ length: iter }, (_, index) => index + 1);
const answer = [];

let count = 1;

while (queue.length) {
  const shiftItem = queue.shift();

  if (count % k === 0) {
    answer.push(shiftItem);
    count = 1;
  } else {
    queue.push(shiftItem);
    count++;
  }
}

console.log(`<${answer.join(', ')}>`);

// 1. index에서 jump만큼 이동한 다음 그 자리의 숫자를 splice해서 answer에 push
// 이때 index는 0부터 시작하므로 실제로는 jump - 1 만큼 이동해야 함.

// 2. 값이 하나 사라졌기 때문에, 현재 인덱스에는 다음 숫자가 자동으로 있음.
// 예를 들면 3을 지웠다면 3이 사라진 자리에 4가 들어오게 되고, 현재 index는 4를 가르키게 됨.

// 3. 사라진 숫자 기준으로 jump만큼 이동해야 하기 때문에, 다음 이동도 jump - 1 만큼 반복됨.
// 예를 들어 jump가 3이어서 3을 지웠다면 다음 숫자는 6이 되어야 하는데,
// 현재 3이 있던 index 자리에는 4가 있으므로 2만큼만 이동.

// 4. index를 업데이트할 때 항상 queue.length를 remainder로 설정해서
// index가 queue.length를 넘었을 때 queue의 길이 값을 뺀 값을 가지도록 함.

// 5. 이 과정은 queue.length === 0이 될 때까지 반복

const queue2 = Array.from({ length: iter }, (_, index) => index + 1);
const answer2 = [];
let index = 0;

while (queue2.length) {
  index = (index + k - 1) % queue2.length;
  answer2.push(queue2.splice(index, 1)[0]);
}

console.log(`<${answer2.join(', ')}>`);

/**  원형 배열 풀이(링크드 리스트 풀이)
 * 1. 링크드 리스트를 바로 구현하기는 어려우므로 배열 두개로 만드는 링크드 리스트
 * 2. 공간복잡도가 크므로 공간복잡도가 중요하면 사용하지 않는다.
 *
 * 3. prev = [], cur = [] 두개를 만들고,
 *    prev[1] === N
 *    prev[i] (0 < i <= n) === i - 1
 *    next[n] === 1;
 *    next[i] (0 < i <= n) === i + 1
 *    형태로 링크드 리스트를 구현한다.
 *
 * 4. 이렇게하면 prev[n]에는 n의 이전값, next[n]에는 n의 이후값이 들어간다.
 * 5. prev, next의 len을 기록한 다음, len이 끝날떄가지 순회하는 while문을 돌기 시작한다.
 * 6. order가 k와 일치하지 않으면 order를 눌려준 다음 현재 값을 다음으로 넘긴다. (next[cur]);
 * 7. order가 k와 일치하면, 링크드 리스트의 연결고리를 끊어야 한다. 다음 숫자의 prev를 현재 숫자의 prev로 바꾸고
 * 다음 숫자의 next를 현재 숫자의 next로 바꿔 연결고리를 지운다. 이 후 order를 다시
 */

const prev = [];
const next = [];
const answer3 = [];

for (let i = 1; i <= iter; i++) {
  prev[i] = i === 1 ? iter : i - 1;
  next[i] = i === iter ? 1 : i + 1;
}

let order = 1;
let cur = 1;
let len = iter;

while (len) {
  if (order === k) {
    prev[next[cur]] = prev[cur];
    next[prev[cur]] = next[cur];
    answer3.push(cur);
    order = 1;
    len--;

    cur = next[cur];
  } else {
    order++;
    cur = next[cur];
  }
}

// 출력
console.log('<' + answer3.join(', ') + '>');

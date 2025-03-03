const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map(Number);

// 1. input내 최대 숫자 길이만큼 소수 map을 만든다.
// 2. 해당 map을 순회하면서 소수인지 아닌지를 체크한다. (체크 로직은  get-all-prime-numbers 참조)
// 3. input을 순회한다.
// 4. 현재 숫자 내에 소수로만 이루어진 map을 생성한다. 이 때 기본값은 false로 가진다
// 5. 현재 숫자만큼 i가 커지는 for문을 순회한다.
// 6. for문을 순회하다가 소수를 만날 경우, 파티션 개수를 1 올리고 소수와 현재 소수에 대응되는 다른 소수 모두 true로 변환한다.
// 7. 소수를 만났는데 true일 경우, 파티션 개수를 올리지 않고 건너뛴다.

const iter = input.shift();
const maxNum = Math.max(...input);
const primeNumMap = Array.from({ length: maxNum + 1 }, () => true);
primeNumMap[0] = primeNumMap[1] = false;

for (let i = 2; i < primeNumMap.length; i++) {
  if (!primeNumMap[i]) continue;

  for (let j = i * i; j <= maxNum; j += i) {
    primeNumMap[j] = false;
  }
}

const answer = [];

for (let i = 0; i < iter; i++) {
  let count = 0;
  const curNum = input[i];
  const checkedPartitionMap = {};

  for (let j = 2; j < curNum; j++) {
    if (!primeNumMap[j]) continue;
    if (checkedPartitionMap[j]) continue;

    const diff = curNum - j;

    if (primeNumMap[diff]) {
      checkedPartitionMap[diff] = j;
      count++;
    }
  }

  answer.push(count);
}

console.log(answer.join('\n'));

// 개선된 풀이
// 1. 소수 map을 구함
// 2. input을 순회함

// 3. 현재 숫자를 for문으로 2부터 돌림, 이 때 하나의 소수와 그 짝 소수를 구하면
// 0 ~ 현재 숫자의 중간을 나누면 왼쪽 소수와 오른쪽 소수를 구하게 되므로
// 현재 숫자의 절반만 순회하면 됨.

// 4. 현재 index와 현재 숫자 - index 값이 소수 map에 있다면 count를 올림.

const answer2 = [];

for (let i = 0; i < iter; i++) {
  const curNum = input[i];
  let count = 0;

  for (let j = 2; j <= curNum / 2; j++) {
    if (primeNumMap[j] && primeNumMap[curNum - j]) {
      count++;
    }
  }

  answer2.push(count);
}

console.log(answer2.join('\n'));

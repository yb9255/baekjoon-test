const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

// 1. input내 가장 큰 숫자 maxNum을 구한다.
// 2. 가장 큰 숫자까지 모두 true로 설정한 primeNumberMap 배열을 생성한다.

// 3. primeNumberMap은 소수인 index는 true, 아닌 index는 false이므로
// 0, 1 index를 false로 바꾼다.

// 4. 2부터 maxNum의 제곱근까지 순회하면서 소수를 발견하면, 소수의 배수인 경우
// primeNumberMap의 index를 true로 바꾼다.

// 5. input을 순회한다.
// 6. input이 4 미만인 경우 건너뛴다.

// 7. 3부터 시작해서 홀수만 순회 후 현재 숫자까지 돌고 끝나는 for문 (3, 5, 7..)
// 을 시작한다.

// 8. for문 내 현재 i가 primeNumberMap[i] === true인 경우,
// 현재 숫자와 i의 차이를 구한다. (diff)

// 9. primeNumberMap[diff] === true인 경우, 두 숫자를
// 정답 문자열 템플릿으로 변환해서 answer에 담는다.

const answer = [];

const maxNum = input.reduce((curMax, curNum) => {
  curMax = Math.max(curMax, curNum);
  return curMax;
}, -Infinity);

const primeNumberMap = Array.from({ length: maxNum + 1 }, () => true);
primeNumberMap[0] = primeNumberMap[1] = false;

const getIsPrime = (number) => {
  let result = true;
  const squareRoot = Math.sqrt(number);

  for (let i = 2; i <= squareRoot; i++) {
    if (number % i === 0) {
      result = false;
      break;
    }
  }

  return result;
};

for (let i = 2; i <= Math.sqrt(maxNum); i++) {
  const isPrime = getIsPrime(i);

  if (isPrime) {
    for (let j = i * i; j <= maxNum; j += i) {
      primeNumberMap[j] = false;
    }
  }
}

for (let i = 0; i < input.length; i++) {
  const number = input[i];
  if (input[i] < 4) continue;

  for (let j = 3; j < number; j += 2) {
    if (primeNumberMap[j]) {
      const diff = number - j;

      if (primeNumberMap[diff]) {
        answer.push(`${number} = ${j} + ${diff}`);
        break;
      }
    }
  }
}

console.log(answer.join('\n'));

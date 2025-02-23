const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(Number);

// Sieve of Eratosthenes
// 소수를 찾았을 때, 해당 소수의 배수를 전부 제거한다.

// 1. 끝 숫자만큼의 false를 가지는 array를 만든다.(boolean array)
// 2. 0, 1 array를 false로 바꾼다.
// 3. boolean array의 index 2부터 순회를 시작한다.
// 4. 현재 index가 소수라면, 현재 index의 제곱까지 순회하면서 전부 false로 바꾼다 (소수가 아니므로)
// 5. start부터 end까지 index를 순회하는 배열을 만든다.
// 6. boolean array에서 true라고 되어 있으면 정답 array에 index를 push한다.

const [start, end] = input;

const primeNumberMap = Array.from({ length: end + 1 }, () => true);
const answer = [];

primeNumberMap[0] = primeNumberMap[1] = false;

const checkIsPrimeNumber = (number) => {
  if (number <= 1) return false;

  const squareRoot = Math.sqrt(number);
  let result = true;

  for (let i = 2; i <= squareRoot; i++) {
    if (number % i === 0) {
      result = false;
      break;
    }
  }

  return result;
};

for (let i = 2; i < primeNumberMap.length; i++) {
  const isPrimeNumber = checkIsPrimeNumber(i);

  if (isPrimeNumber) {
    for (let j = i * i; j <= end; j += i) {
      primeNumberMap[j] = false;
    }
  }
}

for (let i = start; i <= end; i++) {
  if (primeNumberMap[i]) {
    answer.push(i);
  }
}

console.log(answer.join('\n'));

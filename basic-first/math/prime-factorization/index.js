const input = Number(
  require('fs').readFileSync('input5.txt').toString().trim(),
);

let num = input;
const primeNumberMap = Array.from({ length: num + 1 }, () => true);
primeNumberMap[0] = primeNumberMap[1] = false;

for (let i = 2; i <= num; i++) {
  if (!primeNumberMap[i]) continue;

  for (let j = i * i; j <= num; j += i) {
    primeNumberMap[j] = false;
  }
}

// 소인수분해 방법
// 1. 우선 현재 숫자보다 작은 소수들을 구한다.
// 2. 2부터 작은 소수 순서대로 나누고 나눠지면 해당 소수를 answer에 push한다.
// 3. 나눠지지 않으면 다음으로 작은 소수로 나눈다.
// 4. 이를 끝까지 반복한다.

const primeNumberArray = primeNumberMap
  .map((bool, index) => {
    if (bool) {
      return index;
    }

    return -1;
  })
  .filter((num) => num !== -1);

let curPrimeNumberIndex = 0;
const answer = [];

while (num > 0 && curPrimeNumberIndex < primeNumberArray.length) {
  if (num % primeNumberArray[curPrimeNumberIndex] === 0) {
    answer.push(primeNumberArray[curPrimeNumberIndex]);
    num = num / primeNumberArray[curPrimeNumberIndex];
  } else {
    curPrimeNumberIndex++;
  }
}

console.log(answer.join('\n'));

// 위의 풀이는 시간이 너무 오래 걸림. 시간 단축 풀이법
// 1. 숫자 전체를 순회할 필요 없음. 값을 구할 필요도 없음

// 2. for문을 돌면서, 나머지가 없이 나눠지는 수일 경우 while 혹은 재귀로 최대한
// 나눌 수 있는 만큼 나눔

// 3. 예를 들어 i == 2일때 4번 나눠줬으면, 2, 4, 6, 8에서 2의 케이스를 전부 구함.
// 그렇기 때문에 소수를 미리 구할 필요가 없음.

// 4. 소인수분해 이후 남은 숫자가 1 초과인 소수일때는 정답에 추가 push

// while 풀이
let num2 = input;
const result = [];

for (let i = 2; i <= Math.sqrt(num2); i++) {
  while (num2 % i === 0) {
    result.push(i);
    num2 /= i;
  }
}

if (num2 > 1) {
  result.push(num2);
}

console.log(result.join('\n'));

// 재귀함수 풀이
let num3 = input;
const result2 = [];

const getPrimeFactorization = (num) => {
  if (num === 1) return;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      result2.push(i);
      getPrimeFactorization(num / i);
      return;
    }
  }

  result2.push(num);
};

getPrimeFactorization(num3);
console.log(result2.join('\n'));

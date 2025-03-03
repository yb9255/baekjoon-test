const octal = require('fs').readFileSync('input.txt').toString().trim();

// 1. 0 ~ 7까지 쓰는게 8진법이므로, 0~7에 해당하는 2진법 값을 가진 map을 구성.
// 2진법 <-> 8진법 전환 관련으로는 binary-to-octal-number 참고

// 2. 맨 앞의 숫자는 필요하지 않은 더미 0을 가질 필요가 없으므로, dummy 0을 제거하는
// 로직을 i === 0 일 때 추가

// 3. 주어진 숫자가 0일때는 dummy 0을 제거하는 로직이 빈 문자열을 리턴해버리기 때문에
// 그냥 0을 정답에 추가하도록 로직 추가

// 4. 이후 숫자는 map을 통해서 2진법으로 변환 후 result에 push

const map = ['000', '001', '010', '011', '100', '101', '110', '111'];
const result = [];

for (let i = 0; i < octal.length; i++) {
  const curNum = Number(octal[i]);
  const curBinary = map[curNum];

  if (i === 0) {
    let firstOneIndex = -1;

    for (let j = 0; j < curBinary.length; j++) {
      if (curBinary[j] === '1') {
        firstOneIndex = j;
        break;
      }
    }

    result.push(firstOneIndex === -1 ? '0' : curBinary.slice(firstOneIndex));
    continue;
  }

  result.push(curBinary);
}

console.log(result.join(''));

// map을 사용하지 않는 풀이
// 1. 8진법은 2^3을 사용하는 방법이므로,
// 2로 3번 나눈 나머지가 1보다 크면 1, 낮으면 0을 더하는 방식으로도 구할 수 있음.

const octalToBinary = (number) => {
  if (!number) return '000';

  let binary = '';
  while (number > 0) {
    binary = (number % 2) + binary;
    number = Math.floor(number / 2);
  }

  return binary.padStart(3, '0');
};

const result2 = [];

for (let i = 0; i < octal.length; i++) {
  result2.push(octalToBinary(octal[i], i));
}

console.log(result2.join('').replace(/^0+/, '') || '0');

let number = Number(require('fs').readFileSync('input.txt').toString().trim());
let result = '';

// 1. 일반적인 10진법 -> 2진법은 아래와 같은 형태
// 10 / 2 = 5...0
// 5 / 2 = 2...1
// 2 / 2 = 1...0
// 1 / 2 = 0...1 -> 몫이 0이 되었으니까 종료
// 나머지들을 아래에서 위로 붙여서 1010이 값이 됨.

// 2. -2진수의 경우 나머지가 -1인 경우가 발생함.
// -1은 2진수로 쓸 수 없으니, 절대값 1로 보정해줌.

// 3. 숫자를 나눌때 floor는 나머지 숫자를 더 작은 숫자로 내림하는 구조
// 즉, -2.5에서 floor를 적용하면 -3이 됨.
// 그렇기 때문에 음수로 나눴을 때 나머지에 해당하는 소수점을 제외한 몫을 구하려면 Math.ceil을 적용해야 함.
// 5 / -2 = -2... 나머지 -1 과 같은 형태가 되야 분모 * 몫 + 나머지 시 기존 값으로 돌아가기 때문.

if (number === 0) {
  console.log(0);
} else {
  while (number !== 0) {
    result = Math.abs(number % -2) + result;
    number = Math.ceil(number / -2);
  }

  console.log(result);
}

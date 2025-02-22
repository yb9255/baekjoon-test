const input = require('fs').readFileSync('input.txt').toString().split('\n');
const iter = Number(input.shift());

// 0. 후위 표기식 예시
// ABC*+DE/- --> A+(B*C)-(D/E);
// 뒤에 있는 숫자 둘부터 연산자를 조합하고 그 다음 남은 연산자 뒤에 있는 숫자 둘의 연산자 조합과 앞에 있는 숫자와 조합하고..반복.

// 1. 각 연산자의 동작 함수를 객체에 보관한다.
// 2. 숫자 배열을 순회하면서 각 알파벳에 해당하는 숫자를 매핑한다.
// 3. 후위 표기식을 순회한다.
// 4. 알파벳을 만났을 경우, 알파벳에 매핑되는 수를 stack에 push한다.
// 5. 수식을 만났을 경우, stack에서 두 값을 pop한 다음 수식을 적용하고 다시 push한다.
// 6. 하나 남은 값을 리턴한다.

const operatorFunction = {
  '+': ({ first, second }) => first + second,
  '-': ({ first, second }) => first - second,
  '*': ({ first, second }) => first * second,
  '/': ({ first, second }) => first / second,
};

const numberMap = {};

const postfixNotation = input.shift();
const numbers = input.map(Number);
const stack = [];

for (let i = 0; i < iter; i++) {
  const alphabets = String.fromCharCode(i + 65);
  numberMap[alphabets] = numbers[i];
}

for (let i = 0; i < postfixNotation.length; i++) {
  const char = postfixNotation[i];
  const isAlphabet = /[A-Z]/.test(char);

  if (isAlphabet) {
    stack.push(numberMap[char]);
  } else {
    const second = stack.pop();
    const first = stack.pop();

    const newResult = operatorFunction[char]({ first, second });
    stack.push(newResult);
  }
}

console.log(stack[0].toFixed(2));

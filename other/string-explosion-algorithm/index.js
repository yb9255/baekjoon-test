const input = require('fs').readFileSync('input.txt').toString().split('\n');

// 1. 문자열을 계속 stack에 넣는다.

// 2. 문자열에 값을 push할때마다, 문자열 끝부터 substring 길이만큼 문자열이
// substring 값과 일치하는지 확인한다.

// 3. substring 값과 일치하다면, stack의 끝부터 substring 길이까지
// stack을 pop한다.

const [string, substring] = input;

const stack = [];

for (let i = 0; i < string.length; i++) {
  stack.push(string[i]);

  if (stack.length < substring.length) continue;

  let match = true;

  for (let j = 0; j < substring.length; j++) {
    if (substring[j] !== stack[stack.length - substring.length + j]) {
      match = false;
      break;
    }
  }

  if (match) {
    stack.length -= substring.length;
  }
}

console.log(stack.length ? stack.join('') : 'FRULA');

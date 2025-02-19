const fs = require('fs');
const input = fs.readFileSync('./input3.txt').toString().trim().split('\n');

// 1. 커서 기준 왼쪽에 있는 값들을 모아두는 배열과 오른쪽에 있는 값들을 모아두는 배열 생성;
// 2. 값을 추가하는 경우 왼쪽 커서 배열에 값을 push
// 3. 값을 제거하는 경우 왼쪽 커서 배열에서 pop

// 4. 커서를 오른쪽으로 이동하는 경우
// 오른쪽 커서 배열에 값이 없다면 커서 오른쪽에 값이 없으므로 아무것도 하지 않고
// 오른쪽 커서 배열에 값이 있다면 오른쪽 커서 배열에서 pop한 이후 왼쪽 커서 배열에 push

// 5. 커서를 왼쪽으로 이동하는 경우
// 왼쪽 커서 배열에 값이 없다면 커서 왼쪽에 값이 없으므로 아무것도 하지 않고
// 왼쪽 커서 배열에 값이 있다면 왼쪽 커서 배열에서 pop한 이후 오른쪽 커서 배열에 push

// 6. 값 계산 = 오른쪽 커서 배열은 push로 넣었기 때문에 값이 거꾸로 들어감.
// 따라서 왼쪽 커서배열 + 오른쪽 커서 배열.reverse()로 값 출력

const lStack = input.shift().split('');
const iter = Number(input.shift());
const rStack = [];

let answer = '';

for (let i = 0; i < iter; i++) {
  const [command, value] = input[i].split(' ');

  if (command === 'L' && lStack.length) {
    rStack.push(lStack.pop());
  } else if (command === 'D' && rStack.length) {
    lStack.push(rStack.pop());
  } else if (command === 'B') {
    lStack.pop();
  } else if (command === 'P') {
    lStack.push(value);
  }
}

answer = lStack.join('') + rStack.reverse().join('');

console.log(answer);
console.log(`${lStack.join('')}${rStack.reverse().join('')}`);

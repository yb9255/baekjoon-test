const [N, ...keylog] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. 값을 입력하면 커서 왼쪽에 값을 추가
 * 2. 값을 지우면 커서 왼쪽 stack을 pop
 * 3. 왼쪽으로 커서를 옮기면 cursorRight를 pop해서 cursorLeft에 push
 * 4. 오른쪽으로 커서를 옮기면 cursorLeft를 pop해서 cursorRight에 push
 * 5. cursorLeft와 cursorRight를 연결한 값을 리턴
 */

const answer = [];

for (let i = 0; i < +N; i++) {
  const log = keylog[i];
  const lStack = [];
  const rStack = [];

  for (const char of log) {
    if (char === '<') {
      if (lStack.length) rStack.push(lStack.pop());
    } else if (char === '>') {
      if (rStack.length) lStack.push(rStack.pop());
    } else if (char === '-') {
      if (lStack.length) lStack.pop();
    } else {
      lStack.push(char);
    }
  }

  answer.push(lStack.join('') + rStack.reverse().join(''));
}

console.log(answer.join('\n'));

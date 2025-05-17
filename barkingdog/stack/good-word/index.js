const [N, ...words] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/** Pseudo Code
 * 1. stack에 단어를 순회하며 stack이 비었다면 알파벳을 넣는다.
 * 2. stack 끝에 있는 알파벳과 현재 알파벳이 일치하면 stack을 pop한다.
 * 3. stack에 끝에 있는 알파벳과 현재 알파벳이 일치하지 않는다면 현재 알파벳을 push한다.
 * 4. 짝이 전부 맞았다면 모든 알파벳이 pop되면서 stack의 length가 0이 되므로, 그 때 count를 올린다.
 */

let count = 0;

for (let i = 0; i < N; i++) {
  const word = words[i];
  const stack = [];

  for (const char of word) {
    if (stack.length && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  if (!stack.length) count++;
}

console.log(count);

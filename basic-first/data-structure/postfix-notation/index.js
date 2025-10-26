/** https://www.acmicpc.net/problem/1918 */

const notation = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input3.txt')
  .toString()
  .trim();

/** Pseudo Code
 * Shunting Yard Algorithm
 *
 * 1. 각 연산자에 우선순위를 지정한다.
 * 2. 수식 문자열을 순회한다
 * 3. A-Z 문자열을 만나면, 곧바로 answer 배열에 넣는다.
 * 4. 연산자를 만나면, 첫번째 연산자는 우선 stack에 push한다.

 * 5. 다음 연산자를 만났을 때, stack top의 연산자가 현재 연산자가 우선순위가 높다면
 * stack을 pop한다음 answer 배열에 넣는다. 이 후 현재 연산자를 stack에 push

 * 6. 열린 괄호를 만난다면 우선 stack에 push한다.
 * 6-1. 이 후 닫힌 괄호를 만날때까지 A-Z는 answer에, 연산자는 stack에 push된다.

 * 7. 닫힌 괄호를 만나면 ( 연산자 인덱스 이후 연산자는 괄호 내 연산자를 의미한다.
 * 괄호 내 연산자는 최우선순위 이므로 ( 연산자가 stack의 top이 될때까지
 * stack을 계속 pop하여 모두 answer에 push한다.
 * 이후 ( 연산자에 도달하면 pop만 해서 (를 없앤다.

 * 8. 순회가 끝나고, 남은 연산자는 우선순위 오름차순으로 연산자가 배치되어 있다.
 * 9. 연산자를 뒤집어서 answer에 넣는다.
*/

const result = [];
const stack = [];

const precedenceMap = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
};

for (let i = 0; i < notation.length; i++) {
  const token = notation[i];
  const isAlphabetToken = 'A' <= token && 'Z' >= token;

  if (isAlphabetToken) {
    result.push(token);
  } else if (token === '(') {
    stack.push(token);
  } else if (token === ')') {
    while (stack.length && stack[stack.length - 1] !== '(') {
      result.push(stack.pop());
    }

    stack.pop();
  } else {
    while (
      stack.length &&
      precedenceMap[stack[stack.length - 1]] >= precedenceMap[token]
    ) {
      result.push(stack.pop());
    }

    stack.push(token);
  }
}

console.log([...result, ...stack.reverse()].join(''));

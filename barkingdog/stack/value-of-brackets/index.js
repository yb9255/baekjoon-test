/** https://www.acmicpc.net/problem/2504 */

const brackets = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * Pseudo Code
 *
 * 1. 열린 괄호의 경우 괄호 종류에 따라 curSum에 2 혹은 3을 곱한다.
 * 2. 닫힌 괄호를 넣을 때 스택이 비었거나 짝이 맞지 않으면 즉시 0을 리턴한다.
 *
 * 3. 닫힌 괄호를 넣을 때 짝이 맞다면, curSum을 answer에 더한 다음 stack을 pop한다
 * 이 때, 가장 안쪽의 괄호가 닫혔을 때 현재까지 누적된 curSum의 값의 계산이 끝나는 시점이므로,
 * stack의 top을 체크하지 않고 brackets[i - 1] 괄호와 비교해서 체크한다. 즉,
 * brackets[i - 1]이 체크가 되는 순간 앞에 있는 모든 괄호의 누적 값 curSum을 answer에 더하기 때문에
 * 그 이전 괄호를 없앨때는 curSum을 answer에 더하면 안된다.
 *
 * e.g. 아래의 경우, 0과 3은 안쪽 1,2의 값을 늘리는 역할만 하고
 * 실제로 값이 확정되는건 1과 2가 만났을 때 이므로 1과 2를 만났을때만 answer를 늘려줌
 *
 * input: ( ( ) )
 * index: 0 1 2 3
 * 3-1. 0에서는 curSum의 값을 2배로 늘림 (2)
 * 3-2. 1에서도 curSum의 값을 2배로 늘림 (4)
 * 3-3. 서로 직접 맞닿는 1, 2를 확인해서 값이 확정됨. 값을 answer에 더함
 * 3-4. 이제 이 값을 curSum으로 확정되서 쓰이지 않을 것이므로 curSum을 2로 나눔 (2)
 * 3-5. 3에 와서 0과 짝을 이뤄서 남은 값이 여전히 curSum에 남아있으므로 2로 또 나눔 (0)
 *
 * 4. 괄호 하나만큼의 값을 처리했기 때문에 curSum을 괄호 종류에 따라 2 혹은 3으로 나눠준다.
 * 5. 괄호 목록을 전부 순회했는데 스택이 여전히 길이가 있다면 0을, 아니라면 answer를 리턴한다.
 */

const stack = [];
let answer = 0;
let curSum = 1;

for (let i = 0; i < brackets.length; i++) {
  const bracket = brackets[i];

  if (bracket === '(') {
    curSum *= 2;
    stack.push(bracket);
  } else if (bracket === '[') {
    curSum *= 3;
    stack.push(bracket);
  } else if (bracket === ')') {
    if (!stack.length || stack[stack.length - 1] !== '(') {
      console.log(0);
      process.exit();
    }

    if (brackets[i - 1] === '(') {
      answer += curSum;
    }

    stack.pop();
    curSum /= 2;
  } else if (bracket === ']') {
    if (!stack.length || stack[stack.length - 1] !== '[') {
      console.log(0);
      process.exit();
    }

    if (brackets[i - 1] === '[') {
      answer += curSum;
    }

    stack.pop();
    curSum /= 3;
  }
}

console.log(stack.length ? 0 : answer);

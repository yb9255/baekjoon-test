const input = require('fs').readFileSync('input2.txt').toString().trim();

// 1. ()는 쇠막대기를 잘라내는 역할을 함.

// 2. (만 추가되는 경우, 쇠막대기 1개의 시작점이 해당 인덱스부터 시작임을 나타냄
// e.g. (((이 stack에 쌓여있는 경우, 이미 3개의 쇠막대기가 이 인덱스 시점에서
// 시작점에 들어왔다는 의미

// 3. () 없이 )만 추가되는 경우, 레이저로 자르고 남은 쇠막대기의 잔해 개수를 의미
// e.g. ((())의 경우, 2개의 쇠막대를 자르고 1개의 잔해가 남음을 의미

// 4. (를 만나면 스택에 계속해서 추가한다.

// 5. 그 와중에 ()를 만나면 (의 개수만큼 쇠막대기가 잘려나간 것이기 때문에,
// 스택에 있는 (의 길이만큼 정답에 추가한다. 아직 잔해의 개수를 계산하지 않았기 때문에
// 체크용으로 스택에서 빼진 않는다. 이후 다음 인덱스로 넘어간다.

// 6. 단독으로 있는 )를 만나면 남은 잔해이기 때문에 개수를 1개 추가하고,
// stack에서 pop으로 남은 잔해에 해당하는 길이를 빼낸다.

let answer = 0;
let stack = [];

for (let i = 0; i < input.length; i++) {
  const char = input[i];
  const nextChar = input[i + 1];

  if (char === '(' && nextChar === ')') {
    answer += stack.length;
    i++;
  } else if (char === '(') {
    stack.push(char);
  } else if (char === ')') {
    stack.pop();
    answer++;
  }
}

console.log(answer);

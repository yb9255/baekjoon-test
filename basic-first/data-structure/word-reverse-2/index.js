const fs = require('fs');
const input = fs.readFileSync('./input7.txt').toString().trim();

// 1. < 를 만나면 isInTag 플래그를 true로 킨다
// 2. isInTag에 있는 동안은 모든 문자열을 임시 스택에 보관한다.

// 3. >를 만나면 isInTag 플래그를 false로 변경하고 정답 스택에 임시 스택 값을 넣고
// 임시 스택을 리셋한다.

// 4. isInTag가 아니라면, 값을 임시 스택에 계속 보관한다.

// 5. isInTag가 아니라면, 공백을 만나면 정답 스택에 임시 스택 -> 공백 순으로 값을 넣고
// 임시 스택을 리셋한다.

const answer = [];
let stack = [];
let isInTag = false;

for (let i = 0; i < input.length; i++) {
  const val = input[i];

  if (val === '<') {
    if (stack.length) {
      answer.push(stack.reverse().join(''));
      stack = [];
    }
    isInTag = true;
  }

  if (isInTag) {
    stack.push(val);

    if (val === '>') {
      answer.push(stack.join(''));
      stack = [];
      isInTag = false;
    }
  } else {
    if (val === ' ') {
      answer.push(stack.reverse().join('') + val);
      stack = [];
    } else {
      stack.push(val);
    }
  }
}

if (stack.length) answer.push(stack.reverse().join(''));

console.log(answer.join('').trim());

// 1. tag와 공백에 해당하는 regex로 값을 분리한다.
// 2. 분리된 substring이 regex와 일치하면 바로 push
// 3. 분리된 substring이 regex와 일치하지 않으면 뒤집어서 push

// <.+>의 경우 맨 처음 <부터 맨 끝 >까지 전부 잡는 greedy matching임
// <.+?>의 경우 맨 처음 <부터 가장 일찍 만나는 >까지만 잡는 non-greedy matching임
// ()은 캡처 그룹으로, 이 값이 있어야 해당 regex를 사용해서 split을 하는 경우 결과 배열에서
// 매칭되는 string이 사라지지 않음.
const regex = /(<.+?>|\s)/;

const answer2 = [];

input.split(regex).forEach((word) => {
  if (regex.test(word) || word === ' ') {
    answer2.push(word);
  } else {
    answer2.push(word.split('').reverse().join(''));
  }
});

console.log(answer2.join(''));

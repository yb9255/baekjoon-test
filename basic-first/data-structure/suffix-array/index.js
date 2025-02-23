const input = require('fs').readFileSync('input.txt').toString();

const answer = [];

for (let i = 0; i < input.length; i++) {
  answer.push(input.slice(i));
}

// 그냥 sort를 하면 사전순 정렬이 됨.
answer.sort();

console.log(answer.join('\n'));

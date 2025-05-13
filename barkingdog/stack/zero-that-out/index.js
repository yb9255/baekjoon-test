const [N, ...nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input2.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

const stack = [];

for (let i = 0; i < N; i++) {
  const num = nums[i];

  if (!num) {
    stack.pop();
  } else {
    stack.push(num);
  }
}

console.log(stack.reduce((acc, cur) => acc + cur, 0));

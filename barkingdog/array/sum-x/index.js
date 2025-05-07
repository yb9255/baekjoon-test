const [[N], sequence, [X]] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

const map = [];
let answer = 0;

for (let i = 0; i < N; i++) {
  const val = sequence[i];
  const diff = X - val;

  if (map[diff] === val) {
    answer++;
  }

  map[val] = diff;
}

console.log(answer);

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const N = +input.shift();

let answer = 0;

for (let i = 0; i < N; i++) {
  const str = input[i];
  const map = {};

  let isGroupWord = true;

  for (let j = 0; j < str.length; j++) {
    if (map[str[j]]) {
      isGroupWord = false;
      break;
    }
    if (str[j] !== str[j + 1]) {
      map[str[j]] = true;
    }
  }

  if (isGroupWord) answer++;
}

console.log(answer);

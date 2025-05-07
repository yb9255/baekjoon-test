const [[N, M], ...students] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

const map = [];
let answer = 0;

for (let i = 0; i < N; i++) {
  const [gender, grade] = students[i];

  if (!map[grade]) {
    map[grade] = [];
  }

  map[grade][gender] = (map[grade][gender] || 0) + 1;
}

for (const counts of map) {
  if (!counts) continue;

  const [girlCount, boyCount] = counts;

  if (girlCount > 0) {
    answer += Math.ceil(girlCount / M);
  }

  if (boyCount > 0) {
    answer += Math.ceil(boyCount / M);
  }
}

console.log(answer);

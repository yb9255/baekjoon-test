const [[N, M], ...lines] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

let line = 0;

for (let i = 0; i < N; i++) {
  const firstLine = lines[line];
  const secondLine = lines[line + N];
  const newLine = Array(M);

  for (let j = 0; j < M; j++) {
    newLine[j] = firstLine[j] + secondLine[j];
  }

  console.log(newLine.join(' '));

  line++;
}

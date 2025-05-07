const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const N = +input.shift();
const stringPairs = input.map((str) => str.split(' '));
const answer = [];

for (let i = 0; i < N; i++) {
  const [first, second] = stringPairs[i];
  const firstMap = [];
  let flag = 'Possible';

  if (first.length !== second.length) {
    answer.push('Impossible');
    continue;
  }

  for (const val of first) {
    const code = val.charCodeAt();
    firstMap[code] = (firstMap[code] || 0) + 1;
  }

  for (const val of second) {
    const code = val.charCodeAt();

    if (!firstMap[code]) {
      flag = 'Impossible';
      break;
    }

    firstMap[code]--;
  }

  answer.push(flag);
}

console.log(answer.join('\n'));

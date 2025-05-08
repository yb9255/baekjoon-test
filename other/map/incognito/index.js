const [N, ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

/**
 * Pseudo Code
 *
 * 1. 각 옷의 종류가 몇개가 있었는지 기록한다.
 * 2. n개의 옷 종류 개수가 있을 때, 전체 나올 수 있는 옷 종류 조합은 이전 옷 종류의 개수 * 현재 옷 종류 개수 + 1(현재 옷 종류를 고르지 않음)
 * 이 될 수 있다.
 * 3. reduce를 통해서 옷 종류 조합을 구한 다음, "아무것도 입지 않았다" 케이스인 1을 빼준다.
 *
 */

const answer = [];

let i = 0;

while (i < input.length) {
  const map = {};
  const lastLineIndex = +input[i];

  for (let j = 1; j < lastLineIndex + 1; j++) {
    const [_, type] = input[i + j].split(' ');
    map[type] = (map[type] || 0) + 1;
  }

  answer.push(Object.values(map).reduce((acc, cur) => acc * (cur + 1), 1) - 1);

  i += lastLineIndex + 1;
}

console.log(answer.join('\n'));

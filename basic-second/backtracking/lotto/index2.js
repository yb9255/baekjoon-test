/** https://www.acmicpc.net/problem/6603 */

const cases = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** stack을 인자로 직접 받지 않고 cur 배열에 오버라이딩 하는 풀이 추가 */

let cur = [];
const result = [];

const dfs = (depth, startIndex, numbers) => {
  if (depth === 6) {
    result.push(cur.join(' '));
    return;
  }

  for (let i = startIndex; i < numbers.length; i++) {
    cur[depth] = numbers[i];
    dfs(depth + 1, i + 1, numbers);
  }
};

for (let i = 0; i < cases.length; i++) {
  const [N, ...numbers] = cases[i];
  if (N === 0) break;

  dfs(0, 0, numbers);
  result.push('');
  cur = [];
}

console.log(result.join('\n').trim());

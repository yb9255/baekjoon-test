/** https://www.acmicpc.net/problem/1107 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .split('\n');

const target = +input[0];
const n = +input[1];
const broken = n ? input[2].split(' ').map(Number) : [];
const start = 100;
const max = 999_999;

let minCount = Math.abs(target - start);

outer: for (let i = 0; i < max; i++) {
  const digits = i.toString();

  for (const digit of digits) {
    if (broken.includes(+digit)) {
      continue outer;
    }
  }

  minCount = Math.min(minCount, digits.length + Math.abs(target - i));
}

console.log(minCount);

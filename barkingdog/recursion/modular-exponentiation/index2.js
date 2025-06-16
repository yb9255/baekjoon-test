const [A, B, C] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split(' ')
  .map(BigInt);

/** Pseudo Code (반복문 풀이)
 */

let a = A,
  b = B,
  mod = C;

let result = 1n;

while (b > 0n) {
  if (b % 2n === 1n) {
    result = (result * a) % mod;
  }

  a = (a * a) % mod;
  b = b / 2n;
}

console.log(result.toString());

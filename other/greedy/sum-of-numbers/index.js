/** https://www.acmicpc.net/problem/1789 */

const S = BigInt(
  require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
    .toString()
    .trim()
);

/**
 * Pseudo Code
 * 1부터 더해야 최대한 많은 자연수를 더하면서 S를 구할 수 있으므로, 1부터 더한다.
 */

let sum = 0n;
let count = 0n;
let i = 1n;

while (sum + i <= S) {
  sum += i;
  count++;
  i++;
}

console.log(count.toString());

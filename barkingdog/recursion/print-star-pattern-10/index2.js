/** https://www.acmicpc.net/problem/2447 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Barkingdog 별해, node에서는 문자열 조작이 느려서 더 느린듯 */

let output = '';

const printStar = (i, j, n) => {
  if (Math.floor(i / n) % 3 === 1 && Math.floor(j / n) % 3 === 1) {
    return ' ';
  }
  if (n === 1) {
    return '*';
  }
  return printStar(i, j, Math.floor(n / 3));
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    output += printStar(i, j, N);
  }
  output += '\n';
}

console.log(output);

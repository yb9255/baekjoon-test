/** https://www.acmicpc.net/problem/2193 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** DP 배열 사용 대신 변수로 처리 */

let curZero = 0n;
let curOne = 1n;

for (let i = 2; i <= N; i++) {
  const newZero = curZero + curOne;
  const newOne = curZero;
  curZero = newZero;
  curOne = newOne;
}

console.log((curZero + curOne).toString());

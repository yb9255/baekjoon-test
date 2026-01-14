/** https://www.acmicpc.net/problem/1748 */

const input = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * Pseudo Code
 *
 * 1. 첫 순회에서 한 자리 수부터 input까지 횟수만큼 길이 1을 더함. 여기서 한 자리수가 차지해야 하는
 * 길이는 전부 채워짐
 *
 * 2. 두번째 순회에서는 두 자리수부터 input까지 횟수만큼 길이 1을 더함. 여기서 두 자리수가 차지해야 하는
 * 길이는 전부 채워짐
 *
 * 3. 순회가 input의 자리수와 일치하게 되면, input ~ i 사이의 횟수만큼 1을 더함, 여기서 input 자리수가
 * 차지해야 하는 길이가 전부 채워짐.
 */

let len = 0;

for (let i = 1; i <= input; i *= 10) {
  len += input - i + 1;
}

console.log(len);

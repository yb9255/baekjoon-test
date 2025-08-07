/** https://www.acmicpc.net/problem/1094 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/** Pseudo Code
 * 1. 23을 2진법으로 표시하면 10111로, 2^4  + 2^2 + 2^1 + 2^0 막대기가 필요하다.
 * 2. 따라서 현재 숫자를 계속 1칸씩 오른쪽으로 비트를 밀면서 체크했을 때 1이면 count를 1씩 올리면 된다.
 *
 * e.g.) 23을 예시로
 * 1) 10111 & 00001 -> 가장 오른쪽 1, count++
 * 2) 오른쪽으로 비트를 한칸 민다
 * 3) 01011 & 00001 -> 가장 오른쪽 1, count++
 * 4) 오른쪽으로 비트를 한칸 민다
 * 5) 00101 & 00001 -> 가장 오른쪽 1, count++
 * 6) 오른쪽으로 비트를 한칸 민다
 * 7) 00010 & 00001 -> 가장 오른쪽이 0이라서 AND 통과가 안됨. count 그대로
 * 8) 오른쪽으로 비트를 한칸 민다
 * 9) 00001 & 00001 -> 가장 오른쪽 1, count++
 * 10) 오른쪽으로 비트를 한칸 밀면 remaining이 0이라서 루프 종료
 */

let count = 0;
let remaining = N;

while (remaining > 0) {
  if (remaining & 1) count++;
  remaining >>= 1;
}

console.log(count);

/** https://www.acmicpc.net/problem/11047 */

const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, K] = input[0].split(' ').map(Number);
const coins = input.slice(1).map(Number);

/** Pseudo Code
 * 1. 현재 동전으로 남은 숫자를 나누고 소숫점을 버린 값이 현재 사용 가능한 동전 갯수
 * 2. 현재 동전으로 남은 숫자를 나눈 나머지가 그 다음 나눈 값.
 * 3. 2, 3을 큰 동전부터 하면 큰 동전을 우선 많이 쓰기 때문에 가장 작은 값을 구할 수 있음.
 * 4. 큰 동전부터 1, 2를 적용하여 가장 작은 동전까지 반복한 뒤 누적된 동전 갯수 값을 로그
 */

let remaining = K;
let coinCount = 0;

for (let i = N - 1; i >= 0; i--) {
  const coin = coins[i];
  coinCount += Math.floor(remaining / coin);
  remaining %= coin;
}

console.log(coinCount);

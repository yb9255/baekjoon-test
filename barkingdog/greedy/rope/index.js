/** https://www.acmicpc.net/problem/2217 */

const [N, ...weights] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** Pseudo Code
 * 1. 가장 무거운 로프 무게만큼 버티려면 1개만 쓸 수 있음. 더 가벼운 로프를 쓰는 순간
 * 더 가벼운 로프 기준으로 무게를 맞춰야 하므로,
 * 2. 1과 같은 원리로 2번째로 무거운 로프 무게만큼 버티려면 가장 무거운 거 + 2번째로 무거운 거 2개만 쓸 수 있음.
 * 3. 로프를 오름차순으로 정렬하고, 1개부터 N개까지 로프를 썼을때 무게를 체크하는 루프를 돈다.
 * 4. 사용하는 로프가 1개일떄는 가장 뒤 (N - 1)번쨰 로프 1개 무게만큼이 최대 무게
 * 5. 사요앟는 로프가 2개일때는 두번째 뒤 (N - 2)번째 로프를 2개 쓰는것 만큼의 무게가 최대 무게
 * 6. 즉, i개 로프를 쓸 때 최대 무게는 weights[N - i] * i
 * 7. 로프를 1개부터 N개를 쓸때 최대 무게를 구한 뒤 로그
 */

weights.sort((a, b) => a - b);

let maxWeight = 0;

for (let i = 1; i <= N; i++) {
  maxWeight = Math.max(maxWeight, weights[N - i] * i);
}

console.log(maxWeight);

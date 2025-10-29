let [[N], prices] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

prices = [0, ...prices];

/** 점화식
 * 1. 작은 케이스로 나누면, n개를 사기 위해 m개의 카드가 들어있는 카드팩을 사는 최소 조합.
 * 나올수 있는 카드팩 조합은 다음과 같다.
 * 1-1. n - m개의 살 때 최소값 + 현재 카드팩
 * 1-2. 혹은 n - m개의 살 때 최소값보다 현재 카드팩이 더 싸며, n === m
 */

/** Pseudo Code
 * 1. 최소 가격을 기록하는 dp 배열 minCost 추가. Math.min으로 비교할 것이기 때문에
 * 기본값은 Infinity이되, 0개의 카드를 구하는 가격은 0으로 설정
 *
 * 2. 구하고자 하는 카드 개수 cardsToBuy 배열을 1부터 n까지 순회
 *
 * 3. 2를 순회할 때, 내부에서 카드팩 개수를 1부터 현재 cardsToBuy까지 순회하는
 * 중첩 for문을 순회 (변수명 packSize)
 *
 * 4. 3을 순회하면서 점화식의 1-1과 1-2를 비교하면서 더 작은 값을 minCost에 기록
 */

const minCost = Array(N + 1).fill(Infinity);
minCost[0] = 0;

for (let cardsToBuy = 1; cardsToBuy <= N; cardsToBuy++) {
  for (let packSize = 1; packSize <= cardsToBuy; packSize++) {
    minCost[cardsToBuy] = Math.min(
      minCost[cardsToBuy],
      minCost[cardsToBuy - packSize] + prices[packSize]
    );
  }
}

console.log(minCost[N]);

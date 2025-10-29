/** https://www.acmicpc.net/problem/11052 */

let [[N], prices] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((line) => line.split(' ').map(Number));

prices = [0, ...prices];

/** 점화식
 * n개의 카드를 구매하기 위해 m개가 들어있는 카드팩을 살 때
 * 가장 비싼 조합의 수는
 * 1. n - m개의 카드를 구매하기 위해 가장 비싼 카드팩 조합의 가격 + m개가 들어있는 카드팩 가격
 * 2. n - m개의 카드를 구매하기 위해 가장 비싼 카드팩 조합의 가격보다 m개가 들어있는 카드팩 가격이
 * 더 비싸며, m === n 일때.
 */

/** Pseudo Code
 * 0. n개의 카드를 사기 위한 최대 가격을 기록하는 DP 배열
 * 1. 1개의 카드부터 n개의 카드까지에 대응하는 for문 (cardsToBuy)을 돈다.
 * 2. 각 cardsToBuy 순회마다, m개의 카드팩을 샀을 때 최대값을 구하는 중첩 배열 (packSize)을 돈다
 *
 * 3. 각 packSize 순회마다, 점화식 1과 2의 케이스를 비교하면서 최대 가격을 maxPrice기록한다. 최종적으로
 * n개의 카드를 사기 위해 1부터 n개가 들어있는 카드팩의 케이스 중 가장 큰 값을 구함
 *
 * 4. maxPrice[n]이 가장 비싼 카드값 케이스가 된다.
 */

const maxCost = Array(N + 1).fill(0);

for (let cardsToBuy = 1; cardsToBuy <= N; cardsToBuy++) {
  for (let packSize = 1; packSize <= cardsToBuy; packSize++) {
    maxCost[cardsToBuy] = Math.max(
      maxCost[cardsToBuy],
      maxCost[cardsToBuy - packSize] + prices[packSize]
    );
  }
}

console.log(maxCost[N]);

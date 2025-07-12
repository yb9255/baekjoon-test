const [N, ...heights] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/**
 * Pseudo code
 * 1. for문으로 heights를 순회하면서 stack에 현재 높이와 같은 높이가 앞에 몇개가 있었는지 값을 넣는다.
 *
 * 2. stack을 while문으로 뒤부터 순회하면서 stack의 top이 현재 높이보다 낮거나 같다면, 지금 누적된
 * 같은 높이 개수만큼 쌍이 추가로 생기므로 정답 변수 pairCount에 top의 sameHeightCount를 더한다.
 *
 * 3. 만약 높이가 같다면, 같은 높이 stack이 한개 더 있음을 기록해야 하므로 sameHeightCount에
 * 현재까지 누적된 top의 sameHeightCount를 더한다.
 *
 * 4. 만약 stack이 여전히 남아있다면, 현재 높이보다 더 큰 높이가 stack의 top 남아있다는 의미.
 * 현재 높이는 키가 작아서 stack의 top 아래랑 마주볼 수 없으므로 stack의 top과만 볼 수 있으므로
 * pairCount에 1만 더한다.
 *
 * 5. 그 다음 자기 자신의 높이와 같은 높이 개수를 stack에 push한다.
 * 6. 최종적으로 pairCount를 로그한다.
 */

const stack = [];
let pairCount = 0;

for (let i = 0; i < N; i++) {
  const height = heights[i];
  let sameHeightCount = 1;

  while (stack.length && stack[stack.length - 1][0] <= height) {
    const [topHeight, topSameHeightCount] = stack.pop();
    pairCount += topSameHeightCount;

    if (topHeight === height) {
      sameHeightCount += topSameHeightCount;
    }
  }

  if (stack.length) pairCount++;
  stack.push([height, sameHeightCount]);
}

console.log(pairCount);

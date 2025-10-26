/** https://www.acmicpc.net/problem/6549 */

const cases = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. height와 해당 height가 확장될 수 있는 가장 왼쪽 index를 표시하는 leftBound를 담는 stack을 만든다.
 * leftBound의 기본값은 현재 index이다.
 *
 * 2. stack에 숫자가 있다면, stack의 top height가 현재 height보다 높다면 while을 돌면서 pop한다.
 *
 * 3. 현재 height보다 top의 height가 높다는건, 뒤의 직사각형들은 top의 height를 사용해서 히스토그램을
 * 만들수 없다는 의미이므로, 이 시점에서 현재 top height로 만드는 히스토그램의 최대 넓이를 구해야하는 시점임을
 * 의미한다.
 *
 * 4. 현재 top의 길이는 leftBound부터 j - 1 까지임. j - 1이 포함되어 있기 때문에 leftBound - j - 1 + 1,
 * 즉 j - leftBound가 됨.
 * -> j는 현재 top의 높이가 뻗어나갈 수 있는 오른쪽 끝 인덱스, leftBound는 왼쪽 끝 인덱스가 됨.
 *
 * 5. top의 최대 넓이를 다 구했다면, 현재 height의 왼쪽 끝은 top의 왼쪽 끝까지 뻗어져 나갈 수 있는 것임을
 * 의미하므로 현재 leftBound를 top의 leftBound로 갱신함.
 *
 * 6. height가 이전 값보다 낮은 경우가 한번도 나오지 않았을 경우, 해당 값들은 stack에 쌓여 있으며
 * 오른쪽 끝까지 확장할 수 있는 케이스가 됨을 의미. 따라서 N을 오른쪽 끝으로 잡고 2 ~ 5의 과정을 반복하며
 * 최대 넓이를 구한다.
 */

const answer = [];

for (let i = 0; i < cases.length; i++) {
  const [N, ...heights] = cases[i];
  if (!N) break;

  const stack = [];
  let maxArea = 0n;

  for (let j = 0; j < N; j++) {
    const height = heights[j];
    let leftBound = j;

    while (stack.length && stack[stack.length - 1][0] >= height) {
      const [topHeight, topLeftBound] = stack.pop();
      const area = BigInt(topHeight) * BigInt(j - topLeftBound);
      maxArea = maxArea > area ? maxArea : area;
      leftBound = topLeftBound;
    }

    stack.push([height, leftBound]);
  }

  while (stack.length) {
    const [height, leftBound] = stack.pop();
    const area = BigInt(height) * BigInt(N - leftBound);
    maxArea = maxArea > area ? maxArea : area;
  }

  answer.push(maxArea.toString());
}

console.log(answer.join('\n'));

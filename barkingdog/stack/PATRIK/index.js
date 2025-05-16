const [N, ...heights] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** Pseudo Code
 * 1. stack에 키를 담는다. stack[stack.length - 1]은
 * 현재 키인 사람이 볼 수 있는 가장 멀리 있는 사람이 된다.
 *
 * 2. heights를 순회한다.
 * 3. 현재 키를 가진 사람의 count가 1인 형태로 순회를 시작한다.
 * 4. 첫 순회에서 { height, count } 형태로 stack에 값을 push한다.
 *
 * 5. stack의 top이 현재 키보다 작을 경우 stack을 pop한 다음 페어 카운트를
 * count에 있는 사람 갯수만큼 올린다.
 *
 * 6. 만약 top의 키와 지금 키가 같다면, 다음 push에 들어갈 count를 1 올린다.
 *
 * 7. stack이 여전히 남아있다면 top의 사람과 현재 사람 사이에 stack의 top보다 큰 사람이
 * 없으므로 서로 바라볼 수 있으므로 페어 카운트를 1 올린다.
 *
 * 8. 다음 순회때, 만약 stack top의 카운트가 2이며 stack top의 키가 현재 키보다 작다면,
 * 2명과 마주볼 수 있으므로 top의 카운트만큼 페어 카운트가 늘어난다.
 *
 */

const stack = [];
let pairCount = 0;

for (let i = 0; i < N; i++) {
  const height = heights[i];
  let count = 1;

  while (stack.length && stack[stack.length - 1].height <= height) {
    const top = stack.pop();
    pairCount += top.count;

    if (top.height === height) {
      count += top.count;
    }
  }

  if (stack.length) {
    pairCount += 1;
  }

  stack.push({ height, count });
}

console.log(pairCount);

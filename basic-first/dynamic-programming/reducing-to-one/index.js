const num = Number(require('fs').readFileSync('input2.txt').toString());

// 🔹 Dynamic Programming (DP) 기법을 사용하여 최적의 연산 횟수를 구함
// 🔹 작은 숫자의 최적해를 먼저 계산한 뒤, 이를 활용해 더 큰 숫자의 최적해를 구하는 방식

// 1. 0부터 숫자까지 해당하는 배열을 만든 후 0을 채운다.
// 이 배열은 각 숫자별 최단거리를 memo하는 기능으로 사용된다.
// e.g.) 배열의 5번 인덱스에선 숫자 5의 최단거리 저장, 배열의 6번 인덱스에선 숫자 6의 최단거리 저장

// 2. 배열을 2부터 순회한다. (1은 어차피 값이 0이므로)

// 3. 현재 index에서 나올 수 있는 최단거리의 가능성은
// 바로 이전 인덱스의 최단거리에 + 1 / 2로 나눈 인덱스의 최단거리에 + 1 / 3으로 나눈 인덱스로 이동의 최단거리에 + 1
// 세가지 경우의 수가 있음.

// 4. 3에서 나온 세가지 경우의 수 중 가장 숫자가 작은 값을 현재 index에 기록

const dp = new Array(num + 1).fill(0);

for (let i = 2; i <= num; i++) {
  dp[i] = dp[i - 1] + 1;

  if (i % 2 === 0) {
    dp[i] = Math.min(dp[i / 2] + 1, dp[i]);
  }

  if (i % 3 === 0) {
    dp[i] = Math.min(dp[i / 3] + 1, dp[i]);
  }
}

console.log(dp[num]);

// BFS를 위한 큐 (FIFO 구조 사용)
// 방문할 node의 순서를 queue에 기록하고, 먼저 들어온 노드를 탐색
// queue에 현재 노드와 sibling 노드를 담아두고 전부 탐색
// 방문한 node는 방문처리를 기록하고 다시 탐색하지 않음.
// stack 기반이고 하나의 노드를 끝까지 파고드는 DFS와 반대 (FILO)

const queue = [{ value: num, count: 0 }];
const visited = new Set(); // 방문한 숫자를 저장

while (queue.length > 0) {
  const { value, count } = queue.shift(); // 큐에서 현재 숫자를 꺼냄

  // 1이 되면 최소 연산 횟수를 출력하고 종료
  if (value === 1) {
    console.log(count);
    break;
  }

  // 방문한 숫자인지 체크 (중복 방문 방지)
  if (!visited.has(value)) {
    visited.add(value);

    // 연산 수행 (-1, /2, /3)
    queue.push({ value: value - 1, count: count + 1 });

    if (value % 2 === 0) {
      queue.push({ value: value / 2, count: count + 1 });
    }

    if (value % 3 === 0) {
      queue.push({ value: value / 3, count: count + 1 });
    }
  }
}

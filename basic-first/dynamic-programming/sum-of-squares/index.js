const n = +require('fs').readFileSync('input.txt').toString();

const dp = Array.from({ length: n + 1 }, () => Infinity);
dp[0] = 0;

// Dynamic Programming
// 1. 0부터 n까지를 indices로 가지는 dp 배열을 생성한다.
// 이 배열은 최소항 제곱수의 합 케이스에 최소항 갯수를 카운트한다.
// 기본값은 Infinity이며 0은 제곱수의 합이 없으므로 0으로 시작

// 2. 1부터 n까지 값을 순회한다. (인자 i)
// 3. 각 i 차례마다 1부터 Math.sqrt(i)까지 값을 순회한다. (인자 j)

// 4. i의 제곱수의 합의 항을 나열할 때,
// 각 i에 대해 j²(1², 2², ..., Math.sqrt(i)²) 중 하나를 마지막으로 더해야 함.
// 즉, dp[i - j^2]의 최소항 개수 목록 (dp[i - 1^2], dp[i - 2^2],... dp[i -  Math.sqrt(i)²])
// 중 가장 작은 값에 1을 더하는게 dp[i]의 최소항 개수가 됨.

// 5. dp[n]을 리턴함.

for (let i = 1; i <= n; i++) {
  for (let j = 1; j * j <= i; j++) {
    dp[i] = Math.min(dp[i], dp[i - j ** 2] + 1);
  }
}

console.log(dp[n]);

// Breadth First Search
// BFS를 위한 큐 초기화 (시작 숫자, 단계 수)
const queue = [[n, 0]];
const visited = new Set(); // 방문한 숫자 저장

while (queue.length > 0) {
  const [current, count] = queue.shift(); // 현재 숫자와 단계 수 가져오기

  // 현재 숫자가 0이면 정답 출력 후 종료
  if (current === 0) {
    console.log(count);
    break;
  }

  // 가능한 모든 제곱수를 빼보기 (1², 2², ..., √current²)
  for (let j = 1; j * j <= current; j++) {
    const next = current - j * j; // 제곱수를 빼서 새로운 숫자 생성
    if (!visited.has(next)) {
      // 방문하지 않은 숫자만 추가
      visited.add(next);
      queue.push([next, count + 1]); // 다음 탐색을 위해 큐에 추가
    }
  }
}

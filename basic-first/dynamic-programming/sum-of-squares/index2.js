/** https://www.acmicpc.net/problem/1699 */

const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

// Breadth First Search
// BFS를 위한 큐 초기화 (시작 숫자, 단계 수)
const queue = [[N, 0]];
let front = 0;
const visited = new Set(); // 방문한 숫자 저장

while (front < queue.length) {
  const [current, count] = queue[front++]; // 현재 숫자와 단계 수 가져오기

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

/** https://www.acmicpc.net/problem/10971 */

const [[N], ...travelCostMap] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/**
 * Pseudo Code
 *
 * 1. 시작 도시를 지정한 상태에서 index를 순열로 순회하는 DFS 함수를 만든다.
 * 2. DFS함수에서 depth가 한번 생길때마다, 다음 도시로 이동하는 비용 값을 구한다.
 * 3. 다음 도시가 이동할 수 없는 경우, 해당 index에 대한 depth는 생략한다.
 * 4. depth가 N이 되면, 맨 처음 도시로 돌아가는 값을 더해서 정답을 업데이트한다.
 * 5. 만약 맨 처음 도시로 돌아갈 수 없다면, 정답을 업데이트하지 않고 건너뛴다.
 */

let answer = Infinity;
const visited = Array(N).fill(false);

const findMinCostFromStartCity = (start, now, depth, sum) => {
  if (sum > answer) return;

  if (depth === N) {
    if (travelCostMap[now][start]) {
      answer = Math.min(answer, sum + travelCostMap[now][start]);
    }

    return;
  }

  for (let next = 0; next < N; next++) {
    if (!visited[next] && !!travelCostMap[now][next]) {
      visited[next] = true;

      findMinCostFromStartCity(
        start,
        next,
        depth + 1,
        sum + travelCostMap[now][next]
      );

      visited[next] = false;
    }
  }
};

for (let startCity = 0; startCity < N; startCity++) {
  visited[startCity] = true;
  findMinCostFromStartCity(startCity, startCity, 1, 0);
  visited[startCity] = false;
}

console.log(answer);

const [[N], nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((str) => str.split(' ').map(Number));

/** Pseudo Code
 * 1. 모든 순열을 순회하면서 합이 최대인 케이스를 찾는다.
 * 2. all-permutation 풀이를 응용해서 풀이
 * 3. 재귀함수는 누적값으로 0부터 시작되는 인자를 가짐
 * 4. depth가 1일때부터 acc에 이전값과 현재값의 절대값을 계속 더해나가서 다음 재귀에 전달함.
 *
 * 5. 만약 현재 depth에서 다음 depth까지 가능한 최대의 값을 전부 더해도 현재 최대값을 넘지 못하면,
 * 조기 가지치기 (Early Pruning)을 적용
 */

const visited = Array(N).fill(false);
let maxValue = -Infinity;

const MAX_DIFF = Math.abs(Math.max(...nums) - Math.min(...nums));

const getPermutations = (depth, prev, acc) => {
  if (depth === N) {
    if (maxValue < acc) {
      maxValue = acc;
    }

    return;
  }

  if (acc + (N - depth) * MAX_DIFF <= maxValue) return;

  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      const diff = depth === 0 ? 0 : Math.abs(prev - nums[i]);
      getPermutations(depth + 1, nums[i], acc + diff);
      visited[i] = false;
    }
  }
};

getPermutations(0, 0, 0);

console.log(maxValue);

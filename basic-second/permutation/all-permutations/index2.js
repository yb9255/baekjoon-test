const N = +require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim();

/**
 * Pseudo Code
 *
 * 1. Backtracking 풀이법 활용 (N과 M에서 visited 풀이법을 사용함.)
 */

const visited = Array(N + 1).fill(false);
const answer = [];

const getPermutations = (depth, stack) => {
  if (depth === N) {
    answer.push(stack.join(' '));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      visited[i] = true;
      stack.push(i);
      getPermutations(depth + 1, stack);
      stack.pop();
      visited[i] = false;
    }
  }
};

getPermutations(0, []);
console.log(answer.join('\n'));

/** https://www.acmicpc.net/problem/9095 */

const [N, ...nums] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : 'input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(Number);

/** top-down 풀이
 * 타겟 값인 num을 쪼개가면서 memo하는 dp 풀이
 */

const result = [];
const memo = [0, 1, 2, 4];

const getPermutation = (num) => {
  if (memo[num] !== undefined) {
    return memo[num];
  }

  const permutation =
    getPermutation(num - 3) + getPermutation(num - 2) + getPermutation(num - 1);

  memo[num] = permutation;

  return permutation;
};

for (let i = 0; i < N; i++) {
  result.push(getPermutation(nums[i]));
}

console.log(result.join('\n'));

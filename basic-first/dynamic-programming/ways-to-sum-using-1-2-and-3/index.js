const input = require('fs')
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .map(Number);

// 1. n의 더하기 조합이 마지막에 1을 더했다면 n - 1까지 만들고 마지막에 1을 더한 것
// 2. n의 더하기 조합이 마지막에 2를 더했다면 n - 2까지 만들고 마지막에 2를 더한 것
// 3. n의 더하기 조합이 마지막에 3을 더했다면 n - 3까지 만들고 마지막에 3을 더한 것

// 4. 즉, f(n - 1) + f(n - 2) + f(n - 3) == f(n)이 성립함.

// bottom-up
const iter = input.shift();
const dp = [1, 1, 2, 4];
const answer = [];

for (let i = 0; i < iter; i++) {
  const n = input[i];

  if (n < dp.length) {
    answer.push(dp[n]);
    continue;
  }

  for (let j = dp.length; j <= n; j++) {
    dp[j] = dp[j - 3] + dp[j - 2] + dp[j - 1];
  }

  answer.push(dp[n]);
}

console.log(answer.join('\n'));

// top-down (recursive function + memoization)

const answer2 = [];
const memo = {
  1: 1,
  2: 2,
  3: 4,
};

const getPermutation = (num) => {
  if (memo[num] !== undefined) {
    return memo[num];
  }

  const permutation =
    getPermutation(num - 3) + getPermutation(num - 2) + getPermutation(num - 1);

  memo[num] = permutation;

  return permutation;
};

for (let i = 0; i < iter; i++) {
  answer2.push(getPermutation(input[i]));
}

console.log(answer2.join('\n'));
